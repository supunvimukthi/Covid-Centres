FROM ubuntu
RUN apt-get update && apt-get upgrade -y && apt-get install nginx -y
COPY script.sh /home/
WORKDIR /home
RUN rm -rf /var/www/html/*
COPY  build /var/www/html/
COPY default /etc/nginx/sites-available/
EXPOSE 80
RUN chmod +x script.sh
CMD "/home/script.sh"
