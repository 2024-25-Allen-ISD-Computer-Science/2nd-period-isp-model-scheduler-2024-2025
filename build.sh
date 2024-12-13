#!/bin/bash

# Obtain updated version
current_version=$(sed -n '4p' "README.md")
IFS='.' read -r -a version_parts <<< "$current_version"
((version_parts[2]++))
new_version="${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
version="$new_version"
printf "\nUpdating to version: $version"
sed -i "4s/.*/$version/" README.md

# Remove preexisting node modules
printf "\nRemoving node packages"
rm -rf ./node_modules

# Reinstall necessary node packages
printf "\nInstalling node packages"
npm install

# Build the production environment
printf "\nBuilding production environment"
npm run build

# CHANGE LATER TO DEPLOY THROUGH .github/workflows/deploy.yml
printf "\nStashing current changes"
git stash

printf "\nPushing production build"
git add -f dist/
git commit -m "VERSION $version"
git subtree push --prefix dist origin production

printf "%s\nRemoving unnecessary production build in current development branch"
rm -rf dist

printf "%s\nRestoring stashed changes"
git stash pop