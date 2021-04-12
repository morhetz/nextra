const withNextra = require('@dextcloud/nextra')(
  '@dextcloud/nextra-theme-docs',
  './theme.config.js',
)
module.exports = withNextra({
  i18n: {
    locales: ['en', 'ar', 'zh'],
    defaultLocale: 'en',
  },
})
