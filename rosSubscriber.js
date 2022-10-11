const rosnodejs = require('rosnodejs');
rosnodejs.initNode('/arslanNode')

        .then(() => {
        const nh = rosnodejs.nh;
        const pub = nh.advertise('/cmd_vel', 'geometry_msgs/Twist');
        // while(true){
        setTimeout(function () {
            pub.publish({
                linear: {
                    x: 80,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 80,
                }
            }
            );
        }, 1000);
    // }
        console.log(pub)
    });

