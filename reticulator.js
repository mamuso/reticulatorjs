/**
* reticulator.js
* ---------------------------------
* Version 0.01
* Written by Manuel Muñoz Solera (mamuso@mamuso.net)
* @requires love
*
* Copyright 2009 Manuel Muñoz Solera
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/

/**
* @description Plugin that overlays a defined grid to follow for front
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

/**
* merge objects prototype
*
*/
Object.prototype.merge = function (ob) {
  var o, i, z;
  o = this;
  i = 0;
  for (z in ob) {
    if (ob.hasOwnProperty(z)) {
      o[z] = ob[z];
    }
  }
  return o;
};

/**
* @returns an unique identificator for the guide container 
* 
*/
var ReticulatorId, ReticulatorGrids;
ReticulatorId = "ReticulatorCont" + String((new Date()).getTime()).replace(/\D/gi, '');
ReticulatorGrids = [];


/**
* Are you explorer?
* @constructor
* 
*/
var IsExplorer = function () {
  return (navigator.userAgent.indexOf('MSIE') !== -1);
};






/**
* Building an standard container (once) for all the grids and guides.
* 
*/
var BuildGuideContainer = function () {
  // are you there?
  var guideCont = document.getElementById(ReticulatorId);

  if (guideCont === null) {
    guideCont = document.createElement("div");
    guideCont.id =              ReticulatorId;
    
    // style it now
    guideCont.style.height =    "1px";
    guideCont.style.width =     document.documentElement.clientWidth + "px";
    guideCont.style.padding =   "0 0 0 0";
    guideCont.style.margin =    "0 0 0 0";
    guideCont.style.position =  "absolute";
    guideCont.style.top =       0;
    guideCont.style.left =      0;
    guideCont.style.zIndex =    9000000;

    // send this to the body
    document.body.appendChild(guideCont);        
  }

  return guideCont;
};


/**
* Resize the guide container everytime that the window is resized.
* 
*/
var ResizeGuideContainer = function () {
  var guideCont = BuildGuideContainer();
  guideCont.style.width = document.documentElement.clientWidth + "px";
  return guideCont;
};





/**
* VerticalGuide.
* 
*/
var VerticalGuide = function (options) {
  var guide;
  
  // default guide options
  this.defaults = {
    color: "#00FF00",
    opacity: 0.5
  };
  // we can override the default options
  this.options = this.defaults.merge(options);
  
  guide = document.createElement("div");

  // style it now
  guide.style.position =    "absolute";
  guide.style.height =      (document.documentElement.clientHeight > document.body.scrollHeight ? document.documentElement.clientHeight : document.body.scrollHeight) + "px";
  guide.style.top =         0;
  guide.style.width =       "1px";
  guide.style.borderLeft =  "1px solid " + this.options.color;
  guide.style.opacity =     this.options.opacity;
  guide.style.filter =      "alpha(opacity=" + this.options.opacity * 100 + ")";
  guide.className =         ReticulatorId;

  return guide;
};


/**
* Adding a vertical guide to the page.
* 
*/
var addVerticalGuide = function(options) {

  var guide = new VerticalGuide(options);
  guide.style.left = String(options.left).indexOf("%") !== -1 ? options.left : options.left + "px";
  document.body.appendChild(guide);
  
  return guide;
};


/**
* HorizontalGuide.
* 
*/
var HorizontalGuide = function (options) {
  var guide;
  
  // default guide options
  this.defaults = {
    color: "#00FF00",
    opacity: 0.5
  };
  // we can override the default options
  this.options = this.defaults.merge(options);
  
  guide = document.createElement("div");

  // style it now
  guide.style.position =    "absolute";
  guide.style.width =      (document.documentElement.clientWidth > document.body.scrollWidth ? document.documentElement.clientWidth : document.body.scrollWidth) + "px";
  guide.style.left =         0;
  guide.style.height =       "1px";
  guide.style.borderTop =  "1px solid " + this.options.color;
  guide.style.opacity =     this.options.opacity;
  guide.style.filter =      "alpha(opacity=" + this.options.opacity * 100 + ")";
  guide.className =         ReticulatorId;

  return guide;
};

