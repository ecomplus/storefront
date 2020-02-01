#!/bin/bash

cd ./../src/jquery;

grunt custom:\
+selector,\
+traversing,\
+callbacks,\
+deferred,\
+deferred/exceptionHook,\
+core/ready,\
+data,\
-queue,\
-queue/delay,\
+attributes,\
+event,\
+event/alias,\
+event/trigger,\
+manipulation,\
-manipulation/_evalUrl,\
-wrap,\
+css,\
+css/showHide,\
+css/hiddenVisibleSelectors,\
-serialize,\
-ajax,\
-ajax/xhr,\
-ajax/script,\
-ajax/jsonp,\
+core/parseHTML,\
-ajax/load,\
-event/ajax,\
-effects,\
-effects/animatedSelector,\
+offset,\
+dimensions,\
-deprecated,\
-exports/amd,\
-exports/global;

cp dist/jquery.min.js ../vendor/
