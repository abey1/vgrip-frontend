FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

# Bind to 0.0.0.0 so the Vite server is reachable from the host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
