# Step 1 - Build base
FROM node:18-alpine AS base
WORKDIR /app
COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
RUN npm install

# Stage 2 - Build application
FROM base as build
WORKDIR /app
RUN npm run build 

# Step 3 - Start app
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only-production
COPY --from=build /app/build ./

CMD [ "node", "main.js" ]

