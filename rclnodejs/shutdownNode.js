const { spawn } = require('child_process');

function shutdownNode(node) {
  return new Promise((resolve, reject) => {
    try {
      const process = spawn('ros2', [
        'lifecycle',
        'set',
        '--no-daemon',
        node,
        'shutdown',
      ]);
      process.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Failed to shutdown node ${node} with exit code ${code}`)
          );
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { shutdownNode };

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message,
  });
}

module.exports = errorHandler;

const { shutdownNode } = require('./nodeKiller');

exports.liveMap = async (req, res, next) => {
  try {
    // Your code here

    await shutdownNode(process.env.LIVE_MAP);
  } catch (error) {
    next(error);
  }
};
