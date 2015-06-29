# Use the standard nodejs image as a base
FROM node:0.10-onbuild

# Install production dependencies.
ADD package.json /app/package.json
ADD src /app/src
ADD gulpfile.js /app/gulpfile.js
ADD bower.json /app/bower.json
RUN cd /app && npm install
RUN cd /app && npm install -g gulp
RUN cd /app && npm install -g bower
RUN cd /app && bower update --allow-root
RUN cd /app && gulp dist

# Set working directory for the app:
WORKDIR /app

# Expose the correct port for your app. This will be picked up by "Katalog" who
# will make sure Nginx redirects to this port.
EXPOSE 9000

CMD node /app/server/server.js
