const sharp = require('sharp');
const fs = require('fs');

// Read the input image file from disk
const inputFilename = 'images/salon.jpg';
const inputImage = fs.readFileSync(inputFilename);

// Resize the image to fit within a 400x400 square using Sharp
sharp(inputImage)
  .resize({ width: 400, height: 400, fit: 'inside' })
  .toBuffer()
  .then((outputBuffer) => {
    // Write the resized image to disk
    const outputFilename = 'output.jpg';
    fs.writeFileSync(outputFilename, outputBuffer);
    console.log(`Resized image saved to ${outputFilename}`);
  })
  .catch((err) => {
    console.error(err);
  });
