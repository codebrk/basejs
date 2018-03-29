function BaseJS(is_dev) {
    if (is_dev === undefined) { is_dev = false; }
    var base = this;

    // private methods
    var appendPrepend = function(e, t, n) {
        if ("string" == typeof t) {
            t = (new DOMParser).parseFromString(t, "text/html").getElementsByTagName("body")[0].childNodes
        } else t = [t];
        for (var i = 0; i < t.length; i++) {
            var s = t[i].cloneNode(!0);
            n ? e.appendChild(s) : e.insertBefore(s, e.firstChild)
        }
    };

    this.fn = function (e) {
        if (e instanceof HTMLElement) this.push(e);
        else if (e instanceof HTMLCollection)
            for (var t = 0; t < e.length; t++) this.push(e[t]);
        else if (e === document) this.push(document);
        else if (e === window) this.push(window);
        else if (e instanceof Array)
            for (t = 0; t < e.length; t++) this.push(e[t]);
        else {
            var n = document.querySelectorAll(e);
            for (t = 0; t < n.length; t++) this.push(n[t])
        }
    };
    this.fn.prototype = [];

    this.fn.prototype.css = function (styles) {
        base.in(styles).each(function (key, val) {
            base.in(this).each(function (key2, val2) {
                val2.style[key] = val;
            });
        });
        return this;
    };

    this.fn.prototype.append = function (content) {
        base.in(this).each(function (key, val) {
            appendPrepend(val, content, true);
        });
        return this;
    };

    this.fn.prototype.prepend = function (content) {
        base.in(this).each(function (key, val) {
            appendPrepend(val, content);
        });
        return this;
    };

    this.fn.prototype.add = function (els) {
        var currentObj = this;
        base.in(els).each(function (key, val) {
            currentObj.push(val);
        });
        return this;
    };

    this.fn.prototype.get = function (i) {
        return base.select(this[i]);
    };
    
    this.fn.prototype.addClass = function (cls) {
        base.in(this).each(function (key, val) {
            if (!val.classList.contains(cls)) {
                val.classList.add(cls);
            }
        });
        return this;
    };

    this.fn.prototype.removeClass = function (cls) {
        base.in(this).each(function (key, val) {
            if (val.classList.contains(cls)) {
                val.classList.remove(cls);
            }
        });
        return this;
    };

    this.fn.prototype.toggleClass = function (cls) {
        base.in(this).each(function (key, val) {
            if (val.classList.contains(cls)) {
                val.classList.remove(cls);
            } else {
                val.classList.add(cls);
            }
        });
        return this;
    };

    this.fn.prototype.html = function (s) {
        if (s === undefined) {
            return this[0].innerHTML;
        }

        base.in(this).each(function (i, el) {
            el.innerHTML = s;
        });
        return this;
    };

    this.fn.prototype.attr = function (key, val) {
        if (val === undefined) {
            return this[0].getAttribute(key);
        }

        base.in(this).each(function (i, el) {
            el.setAttribute(key, val);
        });
        return this;
    };

    this.select = function (sel) {
        return new this.fn(sel);
    };


    // base methods
    this.in = function (iterable) {
        var keys = Object.keys(iterable);
        if (iterable instanceof Array) {
            keys.pop();
        }
        var _self = {};
        _self.first = iterable[0];
        _self.last = iterable[iterable.length - 1];
        _self.get = function(i) { return iterable[i]; };
        _self.each = function (callback) {
            var i;
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (iterable instanceof Array) {
                    key = parseInt(key);
                }
                callback(key, iterable[key]);
            }
        };
        return _self;
    };
}