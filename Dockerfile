FROM ubuntu:16.04

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | \
        tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb-org \
					supervisor

# Create the MongoDB data directory
RUN mkdir -p /data/db

ADD . /root

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN bash /root/scripts/main.sh

RUN cd /var/www/shop && npm install && npm install bower -g \
	&& npm install gulp -g \
	&& bower install --allow-root \
	&& composer install --no-plugins --no-scripts \
	&& npm run build \
	&& cd /var/www/shop/public/admin_panel && npm install \
	&& npm run build

# Expose port 80 from the container to the host
EXPOSE 80

CMD ["/usr/bin/supervisord"]
