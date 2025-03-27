FROM node:lts-alpine

ENV NODE_ENV=production
ENV PG_HOST=dpg-cmop7fun7f5s73d9c320-a
ENV PG_PORT=5432
ENV PG_USER=postgre
ENV PG_PASSWORD=0DWmVu6AnPW8m9arV2bjyB3M3qEAnpbY
ENV PG_DATABASE=postgre_vho1

WORKDIR /src

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . ./src

# RUN yarn run build
# RUN chown -R node /src

EXPOSE 1339

USER node
CMD ["pnpm", "start"]

