BaseJS.prototype.createUI = function (name) {
    return this.select(document.createElement(name));
};