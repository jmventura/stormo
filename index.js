const {spawn} = require('child_process');

const cmd = '/Users/jmventura/PycharmProjects/pythonProject/venv/bin/python'
const args = ['/Users/jmventura/PycharmProjects/pythonProject/main.py']
const core = spawn(cmd, args, {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});

core.on('exit', (code) => {
    console.log(`python exited with code ${code}`);
});

core.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

core.stdout.on('data', (data) => {
    console.log(`python: ${data}`);
});


//core.send('123')
setInterval(() => {
    core.stdin.write('123' + "\n")
}, 1000)

