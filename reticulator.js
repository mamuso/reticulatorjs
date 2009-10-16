/**
* reticulator.js
* ---------------------------------
* Version 0.02
* Written by Manuel Muñoz Solera (mamuso@mamuso.net)
* @requires love
*
* Copyright 2009 Manuel Muñoz Solera
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/

/**
* @description Overlays a defined grid to follow for front
* development purposes. Also allows you to create individual vertical and
* horizontal guides.
* 
* By default you get a 951/16/9 grid
* 
* This js is inspired on the grid section of the Ale Muñoz OrangeCommands
* http://bomberstudios.com/orangecommands
* 
*
*/

var Reticulator = function() {


/**
* Merge objects
*/
var merge = function (o, ob) {
  var z;
  for (z in ob) {
    if (ob.hasOwnProperty(z)) {
      o[z] = ob[z];
    }
  }
  return o;
},

each = function(col, m, args) {
  var i = 0, it;
  args = [].slice.call(arguments, 2);
  for ( ; i < col.length; i +=1) {
    it = col[i];
    if (typeof m == 'string') {
      it[m].apply(it, args);
    }
    else {
      m.apply(it, [i, it]);
    }
  }
  return col;
},

/**
* Sets element style properties
*/ 
style = function(element, hash) {
  merge(element.style, hash);
  return element;
},

/**
* Reticulator instances
*/ 
_reticulators = [],
/**
* Unique guide container
*/  
_guideContainer,

_reticulatorKey = null,

/**
 * Independent guides
 */  
_guides = [],

addEvent = function() {
  if (window.addEventListener) {
    return function(o, type, handler) {
      o.addEventListener(type, handler, false);
    };
  }
  else if (window.attachEvent) {
    return function(o, type, handler) {
      o.attachEvent('on' + type, handler);
    };
  }
}(),

setupEvents = function() {
  // onresize behavior
  addEvent(window, 'resize', function(){
    var i = 0;
    resizeGuideContainer();
    each(_reticulators, 'alignGridLayout');
  });


  // toggle visibility when hitting "g+r"
  addEvent(document, 'keydown', function(e){
    var key, keycode;
    e = e || window.event;
    keycode = (window.event ? e.keyCode : e.which);
    key = String.fromCharCode(e.keyCode);
    if(_reticulatorKey === null) {
      _reticulatorKey = key;
    } else {
      if(_reticulatorKey === "G" && key === "R") {
        Reticulator.toggleAll();
      }
    }
  });

  addEvent(document, 'keyup', function(e){
    _reticulatorKey = null;
  });

},


/**
* Builds or returns an standard container (once) for all the grids
* 
*/
getGuideContainer = function () {

  if (!_guideContainer) {
    _guideContainer = document.createElement("div");
    
    // style it now
    style(_guideContainer,{ 
      height :    "1px",
      width :     document.documentElement.clientWidth + "px",
      padding :   "0 0 0 0",
      margin :    "0 0 0 0",
      position :  "absolute",
      top :       0,
      left :      0,
      zIndex :    9000000
    });

    // send this to the body
    document.body.appendChild(_guideContainer);
  }

  return _guideContainer;
},


/**
* Resize the guide container everytime that the window is resized.
* 
*/
resizeGuideContainer = function () {
  style(getGuideContainer(), { width: document.documentElement.clientWidth + "px" });
},

/**
* Reticulator is an abstract base that contains the basics of the grid.
* @constructor
* 
*/
Reticulator = function (options) {
  if(!(this instanceof Reticulator)) return new Reticulator(options);
  this.options = merge({
    width: 951,
    columns: 16, // => 0 if you want to create an empty base
    gutter: 9,
    offset: 0,
    align: "center",
    color: "#00FF00",
    opacity: 0.5,
    zindex: 9000000,
    visible: true
  }, options || {});

  // here we go!
  this.buildGrid();
  
  _reticulators.push(this);
},

/**
* VerticalGuide.
* 
*/
VerticalGuide = Reticulator.VerticalGuide = function (options) {
  var guide;
  
  // we can override the default options
  this.options = merge({
    color: "#00FF00",
    opacity: 0.5
  }, options);
  
  guide = document.createElement("div");

  // style it now
  style(guide, {
    position :    "absolute",
    height :      (document.documentElement.clientHeight > document.body.scrollHeight ? document.documentElement.clientHeight : document.body.scrollHeight) + "px",
    top :         0,
    width :       "1px",
    borderLeft :  "1px solid " + this.options.color,
    opacity :     this.options.opacity,
    filter :      "alpha(opacity=" + this.options.opacity * 100 + ")"
  });

  return guide;
},


/**
* HorizontalGuide.
* 
*/
HorizontalGuide = Reticulator.HorizontalGuide = function (options) {
  var guide;
  
  // we can override the default options
  this.options = merge({
    color: "#00FF00",
    opacity: 0.5
  }, options || {});
  
  guide = document.createElement("div");

  // style it now
  style(guide, {
    position :    "absolute",
    width :      (document.documentElement.clientWidth > document.body.scrollWidth ? document.documentElement.clientWidth : document.body.scrollWidth) + "px",
    left :         0,
    height :       "1px",
    borderTop :  "1px solid " + this.options.color,
    opacity :     this.options.opacity,
    filter :      "alpha(opacity=" + this.options.opacity * 100 + ")"
  });
  return guide;
};


merge(Reticulator, {
  /**
   * Hides all guides
   */
  hideAll : function() {
    each(_reticulators, 'hide');
  },
  /**
   * Toggles visibility of all guides
   */  
  toggleAll : function() {
    each(_reticulators, 'toggle');
    // toggle the independent guides too
    each(_guides, function(index, el) {
      style(el, { display: el.style.display == 'none' ? '' : 'none' });      
    });
  },
  /**
   * Show all guides
   */
  showAll : function() {
    each(_reticulators, 'show');
  }
});


merge(Reticulator.prototype, {
  hide : function() {
    style(this.basegrid.layout, { display: 'none' });
  },
  show : function() {
    style(this.basegrid.layout, { display: 'block' });
  },
  toggle : function() {
    var el = this.basegrid.layout;
    style(el, { display: el.style.display == 'none' ? '' : 'none' });
  },
  /**
  * Method to build grid layout div.
  * @returns the layout div
  * 
  */
  buildGridLayout : function () {
    var gridLayout;

    // here we go!
    gridLayout = document.createElement("div");

    // style this
    style(gridLayout, {
      height: '1px',
      width: this.options.width + 'px',
      position:  'absolute',
      margin: '0 0 0 0',
      padding:    '0 0 0 0',
      textAlign:  'left',
      zIndex:     this.options.zindex,
      top:        '0',
      display: this.options.visible ? 'block' : 'none'
    });
    // send this to the container
    document.body.appendChild(gridLayout);        

    return gridLayout;
  },
  
  /**
  * Align grid layout div.
  * @returns the layout div
  * 
  */
  alignGridLayout : function () {
    var pos, middle;
    switch (this.options.align) {
      case "center":
        middle = (document.documentElement.clientWidth > document.body.scrollWidth ? document.documentElement.clientWidth : document.body.scrollWidth)/2;
        pos = middle - ((this.options.width)/2) + this.options.offset;
        this.basegrid.layout.style.left = pos + "px";
        break;
      case "left":
        left = 0 + this.options.offset;
        this.basegrid.layout.style.left = pos + "px";
        break;
      case "right":
        pos = 0 + this.options.offset;
        this.basegrid.layout.style.right = pos + "px";
        break;
    };
  },

  
  /**
  * Hub function that calls all the grid things :)
  * 
  */
  buildGrid : function() {
    var i, cumulative, guide;

    // basegrid basic settings all together in this map
    this.basegrid = {
      layout: this.buildGridLayout(), // layout object
      guides: (this.options.gutter === 0 ? this.options.columns : this.options.columns * 2), // number of guides that we need to draw
      cols: this.options.columns === 0 ? 0 : ((this.options.width - ((this.options.columns - 1) * this.options.gutter)) / this.options.columns) // width for every column
    };

    this.alignGridLayout();

    if (this.options.columns !== 0) {
      cumulative = 0;

      // put your guide here 
      for (i = 0; i < this.basegrid.guides; i++) {
        // vertical guides here
        this.addVerticalGuide(cumulative);
        if(i%2 === 0) {
          cumulative = cumulative + this.basegrid.cols;
        } else {
          cumulative = cumulative + this.options.gutter;
        } 
      }
    }
  }
  
});

each([
    ['Horizontal', 'top', { width: '100%' }],
    ['Vertical', 'left']
  ], function(i, it) {
  var name = it[0] ,
  prop = it[1],
  styles = it[2] || {},
  pp = Reticulator.prototype;

  // generates the addHorizontalGuide, addHorizontalGuides,
  // addVerticalGuide and addVerticalGuides methods in the Reticulator.prototype  
  pp['add' + name + 'Guide' ] = pp['add' + name + 'Guides'] = function(n) {
    var opts = this.options,
    layout = this.basegrid.layout;
    
    each(arguments, function(index, value) {
      var guide = new Reticulator[name + 'Guide']({
        color: opts.color,
        opacity: opts.opacity
      });

      // set additional styles if needed
      style(guide, styles);
      // set the guide property (top or left)
      guide.style[prop] = String(value).indexOf("%") !== -1 ? value : value + "px";

      layout.appendChild(guide);
    });
    return this;
  };
  
  // generates the addHorizontalGuide and addVerticalGuide
  // class methods
  Reticulator['add' + name + 'Guide'] = function(opts) {
    var guide = new Reticulator[name + 'Guide'](opts),
    value = opts[prop];
    guide.style[prop] = String(value).indexOf("%") !== -1 ? value : value + "px";
    document.body.appendChild(guide);
    _guides.push(guide);
    return guide;
  };
});


// setup event handlers
setupEvents();

// return the main object
return Reticulator;

}();
