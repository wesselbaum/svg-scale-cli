#!/usr/bin/env node

const argv = require('yargs').argv;
const fs = require('fs');
const svgPath = require('svgpath');
const XML = require('xml-artist');

if (argv.v) {
  console.log(JSON.parse(fs.readFileSync('./package.json')));
  return;
}

const data = XML.parseFile(argv._[0]);
const svg = data.find('svg');
const precision = argv.precision ? argv.precision : 6;
const width = argv.width ? argv.width : null;

let scale = argv.scale ? argv.scale : 1;


if (width) {
  const viewBox = svg.attributes.viewBox;
  let viewBoxWidth;
  if (viewBox) {
    viewBoxWidth = viewBox.split(' ')[2];
  }
  let currentWidth = svg.attributes.width ? svg.attributes.width : viewBoxWidth;
  console.log(`current width: ${currentWidth}`);
  if (currentWidth) {
    scale = width / currentWidth;
  }
}


if (svg.attributes.width) {
  svg.attributes.width = (Math.round(svg.attributes.width * scale)).toString().trim();
}

if (svg.attributes.height) {
  svg.attributes.height = (Math.round(svg.attributes.height * scale)).toString().trim();
}

if (svg.attributes.viewBox) {
  let viewBox = svg.attributes.viewBox;
  let viewBoxProperties = viewBox.split(' ');

  viewBoxProperties.forEach((viewBoxProperty, index) => {
    viewBoxProperties[index] = (Math.round(viewBoxProperty * scale)).toString().trim();
  });

  viewBox = viewBoxProperties.join(' ');

  svg.attributes.viewBox = viewBox;
}


for (const node of data.findAll('path')) {
  const path = node.attributes.d;
  node.attributes.d = svgPath(path).scale(scale).round(precision).toString();
}

if (argv.output) {
  data.toXmlFile(argv.output)
} else {
  console.log(data.toXml());
}


