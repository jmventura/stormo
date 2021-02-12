import zmq from 'zeromq'
import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const push = new zmq.Push
const pull = new zmq.Pull()

await push.bind('ipc:///tmp/cell-out')
await pull.connect('ipc:///tmp/cell-in')

setInterval(async function () {
    const msg = Date.now().toString()
    await push.send(msg)
    console.log('sent:', msg)
}, 1000)

await push.send('fuck')

for await (const [msg] of pull) {
    console.log('received:', msg.toString())
}