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
* development purposes.
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
        opacity: 0.7
    };
    // we can override the default options
    this.options = this.defaults.merge(options);
    
    // defining the basegrid
    this.grid = {
        gridCont: '',
        gridCols: this.options.columns == 0 ? 0 : ( ( this.options.width - ( ( this.options.columns - 1 ) * this.options.gutter ) ) / this.options.columns )
    }
    
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
