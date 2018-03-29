BaseJS.prototype.http = { base: this };
BaseJS.prototype.http.get = function (url) {
    var _self = {};
    var http = new XMLHttpRequest();
    _self.ready = function (callback) {
        http.onreadystatechange = function() {
            callback(this)
        };
        return _self;
    };
    _self.headers = function(headers) {
        base.in(headers).each(function (key, val) {
            http.setRequestHeader(key, val);
        });
        return _self;
    };
    http.open("GET", url, true);
    http.send();
    return _self;
};