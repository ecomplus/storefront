import getSections from './sections'
import getSettings from './collections/settings'
import getLayout from './collections/layout'
import getPages from './collections/pages'
import getBlogPosts from './collections/blog-posts'
import getExtraPages from './collections/extra-pages'
import getWidgets from './collections/widgets'

export default options => {
  options.sections = getSections(options)

  return {
    backend: {
      name: 'git-gateway',
      branch: 'master',
      commit_messages: {
        create: 'Create {{collection}} “{{slug}}”',
        update: 'Update {{collection}} “{{slug}}”',
        delete: 'Delete {{collection}} “{{slug}}”',
        uploadMedia: '[skip ci] Upload “{{path}}”',
        deleteMedia: '[skip ci] Delete “{{path}}”',
        openAuthoring: '{{message}}'
      }
    },
    locale: 'pt',
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: '/img/uploads',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-'
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options)
    ]
  }
}
