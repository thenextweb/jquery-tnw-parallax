/**
 * TNW Parallax
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

const pluginName = "tnwParallax"

class TNWParallax {
    constructor (el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init () {
        this.maxTranslateY = []
        this.scrollTop = $(window).scrollTop()

        this.$el.find("." + this.options.classNameContent).each((i, el) => {
            let height = $(el).prop("style")["height"]

            if (height.indexOf("%") > 0) {
                height = +height.replace("%", "")
                this.maxTranslateY[i] = ((height - 100) / height) * 100
            } else {
                this.maxTranslateY[i] = 0
                console.error("TNWParallax: No inline height set for:", el)
            }
        })

        this.updateDimensions()
        this.update()

        $(window).on("orientationchange resize", this.onResize.bind(this))
        $(window).on("tnw:scroll", this.onScroll.bind(this))
    }

    onResize () {
        this.updateDimensions()
    }

    onScroll (e) {
        this.scrollTop = e.top
        this.update()
    }

    update () {
        let multiplier
        let scrollBottom
        let translateY

        scrollBottom = this.scrollTop + this.windowHeight
        multiplier = (scrollBottom - this.container.top) / (this.container.height + this.windowHeight)

        if (multiplier >= 0 && multiplier <= 1) {
            this.$el.find("." + this.options.classNameContent).each((i, el) => {
                if (this.maxTranslateY[i] > 0) {
                    translateY = this.maxTranslateY[i] * multiplier

                    $(el).css({
                        "-webkit-transform": `translateY(${translateY}%)`,
                        "transform": `translateY(${translateY}%)`
                    })
                }
            })
        }
    }

    updateDimensions () {
        this.container = {
            bottom: this.$el.offset().top + this.$el.outerHeight(),
            height: this.$el.outerHeight(),
            top: this.$el.offset().top
        }

        this.windowHeight = window.innerHeight
    }
}

TNWParallax.prototype.defaults = {
    classNameContent: "js-tnwParallax-content"
}

$.fn[pluginName] = function (options) {
    return this.each(function () {
        let instance = $(this).data(`plugin_${pluginName}`)

        if (!instance) {
            $(this).data(`plugin_${pluginName}`, new TNWParallax(this, options))
        } else {
            if (typeof options === "string") {
                instance[options]()
            }
        }
    })
}
