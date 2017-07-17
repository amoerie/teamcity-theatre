export var onEnter = function (callback) { return function (event) {
    if (event.keyCode == 13)
        callback();
}; };
