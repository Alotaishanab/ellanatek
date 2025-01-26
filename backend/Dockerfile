# Use a lightweight Node.js base image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# If you need the legacy peer deps:
RUN npm install --legacy-peer-deps

# Copy the remaining source code
COPY . .

# Expose the port your backend listens on, e.g. 5004
EXPOSE 5004

# Start the application with node index.js
CMD ["node", "index.js"]
