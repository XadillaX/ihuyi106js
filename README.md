# iHuyi 106 Sender

iHuyi 106 SMS sender for node.js.

## Install

```shell
$ npm install ihuyi106
```

## Usage

```javascript
var IHuyi = require("ihuyi106");
var account = "your_account";
var password = "your_password";
var apiKey = "apikey"; // international api key, if exist
var mobile = "158********";
var iCountryCode = "1";
var iMobile = "63*********";
var content = "Hello world!";

// apiKey is optional
var iHuyi = new IHuyi(account, password, apiKey);

iHuyi.send(mobile, content, function(err, smsId) {
    if(err) {
        console.log(err.message);
    } else {
        console.log("SMS sent, and smsId is " + smsId);
    }
});

iHuyi.sendInternational(iCountryCode, iMobile, content, function(err, smsId) {
    if(err) {
        console.log(err.message);
    } else {
        console.log("SMS sent, and smsId is " + smsId);
    }
});
```

## LICENSE

[MIT](https://github.com/XadillaX/ihuyi106js/blob/master/LICENSE)
