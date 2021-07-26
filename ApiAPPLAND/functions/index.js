const functions = require("firebase-functions");
const express = require('express');
const admin = require('firebase-admin');
const cors = require("cors");

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('./permissions.json'),
    databaseURL: 'https://api-appland-22cd0.firebaseio.com'
});

app.use(cors({ origin: true }));

app.use('/api/user', require('./routes/user-router'));

exports.app = functions.https.onRequest(app);
