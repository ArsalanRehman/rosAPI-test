const rosnodejs = require('rosnodejs');
rosnodejs.initNode('/ArslanNode')
    .then(() => {
        const nh = rosnodejs.nh;
        const sub = nh.subscribe('/arslanTopic', 'std_msgs/String', (msg) => {
            console.log('Got msg on chatter: %j', msg);
        });
        
        const pub = nh.advertise('/arslanTopic', 'std_msgs/String');
        setTimeout(function() {
            pub.publish({ data: "test epik robotik" });
          }, 1000);
        

    });