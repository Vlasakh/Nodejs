## Install
- https://hub.docker.com/_/mysql

## Commands
- docker ps -a
- docker start local-mysql -a
- docker container stop local-mysql 
- docker rm local-mysql
- docker exec -it local-mysql bash
- docker save mysql > ~/mysql.tar
- sudo docker commit [CONTAINER_ID] [new_image_name]

## Install app
- apt-get -y update ; apt-get -y install
