from term import *
import math
import cairo
import random

class Style:
    def __init__(self, fill = None, stroke = None, stroke_width = 0.1, dash = None):
        self.fill = fill
        self.stroke = stroke
        self.stroke_width = stroke_width
        self.dash = dash

    @staticmethod
    def set_color(cr, color):
        if len(color) == 3: cr.set_source_rgb(*color)
        elif len(color) == 4: cr.set_source_rgba(*color)
        else: raise Exception("Don't know how to set color: {}".format(color))
    def paint(self, cr):
        if self.fill is not None:
            Style.set_color(cr, self.fill)
            if self.stroke is not None:
                cr.fill_preserve()
            else:
                cr.fill()
        if self.stroke is not None:
            Style.set_color(cr, self.stroke)
            cr.set_line_width(self.stroke_width)
            if self.dash is not None:
                cr.set_dash(self.dash)
            cr.stroke()
            if self.dash is not None:
                cr.set_dash([])

class BoundingBox:
    def __init__(self, top, bottom, left, right):
        self.top = top
        self.bottom = bottom
        self.left = left
        self.right = right

    def contains(self, x,y):
        return self.left < x < self.right and self.top > y > self.bottom
    def translate(self, x,y):
        if x == 0 and y == 0: return self
        elif self.is_empty: return self
        return BoundingBox(
            top = self.top+y,
            bottom = self.bottom+y,
            left = self.left+x,
            right = self.right+x
        )
    def scale(self, scale):
        if scale == 1: return self
        elif self.is_empty: return self
        return BoundingBox(
            top = self.top*scale,
            bottom = self.bottom*scale,
            left = self.left*scale,
            right = self.right*scale
        )
    def add_offset(self, offset):
        if offset == 0: return self
        return BoundingBox(
            top = self.top+offset,
            bottom = self.bottom-offset,
            left = self.left-offset,
            right = self.right+offset
        )
    def draw(self, cr):
        cr.rectangle(self.left, self.bottom, self.width, self.height)

    @property
    def width(self):
        return self.right - self.left
    @property
    def height(self):
        return self.top - self.bottom
    @property
    def center(self):
        return (self.left+self.right)/2, (self.top+self.bottom)/2
    @property
    def corners(self):
        return (
            (self.left, self.top),
            (self.right, self.top),
            (self.left, self.bottom),
            (self.right, self.bottom),
        )
    @staticmethod
    def union(bbs):
        bbs = [bb for bb in bbs if not bb.is_empty]
        if len(bbs) == 0: return BoundingBox.empty()
        elif len(bbs) == 1: return bbs[0]
        return BoundingBox(
            top = max(bb.top for bb in bbs),
            bottom = min(bb.bottom for bb in bbs),
            left = min(bb.left for bb in bbs),
            right = max(bb.right for bb in bbs)
        )
    def __or__(self, other):
        return BoundingBox.union((self, other))

    @staticmethod
    def empty():
        return BoundingBox(top = 0, bottom = 0, left = 0, right = 0)
    @property
    def is_empty(self):
        return self.width == 0 and self.height == 0
    @staticmethod
    def centered(width, height):
        return BoundingBox(
            top = height/2,
            bottom = -height/2,
            left = -width/2,
            right = width/2
        )
    @staticmethod
    def from_corners(corner1, corner2):
        x1,y1 = corner1
        x2,y2 = corner2
        return BoundingBox(
            top = max(y1,y2),
            bottom = min(y1,y2),
            left = min(x1,x2),
            right = max(x1,x2),
        )

