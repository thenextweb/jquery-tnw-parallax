"use strict";var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var pluginName="tnwParallax",TNWParallax=function(){function a(b,c){_classCallCheck(this,a),this.options=$.extend({},this.defaults,c),this.$el=$(b),this.init()}return _createClass(a,[{key:"init",value:function init(){var a=this;this.maxTranslateY=[],this.scrollTop=$(window).scrollTop(),this.$el.find("."+this.options.classNameContent).each(function(b,c){var d=$(c).prop("style").height;0<d.indexOf("%")?(d=+d.replace("%",""),a.maxTranslateY[b]=100*((d-100)/d)):(a.maxTranslateY[b]=0,console.error("TNWParallax: No inline height set for:",c))}),this.updateDimensions(),this.update(),$(window).on("orientationchange resize",this.onResize.bind(this)),$(window).on("tnw:scroll",this.onScroll.bind(this))}},{key:"onResize",value:function onResize(){this.updateDimensions()}},{key:"onScroll",value:function onScroll(a){this.scrollTop=a.top,this.update()}},{key:"update",value:function update(){var a=this,b=void 0,c=void 0,d=void 0;c=this.scrollTop+this.windowHeight,b=(c-this.container.top)/(this.container.height+this.windowHeight),0<=b&&1>=b&&this.$el.find("."+this.options.classNameContent).each(function(c,e){0<a.maxTranslateY[c]&&(d=a.maxTranslateY[c]*b,$(e).css({"-webkit-transform":"translateY("+d+"%)",transform:"translateY("+d+"%)"}))})}},{key:"updateDimensions",value:function updateDimensions(){this.container={bottom:this.$el.offset().top+this.$el.outerHeight(),height:this.$el.outerHeight(),top:this.$el.offset().top},this.windowHeight=window.innerHeight}}]),a}();TNWParallax.prototype.defaults={classNameContent:"js-tnwParallax-content"},$.fn[pluginName]=function(a){return this.each(function(){var b=$(this).data("plugin_"+pluginName);b?"string"==typeof a&&b[a]():$(this).data("plugin_"+pluginName,new TNWParallax(this,a))})};
