var XMLWriter = require('xml-writer');
mission.pre('save', async function (next) {
  try {
    const missionData = this;
    const data = missionData.mission;
    console.log(data);
    const writer = new XMLWriter({ indent: '  ' });

    // Start root element
    writer.startElement('root');
    writer.writeAttribute('BTCPP_format', '4');

    // Start BehaviorTree element
    writer.startElement('BehaviorTree');
    writer.writeAttribute('ID', 'MainTree');
    writer.startElement('Sequence');
    // Extract type and selectedOption values
    const typeList = [];
    const selectedOptionList = [];
    Object.values(data).forEach((value) => {
      console.log('Value:', value);
      value.forEach((item) => {
        typeList.push(item.type);
        selectedOptionList.push(item.selectedOption);
      });
    });

    typeList.forEach((typeValue, index) => {
      writer.startElement(typeValue);
      if (selectedOptionList[index]) {
        writer.writeAttribute('value', selectedOptionList[index]);
      }
      writer.endElement();
    });
    // End Sequence element
    writer.endElement();

    // End BehaviorTree element
    writer.endElement();

    // End root element
    writer.endElement();

    const xmlString = writer.toString();

    // Set the XML property
    missionData.xml = xmlString;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});
