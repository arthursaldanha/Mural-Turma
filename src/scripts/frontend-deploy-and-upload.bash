#!/bin/bash
echo "Key Pair: $1"

IS_BUILD=$3
CWD=$(pwd)
FOLDER="frontend-deploy"

if [ "$IS_BUILD" = "b" ]; then
	echo "Running yarn build .... Wait!"
	yarn build &&
	wait
fi

rsync -a . ../frontend-deploy  --exclude node_modules --exclude src --exclude .git --exclude .next/cache

tar -zcf ../frontend.tar.gz ../$FOLDER 2> /dev/null

rm -r ../$FOLDER

echo "Sending to $2 ...."

scp -i $1 ../frontend.tar.gz ubuntu@$2.compute-1.amazonaws.com:~/mural-front/

rm ../frontend.tar.gz

ssh -i $1 ubuntu@$2.compute-1.amazonaws.com 'cd mural-front/; bash deploy-frontend.bash'


