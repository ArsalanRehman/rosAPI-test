exports.mapConvert = async (req, res) => {
  try {
    const base64Data = req.body.imageBase64.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );
    // console.log('endpoint triggered');

    // const imageType = 'png';
    const imageType = req.body.imageBase64.match(
      /^data:image\/([a-z]+);base64,/
    )[1];
    const filePath = `./images/convertedImage.${imageType}`;

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        return res.status(500).send({ error: err });
      }

      res.status(200).send({ message: 'Image saved successfully' });
    });
    // spawnSync('sleep', ['3'], {
    //   shell: true,
    // });
    setTimeout(async () => {
      // Read the PNG image from file
      sharp('images/convertedImage.png')
        .grayscale()
        .raw()
        .toBuffer((err, data, info) => {
          if (err) throw err;

          // Create a new PGM image with the same dimensions
          const pgm = `P5\n${info.width} ${info.height}\n255\n`;

          // Write the PGM image to file
          const stream = fs.createWriteStream('images/my_map.pgm');
          stream.write(pgm);
          stream.write(data);
          stream.end();
        });
      spawn(
        'cp',
        [
          '-r',
          `${process.env.MAP_IMAGE_PATH}my_map.pgm`,
          process.env.MAP_DESTINATION,
        ],
        {
          shell: true,
        }
      );

      const output = spawnSync('rosnode', ['list']);
      const nodes = output.stdout.toString().split('\n');
      // console.log(nodes);
      const nodesToKill = nodes.filter((node) =>
        node.startsWith('/map_server')
      );
      console.log(nodesToKill);
      if (nodesToKill.length) {
        spawn('rosnode', ['kill', ...nodesToKill]);
      } // cp -r /home/kali/catkin_ws/src/js_pkg/images/convertedImage.png /home/kali/catkin_ws/src/mir_robot/mir_gazebo/maps/
      await spawn('xterm', [
        '-e',
        'rosrun',
        'map_server',
        'map_server',
        process.env.MAP_YAML_PATH,
      ]);
    }, 4000);
    mapState = 'Map Converted';
  } catch (err) {
    res.status(500).send({ message: err });
    console.log(err);
  }
};
