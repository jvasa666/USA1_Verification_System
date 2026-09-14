const { spawn } = require('child_process');
const ls = spawn('node', ['scale_cluster.js']);

ls.stdout.on('data', (data) => {
    console.log(`[CLUSTER OUTPUT]: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`[CLUSTER ERROR]: ${data}`);
});

ls.on('close', (code) => {
    console.log(`Cluster process exited with code ${code}`);
    const execSync = require('child_process').execSync;
    execSync('git add scale_cluster.js && git commit -m "feat: execute 10 million transaction cluster scale runner for CAGE 17ZE9" && git push origin main', { stdio: 'inherit' });
});
