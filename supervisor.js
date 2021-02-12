import zmq from 'zeromq'

const socket = new zmq.Pair({linger: 0})

await socket.bind('ipc:///tmp/cell')

setInterval(async () => await send('heartbeat'), 2500)

await send('echo', {much: 'a lot'})
await send('ping')

for await (const [msg] of socket) {
    console.log('<<', JSON.parse(msg.toString()))
}

async function send(cmd, args) {
    const command = [cmd]

    if (args) command.push(args)

    await socket.send(JSON.stringify(command))

    console.log('>>', command)
}