# Use a lightweight Node.js base image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the remaining source code
COPY . .

# Expose ports
EXPOSE 5004
EXPOSE 8081

# Start the backend server
CMD ["node", "index.js"]
