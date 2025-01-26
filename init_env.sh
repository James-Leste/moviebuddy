key=''
ip=''
print_usage() {
    printf "Usage: ..."
}

while getopts 'k:p:' flag; do
    case "${flag}" in
        k) key="${OPTARG}" ;;
        p) ip="${OPTARG}" ;;
        *) print_usage
        exit 1 ;;
    esac
done

touch ./moviebuddy_frontend/.env.{production,development}.local ./backend/.env .env.local

echo "TMDB_API_KEY = '$key'" > ./.env.local
echo "VITE_API_URL = 'http://localhost:8000/api'" > ./moviebuddy_frontend/.env.development.local
echo "VITE_API_URL = 'http://$ip/api'" > ./moviebuddy_frontend/.env.production.local
echo "TMDB_API_KEY = '$key'" > ./backend/.env

echo "ENV are ready"

echo "./.env.local"
cat ./.env.local

echo "./moviebuddy_frontend/.env.development.local"
cat "./moviebuddy_frontend/.env.development.local"

echo "./moviebuddy_frontend/.env.production.local"
cat "./moviebuddy_frontend/.env.production.local"

echo "./backend/.env"
cat "./backend/.env"