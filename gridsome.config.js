// Здесь находятся параметры конфигурации проекта и плагина. 
// Узнать больше:https://gridsome.org/docs/config

// Изменения здесь требуют перезагрузки сервера.
// Для перезапуска нажмите CTRL + C в терминале и запустите "сетку некоторых разработок"

module.exports = {
  siteName: 'SpeechFitness',
  siteDescription: "Фитнес речи (Speech Fitness fun) Формирование Культуры Публичных Выступлений",
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
          whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/, /vueperslide$/, /vueperslide-$/]
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: false,
        shouldTimeTravel: false,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'CustomPage',
        path: './content/pages/*.md'
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title', 'content'],
        collections: [{
          typeName: 'Blog',
          indexName: 'Blog',
          fields: ['title', 'category', 'excerpt', 'content', 'path']
        }]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        'remark-autolink-headings',
        'remark-attr',
        ['gridsome-plugin-remark-prismjs-all', {
          noInlineHighlight: false,
          showLineNumbers: false,
        }],
        require('./packages/gridsome-plugin-remark-figure')
      ],
      
      processImages: false
      
    }
  },
  templates: {
    Blog: [{
      path: '/posts/:title'
    }],
    CustomPage: [{
      path: '/:title',
      component: '~/templates/CustomPage.vue'
    }],
    Category: [{
      path: '/category/:title',
      component: '~/templates/Category.vue'
    }],
    Author: [{
      path: '/author/:name',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title',
      component: '~/templates/Tag.vue'
    }]
  },
  chainWebpack: config => {
      config.resolve.alias.set('@pageImage', '@/assets/images');
  }
}
