import math
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk, GLib
import cairo

from term import *
from parse_term import parse_term, parse_file
from graphics import *

def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

class Sidebar(GGroupVAl):
    def __init__(self, inferences):
        self.ginferences = [GInference(x, add_ends = True) for x in inferences]
        for x in self.ginferences:
            x.fit_to(BoundingBox.centered(1,1))
        super().__init__(self.ginferences, 0.2)
        self.raw_bounding_box = self.raw_bounding_box.add_offset(0.5)
        self.scale_coef = 1/self.raw_bounding_box.height
        self.translate(-self.bounding_box.left, -self.bounding_box.top)
    def draw_raw(self, cr, layer):
        if layer == 0:
            bb = self.raw_bounding_box
            cr.rectangle(bb.left, bb.bottom, bb.width, bb.height)
            cr.set_source_rgb(0.8, 0.8, 0.8)
            cr.fill()
        GGroup.draw_raw(self, cr, layer)
    def select(self, y):
        y = (0.5-y)/self.scale_coef
        for obj1, obj2 in zip(self.subobjects, self.subobjects[1:]):
            if y >= (obj1.bounding_box.bottom + obj2.bounding_box.top) / 2:
                return obj1
        return self.subobjects[-1]

class ConnectionManager:
    def __init__(self, start_num, debug = False):
        self.start_num = start_num
        self.pred_to_left = dict() # GPredicate -> bool
        self.pred_to_endconn = dict() # GPredicate -> bool
        self.pred_to_conn = dict() # GPredicate -> list[Connection]
        self.cancel_preview()
        self.debug = debug
        self.default_style = Style(stroke = (0,0,0))
        self.broken_style = Style(stroke = (0,0,0), dash = (0.2,0.2))
        if self.debug:
            self.known_vars = set()
            self.var_i = 0

    def add_predicate(self, pred, left):
        self.pred_to_left[pred] = left
        self.pred_to_endconn[pred] = [
            EndConnection(circle, left)
            for circle in pred.circles
        ]
        if self.debug:
            for var in pred.predicate.free_vars:
                if var not in self.known_vars:
                    var.name = var.name+'_'+str(self.var_i)
                    self.var_i += 1
            self.known_vars.update(pred.predicate.free_vars)
    def remove_predicate(self, pred):
        self.remove_connection(pred)
        del self.pred_to_left[pred]
        del self.pred_to_endconn[pred]

    def add_connection(self, pred1, pred2, conn):
        self.remove_connection(pred1)
        self.remove_connection(pred2)
        self.pred_to_conn[pred1] = conn, pred2
        self.pred_to_conn[pred2] = conn, pred1
    def remove_connection(self, pred1):
        if pred1 in self.pred_to_conn:
            conn, pred2 = self.pred_to_conn[pred1]
            del self.pred_to_conn[pred1]
            del self.pred_to_conn[pred2]

    def init_preview(self, pred1):
        self.cancel_preview()
        removed = pred1 in self.pred_to_left
        self.remove_connection(pred1)
        self.preview_pred1 = pred1
        self.preview_left1 = self.pred_to_left[pred1]
        if removed: self.update_numbers()
    def update_preview_free(self, coor):
        assert self.preview_pred1 is not None
        dest = GGroup([
            GGroup([])
            for _ in self.preview_pred1.circles
        ])
        for circle, dest_point in zip(self.preview_pred1.circles, dest):
            dest_point.center = circle.center
        dest.center = coor
        self.preview_conn = self._build_conn(
            self.preview_pred1.circles,
            self.preview_left1,
            dest
        )
        self.preview_pred2 = None
    def update_preview_dest(self, pred2):
        if self.preview_pred1 is None: return False
        left2 = self.pred_to_left[pred2]
        if self.preview_left1 == left2: return False
        if self.preview_pred1.predicate.f != pred2.predicate.f: return False
        if len(self.preview_pred1.predicate.args) != len(pred2.predicate.args):
            return False
        self.preview_pred2 = pred2
        self.preview_conn = self._build_conn(
            self.preview_pred1.circles,
            self.preview_left1,
            self.preview_pred2.circles
        )
        return True
    def _build_conn(self, circles1, left, circles2):
        return [
            Connection(c1, left, c2, not left)
            for c1, c2 in zip(circles1, circles2)
        ]
    def cancel_preview(self):
        self.preview_conn = None
        self.preview_pred1 = None
        self.preview_left1 = None
        self.preview_pred2 = None
    def confirm_preview(self):
        if self.preview_pred1 is not None and self.preview_pred2 is not None:
            self.add_connection(
                self.preview_pred1,
                self.preview_pred2,
                self.preview_conn
            )
            self.cancel_preview()
            return True
        else:
            self.cancel_preview()
            return False
    @property
    def has_preview(self):
        return self.preview_pred1 is not None

    def draw(self, cr, layer):
        if layer != 1: return
        used = set()
        for pred1, (conns, pred2) in self.pred_to_conn.items():
            if pred1 in used: continue
            used.add(pred2)
            for conn in conns:
                conn.draw(cr, layer)
        if self.preview_conn is not None:
            for conn in self.preview_conn:
                conn.draw(cr, layer)
        for pred, conns in self.pred_to_endconn.items():
            if pred in self.pred_to_conn: continue
            if pred in (self.preview_pred1, self.preview_pred2): continue
            for conn in conns:
                conn.draw(cr, layer)

    def update_numbers(self):
        to_merge = [
            (pred1.predicate, pred2.predicate)
            for pred1, (_, pred2) in self.pred_to_conn.items()
        ]
        subst = unify(to_merge)
        subst_vars = set(subst.keys())
        subst_vvars = set().union(*(x.free_vars for x in subst.values()))
        free_vars = set()
        terms = []
        for pred in self.pred_to_left.keys():
            terms.extend(pred.predicate.args)
            free_vars.update(pred.predicate.free_vars)
        zero = TermApp(0, ())
        subst0 = Substitution({ v : zero  for v in free_vars })
        for v in free_vars:
            if v in subst:
                subst[v] = subst0(subst[v])
            else:
                subst[v] = zero
        subst = Substitution(subst)
        enumeration = enumerate_terms([subst(term) for term in terms], self.start_num)
        for pred in self.pred_to_left.keys():
            for circle in pred.circles:
                num = enumeration[subst(circle.term)]
                if num == 0: num = None
                circle.set_label(num)

        used = set()
        for pred1, (conns, pred2) in self.pred_to_conn.items():
            if pred1 in used: continue
            used.add(pred2)
            for conn in conns:
                if conn.obj1.label == conn.obj2.label:
                    conn.style = self.default_style
                else:
                    conn.style = self.broken_style

