#!/bin/bash

ROOT=${MONOREPO_DIR:-"$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."}
ERROR=1

ls "$ROOT/__tests__"

mkdir -p $ROOT/__tests__/packages/ && cp -r $ROOT/@ecomplus $ROOT/__tests__/packages/
echo "1. Packages copied"

cd $ROOT/__tests__/packages/@ecomplus/storefront-template && \
  npm link && \
  echo "1.1 Global npm link created" && \
  cd ../../../storefront-starter && \
  npm link @ecomplus/storefront-template && \
  echo "1.2 Link installed" && \
  npm run build && \
  ERROR=0

cd ../../
ls

cd $ROOT/__tests__/storefront-starter && npm unlink --no-save @ecomplus/storefront-template
cd ../..
cd $ROOT/__tests__/packages/@ecomplus/storefront-template && npm unlink
cd ../../../..

cd $ROOT
rm -rf $ROOT/__tests__/packages/@ecomplus
echo "3. Clear"

if [ $ERROR -eq 0 ]
then
  echo "<< Build with success >>"
fi
exit $ERROR
