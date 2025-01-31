const defaultExtensions = ['js', 'jsx', 'ts', 'tsx']
const markdownExtensions = ['md', 'mdx']
const markdownExtensionTest = /\.mdx?$/

export default (theme, themeConfig) => (nextConfig = {}) => {
  const nextraConfig = typeof theme === "string" ? {
    theme,
    themeConfig
  } : theme;
  const locales = nextConfig.i18n ? nextConfig.i18n.locales : null
  const defaultLocale = nextConfig.i18n ? nextConfig.i18n.defaultLocale : null

  let pageExtensions = nextConfig.pageExtensions || [...defaultExtensions]
  if (locales) {
    console.log('You have i18n enabled for Nextra.')
    if (!defaultLocale) {
      console.error('Default locale is missing.')
    }
    pageExtensions = pageExtensions.concat(markdownExtensions.map(ext => defaultLocale + '.' + ext))
  } else {
    pageExtensions = pageExtensions.concat(markdownExtensions)
  }

  return Object.assign(
    {},
    nextConfig,
    {
      pageExtensions,
      webpack(config, options) {
        config.module.rules.push({
          test: markdownExtensionTest,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@dextcloud/nextra/react17-loader',
            },
            {
              loader: '@mdx-js/loader',
              options: nextraConfig.mdxOptions
            },
            {
              loader: '@dextcloud/nextra/loader',
              options: { theme: nextraConfig.theme, themeConfig: nextraConfig.themeConfig, locales, defaultLocale }
            }
          ]
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      }
    }
  )
}
