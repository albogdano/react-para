#!/bin/bash

rm -rf docs
BASE_HREF=/react-para npm run build
sed -i -e "s/\"homepage\": \"\\.\"/\"homepage\": \"https:\\/\\/albogdano\\.github\\.io\\/react-para\"/g" package.json
sed -i -e "s/\"start_url\": \"\\.\"/\"start_url\": \"\\/react-para\\/\"/g" build/manifest.json
mv build docs
sed -i -e "s/\"homepage\": .*$/\"homepage\": \"\\.\",/g" package.json
git add -A && git commit -am "updated demo" && git push -f origin master
echo "-- done --"
