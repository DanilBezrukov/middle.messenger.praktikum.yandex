# Мессенджер

## Описание проекта

Учебный проект "Мессенджер"

## Содержание

- [Ключевые технологии](#ключевые-технологии)
- [Ссылки на страницы](#ссылки-на-страницы)
- [Макет в Figma](#макет-в-figma)
- [Деплой](#деплой)
- [Скрипты](#скрипты)
- [Установка](#установка)
- [Структура проекта](#структура-проекта)

## Ключевые технологии

- **Vite** — инструмент сборки.
- **TypeScript** — язык программирования.
- **Sass** — препроцессор CSS.
- **Handlebars** — шаблонизатор.

## Ссылки на страницы

- [Навигация по страницам](https://practicum.tech-view.ru/)
- [Авторизация](https://practicum.tech-view.ru/src/pages/authorization/authorization.html)
- [Регистрация](https://practicum.tech-view.ru/src/pages/registration/registration.html)
- [Список чатов и лента переписки](https://practicum.tech-view.ru/src/pages/chat-list/chat-list.html)
- [Страница настроек профиля](https://practicum.tech-view.ru/src/pages/user-settings/user-settings.html)
- [Страница 404](https://practicum.tech-view.ru/src/pages/not-found/not-found.html)
- [Страница 500](https://practicum.tech-view.ru/src/pages/server-error/server-error.html)

## Макет в Figma

[Макет](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link)

## Деплой

Проект развернутый на Netlify: [https://practicum.tech-view.ru/](https://practicum.tech-view.ru/)

Технический домен для проверки с помощью автотестов: [https://remarkable-chaja-f544cc.netlify.app/](https://remarkable-chaja-f544cc.netlify.app/)

## Скрипты

В проекте доступны следующие команды:

- **npm run dev** — запуск проекта в режиме разработки.
- **npm run build** — компиляция TypeScript и сборка проекта для продакшн.
- **npm run start** — компиляция TypeScript, сборка проекта и запуск на порту 3000.

## Установка

   ```bash
   git clone https://github.com/DanilBezrukov/middle.messenger.praktikum.yandex.git
   ```

   ```bash
   cd middle.messenger.praktikum.yandex
   ```

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

## Структура проекта

- `/static` — статичные файлы.
- `/src` — исходные файлы проекта.
   - `/assets` — стили.
   - `/pages` — HTML-страницы.
   - `/partials` — частичные шаблоны.
