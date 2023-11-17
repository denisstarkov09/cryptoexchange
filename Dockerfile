FROM node:18

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start" ]