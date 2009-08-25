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
* Reticulator is an abstract base that contains the basics of the grid.
* @constructor
* 
*/
var Reticulator = function(options) {
    // default grid
    this.defaults = {
        width: 951,
        columns: 16, // => 0 if you want to create an empty base
        gutter: 9,
        align: "center",
        color: "#00FF00",
        opacity: 0.7,
    };
    // overriding the default options
    this.options = this.defaults.merge(options);
        
    // here we go!
    this.buildGrid();
}

/**
* Method to build grid.
* @returns the built object
* 
*/
Reticulator.prototype.buildGrid = function() {
    // basegrid basics
    this.basegrid = {
        cont: new buildGuideContainer(),
        cols: this.options.columns == 0 ? 0 : ( ( this.options.width - ( ( this.options.columns - 1 ) * this.options.gutter ) ) / this.options.columns )
    }
}

/**
* Building an standard container for all the grids and guides.
* @constructor
* 
*/
var buildGuideContainer = function(){
    var guideCont = document.createElement("div");
    // style it now
    guideCont.style.height =    "10px";
    guideCont.style.width =     (isExplorer() ? document.body.offsetWidth : window.innerWidth) + "px";
    guideCont.style.position =  "absolute";
    guideCont.style.background = "red";
    guideCont.style.top =       0;
    guideCont.style.left =      0;

    document.body.appendChild(guideCont);
} 

/**
* Are we in explorer?
* @constructor
* 
*/
var isExplorer = function() {
    return (navigator.userAgent.indexOf('MSIE') !=-1)
}

/**
* vGuide.
* @constructor
* 
*/
var vGuide = function(options) {
    // default guide options
    this.defaults = {
    };
    // we can override the default options
    this.options = this.defaults.merge(options);    
}


/**
* hGuide.
* @constructor
* 
*/
var hGuide = function(options) {
    // default guide options
    this.defaults = {
    };
    // we can override the default options
    this.options = this.defaults.merge(options);    
}

/**
* @description merge objects prototype
*
*/
Object.prototype.merge = (function (ob) {var o = this;var i = 0;for (var z in ob) {if (ob.hasOwnProperty(z)) {o[z] = ob[z];}}return o;})
