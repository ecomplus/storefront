#!/bin/bash

ROOT=${MONOREPO_DIR:-"$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."}
ERROR=1

ls "$ROOT/__tests__"

mkdir -p $ROOT/__tests__/packages/ && \
  cp -r $ROOT/@ecomplus $ROOT/__tests__/packages/ && \
  cd $ROOT/__tests__/storefront-starter && \
  npm link $ROOT/__tests__/packages/@ecomplus/storefront-template && \
  npm run build && \
  ERROR=0

cd $ROOT/__tests__/storefront-starter && npm unlink --no-save @ecomplus/storefront-template
cd $ROOT/__tests__/packages/@ecomplus/storefront-template && npm unlink

cd $ROOT
rm -rf $ROOT/__tests__/packages/@ecomplus

if [ $ERROR -eq 0 ]
then
  echo "<< Build with success >>"
fi
exit $ERROR
