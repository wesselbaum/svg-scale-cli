# svg-scale-cli

Scales SVGs by a factor or by desired width

## Call
`svg-scale <path_to_input_svg> [options...]`

## Options

`scale`: Factor by which the SVG should be scaled

`width`: Desired width of the SVG. Overwrites `scale`

`precision`: Precision of the path parameters. 2 = 1.23456789 >>> 1.23

`output`: Output file. If not specified the file content will be output in the console.
 

## Limitations
Works for Paths in SVGs only

