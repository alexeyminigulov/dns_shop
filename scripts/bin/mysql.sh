#!/bin/sh
export DEBIAN_FRONTEND="noninteractive"
debconf-set-selections <<< "mysql-server-5.7 mysql-server/root_password password rootpw"
debconf-set-selections <<< "mysql-server-5.7 mysql-server/root_password_again password rootpw"
apt-get -y install mysql-server-5.7

service mysql start

echo "===================MYSQL IS INSTALLED!===================="
