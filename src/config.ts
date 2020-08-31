function getenv(key: string, defaultValue: any) {
    return process.env[key] || defaultValue;
}

export default {
    environment: getenv('NODE_ENV', 'development'),
    server: {
        host: getenv('HOST', 'localhost'),
        port: parseInt(getenv('PORT', '3000')),
        static: 'public'
    },
    site: {
        title: getenv('SITE_TITLE', 'Wikify.JS'),
        index: getenv('SITE_INDEX', 'Main_page'),
    },
    db: {
        uri: `mongodb://${getenv('DB_HOST', '127.0.0.1')}:${getenv('DB_PORT', '27017')}/${getenv('DB_NAME', 'wikify')}`
    },
    bcrypt: {
        rounds: parseInt(getenv('BCRYPT_ROUNDS', '13'), 10)
    },
    locale: {
        default: getenv('DEFAULT_LOCALE', 'en')
    },
    session: {
        duration: parseInt(getenv('SESSION_DURATION', 7 * 24 * 60 * 60 * 1000), 10),
        secret: getenv('SESSION_SECRET', 'Qg5A11OTc7nk9Oi2N5YutH3iHy2EOs/xxi75eoYGVNM')
    },
}
