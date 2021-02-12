import json
import zmq

socket = zmq.Context().socket(zmq.PAIR)
socket.connect('ipc:///tmp/cell')


def send(cmd, args=None):
    message = [cmd]

    if args:
        message.append(args)

    try:
        payload = json.dumps(message)
        socket.send_string(payload)
        print('>>', payload)
    except:
        print('error sending', message)


def process(msg):
    cmd, *args = msg

    if cmd == 'ping':
        return send('pong')
    if cmd == 'echo':
        return send(cmd, args)
    if cmd == 'heartbeat':
        return send(True)


while True:
    raw = socket.recv_string()
    print('<<', raw)
    message = None

    try:
        message = json.loads(raw)
    except:
        print('error parsing the message', raw)
        print('exiting now')
        quit()

    process(message)
