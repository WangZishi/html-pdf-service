FROM node:5.11.0
MAINTAINER Wang Zishi <ynh.2@outlook.com>
COPY . /usr/src
WORKDIR /usr/src
EXPOSE 3000
EXPOSE 5858
ENTRYPOINT ["npm", "run"]
CMD ["start"]
