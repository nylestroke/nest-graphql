module.exports = {
    trailingComma: 'all',
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 100,
    proseWrap: 'preserve',
    overrides: [{
        files: '*.html',
        options: {
            parser: 'html'
        }
    }
    ]
}
