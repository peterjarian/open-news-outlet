export default {
    extends: ['@commitlint/config-conventional'],
    ignores: [(message) => message.toLowerCase().includes('initial commit')],
};
