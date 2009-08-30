# reticulator.js

Sometimes your design don't fit in the pre-built grid and framework systems. Sometimes you want to code all your html and css stuff and you just need some guides to fit all the design details. Then probably you want to get a try.

Reticulator.js is a light javascript library that allows you to build grids or simple vertical / horizontal guides over your rendered html. It's just like fireworks/photoshop guides.
 
 - Use multiple grids at the same time.
 - Use individual horizontal or vertical guides.
 - Toggle visibility with g+r key combination.
  
This library takes its name from the fancy <a href="http://sofanaranja.com/reticulator/">Fireworks extenison</a>, that now is part of <a href="http://bomberstudios.com/orangecommands">OrangeCommands</a>. 

Tested successfully in the following browsers:

  - Firefox 3+
  - Internet Explorer 6+
  - Safari 3+
  - Opera 9+
  
In a near future I must finish my unit tests for this library.



  
## usage and configuration

You need to include reticulator.js in your html file.

To get the default grid (951/16/9) just write:
 
    var grid = new Reticulator();


Customize your grid using the following options:


<table border="0" cellspacing="0" cellpadding="0">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>align</td>
      <td><span>String</span></td>
      <td>"center"</td>
      <td>Align your grid at left, right or center.</td>
    </tr>
    <tr>
      <td>width</td>
      <td><span>Number</span></td>
      <td>951</td>
      <td>Is the width of the base.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td><span>Number</span></td>
      <td>0</td>
      <td>This offset is applied to the grid base.</td>
    </tr>
    <tr>
      <td>columns</td>
      <td><span>Number</span></td>
      <td>16</td>
      <td>Setting colums to 0 you obtain an empty base to add individual guides manually.</td>
    </tr>
    <tr>
      <td>gutter</td>
      <td><span>Number</span></td>
      <td>9</td>
      <td>Separation between columns.</td>
    </tr>
    <tr>
      <td>color</td>
      <td><span>String</span></td>
      <td>"#00FF00"</td>
      <td>Colour of the guides in the grid.</td>
    </tr>
    <tr>
      <td>opacity</td>
      <td><span>Number</span></td>
      <td>0.5</td>
      <td>Just opacity :)</td>
    </tr>
    <tr>
      <td>zindex</td>
      <td><span>Number</span></td>
      <td>9000000</td>
      <td>Use a negative value if you want to use the grid under your design</td>
    </tr>
  </tbody>
</table>


Then, if you want a red grid with 10 columns and 1000px width, write:


    var grid = new Reticulator({
      width: 1000,
      columns: 10,
      color: "red"
    });


Add extra guides to your grid:

    var grid = new Reticulator();
  
    // add a vertical guide
    grid.addVerticalGuide(50);
  
    // add an horizontal guide
    grid.addHorizontalGuide(50);

You can forget the basegrid and add individual guides. For vertical guides:

    addVerticalGuide({
      color: "#00FF00",
      opacity: 0.5,
      left: 100
    });


<table border="0" cellspacing="0" cellpadding="0">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>color</td>
      <td><span>String</span></td>
      <td>"#00FF00"</td>
      <td>Colour of the guides in the grid.</td>
    </tr>
    <tr>
      <td>opacity</td>
      <td><span>Number</span></td>
      <td>0.5</td>
      <td>Just opacity :)</td>
    </tr>
    <tr>
      <td>left</td>
      <td><span>Number</span></td>
      <td>0</td>
      <td>Distance between the guide and the left of the page.</td>
    </tr>
  </tbody>
</table>

For horizontal guides:

    addHorizontalGuide({
      color: "#00FF00",
      opacity: 0.5,
      top: 100
    });


<table border="0" cellspacing="0" cellpadding="0">
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>color</td>
      <td><span>String</span></td>
      <td>"#00FF00"</td>
      <td>Colour of the guides in the grid.</td>
    </tr>
    <tr>
      <td>opacity</td>
      <td><span>Number</span></td>
      <td>0.5</td>
      <td>Just opacity :)</td>
    </tr>
    <tr>
      <td>top</td>
      <td><span>Number</span></td>
      <td>0</td>
      <td>Distance between the guide and the top of the page.</td>
    </tr>
  </tbody>
</table>

Anyway you can use the bookmarklet :)

## examples


Let's see:


  - <a href="http://reticulatorjs.mamuso.net/example_simplegrid">Simple grid</a>
  - <a href="http://reticulatorjs.mamuso.net/example_customgrid_extraguides">Custom grid adding extra guides</a>
  - <a href="http://reticulatorjs.mamuso.net/example_twogrids">Two grids</a>
  - <a href="http://reticulatorjs.mamuso.net/example_emptygrid">Empty grid adding extra guides</a>
  - <a href="http://reticulatorjs.mamuso.net/example_horizontal">Only a horizontal guide</a>
  - <a href="http://reticulatorjs.mamuso.net/example_vertical">Only a vertical guide</a>


## download

Download reticulator.js <a href="http://github.com/mamuso/reticulatorjs/zipball/master">in a zip file</a> with examples or grab the code from <a href="https://github.com/mamuso/reticulatorjs/tree/master">github</a>.


## support

Nobody is perfect :) If you find problems with reticulator you can <a href="http://github.com/mamuso/reticulatorjs/issues">post an issue</a> here and I'll try to solve it as soon as possible.

I also accept that my english is not as good as it should be :) if you find any mistake in this text let me know!
