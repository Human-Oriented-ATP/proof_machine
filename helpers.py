class UnionFind:
    def __init__(self):
        self.root_to_class = dict()
        self.elem_to_root = dict()

    def root(self, x):
        return self.elem_to_root.get(x,x)
    def get_class(self, x):
        x = self.root(x)
        return self.root_to_class(x, [x])
    def join(self, x,y):
        x = self.root(x)
        y = self.root(y)
        if x == y: return

        if len(self.root_to_class.get(x, [x])) < len(self.root_to_class.get(y, [y])):
            x,y = y,x

        if x not in self.root_to_class: self.root_to_class[x] = [x]
        if y in self.root_to_class:
            y_cl = self.root_to_class.pop(y)
        else:
            y_cl = [y]

        for y_eq in y_cl:
            self.elem_to_root[y_eq] = x
        self.root_to_class[x].extend(y_cl)

    def get_class(self, x):
        x = self.root(x)
        return self.root_to_class.get(x, [x])
    def iter_classes(self):
        return self.root_to_class.items()
