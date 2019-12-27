var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BLxObOzxVJjLSflJxSNo2N0v9liEzfyeqweXiTsWP04ZDYUc4GkKxP1NY1bHEJ9kETKgXawHJ69DRAwyXr3eh1Y",
   "privateKey": "pXfov6nY-jVCkAcaHyPS_dbxmBZ8v0S19oHBDW2J_K8"
};
 
webPush.setVapidDetails(
   'mailto:aswinkurniadi6@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dC1YR49rCFE:APA91bHBnrZkICQfbSIPuIlbxPvsAcNefTaaEHGAwTE0FURjkdFAom3m2zl1uq8Srj4Z0mOpTYbkzQ6G7V00eoJblc6jAKp4nA60wM0-W4-Knx-6aaRZFQqankglKP5LU_7s_Qjbj8R7",
   "keys": {
       "p256dh": "BBTTrbhuyO4rb44A337rjVuJA9iULHPthUuLrCcee1irSdV2thb1KPAc7QJGvGPfV+4JQmNiqi5MlBJjdBhItM0=",
       "auth": "/vcnvGY6IEdig5fg75jyHA=="
   }
};
var payload = 'Selamat! Aplikasi LigaQu sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '480804161107',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);