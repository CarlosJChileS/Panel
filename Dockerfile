# Build stage for React frontend
FROM node:18 AS build
WORKDIR /app/frontend

# Install dependencies separately to leverage Docker cache
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --force

# Copy source and environment
COPY frontend/ .
COPY frontend/.env .env

# Build the React app
RUN npm run build

# Final stage using nginx
FROM nginx:alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
