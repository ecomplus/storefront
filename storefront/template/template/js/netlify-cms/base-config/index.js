import settings from './collections/settings'
import layout from './collections/layout'
import pages from './collections/pages'
import blogPosts from './collections/blog-posts'
import extraPages from './collections/extra-pages'
import widgets from './collections/widgets'

export default {
  config: {
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
    load_config_file: false,
    media_folder: 'template/public/img/uploads',
    public_folder: '/img/uploads',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-'
    },
    collections: [
      settings,
      layout,
      pages,
      blogPosts,
      extraPages,
      widgets
    ]
  }
}
