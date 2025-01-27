# Stage 1: Build the React app
FROM node:18-alpine AS build

# Increase Node's memory limit to 4GB
ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build the production-ready React static files
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
