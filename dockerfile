# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the React app files
COPY . ./

# Build the app for production
RUN npm run build

# Step 2: Serve the app using a lightweight server
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
