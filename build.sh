#!/bin/bash

# Remove preexisting node modules
print "Removing node packages"
rm -rf ./node_modules

# Reinstall necessary node packages
print "Installing node packages"
npm install 

