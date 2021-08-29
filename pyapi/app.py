from flask import Flask, redirect
from flask import request
import mysql.connector
import json

def db_connect():
    db_connect.db_con = mysql.connector.connect(
        host="dbhost",
        user="dbuser",
        password="dbpass",
        database="dbname"
    )
    db_connect.my_cursor = db_connect.db_con.cursor()

app = Flask(__name__)

@app.route("/post-fortune", methods=['POST'])
def add_post():
    try:
        db_connect()
        content = request.json
        print(content['user'])
        print(content['fortune'])
        post_fortune = content['fortune']
        user_fortune = content['user']
        sql_stmt = ("INSERT INTO Fortunes (fortune_vc, user_vc)"
                    "VALUES (%s, %s)"
        )
        data = (post_fortune, user_fortune)
        db_connect.my_cursor.execute(sql_stmt, data)
        db_connect.db_con.commit()
        return "Fortune added successfully", 200

    except:
      return "Unable to add fortune", 400







