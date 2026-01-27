# НИР3 Landing — Nuxt

Лендинг-страница кафе «Три Фреймворка» для сравнения производительности SSR-фреймворков.

## Технологический стек

- **Nuxt** 3.10.0
- **Vue** 3.4.15 (Composition API)
- **TypeScript** 5.3.3
- **Vite** 6.0.0 (встроенный)
- **Nitro Engine** (SSR оптимизация)
- **Node.js** 20.x LTS
- **Порт:** 3002

## Команды

```bash
# Development
npm install
npm run dev              # http://localhost:3002

# Production
npm run build
npm start

# Docker
docker build -t nir3-nuxt .
docker run -p 3002:3002 nir3-nuxt
```

## Структура

```
components/
  Hero.vue               # Hero-секция
  About.vue              # О кафе
  Frameworks.vue         # Фирменные напитки
  Features.vue           # Преимущества
  Methodology.vue        # Меню и атмосфера
  ContactForm.vue        # Форма бронирования
  Footer.vue             # Футер
pages/
  index.vue              # Главная страница
assets/css/
  main.css               # Глобальные стили
app.vue                  # Root component
nuxt.config.ts           # Конфигурация
```

## Целевые метрики

- **LCP:** ≤ 2.5s
- **INP:** ≤ 200ms
- **CLS:** ≤ 0.1
- **TTFB:** ≤ 600ms
- **Bundle:** < 100KB (gzip)

## Модули

- `@nuxtjs/google-fonts` — оптимизация шрифтов
