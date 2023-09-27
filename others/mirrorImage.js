const Jimp = require('jimp');

// Input and output file paths
const inputFile = 'images/1.jpeg'; // Replace with your input image file
const outputFile = 'mirrored.jpeg'; // Replace with the desired output file

// Open the input image
Jimp.read(inputFile)
  .then((image) => {
    // Clone the original image
    const mirroredImage = image.clone();

    // Mirror the cloned image vertically
    mirroredImage.mirror(false, true);

    // Save the mirrored image
    return mirroredImage.writeAsync(outputFile);
  })
  .then(() => {
    console.log('Image mirrored vertically successfully!');
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
