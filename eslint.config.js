import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Cấu hình ESLint.
 *
 * Hai plugin quan trọng nhất ở đây không phải để bắt lỗi style:
 * - `react-hooks` bắt sai dependency array. Chỗ `pickUp` trong DrawScreen đóng
 *   gói giá trị vào listener là đúng có chủ ý, nhưng loại bug đó rất dễ tái phát.
 * - `jsx-a11y` bắt phần tử bấm được mà không phải <button>. Quạt bài từng là 30
 *   thẻ <img onPointerDown> và người dùng bàn phím không rút được lá nào.
 */
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // Dự án không dùng TypeScript và cũng không dùng PropTypes — kiểu dữ liệu
      // của props được mô tả bằng docblock, đủ cho quy mô này.
      'react/prop-types': 'off',
    },
  },
  {
    // File cấu hình chạy trong Node, không phải trong trình duyệt.
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
];
