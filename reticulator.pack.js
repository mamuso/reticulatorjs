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
Object.prototype.merge=function(b){var a,d,c;a=this;d=0;for(c in b){if(b.hasOwnProperty(c)){a[c]=b[c]}}return a};var ReticulatorId="ReticulatorCont"+String((new Date()).getTime()).replace(/\D/gi,'');var IsExplorer=function(){return(navigator.userAgent.indexOf('MSIE')!==-1)};var BuildGuideContainer=function(){var b=document.getElementById(ReticulatorId);if(b===null){b=document.createElement("div");b.id=ReticulatorId;b.style.height="1px";b.style.width=document.documentElement.clientWidth+"px";b.style.padding="0 0 0 0";b.style.margin="0 0 0 0";b.style.position="absolute";b.style.top=0;b.style.left=0;document.body.appendChild(b)}return b};var ResizeGuideContainer=function(){var b=BuildGuideContainer();b.style.width=document.documentElement.clientWidth+"px";return b};var VerticalGuide=function(b){var a;this.defaults={color:"#00FF00",opacity:0.7};this.options=this.defaults.merge(b);a=document.createElement("div");a.style.position="absolute";a.style.height=(document.documentElement.clientHeight>document.body.scrollHeight?document.documentElement.clientHeight:document.body.scrollHeight)+"px";a.style.top=0;a.style.width="1px";a.style.borderLeft="1px solid "+this.options.color;a.style.opacity=this.options.opacity;a.style.filter="alpha(opacity="+this.options.opacity*100+")";a.className=ReticulatorId;return a};var addVerticalGuide=function(b){var a=new VerticalGuide(b);a.style.left=String(b.left).indexOf("%")!==-1?b.left:b.left+"px";document.body.appendChild(a);return a};var HorizontalGuide=function(b){var a;this.defaults={color:"#00FF00",opacity:0.7};this.options=this.defaults.merge(b);a=document.createElement("div");a.style.position="absolute";a.style.width=(document.documentElement.clientWidth>document.body.scrollWidth?document.documentElement.clientWidth:document.body.scrollWidth)+"px";a.style.left=0;a.style.height="1px";a.style.borderTop="1px solid "+this.options.color;a.style.opacity=this.options.opacity;a.style.filter="alpha(opacity="+this.options.opacity*100+")";a.className=ReticulatorId;return a};var addHorizontalGuide=function(b){var a=new HorizontalGuide(b);a.style.top=String(b.top).indexOf("%")!==-1?b.top:b.top+"px";document.body.appendChild(a);return a};var Reticulator=function(b){this.defaults={width:951,columns:16,gutter:9,align:"center",color:"#00FF00",opacity:0.7};this.options=this.defaults.merge(b);this.buildGrid();window.onresize=function(){ResizeGuideContainer()}};Reticulator.prototype.buildGridLayout=function(){var b,a;b="0px auto";switch(this.options.align){case"left":b="0px";break;case"right":b="0px 0px 0px auto";break}a=document.createElement("div");a.style.height="1px";a.style.width=this.options.width+"px";a.style.position="relative";a.style.margin=b;a.style.padding="0 0 0 0";a.style.textAlign="left";BuildGuideContainer().appendChild(a);return a};Reticulator.prototype.addVerticalGuide=function(b){var a=new VerticalGuide({color:this.options.color,opacity:this.options.opacity});a.style.left=String(b).indexOf("%")!==-1?b:b+"px";this.basegrid.layout.appendChild(a);return a};Reticulator.prototype.addHorizontalGuide=function(b){var a=new HorizontalGuide({color:this.options.color,opacity:this.options.opacity});a.style.width="100%";a.style.top=String(b).indexOf("%")!==-1?b:b+"px";this.basegrid.layout.appendChild(a);return a};Reticulator.prototype.buildGrid=function(){var b,a,d;this.basegrid={layout:this.buildGridLayout(),guides:(this.options.gutter===0?this.options.columns:this.options.columns*2),cols:this.options.columns===0?0:((this.options.width-((this.options.columns-1)*this.options.gutter))/this.options.columns)};if(this.options.columns!==0){a=0;for(b=0;b<this.basegrid.guides;b++){d=new VerticalGuide({color:this.options.color,opacity:this.options.opacity});d.style.left=a+"px";this.basegrid.layout.appendChild(d);if(b%2===0){a=a+this.basegrid.cols}else{a=a+this.options.gutter}}}};var reticulatorKey={};document.onkeydown=function(b){var a,d,c,e;if(!b){var b=window.event}d=(IsExplorer()?b.keyCode:b.which);a=String.fromCharCode(b.keyCode);if(reticulatorKey.key===null){reticulatorKey.key=a}else{if(reticulatorKey.key==="G"&&a==="R"){c=document.getElementsByClassName(ReticulatorId);for(e=0;e<c.length;e++){c[e].style.display=(c[e].style.display==="none"?"block":"none")}}}};document.onkeyup=function(b){reticulatorKey.key=null};
