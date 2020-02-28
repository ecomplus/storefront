#!/bin/bash

ROOT=${MONOREPO_DIR:-"$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."}
ERROR=1

ls "$ROOT/__tests__"

mkdir $ROOT/__tests__/tmp && \
  cp -r $ROOT/@ecomplus $ROOT/__tests__/tmp/ && \
  cp -r $ROOT/node_modules $ROOT/__tests__/tmp/
echo "1. Local packages copied"

if [ -z "$SKIP_GIT_CLONE" ]
then
  git clone -b master \
    https://github.com/ecomplus/storefront-starter $ROOT/__tests__/tmp/@ecomplus/storefront-starter
  echo "2. Storefront Starter repository cloned"
fi

cd $ROOT/__tests__/tmp/@ecomplus/storefront-template && \
  npm link && \
  echo "3.1 Global npm link created" && \
  cd ../storefront-starter && \
  npm link @ecomplus/storefront-template && \
  echo "3.2 Link installed" && \
  npm run build && \
  ERROR=0

cd ../../../../
ls

cd $ROOT/__tests__/tmp/@ecomplus/storefront-template && npm unlink
cd ../../../..
rm -rf $ROOT/__tests__/tmp
echo "4. Clear"

if [ $ERROR -eq 0 ]
then
  echo "<< Build with success >>"
fi
exit $ERROR
