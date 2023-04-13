const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function resizeImage() {
  // Read the input image file from disk
  const inputFilename = 'images/salon.jpg';
  const inputImage = await loadImage(inputFilename);

  // Create a canvas to draw the resized image on
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  // Resize the image to fit within a 400x400 square
  const { width, height } = inputImage;
  const aspectRatio = width / height;
  const targetWidth = Math.min(width, height, 400);
  const targetHeight = targetWidth / aspectRatio;
  ctx.drawImage(inputImage, 0, 0, targetWidth, targetHeight);

  // Convert the canvas to a buffer
  const outputBuffer = canvas.toBuffer('image/jpeg');

  // Write the resized image to disk
  const outputFilename = 'output.jpg';
  fs.writeFileSync(outputFilename, outputBuffer);
  console.log(`Resized image saved to ${outputFilename}`);
}

resizeImage().catch((err) => {
  console.error(err);
});
