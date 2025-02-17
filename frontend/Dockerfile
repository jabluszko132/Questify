FROM node:alpine AS build

WORKDIR /questify
COPY /questify .
RUN <<EOF
npm ci
npm i
mv /node_modules .
npm run build
EOF
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs 
EXPOSE 3000
CMD ["npm","run","start"]
