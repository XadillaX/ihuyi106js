iHuyi 106 Sender
================

iHuyi 106 SMS sender for node.js.

Install
-------

```shell
$ npm install ihuyi106
```

Usage
-----

```javascript
var IHuyi = require("ihuyi106");
var account = "your_account";
var password = "your_password";
var mobile = "158********";
var content = "Hello world!";

var iHuyi = new IHuyi(account, password);
iHuyi.send(mobile, content, function(err, smsId) {
    if(err) {
        console.log(err.message);
    } else {
        console.log("SMS sent, and smsId is " + smsId);
    }
});
```

LICENSE
-------

[GPLv2](https://github.com/XadillaX/ihuyi106js/blob/master/LICENSE)
