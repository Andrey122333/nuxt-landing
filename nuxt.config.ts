// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  
  // Nuxt DevTools
  devtools: { enabled: true },
  
  // SSR включён по умолчанию
  ssr: true,
  
  // Модули
  modules: ['@nuxtjs/google-fonts'],
  
  // Конфигурация Google Fonts
  googleFonts: {
    families: {
      Inter: [400, 600, 700],
      Montserrat: [700, 800],
    },
    display: 'swap',
    subsets: ['cyrillic', 'latin'],
    prefetch: true,
    preconnect: true,
  },
  
  // CSS
  css: ['~/assets/css/main.css'],
  
  // App head (метаданные)
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Кафе «Три Фреймворка» — Место встречи разработчиков',
      meta: [
        { name: 'description', content: 'Уникальное кафе для разработчиков с высокоскоростным Wi-Fi, авторским кофе и комфортными рабочими местами. Работаем 24/7.' },
        { name: 'keywords', content: 'кафе для программистов, коворкинг, кофе, Wi-Fi, IT-сообщество, разработчики' },
        { name: 'author', content: 'Кафе «Три Фреймворка»' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Кафе «Три Фреймворка» — Место встречи разработчиков' },
        { property: 'og:description', content: 'Уникальное кафе для разработчиков с авторским кофе и комфортной атмосферой' },
        { property: 'og:site_name', content: 'Кафе «Три Фреймворка»' },
      ],
    },
  },
  
  // Vite: Оптимизация сборки
  vite: {
    build: {
      target: 'es2022',
    },
  },
  
  // Nitro Engine
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
  },
  
  // Runtime config
  runtimeConfig: {
    public: {
      frameworkVersion: '4.4+',
    }
  }
})
