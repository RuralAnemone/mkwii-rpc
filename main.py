from pypresence import Presence
import time
from datetime import datetime

CLIENT_ID = "1432098284922736740"
RPC = Presence(CLIENT_ID)
RPC.connect()

def update():
    RPC.update(
        state=str(datetime.now()),
        details="a working discord rpc from python (:",
        name="Discord :3"
    )

while True:
    print("updating status " + str(datetime.now()))
    update()
    time.sleep(5) # discord's builtin ratelimit