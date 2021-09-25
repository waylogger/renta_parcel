
const path = require('path');

module.exports = {
    entry: './dist/bundle.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'bundle.pack.js',
    },
}