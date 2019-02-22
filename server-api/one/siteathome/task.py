#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 15:59
# @Author  : Carewn
# @Software: PyCharm

import pymysql as db
import datetime

def deletesession():
    print ('---------------------task to clear session--------------------------')
    connect = db.connect(
        host='localhost',
        port=3306,
        user= 'root',
        passwd= '123456',
        db='yu',
        charset='utf8'
    )
    data = datetime.datetime.now()
    yes_time = data + datetime.timedelta(minutes=-30)
    cursor = connect.cursor()
    sql = 'select expire_date from django_session'
    s = cursor.execute(sql)
    for i in cursor.fetchall():
        oa = (yes_time-i[0]).total_seconds()
        print (oa)
        if oa >= 0:
            try:
                sqls = 'delete from django_session where expire_date = "%s"'
                cursor.execute(sqls %i[0])
                connect.commit()
                print ('-------------------clear session------------------')
                connect.close()
                cursor.close()
            except :
                connect.rollback()
