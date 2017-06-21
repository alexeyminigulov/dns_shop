#!/bin/bash

echo "==============START SETTING INGINX============"

if [ -d /var/www/site ]
then
        echo "-----------Site exists-------------"
        rm -rf /var/www/shop
        cp -a  /root/shop/ /var/www/
else
        echo "-----------Nothing-----------------"
        cp -a  /root/shop/ /var/www/
fi

chown -R www-data:www-data /var/www/shop

# setting config of site
cp -R -f /root/scripts/configs/nginx/nginx.conf /etc/nginx/
cp -R -f /root/scripts/configs/nginx/default /etc/nginx/sites-available/

echo "=============END SETTING INGINX=============="
