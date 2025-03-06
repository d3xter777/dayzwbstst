# DreadSky - DayZ Server Website

Веб-сайт для DayZ серверов DreadSky, созданный с использованием React и Tailwind CSS. Сайт предоставляет информацию о серверах, правилах и способах подключения.

## 🚀 Основные функции

- Информативные страницы о серверах
- Правила сервера
- Инструкции по подключению
- Адаптивный дизайн
- Анимированный интерфейс
- Копирование IP-адресов серверов

## 🛠 Технологии

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons

## 📋 Требования

- Node.js 16.x или выше
- npm 7.x или выше
- Apache сервер с поддержкой mod_rewrite

## 🔧 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/dreadsky-website.git
cd dreadsky-website
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корневой директории:
```env
VITE_API_URL=your_api_url
```

4. Запустите проект в режиме разработки:
```bash
npm run dev
```

5. Для сборки проекта:
```bash
npm run build
```

## 📁 Структура проекта

```
dreadsky-website/
├── src/
│   ├── components/     # Переиспользуемые компоненты
│   ├── pages/         # Страницы приложения
│   ├── assets/        # Статические ресурсы
│   ├── App.tsx        # Корневой компонент
│   └── main.tsx       # Точка входа
├── public/            # Публичные файлы
├── .htaccess         # Настройки Apache
├── index.html        # HTML шаблон
├── package.json      # Зависимости и скрипты
├── tailwind.config.js # Конфигурация Tailwind
└── vite.config.ts    # Конфигурация Vite
```

## 🌐 Развертывание

1. Соберите проект:
```bash
npm run build
```

2. Скопируйте содержимое папки `dist` на ваш веб-сервер

3. Убедитесь, что файл `.htaccess` находится в корневой директории сайта

## 🔒 Безопасность

- Все API ключи и чувствительные данные должны храниться в переменных окружения
- Используется HTTPS для безопасного соединения
- Реализована защита от XSS атак

## 📱 Поддерживаемые браузеры

- Chrome (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Edge (последние 2 версии)

## 🤝 Вклад в проект

1. Создайте форк проекта
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для более подробной информации.

## 📞 Контакты

- Email: your-email@example.com
- Discord: [DreadSky Community](https://discord.gg/your-server)
- Website: [dreadsky.com](https://dreadsky.com) 