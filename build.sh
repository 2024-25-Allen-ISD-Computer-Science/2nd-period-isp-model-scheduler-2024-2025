#!/bin/bash

# Remove preexisting node modules
print "Removing node packages"
rm -rf ./node_modules

# Reinstall necessary node packages
print "Installing node packages"
npm install 

# CHANGE LATER TO DEPLOY THROUGH .github/workflows/deploy.yml
git stash
git add -f dist/
git commit -m "VERSION #"
git subtree push --prefix dist origin production
git pop