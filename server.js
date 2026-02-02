const { spawn } = require('child_process');
let server;

// Function to start the crash server
function startCrashServer() {
    server = spawn('node', ['server.js'], { stdio: 'inherit' });
}

// Function to start the server
function startServer() {
    // Start the server process
    server = spawn('node', ['index.js'], { stdio: 'inherit' });
    server.on('exit', (code) => {
        console.log(`Server exited with code ${code}. Restarting...`);
        server.kill();
        startCrashServer(); // Restart the server on exit
    });
}

// Start the server initially
startServer();
