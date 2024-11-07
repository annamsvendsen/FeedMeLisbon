# Step 1: Use an official Nginx image as a base
FROM nginx:alpine

# Step 4: Copy the frontend files into the Nginx html directory
COPY . /usr/share/nginx/html

# Step 5: Expose the port on which Nginx will listen
EXPOSE 80

# Step 1: Use an official Node.js runtime as a parent image
# FROM node:18-alpine AS build

# # Step 2: Set the working directory in the container
# WORKDIR /app 

# # Step 3: Copy the package.json and package-lock.json (if available)
# COPY package-lock.json ./
# COPY package.json ./

# # Step 4: Install project dependencies

# RUN npm install --production

# # Step 5: Copy the rest of the application code
# COPY . .

# # Step 6: Use Node.js to serve the static files
# FROM node:18-alpine

# # Step 7: Set the working directory
# WORKDIR /app

# # Step 8: Copy the files from the build stage
# COPY --from=build /app .

# # Step 9: Install a simple HTTP server (e.g., `serve`)
# RUN apk add --no-cache curl
# RUN npm install -g serve

# # Step 10: Expose the port the server will run on
# EXPOSE 3003

# # Step 11: Command to run the HTTP server
# CMD ["serve", "-s", ".", "-l", "3003"]


#old version

# Step 1: Use an official Node.js runtime as a parent image
#FROM node:18-alpine AS build

# Step 2: Set the working directory in the container

#WORKDIR /app 

# Step 3: Copy the package.json and package-lock.json (if available)
#COPY package-lock.json ./
#COPY package.json ./
#COPY app.js ./

# Step 4: Install project dependencies
#RUN npm install --production

# Step 5: Copy the rest of the application code
#COPY . .

# Step 7: Use Node.js to serve the built React app
#FROM node:18-alpine

# Step 8: Set the working directory for the final image
#WORKDIR /app

# Step 9: Copy built files from the previous stage
#COPY --from=build /app .

# Step 10: Install a simple HTTP server (e.g., `serve`)
#RUN npm install -g serve

# Step 11: Expose the port the server will run on
#EXPOSE 3002

#CMD ["node", "app.js"]