class GObject:
    def __init__(self):
        self.parent = None
        self.center = (0,0)
        self.scale_coef = 1
    @property
    def bounding_box(self):
        return self.raw_bounding_box.scale(self.scale_coef).translate(*self.center)
    def translate(self, x,y):
        self.center = (self.center[0]+x, self.center[0]+y)
    def scale(self, scale):
        self.scale_coef *= scale_coef
    def fit_to(self, bounding_box):
        self.scale_coef = min(
            bounding_box.width / self.raw_bounding_box.width,
            bounding_box.height / self.raw_bounding_box.height,
        )
        x1,y1 = self.raw_bounding_box.center
        x2,y2 = bounding_box.center
        self.center = (x2-x1*self.scale_coef, y2-y1*self.scale_coef)

    def parent_with_type(self, t):
        res = self.parent
        while not isinstance(res, t):
            if res is None:
                raise Exception("Parent of type {} not found".format(t))
            res = res.parent
        return res
    def get_parent_shift_scale(self, parent):
        x = 0
        y = 0
        obj = self
        scale = 1
        while obj != parent:
            if obj is None: raise Exception("Parent not found")
            scale *= obj.scale_coef
            x *= obj.scale_coef
            y *= obj.scale_coef
            x += obj.center[0]
            y += obj.center[1]
            obj = obj.parent
        return (x,y), scale
    def parent_coor(self, coor, parent = None):
        x,y = coor
        (shx, shy), scale = self.get_parent_shift_scale(parent)
        return (x*scale + shx, y*scale + shy)
    def child_coor(self, coor, parent = None):
        x,y = coor
        (shx, shy), scale = self.get_parent_shift_scale(parent)
        return ((x-shx)/scale, (y-shy)/scale)
    def bb_from_parent(self, parent = None):
        shift, scale = self.get_parent_shift_scale(parent)
        return self.raw_bounding_box.scale(scale).translate(*shift)

    def draw(self, cr, layer):
        cr.save()
        cr.translate(*self.center)
        cr.scale(self.scale_coef, self.scale_coef)
        self.draw_raw(cr, layer)
        cr.restore()

    @staticmethod
    def halign(objs, distance):
        objs = [obj for obj in objs if not obj.bounding_box.is_empty]
        if not objs: return
        total_size = sum(obj.bounding_box.width for obj in objs) + distance*(len(objs)-1)
        x = -total_size/2
        for obj in objs:
            obj.translate(x-obj.bounding_box.left, 0)
            x += distance + obj.bounding_box.width
    @staticmethod
    def valign(objs, distance):
        objs = [obj for obj in objs if not obj.bounding_box.is_empty]
        if not objs: return
        total_size = sum(obj.bounding_box.height for obj in objs) + distance*(len(objs)-1)
        y = total_size/2
        for obj in objs:
            obj.translate(0, y-obj.bounding_box.top)
            y -= distance + obj.bounding_box.height

class GCircle(GObject):
    def __init__(self, radius, style, layer):
        self.radius = radius
        self.style = style
        self.layer = layer
        self.raw_bounding_box = BoundingBox.centered(2*radius, 2*radius)
        super().__init__()
    def draw_raw(self, cr, layer):
        if layer != self.layer: return
        cr.arc(0, 0, self.radius, 0, 2*math.pi)
        cr.close_path()
        self.style.paint(cr)

class GRoundRectangle(GObject):
    def __init__(self, width, height, corner_size, style, layer):
        self.width = width
        self.height = height
        self.corner_size = corner_size
        self.style = style
        self.layer = layer
        self.raw_bounding_box = BoundingBox.centered(width, height)
        super().__init__()
    def draw_raw(self, cr, layer):
        if layer != self.layer: return

        w = self.width/2
        h = self.height/2
        cs = min(self.corner_size, w, h)

        cr.move_to(-w, h-cs)
        cr.line_to(-w, -h+cs)
        cr.arc(-w+cs, -h+cs, cs, math.pi, 1.5*math.pi)
        cr.line_to(w-cs, -h)
        cr.arc(w-cs, -h+cs, cs, -0.5*math.pi, 0)
        cr.line_to(w, h-cs)
        cr.arc(w-cs, h-cs, cs, 0, 0.5*math.pi)
        cr.line_to(-w+cs, h)
        cr.arc(-w+cs, h-cs, cs, 0.5*math.pi, math.pi)
        cr.close_path()

        self.style.paint(cr)

