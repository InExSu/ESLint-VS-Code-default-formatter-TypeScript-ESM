// eslint.config.js
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import stylisticPlugin from '@stylistic/eslint-plugin';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

// ✅ ESM-совместимый способ получить __dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Игнорируемые паттерны
const ignores = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/*.min.js',
    '**/coverage/**',
    '**/*.d.ts',
    '**/.git/**',
    '**/.vscode/**',
    '**/.idea/**'
];

export default defineConfig([
    {
        ignores,
    },
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: typescriptEslintParser,
            parserOptions: {
                // ✅ ИСПРАВЛЕНО: используем __dirname для абсолютного пути
                project: [`${__dirname}/tsconfig.json`],
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.node,
                console: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            '@stylistic': stylisticPlugin,
        },
        rules: {
            // ✅ Базовые правила форматирования — ВСЕ с автофиксом
            '@stylistic/indent': ['error', 4, { 
                SwitchCase: 1,
                ignoredNodes: ['TSTypeParameterInstantiation']
            }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { 
                avoidEscape: true, 
                allowTemplateLiterals: "always" 
            }],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/key-spacing': ['error', { 
                beforeColon: false, 
                afterColon: true, 
                mode: 'strict' 
            }],
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-before-function-paren': ['error', { 
                anonymous: 'always', 
                named: 'never', 
                asyncArrow: 'always' 
            }],
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/max-len': 'off',

            // ✅ Правила для аргументов и скобок
            '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
            '@stylistic/function-call-argument-newline': ['error', 'consistent'],

            // ✅ Правила для объектов и массивов
            '@stylistic/object-property-newline': ['error', { 
                allowAllPropertiesOnSameLine: true 
            }],
            '@stylistic/array-element-newline': ['off'],
            '@stylistic/array-bracket-newline': ['off'],

            // ✅ Правила для операторов
            '@stylistic/operator-linebreak': ['error', 'after', {
                overrides: { 
                    '=': 'none', 
                    '?': 'before', 
                    ':': 'before',
                    '&&': 'before',
                    '||': 'before'
                }
            }],

            // ✅ TypeScript-специфичные правила
            '@typescript-eslint/no-unused-vars': ['warn', {
                args: 'after-used',
                vars: 'all',
                varsIgnorePattern: '^_|[Tt]est$|_Test$',
                argsIgnorePattern: '^_'
            }],
            '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
            '@typescript-eslint/consistent-type-definitions': ['off'],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'error',

            // ✅ Отключаем конфликтующие правила ESLint
            'no-console': 'off',
            'no-unused-vars': 'off',
            'no-undef': 'off',
            'no-redeclare': 'off',
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: [`${__dirname}/tsconfig.json`]
                }
            }
        }
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.node
            }
        },
        rules: {
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single']
        }
    }
]);