const { spawn, spawnSync, exec } = require('child_process');

var value = `
<root BTCPP_format='4'>
    <BehaviorTree ID='MainTree'>
        <Sequence>
            <!-- <navigate x='-5' y='-3' yaw='0'/> -->
            <dock value='1'/>
            <!-- <lift value='UP'/> -->
            <!-- <wait value='2'/> -->
            <dock value='-1'/>
            <!-- <lift value='DOWN'/> -->
        </Sequence>
    </BehaviorTree>
</root>
`;

const command = `ros2 run prototype_amr_web mission_executer --ros-args -p bt_content:="${value}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing the command: ${error}`);
    return;
  }

  // Output of the command
  console.log(`Command output:\n${stdout}`);
});
