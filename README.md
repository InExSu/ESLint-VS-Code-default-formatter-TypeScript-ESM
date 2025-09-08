Ты прошёл через ад конфигурации — и **заслужил стабильную систему**.

---

## ✅ КАКИЕ ФАЙЛЫ СОХРАНИТЬ ДЛЯ БУДУЩЕГО СРАВНЕНИЯ

Сохрани **эти 3 файла** — они отвечают за 99% работы ESLint как форматтера в VS Code + TypeScript + ESM:

---

### 📄 1. `eslint.config.js` — **главный конфиг линтинга и форматирования**

👉 Именно он определяет:
- Какие правила форматирования применять.
- Как парсить TypeScript.
- Где искать `tsconfig.json`.
- Какие плагины использовать.

📌 **Сохрани его как `eslint.config.js.backup` или в сниппетах.**

> 💡 Особенно важно: использование `import.meta.url` + `__dirname` для ESM.

---

### 📄 2. `.vscode/settings.json` — **настройки VS Code для ESLint**

👉 Именно здесь ты указываешь:
- ESLint как default formatter.
- Автоформатирование при сохранении.
- Путь к конфигу (`overrideConfigFile`).
- Отключение встроенных форматеров TS/JS.

📌 **Сохрани как `.vscode/settings.json.backup` или просто скопируй в документацию проекта.**

---

### 📄 3. `package.json` — **зависимости и скрипты**

👉 Убедись, что версии пакетов **зафиксированы** (или хотя бы мажорные):

```json
"devDependencies": {
    "eslint": "^9.35.0",
    "@typescript-eslint/parser": "^8.42.0",
    "@typescript-eslint/eslint-plugin": "^8.42.0",
    "@stylistic/eslint-plugin": "^5.3.1",
    "@eslint/js": "^9.35.0"
}
```

📌 **Сохрани `package.json` и `package-lock.json` (или `yarn.lock`)** — чтобы в будущем можно было восстановить точные версии.

---

## Проблема
ESLint не хочет быть default formatter в VS Code для TypeScript.

## Решение

1. Убедись, что в `package.json` стоит `"type": "module"`.
2. Используй `eslint.config.js` с `import.meta.url` для получения `__dirname`.
3. В `.vscode/settings.json`:
   - Укажи `"overrideConfigFile": "./eslint.config.js"`
   - Отключи встроенные форматеры TS/JS.
   - Включи `"eslint.format.enable": true`
4. Перезапусти ESLint: `Cmd+Shift+P` → `ESLint: Restart ESLint Server`
5. Перезагрузи окно VS Code.

## Файлы для сверки
- `eslint.config.js`
- `.vscode/settings.json`
- `package.json`
```

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ — ЧТОБЫ БОЛЬШЕ НЕ ЛОМАТЬСЯ

| Что проверить                     | Где проверить           |
|----------------------------------|--------------------------|
| `import.meta.url` + `__dirname`  | `eslint.config.js`       |
| `"overrideConfigFile"`           | `.vscode/settings.json`  |
| `"eslint.format.enable": true`   | `.vscode/settings.json`  |
| `"editor.defaultFormatter"`      | `.vscode/settings.json`  |
| Версии пакетов                   | `package.json`           |
| ESLint ✅ в правом нижнем углу    | Любой `.ts` файл         |

