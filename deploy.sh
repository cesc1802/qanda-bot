#!/bin/bash

APP_NAME=qandabot
# Read host IP from environment variable
# e.g. 127.0.0.1 is the IP address of the host
DEPLOY_CONNECT=root@${DEPLOY_HOST_IP}

echo "Docker building..."
docker build -t ${APP_NAME} -f ./Dockerfile .
echo "Docker saving..."
docker save -o ${APP_NAME}.tar ${APP_NAME}

echo "Deploying to ${DEPLOY_HOST_IP}..."

echo "Cleaning before deploy"
ssh -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./clean-before-deploy.sh

echo "Deploy..."
scp -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ./${APP_NAME}.tar ${DEPLOY_CONNECT}:~

echo "Docker load image"
ssh -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'docker load -i qandabot.tar'

echo "Docker remove old qandabot container"
ssh -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'docker stop qandabot'
ssh -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'docker rm -f qandabot'

echo "Docker run qandabot container"
ssh -i ~/.ssh/${PUBLIC_KEY_NAME} -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'docker run -d --name qandabot qandabot'

echo "Cleaning..."
rm -f ./${APP_NAME}.tar
#docker rmi $(docker images -qa -f 'dangling=true')
echo "Done"