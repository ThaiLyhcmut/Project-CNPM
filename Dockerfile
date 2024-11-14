FROM node:20

# Create app directory
WORKDIR /app

COPY package.* ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["node", "index.js"] 