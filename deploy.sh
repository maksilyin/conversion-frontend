#!/bin/bash

set -e

echo "Pulling latest changes from Git..."
git pull origin master

echo "Rebuilding Docker container..."
docker-compose down
docker-compose build

echo "Starting Docker container..."
docker-compose up -d

echo "Deployment completed successfully."