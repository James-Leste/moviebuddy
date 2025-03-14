# moviebuddy

Help you and your partner find movie/shows that you are both interested in.

<img width="676" alt="SCR-20250120-bgid" src="https://github.com/user-attachments/assets/99101323-b4e7-4201-80d6-5cc73d39d099" />

## Required environment variables
### Development
1. create `./moviebuddy_frontend/.env.development.local`
```conf
VITE_API_URL = 'http://localhost:8000/api'
```
2. create `./backend/.env.local`
```conf
# All the backend related env variables come here
TMDB_API_KEY = ''
DB_URL = ''
```

### Production
1. create `./moviebuddy_frontend/env.production.local`
```conf
VITE_API_URL = 'http://<server ip>:80/api'
```
2. create `./.env.local`
```conf
# All the backend related env variables come here
TMDB_API_KEY = ''
DB_URL = ''
```

### Set ENV using script
```shell
key=<api-key>
host=<ip>
./init_env.sh -k $key -p $host
```
