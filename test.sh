RED='\033[0;31m'
NC='\033[0m'

echo -e "BEGINNING"
echo -e "${RED}########Each HTML page connected###########${NC}"
curl -I -L http://127.0.0.1:8080/home.html
curl -I -L http://127.0.0.1:8080/borrow.html
curl -I -L http://127.0.0.1:8080/list.html


echo -e "${RED}########Can connect to Firebase###########${NC}"

curl -d "userName = 'nathan'" -d "email = 'nnnn'" -d "isbn = '9781591841838'" http://127.0.0.1:8080/list.html

# curl --silent --output /dev/null -X POST -H "Content-Type: text/plain" \
#  --data "{fuck you:\"fucking text\"}" \
#  http://127.0.0.1:8080/listing