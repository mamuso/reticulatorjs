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
var ReticulatorId = "ReticulatorCont" + String((new Date()).getTime()).replace(/\D/gi, '');


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
* @constructor
* 
*/
var VerticalGuide = function (options) {
  var guide;
  
  // default guide options
  this.defaults = {
    color: "#00FF00",
    opacity: 0.7
  };
  // we can override the default options
  this.options = this.defaults.merge(options);
  
  guide = document.createElement("div");

  // style it now
  guide.style.position =    "absolute";
  guide.style.height =      (document.documentElement.clientHeight > document.body.scrollHeight ? document.documentElement.clientHeight : document.body.scrollHeight) + "px";
  guide.style.width =       "1px";
  guide.style.borderLeft =  "1px solid " + this.options.color;
  guide.style.opacity =     this.options.opacity;
  guide.style.filter =      "alpha(opacity=" + this.options.opacity * 100 + ")";

  return guide;
};


/**
* HorizontalGuide.
* @constructor
* 
*/
var HorizontalGuide = function (options) {
  var guide;
  
  // default guide options
  this.defaults = {
    color: "#00FF00",
    opacity: 0.7
  };
  // we can override the default options
  this.options = this.defaults.merge(options);
  
  guide = document.createElement("div");

  // style it now
  guide.style.position =    "absolute";
  guide.style.width =      (document.documentElement.clientWidth > document.body.scrollWidth ? document.documentElement.clientWidth : document.body.scrollWidth) + "px";
  guide.style.height =       "1px";
  guide.style.borderTop =  "1px solid " + this.options.color;
  guide.style.opacity =     this.options.opacity;
  guide.style.filter =      "alpha(opacity=" + this.options.opacity * 100 + ")";

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
    align: "center",
    color: "#00FF00",
    opacity: 0.7
  };
  // overriding the default options
  this.options = this.defaults.merge(options);

  // here we go!
  this.buildGrid();
  
  
  // onresize behavior
  window.onresize = function(){
    ResizeGuideContainer();
  };
};

/**
* Method to build grid layout div.
* @returns the layout div
* 
*/
Reticulator.prototype.buildGridLayout = function () {
  var margins, gridLayout;
  // aling this mess
  margins = "0px auto"; // center by default
  switch (this.options.align) {
    case "left":
      margins = "0px";
      break;
    case "right":
      margins = "0px 0px 0px auto";
      break;
  }

  // here we go!
  gridLayout = document.createElement("div");
  
  // style this
  gridLayout.style.height =    "1px";
  gridLayout.style.width =     this.options.width + "px";
  gridLayout.style.position =  "relative";
  gridLayout.style.margin =     margins;
  gridLayout.style.padding =    "0 0 0 0";
  gridLayout.style.textAlign =  "left";
    
  // send this to the container
  BuildGuideContainer().appendChild(gridLayout);        
  
  return gridLayout;
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
  
  guide.style.left = String(left).indexOf("%") != -1 ? left : left + "px";
  
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
  guide.style.top = String(top).indexOf("%") != -1 ? top : top + "px";

  this.basegrid.layout.appendChild(guide);
  
  return guide;
};


/**
* Hub function that calls all the grid things :)
* 
*/
Reticulator.prototype.buildGrid = function () {
  var i, cumulative;

  // basegrid basic settings all together in this map
  this.basegrid = {
    layout: this.buildGridLayout(), // layout object
    guides: (this.options.gutter === 0 ? this.options.columns : this.options.columns * 2), // number of guides that we need to draw
    cols: this.options.columns === 0 ? 0 : ((this.options.width - ((this.options.columns - 1) * this.options.gutter)) / this.options.columns) // width for every column
  };
    
  if (this.options.columns !== 0) {
    cumulative = 0;
    
    // put your guide here 
    for (i = 0; i < this.basegrid.guides; i++) {
      // vertical guides here
      var guide = new VerticalGuide({
        color: this.options.color,
        opacity: this.options.opacity
      });
      
      guide.style.left = cumulative + "px";
      
      this.basegrid.layout.appendChild(guide);
      
      if(i%2 == 0) cumulative = cumulative + this.basegrid.cols;
      else cumulative = cumulative + this.options.gutter;
      
    }
  }
};

