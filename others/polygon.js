const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function drawPolygonOnImage(imagePath, polygonCoordinates, outputPath) {
  try {
    // Load the image
    const image = await loadImage(imagePath);

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Draw the polygon on the canvas
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red with 50% opacity
    ctx.beginPath();

    for (const point of polygonCoordinates) {
      const [x, y] = point;
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();

    // Save the canvas as an image
    const output = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(output);

    output.on('finish', () => {
      console.log('Polygon drawn on image and saved to', outputPath);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
const imagePath = 'images/1.jpeg';
const outputPath = 'images/2.jpeg';
const polygonCoordinates = [
  [20.002500085160136, -11.484375048894435],
  [24.83250010572374, -6.479375027585775],
  [30.71250013075769, -11.764375050086528],
];

drawPolygonOnImage(imagePath, polygonCoordinates, outputPath);
