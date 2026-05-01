FROM node:20-alpine

# ติดตั้ง pnpm
RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

# Build โปรเจค
RUN pnpm build

EXPOSE 5173

# ใช้ shell form
CMD ["node", "--max-old-space-size=512", "dist/server/index.js"]