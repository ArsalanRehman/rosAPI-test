// exports.drawPolygon = async () => {
//   try {
//     const mapVertices = await MapModel.find();
//     console.log(mapVertices[1].vertices);

//     const filename = path.join(mapPath, 'map.jpeg');
//     const outputFilename = path.join(mapPath, `map.jpeg`);
//     // Read the file into a buffer
//     const buffer = fs.readFileSync(filename);
//     // Get the dimensions of the image from the buffer
//     const { width, height } = sizeOf(buffer);
//     //this is how polygon array should look like

//     // Define the coordinates of the polygon vertices
//     // const polygon = [
//     //   [100, -300],
//     //   [300, -300],
//     //   [300, -100],
//     //   [100, -100],
//     // ];
//     // console.log(`polygone ${polygon}`);
//     for (let i = 0; i < polygon.length; i++) {
//       const y = polygon[i][1]; // get the y-coordinate
//       const newY = height - Math.abs(y); // calculate the new y-coordinate using the formula
//       polygon[i][1] = newY; // update the y-coordinate of the polygon with the new value
//     }
//     console.log(`second ${polygon}`);

//     // Load the image
//     loadImage(filename)
//       .then((image) => {
//         // Create a canvas with the same dimensions as the image
//         const canvas = createCanvas(image.width, image.height);
//         const ctx = canvas.getContext('2d');

//         // Draw the image on the canvas
//         ctx.drawImage(image, 0, 0, image.width, image.height);

//         // Draw the polygon on the canvas
//         ctx.beginPath();
//         ctx.moveTo(polygon[0][0], polygon[0][1]);
//         for (let i = 1; i < polygon.length; i++) {
//           ctx.lineTo(polygon[i][0], polygon[i][1]);
//         }
//         ctx.closePath();
//         ctx.fillStyle = '#0000FF';
//         ctx.fill();

//         // Save the canvas to a file
//         const out = fs.createWriteStream(outputFilename);
//         const stream = canvas.createJPEGStream({ quality: 0.95 });
//         stream.pipe(out);
//         out.on('finish', () => console.log('Polygon drawn successfully'));
//         res.status(200).json({
//           success: true,
//           message: 'Polygon drawn successfully',
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         // res.status(500).json({
//         //   err,
//         // });
//       });
//   } catch (err) {
//     console.log(err);
//     // res.status(500).json({
//     //   success: false,
//     //   message: 'failed while drawing polygone on map',
//     //   err,
//     // });
//   }
// };

/////////////////////////////  PART 2  ///////////////////////////////

// exports.drawPolygons = async () => {
//   try {
//     const mapVertices = await MapModel.find();
//     const filename = path.join(mapPath, 'map.jpeg');

//     // Read the file into a buffer
//     const buffer = fs.readFileSync(filename);
//     // Get the dimensions of the image from the buffer
//     const { width, height } = sizeOf(buffer);

//     // Iterate through each zone in mapVertices
//     for (const zone of mapVertices) {
//       // Extract vertices and colorHex for the current zone
//       const { vertices, colorHex, zoneName } = zone;
//       console.log(zone);

//       // Apply the transformation to the polygon coordinates
//       for (let i = 0; i < vertices.length; i++) {
//         const y = vertices[i][1];
//         const newY = height - Math.abs(y);
//         vertices[i][1] = newY;
//       }

//       // Load the image
//       const image = await loadImage(filename);

//       // Create a canvas with the same dimensions as the image
//       const canvas = createCanvas(image.width, image.height);
//       const ctx = canvas.getContext('2d');

//       // Draw the image on the canvas
//       ctx.drawImage(image, 0, 0, image.width, image.height);

//       // Draw the current polygon on the canvas
//       ctx.beginPath();
//       ctx.moveTo(vertices[0][0], vertices[0][1]);
//       for (let i = 1; i < vertices.length; i++) {
//         ctx.lineTo(vertices[i][0], vertices[i][1]);
//       }
//       ctx.closePath();
//       ctx.fillStyle = colorHex;
//       ctx.fill();

//       // Save the canvas to a file with a unique name based on zoneName
//       const outputFilename = path.join(mapPath, `${zoneName}.jpeg`);
//       const out = fs.createWriteStream(outputFilename);
//       const stream = canvas.createJPEGStream({ quality: 0.95 });
//       await new Promise((resolve, reject) => {
//         stream.pipe(out);
//         out.on('finish', () => {
//           console.log(`Polygon for ${zoneName} drawn successfully`);
//           resolve();
//         });
//         out.on('error', (err) => {
//           console.error(err);
//           reject(err);
//         });
//       });
//     }

//     // Send a success response after drawing all polygons
//   } catch (err) {
//     console.error(err);
//   }
// };
