BaseJS.prototype.http = function (url) {
    var _self = {};
    var _this = this;
    var _params = "";
    var http = new XMLHttpRequest();
    _self.get = function (callback) {
        if (callback !== undefined) {
            http.onreadystatechange = function() {
                callback(this);
            };
        }

        if (url.indexOf("?") === -1) {
            url += "?" + _params;
        } else {
            url += "&" + _params;
        }
        http.open("GET", url, true);
        http.send();
        return _self;
    };

    _self.ready = function (callback) {
        http.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(this);
            }
        };
    };

    _self.params = function(params) {
        _this.in(params).each(function (key, val) {
            _params += (key + "=" + val + "&")
        });
        _params = _params.substring(0, _params.length - 1);
        return _self;
    };

    _self.post = function (callback) {
        if (callback !== undefined) {
            http.onreadystatechange = function() {
                callback(this);
            };
        }

        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(_params);
        return _self;
    };
    return _self;
};