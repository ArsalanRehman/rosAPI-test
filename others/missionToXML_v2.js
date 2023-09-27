// mission.pre('save', async function (next) {
//   try {
//     const missionData = this;
//     const data = missionData.mission;
//     // console.log(data);
//     const writer = new XMLWriter({ indent: '  ' });
//     writer.startDocument();

//     // Start root element
//     writer.startElement('root');
//     writer.writeAttribute('BTCPP_format', '4');

//     // Start BehaviorTree element
//     writer.startElement('BehaviorTree');
//     writer.writeAttribute('ID', 'MainTree');
//     writer.startElement('Sequence');
//     // Extract type and selectedOption values
//     const typeList = [];
//     const selectedOptionList = [];
//     const navigateIds = []; // To store the selectedOptionList values for 'navigate' type

//     Object.values(data).forEach((value) => {
//       value.forEach((item) => {
//         typeList.push(item.type);
//         selectedOptionList.push(item.selectedOption);
//         if (item.type === 'Navigate') {
//           navigateIds.push(item.selectedOption);
//         }
//       });
//     });

//     // Fetch the required data from positionModel.Position in one go
//     const locations = await positionModel.Position.find(
//       { _id: { $in: navigateIds } },
//       { x: 1, y: 1, rotation: 1 }
//     );

//     await Promise.all(
//       typeList.map(async (typeValue, index) => {
//         if (typeValue === 'Navigate') {
//           writer.startElement('ReactiveFallback');
//           writer.startElement('Navigate');
//           // console.log(writer.startElement);
//           const location = locations.find(
//             (location) =>
//               location._id.toString() === selectedOptionList[index].toString()
//           );
//           if (location) {
//             const { x, y, rotation } = location;
//             writer.writeAttribute('x', Number(x));
//             writer.writeAttribute('y', Number(y));
//             writer.writeAttribute('rotation', Number(rotation));
//           } else {
//             // Handle the case if the location is not found
//             writer.writeAttribute('x', 0);
//             writer.writeAttribute('y', 0);
//             writer.writeAttribute('rotation', 0);
//           }
//           writer.startElement('Sequence');
//           writer.startElement('SafeZone');
//           writer.startElement('Navigate');
//           writer.endElement('Sequence');
//           writer.startElement('Alert');
//           writer.endElement('ReactiveFallback');
//         }
//         writer.startElement(typeValue);
//         if (typeValue === 'Navigate') {
//         } else {
//           writer.writeAttribute('value', selectedOptionList[index]);
//         }
//         writer.endElement();
//       })
//     );

//     // End Sequence element
//     writer.endElement();

//     // End BehaviorTree element
//     writer.endElement();

//     // End root element
//     writer.endElement();

//     const xmlString = writer.toString();

//     // Set the XML property
//     missionData.xml = xmlString;
//     // console.log(missionData.xml);

//     next();
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });
