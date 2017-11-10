"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TNW Parallax
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

var pluginName = "tnwParallax";

var TNWParallax = function () {
    function TNWParallax(el, options) {
        _classCallCheck(this, TNWParallax);

        this.options = $.extend({}, this.defaults, options);
        this.$el = $(el);
        this.init();
    }

    _createClass(TNWParallax, [{
        key: "init",
        value: function init() {
            var _this = this;

            this.maxTranslateY = [];
            this.scrollTop = $(window).scrollTop();

            this.$el.find("." + this.options.classNameContent).each(function (i, el) {
                var height = $(el).prop("style")["height"];

                if (height.indexOf("%") > 0) {
                    height = +height.replace("%", "");
                    _this.maxTranslateY[i] = (height - 100) / height * 100;
                } else {
                    _this.maxTranslateY[i] = 0;
                    console.error("TNWParallax: No inline height set for:", el);
                }
            });

            this.updateDimensions();
            this.update();

            $(window).on("orientationchange resize", this.onResize.bind(this));
            $(window).on("tnw:scroll", this.onScroll.bind(this));
        }
    }, {
        key: "onResize",
        value: function onResize() {
            this.updateDimensions();
        }
    }, {
        key: "onScroll",
        value: function onScroll(e) {
            this.scrollTop = e.top;
            this.update();
        }
    }, {
        key: "update",
        value: function update() {
            var _this2 = this;

            var multiplier = void 0;
            var scrollBottom = void 0;
            var translateY = void 0;

            scrollBottom = this.scrollTop + this.windowHeight;
            multiplier = (scrollBottom - this.container.top) / (this.container.height + this.windowHeight);

            if (multiplier >= 0 && multiplier <= 1) {
                this.$el.find("." + this.options.classNameContent).each(function (i, el) {
                    if (_this2.maxTranslateY[i] > 0) {
                        translateY = _this2.maxTranslateY[i] * multiplier;

                        $(el).css({
                            "-webkit-transform": "translateY(" + translateY + "%)",
                            "transform": "translateY(" + translateY + "%)"
                        });
                    }
                });
            }
        }
    }, {
        key: "updateDimensions",
        value: function updateDimensions() {
            this.container = {
                bottom: this.$el.offset().top + this.$el.outerHeight(),
                height: this.$el.outerHeight(),
                top: this.$el.offset().top
            };

            this.windowHeight = window.innerHeight;
        }
    }]);

    return TNWParallax;
}();

TNWParallax.prototype.defaults = {
    classNameContent: "js-tnwParallax-content"
};

$.fn[pluginName] = function (options) {
    return this.each(function () {
        var instance = $(this).data("plugin_" + pluginName);

        if (!instance) {
            $(this).data("plugin_" + pluginName, new TNWParallax(this, options));
        } else {
            if (typeof options === "string") {
                instance[options]();
            }
        }
    });
};
