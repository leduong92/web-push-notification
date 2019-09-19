const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get('/', (req, res) => res.send('Hello World!'));

const dummyDb = { subscription: null};

const saveToDatabase = async subscription => {
    dummyDb.subscription = subscription;
}

app.post('/save-subscription', async (req, res) => {
    const subscription = req.body;
    await saveToDatabase(subscription);
    res.json({message: 'success'});
})

const vapidKeys = {
    publicKey: 'BHQtE8x_2enI56C14ooaSga8J3PhsAlsP82BNqiONFSg09RPen3TKOTsLgJCbpNCOMa2PEmVevSbvTA2WS62Voo',
    privateKey: 'mdnA9mC32ZaUBeNdg2961U11F4auIIIS7bKMQKNHpC4',
}

webpush.setVapidDetails(
    'mailto:maileduong92@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const sendNotification = (subscription, dataToSend = '') => {
    webpush.sendNotification(subscription, dataToSend);
}

app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription;
    const message = 'Hello server';
    sendNotification(subscription, message);
    res.json({ message: 'server send'});
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));