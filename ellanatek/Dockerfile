# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Build the production-ready React static files
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy the build output to nginx's html folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
