import './lib/config'
import * as ColorWidget from 'netlify-cms-widget-color'
/* global CMS */

document.title = `Admin ~ ${document.title}`

CMS.registerWidget('color', ColorWidget.Control)
