import $ from 'jquery';
import { Plugin } from 'foundation-sites/js/foundation.core.plugin';

class ScrollTop extends Plugin {

    /**
     * @param {jQuery|false} element
     * @param {Object} options
     * @private
     */
    _setup(element, options) {
        this.options = $.extend({}, ScrollTop.defaults, element ? element.data() : {}, options);
        this.$element = element || $(`<span id="${this.options.containerID}"></span>`).html(this.options.html).appendTo('body').end();
        this.className = 'ToTop';

        this._init();
    }

    _init() {
        this.$element.hide();

        this._events();
    }

    _events() {
        const _this = this;

        this.$element.on('click.zf.toTop', function () {
            $('html, body').animate({scrollTop: 0}, _this.options.scrollSpeed, _this.options.easingType);

            return false;
        });

        $(window).on('scroll', function() {
            const sd = $(window).scrollTop();

            if (typeof document.body.style.maxHeight === "undefined") {
                _this.$element.css({
                    'position' : 'absolute',
                    'top' : sd + $(window).height() - 50
                });
            }
            if (sd > _this.options.min)
                _this.$element.fadeIn(_this.options.inDelay);
            else
                _this.$element.fadeOut(_this.options.outDelay);
        })
    }
}

ScrollTop.defaults = {
    html: 'To Top',
    min: 200,
    inDelay: 600,
    outDelay: 400,
    containerID: 'toTop',
    scrollSpeed: 1200,
    easingType: 'linear'
};

export default ScrollTop;
