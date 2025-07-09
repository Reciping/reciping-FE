# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using a Node.js server
FROM nginx:18-alpine

WORKDIR /app

# Copy package files to install production dependencies
COPY package*.json ./

# Install 'serve' and other production dependencies
RUN npm install --omit=dev

# Copy the built assets from the builder stage
COPY --from=builder /app/build ./build

# Expose the port 'serve' will listen on
EXPOSE 80

# Start the server
CMD [ "npm", "start"]