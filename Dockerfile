# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies from the package.json file
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Use the official monkeyplug Docker image
FROM ghcr.io/mmguero/monkeyplug:small

RUN apt-get update && \
    apt-get install -y libatomic1

# Set the working directory in the container to /app
WORKDIR /app

# Copy the project files from the previous build step
COPY --from=0 /app .

# Start the node.js server
CMD [ "npm", "start" ]
