import sys


def send(msg):
    sys.stdout.write(msg)
    sys.stdout.flush()


def receive(msg):
    send(msg+' ')


send('running')

for line in sys.stdin:
    receive(line.rstrip())

    send(f'node from python: {line}')

send("Done")
