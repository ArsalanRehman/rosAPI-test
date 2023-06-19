const writeFileAsync = util.promisify(fs.writeFile);

exports.mapConvert = async (req, res) => {
  try {
    // getMap();
    const base64Data = req.body.imageBase64.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );
    const mapWidth = req.body.width;
    const mapHeight = req.body.height;
    var imageType = req.body.imageBase64.match(
      /^data:image\/([a-z]+);base64,/
    )[1];
    if (!imageType) {
      imageType = 'png';
    }
    const filePath = `./images/convertedImage.${imageType}`;

    await writeFileAsync(filePath, base64Data, 'base64');

    //resize the image pixels

    await Jimp.read(filePath)
      .then((inputImage) => {
        // Resize the image to fit within a 400x400 square using Jimp
        inputImage.cover(mapWidth, mapHeight);

        // Write the resized image to disk
        const outputFilename = `images/convertedImage.${imageType}`;
        inputImage.write(outputFilename);
        console.log(`Resized image saved to ${outputFilename}`);
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(200).send({ message: 'Image saved successfully' });
    // console.log('timer 1');
    setTimeout(async () => {
      transferMapToROS();
    }, 1000);
    // console.log('timer 2');

    mapState = 'Map Cropped';
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
