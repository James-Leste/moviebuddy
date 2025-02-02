remove all the containers
```shell
docker rm -vf $(docker ps -aq)
```

remove all the images
```shell
docker rmi -f $(docker images -aq)
```

build frontend app
```shell
cd moviebuddy_frontend
docker build . -t james0720/moviebuddy-frontend:latest --platform linux/amd64
docker push james0720/moviebuddy-frontend
```

build backend app
```shell
cd backend
docker build . -t james0720/moviebuddy-backend:latest --platform linux/amd64
docker push james0720/moviebuddy-backend
```
