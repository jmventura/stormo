import json
import zmq

socket = zmq.Context().socket(zmq.PAIR)
socket.connect('ipc:///tmp/cell')


def send(cmd: str, data=None):
    message = {
        "cmd": cmd
    }

    if data:
        message.data = data

    try:
        payload = json.dumps(message)
        socket.send_string(payload)
        print('>> ' + payload)
    except:
        print(f'error sending:  {message}')


def route(msg):
    command = msg['cmd']

    if command == 'ping':
        return send('pong')
    if command == 'fuck':
        return
    if command == 'heartbeat':
        return send('echo', msg)


while True:
    raw = socket.recv_string()
    print('<< ' + raw)

    try:
        route(json.loads(raw))
    except:
        print('error parsing the message ' + raw)
