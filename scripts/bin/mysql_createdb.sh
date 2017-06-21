#!/bin/bash

SECURE_MYSQL=$(expect -c "
set timeout 5
spawn mysql -prootpw
expect \"mysql>\"
send \"CREATE DATABASE shopdb;\r\"
expect \"mysql>\"
send \"exit\r\"
expect eof
")

echo "$SECURE_MYSQL"
