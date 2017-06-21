#!/bin/bash

SECURE_MYSQL=$(expect -c "
set timeout 3
spawn mysql_secure_installation
expect \"Enter password for user root:\"
send \"rootpw\r\"
expect \"Press y|Y for Yes, any other key for No:\"
send \"no\r\"
expect \"Change the password for root ?\"
send \"y\r\"
expect \"New password:\"
send \"rootpw\r\"
expect \"Re-enter new password:\"
send \"rootpw\r\"
expect \"Remove anonymous users?\"
send \"y\r\"
expect \"Disallow root login remotely?\"
send \"y\r\"
expect \"Remove test database and access to it?\"
send \"y\r\"
expect \"Reload privilege tables now?\"
send \"y\r\"
expect eof
")

echo "$SECURE_MYSQL"
echo "==================MYSQL_SECURE IS INSTALLED!===================="
