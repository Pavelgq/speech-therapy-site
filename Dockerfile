FROM node:latest

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apt-get update -qq && apt-get install -y build-essential nodejs

COPY . /usr/src/nuxt-app/
RUN npm install

RUN npm run build

EXPOSE 3000
EXPOSE 3001

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

CMD ["npm", "start"]
