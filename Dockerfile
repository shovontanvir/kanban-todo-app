# Use the official Node.js 22 - alpine image as base image
FROM node:22-alpine

# Set /app as the working directory inside the container
WORKDIR /app

# Copy root folders package.json to the working directory
COPY package.json .

# COPY FE and BE folder to the working directory
COPY todo-front ./todo-front
COPY todo-server ./todo-server 

# COPY FE .env.example to FE .env
COPY todo-front/.env.example ./todo-front/.env

# Install dependencies for both front-end and back-end using the root package.json scripts
RUN npm run install

# Expose port 5173 for the front-end and port 8000 for the back-end
EXPOSE 5173 8000

# Install concurrently and wait-on to run both front-end and back-end together - wait-on is to keep the FE waiting until the BE is ready
RUN npm install -g concurrently wait-on

# Start both front-end and back-end using the root package.json scripts
CMD ["npm", "run", "start"]