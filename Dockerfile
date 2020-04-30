#Install the latest node dependency
FROM node:latest

# Set the working directory
WORKDIR /Desktop/Development/smart-brain-api

# Copy root directory into docker root directory
COPY ./ ./

# Command to run upon mounting image
RUN npm install

# Command to access the bash of the image
CMD ["/bin/bash"]