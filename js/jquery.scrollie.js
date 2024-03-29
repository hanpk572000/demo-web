/****
 * jQuery Scrollie Plugin v1.0.1
 * https://github.com/Funsella/jquery-scrollie
 *
 * Copyright 2013 JP Nothard
 * Released under the MIT license
 */

;(function ( $, window, document, undefined ) {

  "use strict";

  // Create the defaults once
  var scrollie = "scrollie",
    defaults = {
      parentElement : window, // the scrolling element to watch for scrolling action. default: window (custom example: .my-wrapper)
      direction : "both", // 'up', 'down'
      scrollOffset : 0, //
      scrollRatio  : 2,
      scrollingInView : null, // activates when the whole element is moving inside the window
      scrollingToTheTop : null, // activates when it enters the window and stops when it reaches the top
      scrollingOutOfView : null, // actives when the element reaches the top of the window and stops when it is out of the window
      scrolledOutOfView : null  // activates wehn the element is completly out of the window
    };

  // The actual plugin constructor
  function Plugin ( element, options ) {

    this.element = element;

    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = scrollie;
    this.init();


  }

  Plugin.prototype = {

    init: function () {

      this._defineElements();

      this._scrollEvent();

    },

    _defineElements: function() {

      var self = this;

      self.$scrollElement = $(self.element);

      self.$elemHeight = self.$scrollElement.outerHeight();

      self.$elemPosTop = self.$scrollElement.offset().top;

      // if the element has a data-scrollie-offset value, use that or use the default
      self.$scrollOffset = (self.$scrollElement.data('scrollie-offset') ||  self.$scrollElement.data('scrollie-offset') == '0') ? self.$scrollElement.data('scrollie-offset') : self.settings.scrollOffset;

      // if the element has a data-scrollie-scrollRatio value, use that or use the default
      self.$scrollRatio = (self.$scrollElement.data('scrollie-scrollRatio') ||  self.$scrollElement.data('scrollie-scrollRatio') == '0') ? self.$scrollElement.data('scrollie-scrollRatio') : self.settings.scrollRatio;

    },

    _inMotion: function (winPos, winHeight, thisTop, direction) {

      var self = this,
        coords = (((winPos - thisTop) * -1) - winHeight) * -1,
        scrollRatio = coords / 2,
        movedOut = coords < winHeight + self.$elemHeight,
        movingIn = ( coords ) > 0 - (self.$scrollOffset),
        movingToTheTop = movingIn && coords < winHeight,
        movingThrough = movingIn && movedOut,
        atTheTop = coords > winHeight - (self.$scrollOffset) && movedOut;


      /**
       *  When the element moves into view until element reaches the very top of the page
       *---------------------------------------------------------------------------------*/
      if( movingToTheTop ){ //revised and offset complete

        jQuery.isFunction(self.settings.scrollingToTheTop) && self.settings.scrollingToTheTop.call( this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos );

      }

      /**
       * if the element is inside the window
       * runs when the element moves into view till the element has completly moved out
       *-------------------------------------------------------------------------------*/
      if( movingThrough ){ //revised and offset complete

        jQuery.isFunction(self.settings.scrollingInView) && self.settings.scrollingInView.call( this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos );

      }

      /**
       * if the element has reached the very top of the window
       * runs from when the element touches the top till the element has completly moved out
       *------------------------------------------------------------------------------------*/
      if( atTheTop ){ //revised and offset complete

        jQuery.isFunction(self.settings.scrollingOutOfView) && self.settings.scrollingOutOfView.call( this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos );

      }

      /**
       * if the element has moved out the top of the window
       *---------------------------------------------------*/
      if (  !movedOut ) {

        jQuery.isFunction(self.settings.scrolledOutOfView) && self.settings.scrolledOutOfView.call( this, this.$scrollElement, self.$scrollOffset, direction, coords, scrollRatio, thisTop, winPos );

      }


    },

    _scrollEvent: function() {

      var self = this,
        direction = self.settings.direction,
        lastScrolPos = 0,
        scroll_ok = true;

      setInterval(function () {
        scroll_ok = true;
      }, 66);//33ms is 30fps, you can try changing this to something larger for better performance

      $(self.settings.parentElement).on('scroll', function(){

        var windowPos = $(this).scrollTop(),
          winHeight = $(this).height(),
          currentDirection = ( windowPos > lastScrolPos ) ? 'up' : 'down';


        // scrolling up
        if ( currentDirection === direction && scroll_ok === true) {
          scroll_ok = false;

          // element moving from bottom to top
          self._inMotion(windowPos, winHeight, self.$elemPosTop, currentDirection );

        }

        else if ( direction === 'both' && scroll_ok === true ) {
          scroll_ok = false;

          self._inMotion(windowPos, winHeight, self.$elemPosTop, currentDirection );

        }

        lastScrolPos = windowPos;

      });

    }

  };

  // A really lightweight plugin wrapper around the constructor,
  $.fn[ scrollie ] = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + scrollie ) ) {
        $.data( this, "plugin_" + scrollie, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );
