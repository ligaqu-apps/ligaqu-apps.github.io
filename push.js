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
   "endpoint": "https://fcm.googleapis.com/fcm/send/cio3t9xVbFE:APA91bF0wQcUz_k4GdtC9k1yLKhKqa3AdiE4dUG-2yyry_d1IN2Wo7WzLsRbBNQaFn0l255WWtwy1BBaH2WIvYtDFikSXS9r41VFhhE6afwdqxqq0tgsEVXahUV4WOXfTxcRJTPfHDwU",
   "keys": {
       "p256dh": "BFDeZFc0RrLjsBsqSlSYqjhJGA/ypv5rS1iT9XS/vfH7UUwZVjdPav43y2mv3Jop198MyDvAy/YH0sO5bBJWeoA=",
       "auth": "MtT6SDfSimYRpgpc3INqPQ=="
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