class GText(GObject):
    dummy_surface = cairo.ImageSurface(cairo.Format.RGB24, 0,0)
    dummy_ctx = cairo.Context(dummy_surface)

    def __init__(self, text, layer, font_size = 1):
        self.text = text
        self.layer = layer
        self.font_size = font_size
        scale = max(1, 100/font_size)
        GText.dummy_ctx.set_font_size(font_size*scale)
        x,y,width,height,_,_ = GText.dummy_ctx.text_extents(text)
        self.raw_bounding_box = BoundingBox(
            top = -y / scale,
            bottom = -(y+height) / scale,
            left = x / scale,
            right = (x+width) / scale,
        )
        super().__init__()
    def draw_raw(self, cr, layer):
        if layer != self.layer: return

        # cr.set_source_rgb(1,1,0)
        # cr.rectangle(
        #     self.raw_bounding_box.left,
        #     self.raw_bounding_box.bottom,
        #     self.raw_bounding_box.width,
        #     self.raw_bounding_box.height,
        # )
        # cr.fill()

        cr.scale(1,-1)

        cr.set_source_rgb(0,0,0)
        cr.set_font_size(self.font_size)

        cr.stroke()
        cr.show_text(self.text)
        cr.fill()

class Connection(GObject):
    def __init__(self, obj1, left1, obj2, left2, style = Style(stroke = (0,0,0)), layer = 1):
        self.raw_bounding_box = BoundingBox.empty()
        self.obj1 = obj1
        self.obj2 = obj2
        if left1: self.side1 = -1
        else: self.side1 = 1
        if left2: self.side2 = -1
        else: self.side2 = 1
        self.style = style
        self.layer = layer
        super().__init__()
    def draw_raw(self, cr, layer):
        if layer != self.layer: return
        x1,y1 = self.obj1.parent_coor((0,0), self.parent)
        x2,y2 = self.obj2.parent_coor((0,0), self.parent)
        cr.move_to(x1,y1)
        coef = 2
        if self.side1 == self.side2:
            coef = 1+0.2*abs(y1-y2)
        cr.curve_to(x1-coef*self.side1,y1,x2-coef*self.side2,y2,x2,y2)
        self.style.paint(cr)

class EndConnection(GObject):
    def __init__(self, obj, left, style = Style(stroke = (0,0,0), dash = (0.1,0.1)), layer = 1):
        self.raw_bounding_box = BoundingBox.empty()
        self.obj = obj
        if left: self.side = -1
        else: self.side = 1
        self.style = style
        self.layer = layer
        super().__init__()
    def draw_raw(self, cr, layer):
        if layer != self.layer: return
        x,y = self.obj.parent_coor((0,0), self.parent)
        cr.move_to(x,y)
        cr.line_to(x-self.side,y)
        self.style.paint(cr)

class GGroup(GObject):
    def __init__(self, subobjects):
        subobjects = list(subobjects)
        for obj in subobjects:
            assert obj.parent is None
            obj.parent = self
        self.subobjects = subobjects
        self.update_bb()
        super().__init__()
    def __iter__(self):
        return iter(self.subobjects)
    def update_bb(self):
        self.raw_bounding_box = BoundingBox.union(obj.bounding_box for obj in self.subobjects)
    def draw_raw(self, cr, layer):
        for obj in self.subobjects:
            obj.draw(cr, layer)
    def add(self, obj):
        self.subobjects.append(obj)
        assert obj.parent is None
        obj.parent = self
    def __getitem__(self, i):
        return self.subobjects[i]

class GGroupHAl(GGroup):
    def __init__(self, subobjects, distance):
        subobjects = tuple(subobjects)
        GObject.halign(subobjects, distance)
        super().__init__(subobjects)

class GGroupVAl(GGroup):
    def __init__(self, subobjects, distance):
        subobjects = tuple(subobjects)
        GObject.valign(subobjects, distance)
        super().__init__(subobjects)

