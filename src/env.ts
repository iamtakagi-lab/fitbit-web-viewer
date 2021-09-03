export default {
    NODE_ENV: process.env.NODE_ENV
        ? process.env.NODE_ENV
        : 'development',
    BASE_URL: process.env.BASE_URL
        ? process.env.BASE_URL
        : '',
    FITBIT_REDIRECT_URL: process.env.FITBIT_REDIRECT_URL
        ? process.env.FITBIT_REDIRECT_URL
        : '',
    FITBIT_CLIENT_ID: process.env.FITBIT_CLIENT_ID
        ? process.env.FITBIT_CLIENT_ID
        : '',
    FITBIT_CLIENT_SECRET: process.env.FITBIT_CLIENT_SECRET
        ? process.env.FITBIT_CLIENT_SECRET
        : '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
        ? process.env.FIREBASE_PROJECT_ID
        : '',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL
        ? process.env.FIREBASE_CLIENT_EMAIL
        : '',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : '',
    FIREBASE_COLLECTION_NAME: process.env.FIREBASE_COLLECTION_NAME
        ? process.env.FIREBASE_COLLECTION_NAME
        : '',
    FIREBASE_DOCUMENT_ID: process.env.FIREBASE_DOCUMENT_ID
        ? process.env.FIREBASE_DOCUMENT_ID
        : ''
}