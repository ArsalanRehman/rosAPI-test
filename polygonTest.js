const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const sizeOf = require('image-size');

const filename = 'images/map.jpg';
const outputFilename = 'images/polygon.jpg';

// Define the coordinates of the polygon vertices
// const polygon = [
//   [269.375, -521.8671875],
//   [672.375, -517.8671875],
//   [675.375, -190.8671875],
//   [209.375, -177.8671875],
// ];

// Read the file into a buffer
const buffer = fs.readFileSync(filename);

// Get the dimensions of the image from the buffer
const { width, height } = sizeOf(buffer);
// console.log({ width, height });

console.log(`${width} ${height}`);

const centerX = width / 2; // x-coordinate of the center of the image
const centerY = height / 2; // y-coordinate of the center of the image

// const polygon = [
//   [10, 10],
//   [100, 10],
//   [100, 100],
//   [10, 100],
// ];

// const polygon = [
//   [10 - centerX, 10 - centerY], // top-left vertex
//   [100 - centerX, 10 - centerY], // top-right vertex
//   [100 - centerX, 100 - centerY], // bottom-right vertex
//   [10 - centerX, 100 - centerY], // bottom-left vertex
// ];
const polygon = [
  [151, 151], // top-left vertex
  [251, 151], // top-right vertex
  [251, 251], // bottom-right vertex
  [151, 251], // bottom-left vertex
];

// Load the image
loadImage(filename)
  .then((image) => {
    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Draw the polygon on the canvas
    ctx.beginPath();
    ctx.moveTo(polygon[0][0], polygon[0][1]);
    for (let i = 1; i < polygon.length; i++) {
      ctx.lineTo(polygon[i][0], polygon[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fill();

    // Save the canvas to a file
    const out = fs.createWriteStream(outputFilename);
    const stream = canvas.createJPEGStream({ quality: 0.95 });
    stream.pipe(out);
    out.on('finish', () => console.log('Polygon drawn successfully'));
  })
  .catch((err) => console.error(err));
