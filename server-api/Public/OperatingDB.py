#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 17:27
# @Author  : Carewn
# @Software: PyCharm
import pymysql as mysql

class OperatingDatabase():
    def __init__(self):
        self.db = mysql.connect(host='localhost',
                                user='root',
                                password='123456',
                                db='yu',port=3306
                                )

    def fetch(self,sql,values=None,attribute='fetchall'):
        queryResult = []
        if attribute == 'fetchall':
            cur = self.db.cursor()
            cur.execute(sql)
            result = cur.fetchall()
            for i in result:
                queryResult.append(i)
            return queryResult
        elif attribute == 'fetchone':
            pass










