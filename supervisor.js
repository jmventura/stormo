import zmq from 'zeromq'

const socket = new zmq.Pair({linger: 0})

await socket.bind('ipc:///tmp/cell')

setInterval(async function () {
    const msg = Message('heartbeat')
    await socket.send(msg)

    console.log('>:', msg)
}, 2500)

await socket.send(Message('fuck', {much: 'a lot'}))
await socket.send(Message('ping'))

for await (const [msg] of socket) {
    console.log('<:', msg.toString())
}

function Message(cmd, data = Date.now()) {
    return JSON.stringify({cmd, data})
}