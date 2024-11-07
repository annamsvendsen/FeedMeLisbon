# Use the official Node.js image from the Docker Hub
FROM node:16

# To set the working directory in the container
WORKDIR /app

# To copy package.json and package-lock.json
COPY package*.json ./


# To install dependencies
RUN npm install

# To copy the rest of our application code
COPY . .

EXPOSE 3002

ENV DB_HOST=mysql DB_USER=root DB_PASS=password

# Start application
CMD ["node", "server.js"]  