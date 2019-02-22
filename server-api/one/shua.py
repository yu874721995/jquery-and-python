#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 15:01
# @Author  : Carewn
# @Software: PyCharm

import requests
import json
from random import  randint
import threading

def shua():
    i = True
    while i:
        data = {
            'username':randint(100,112131213),
            'password':123456
        }
        r = requests.post('http://127.0.0.1:8000/login',data=data)
        print ('OK')
u = []
for i in range(100):
    a = threading.Thread(target=shua,args=())
    a.setDaemon(True)
    u.append(a)

for i in u:
    i.start()

for i in u:
    i.join()


