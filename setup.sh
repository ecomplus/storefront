# !/bin/bash

mkdir -p ./scss/bootstrap/scss;
cp -r ./node_modules/bootstrap/scss/* ./scss/bootstrap/scss/;
mkdir -p ./scss/bootstrap-vue/src;
cp -r ./node_modules/bootstrap-vue/src/* ./scss/bootstrap-vue/src/;
find ./scss/ -type f ! -name "*.scss" -delete;
rm -rf ./dist;
