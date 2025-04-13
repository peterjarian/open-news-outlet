/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    '*': 'prettier --write .',
    '*.{ts,tsx,js,jsx}': 'next lint --file',
};