/**
* Adding a horizontal guide to the page.
* 
*/
var addHorizontalGuide = function(options) {

  var guide = new HorizontalGuide(options);
  guide.style.top = String(options.top).indexOf("%") !== -1 ? options.top : options.top + "px";
  document.body.appendChild(guide);
  
  return guide;
};



/**
* Reticulator is an abstract base that contains the basics of the grid.
* @constructor
* 
*/
var Reticulator = function (options) {
  // default grid
  this.defaults = {
    width: 951,
    columns: 16, // => 0 if you want to create an empty base
    gutter: 9,
    offset: 0,
    align: "center",
    color: "#00FF00",
    opacity: 0.5
  };
  // overriding the default options
  this.options = this.defaults.merge(options);

  // here we go!
  this.buildGrid();
  
  ReticulatorGrids.push(this);
  
  // onresize behavior
  window.onresize = function(){
    var i = 0;
    ResizeGuideContainer();
    while (element = ReticulatorGrids[i++]) {
      element.alignGridLayout();
    }
  };
    
};

/**
* Method to build grid layout div.
* @returns the layout div
* 
*/
Reticulator.prototype.buildGridLayout = function () {
  var gridLayout;
  
  // here we go!
  gridLayout = document.createElement("div");
  
  // style this
  gridLayout.style.height =    "1px";
  gridLayout.style.width =     this.options.width + "px";
  gridLayout.style.position =  "absolute";
  gridLayout.style.margin =     "0 0 0 0";
  gridLayout.style.padding =    "0 0 0 0";
  gridLayout.style.textAlign =  "left";
    
  // send this to the container
  BuildGuideContainer().appendChild(gridLayout);        
  
  return gridLayout;
};


/**
* Align grid layout div.
* @returns the layout div
* 
*/
Reticulator.prototype.alignGridLayout = function () {
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
};

/**
* Adds an extra vertical guide to the basegrid
* 
*/
Reticulator.prototype.addVerticalGuide = function (left) {
  var guide = new VerticalGuide({
    color: this.options.color,
    opacity: this.options.opacity
  });
  
  guide.style.left = String(left).indexOf("%") !== -1 ? left : left + "px";
  
  this.basegrid.layout.appendChild(guide);
  
  return guide;
};


/**
* Adds an extra vertical guide to the basegrid
* 
*/
Reticulator.prototype.addHorizontalGuide = function (top) {
  var guide = new HorizontalGuide({
    color: this.options.color,
    opacity: this.options.opacity
  });
  
  guide.style.width = "100%"; // adjust the width to the grid
  guide.style.top = String(top).indexOf("%") !== -1 ? top : top + "px";

  this.basegrid.layout.appendChild(guide);
  
  return guide;
};


/**
* Hub function that calls all the grid things :)
* 
*/
Reticulator.prototype.buildGrid = function () {
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
      guide = new VerticalGuide({
        color: this.options.color,
        opacity: this.options.opacity
      });

      guide.style.left = cumulative + "px";

      this.basegrid.layout.appendChild(guide);

      if(i%2 === 0) {
        cumulative = cumulative + this.basegrid.cols;
      } else {
        cumulative = cumulative + this.options.gutter;
      } 
    }
  }
};


/**
* hide/show by g + r key combination
* 
*/
var reticulatorKey = {
  key: null
};
document.onkeydown = function(e){
  var key, keycode, guides, i, a;
  if (!e) {
    var e = window.event;
  }
  keycode = (IsExplorer() ? e.keyCode : e.which);
  key = String.fromCharCode(e.keyCode);
  if(reticulatorKey.key === null) {
    reticulatorKey.key = key;
  } else {
    if(reticulatorKey.key === "G" && key === "R") {
      if(document.getElementsByClassName) {
        guides = document.getElementsByClassName(ReticulatorId);
      } else {
        i = 0;
        a = document.getElementsByTagName("div");
        guides = [];
        while (element = a[i++]) {
          if (element.className === ReticulatorId) { guides.push(element) }
        }
      }
      for (i = 0; i < guides.length; i++) {
        guides[i].style.display = (guides[i].style.display === "none" ? "block" : "none");
      }
    }
  }
};

document.onkeyup = function(e){
  reticulatorKey.key = null;
};
