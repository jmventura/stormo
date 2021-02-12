import zmq

context = zmq.Context()
pull = context.socket(zmq.PULL)
push = context.socket(zmq.PUSH)
pull.connect('ipc:///tmp/cell-out')
push.bind('ipc:///tmp/cell-in')


def route(msg):
    if msg == 'fuck':
        print(123)


while True:
    message = pull.recv_string()
    route(message)
    push.send_string(message)
    print(message)
