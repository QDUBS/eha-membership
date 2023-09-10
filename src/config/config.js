const dotenv = require('dotenv');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

dotenv.config();
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ignoreUndefinedProperties:true});
const db = require('./db')(admin);
const messaging = require('./fcm/messaging');
const symplybook = require('./simplybook/simplebook');
const services = require('./services');

const isTesting = () => {
    return process.argv.filter(i => i.endsWith('mocha')).length === 1;
};

const error = (s) => {
    if(isTesting()) return '';
    throw String(s);
};

const loadConfigs = async () => {
    const resultSet = await db.getConfigs();
    return resultSet.configs;
};

module.exports = {
    env: process.env.ENV || 'production',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    isTesting,
    loadConfigs,
    simplybook: symplybook(loadConfigs),
    otherServices: services(loadConfigs),
    db,
    messaging: messaging(admin, db),
    firebaseAdmin: admin
};
