const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const filename = 'images/map.jpg';
const outputFilename = 'images/polygon.jpg';

// Define the coordinates of the polygon vertices
const polygon = [
  [269.375, -521.8671875],
  [672.375, -517.8671875],
  [675.375, -190.8671875],
  [209.375, -177.8671875],
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
