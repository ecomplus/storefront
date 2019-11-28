# !/bin/bash

mkdir -p ./scss/bootstrap/scss;
cp -r ./node_modules/bootstrap/scss/* ./scss/bootstrap/scss/;
mkdir -p ./scss/bootstrap-vue/src;
cp -r ./node_modules/bootstrap-vue/src/* ./scss/bootstrap-vue/src/;
find ./scss/ -type f ! -name "*.scss" -delete;
mkdir -p ./scss/animate.css/source;
cp -r ./node_modules/animate.css/source/* ./scss/animate.css/source/;
rm -rf ./dist;