class GLabelCircle(GGroup):
    def __init__(
            self,
            layer = 2,
            radius = 0.4,
            style = Style(
                fill = (1,1,1),
                stroke = (0.5, 0.5, 0.5),            
            )
    ):
        self.layer = layer
        self.circle = GCircle(radius = radius, layer = layer, style = style)
        super().__init__([self.circle])
        self.label = None
    def set_label(self, label):
        if self.label == label: return
        if self.label is not None:
            self.subobjects.pop()
        self.label = label
        if label is None: return

        glabel = GText(str(label), layer = self.layer)
        glabel.fit_to(self.raw_bounding_box.scale(0.7))
        self.add(glabel)

class GPredicate(GGroup):
    pred_to_style = {
        'r' : Style(fill = (1, 0, 0, 0.3), stroke = (0.8, 0, 0)),
        'g' : Style(fill = (0, 1, 0, 0.3), stroke = (0, 0.8, 0)),
        'b' : Style(fill = (0, 0, 1, 0.2), stroke = (0, 0, 1)),
        'w' : Style(fill = (1, 1, 1, 0.2), stroke = (0, 0, 0)),
        'num' : Style(fill = (1, 1, 1, 0.2), stroke = (0, 0, 0)),
    }
    def __init__(self, predicate):
        assert isinstance(predicate, TermApp)
        self.style = GPredicate.pred_to_style[predicate.f]
        self.predicate = predicate
        self.circles = GGroupVAl([
            GLabelCircle()
            for _ in predicate.args
        ], distance = 0.4)
        for circle, term in zip(self.circles, self.predicate.args):
            circle.term = term
            if term.is_numeric: circle.set_label(term.f)
            elif not isinstance(term, TermVar):
                circle.circle.style = Style(
                    fill = (1,0.8,1),
                    stroke = (0.6,0.5,0.6),
                )
        self.rect = GRoundRectangle(
            width = self.circles.bounding_box.width+0.4,
            height = self.circles.bounding_box.height+0.4,
            corner_size = 0.2,
            style = self.style,
            layer = 0
        )
        super().__init__([self.rect, self.circles])

class GInference(GGroupHAl):
    def __init__(self, inference, add_ends = False):
        self.inference = inference
        self.goals = GGroupVAl([
            GPredicate(goal)
            for goal in inference.goals
        ], distance = 0.5)
        self.requirements = GGroupVAl([
            GPredicate(requirement)
            for requirement in inference.requirements
        ], distance = 0.5)
        super().__init__([self.requirements, self.goals], distance = 2)
        arg_to_circle = dict()
        for left, container in [(False, self.goals), (True, self.requirements)]:
            for gpred in container:
                for arg, circle in zip(gpred.predicate.args, gpred.circles):
                    if add_ends:
                        self.add(EndConnection(circle, not left, style = Style(stroke = (0,0,0))))
                    if left:
                        prev = arg_to_circle.setdefault((arg, left), circle)
                    else:
                        prev = arg_to_circle[arg, left] = circle

        for arg, left in list(arg_to_circle.keys()):
            if (arg, not left) not in arg_to_circle:
                del arg_to_circle[arg, left]

        for left2, container in [(False, self.goals), (True, self.requirements)]:
            for gpred in container:
                for arg, circle2 in zip(gpred.predicate.args, gpred.circles):
                    circle1 = arg_to_circle.get((arg, not left2))
                    if circle1 is not None:
                        if circle2 != arg_to_circle.get((arg, True)):
                            self.add(Connection(circle1, not left2, circle2, left2))
                    else:
                        circle1 = arg_to_circle.get((arg, left2))
                        if circle1 is not None:
                            self.add(Connection(circle1, left2, circle2, left2))
                        arg_to_circle[arg, left2] = circle2

    def iter_pred(self):
        for goal in self.goals:
            yield False, goal
        for req in self.requirements:
            yield True, req
