# mynodejs
first nodejs app with restful api, mysql, jwt

First, install dependencies using npm:

```sh
npm install
npm install -g mocha

```
Second, modify the config file ./lib/config.js,

Third, run the initial script to create the database table.

```sh
node ./model/init.js
```
then, you can run the app, the app is listen on port 3000

```sh
node ./bin/www
```

and use ./test/restfultest.js to test the api

```sh
mocha ./test/restfultest.js
```

the ./test/baseunittest.js is not working yet~~ T_T

