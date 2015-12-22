# Use the standard nodejs image as a base
FROM shawnzhu/ruby-nodejs:0.12.5

# Set working directory for the app:
WORKDIR /app

# Install production dependencies.
ADD package.json package.json
ADD src src
ADD server server
ADD config config
ADD gulpfile.js gulpfile.js
ADD bower.json bower.json
ADD config.rb config.rb

RUN gem install compass
RUN npm install
RUN npm install -g gulp
RUN npm install -g bower@1.5.2
RUN bower update --allow-root
RUN NODE_ENV=production gulp dist

# Expose the correct port for your app. This will be picked up by "Katalog" who
# will make sure Nginx redirects to this port.
EXPOSE 9000

CMD node server/server.js
