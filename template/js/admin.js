import './lib/config'
import * as ColorWidget from 'netlify-cms-widget-color'
import youtube from "netlify-cms-widget-ecomplus-collections";
/* global CMS */

document.title = `Admin ~ ${document.title}`

CMS.registerWidget('color', ColorWidget.Control)
CMS.registerWidget("collections", collectionsControl, collectionsPreview);