class TIM(Gtk.Window):

    def __init__(self, inferences, goal, win_size = (800, 600)):
        super().__init__()

        # calculate start_num -- first free number that can be created
        start_num = 1
        preds = [goal]
        for inference in inferences:
            preds.extend(inference.goals)
            preds.extend(inference.requirements)
        for pred in preds:
            for term in pred.subterms():
                if term.is_numeric:
                    start_num = max(term.f+1, start_num)

        self.connections = ConnectionManager(start_num)

        self.obj_grasp = None
        self.mb_grasp = None
        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.darea.set_events(Gdk.EventMask.BUTTON_PRESS_MASK |
                              Gdk.EventMask.BUTTON_RELEASE_MASK |
                              Gdk.EventMask.KEY_PRESS_MASK |
                              Gdk.EventMask.KEY_RELEASE_MASK |
                              Gdk.EventMask.SCROLL_MASK |
                              Gdk.EventMask.POINTER_MOTION_MASK)
        self.add(self.darea)

        self.darea.connect("button-press-event", self.on_button_press)
        self.darea.connect("button-release-event", self.on_button_release)
        self.darea.connect("scroll-event", self.on_scroll)
        self.darea.connect("motion-notify-event", self.on_motion)
        self.connect("key-press-event", self.on_key_press)
        self.connect("key-release-event", self.on_key_release)

        self.set_title(f"Tim's Incredible (proof) Machine")
        self.resize(*win_size)
        self.win_size = win_size
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

        self.scale = 50
        self.shift = (0,0)

        self.sidebar = Sidebar(inferences)
        self.goal = GInference(Inference(goals = [], requirements = [goal]))
        self.objects = [self.goal]
        self.connections.add_predicate(self.goal.requirements[0], False)
        self.connections.update_numbers()

    def update_win_size(self):
        self.win_size = (self.darea.get_allocated_width(), self.darea.get_allocated_height())

    def pixel_to_coor(self, pixel):
        px,py = pixel
        w,h = self.win_size
        sx,sy = self.shift
        x = (px - w/2) / self.scale - sx
        y = (h/2 - py) / self.scale - sy
        return (x,y)
    def coor_to_pixel(self, pos):
        w,h = self.win_size
        sx,sy = self.shift
        x,y = pos
        x = float(x)
        y = float(y)
        px = (x + sx) * self.scale + w/2
        py = h/2 - (y + sy) * self.scale
        return px,py
    def set_shift(self, pixel, coor):
        w,h = self.win_size
        px,py = pixel
        x,y = coor
        sx = (px - w/2) / self.scale - x
        sy = (h/2 - py) / self.scale - y
        self.shift = sx,sy

    def on_scroll(self,w,e):
        coor = self.pixel_to_coor((e.x, e.y))
        if e.direction == Gdk.ScrollDirection.DOWN: self.scale *= 0.9
        elif e.direction == Gdk.ScrollDirection.UP: self.scale /= 0.9
        # print("zoom {}".format(self.scale))
        self.set_shift((e.x, e.y), coor)
        self.darea.queue_draw()

    def iter_pred(self):
        for obj in reversed(self.objects):
            if not isinstance(obj, GInference): continue
            yield from obj.iter_pred()

    def on_button_press(self, w, e):
        if e.type != Gdk.EventType.BUTTON_PRESS: return
        if e.button in (1,3) and self.connections.has_preview:
            if self.connections.confirm_preview():
                self.connections.update_numbers()
            self.darea.queue_draw()
            return
        if e.button == 1:
            if e.x < self.sidebar.bounding_box.width * self.win_size[1]:
                icon = self.sidebar.select(e.y / self.win_size[1])
                obj = GInference(icon.inference.fresh_var_copy())
                self.objects.append(obj)
                for left, pred in obj.iter_pred():
                    self.connections.add_predicate(pred, not left)
                    self.connections.update_numbers()
                self.obj_grasp = obj, 0, 0
            else:
                x,y = self.pixel_to_coor((e.x, e.y))
                for obj in reversed(self.objects):
                    if obj.bounding_box.contains(x,y):
                        cx,cy = obj.center
                        self.obj_grasp = obj, x-cx, y-cy
                        break
        elif e.button == 2:
            self.mb_grasp = self.pixel_to_coor((e.x, e.y))
        elif e.button == 3:
            x,y = self.pixel_to_coor((e.x, e.y))
            for left, pred in self.iter_pred():
                if pred.bb_from_parent().contains(x,y):
                    self.connections.init_preview(pred)
                    self.connections.update_preview_free((x,y))
            self.darea.queue_draw()

    def on_button_release(self, w, e):
        if e.button == 1:
            if self.obj_grasp is not None:
                if e.x < self.sidebar.bounding_box.width * self.win_size[1]:
                    obj, _, _ = self.obj_grasp
                    if obj != self.goal:
                        self.objects.remove(obj)
                        for _,pred in obj.iter_pred():
                            self.connections.remove_predicate(pred)
                            self.connections.update_numbers()
                        self.darea.queue_draw()
                self.obj_grasp = None
        if e.button == 2:
            self.mb_grasp = None

    def on_motion(self,w,e):
        if e.state & Gdk.ModifierType.BUTTON2_MASK:
            if self.mb_grasp is None: return
            self.set_shift((e.x, e.y), self.mb_grasp)
            self.darea.queue_draw()
        elif e.state & Gdk.ModifierType.BUTTON1_MASK:
            if self.obj_grasp is None: return
            obj, gx, gy = self.obj_grasp
            x,y = self.pixel_to_coor((e.x, e.y))
            obj.center = (x-gx, y-gy)
            self.darea.queue_draw()
        if self.connections.has_preview:
            coor = self.pixel_to_coor((e.x, e.y))
            for left2, pred2 in self.iter_pred():
                if pred2.bb_from_parent().contains(*coor):
                    if self.connections.update_preview_dest(pred2): break
            else:
                self.connections.update_preview_free(coor)
            self.darea.queue_draw()

    def on_key_press(self,w,e):
        keyval = e.keyval
        keyval_name = Gdk.keyval_name(keyval)
        # do not distinguish standard and numlock key variants
        keyval_name = remove_prefix(keyval_name, "KP_")
        print("Press:", keyval_name)
        if keyval_name == "Escape":
            Gtk.main_quit()
        # elif keyval_name == "Left":
        #     self.inf_index = max(self.inf_index-1, 0)
        #     self.darea.queue_draw()
        # elif keyval_name == "Right":
        #     self.inf_index = min(self.inf_index+1, len(self.ginferences)-1)
        #     self.darea.queue_draw()

    def on_key_release(self,w,e):
        keyval_name = Gdk.keyval_name(e.keyval)


    def fill_background(self, cr):
        cr.rectangle(0,0,*self.win_size)
        cr.set_source_rgb(1,1,1)
        cr.fill()

    def on_draw(self, wid, cr):
        self.update_win_size()
        self.fill_background(cr)

        cr.save()
        cr.translate(*self.coor_to_pixel((0,0)))
        cr.scale(self.scale, -self.scale)

        for layer in range(3):
            for obj in self.objects:
                obj.draw(cr, layer)
            self.connections.draw(cr, layer)

        cr.restore()

        cr.save()
        cr.scale(self.win_size[1],-self.win_size[1])

        for layer in range(3):
            self.sidebar.draw(cr, layer)
        cr.restore()

if __name__ == "__main__":

    inferences = parse_file("color-game.pl")
    goal = parse_term("r(3,4)")
    win = TIM(inferences, goal)
    Gtk.main()
