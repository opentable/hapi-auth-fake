# hapi-auth-fake
will always auth, useful when developing

the only option you need to supply is a data function, this returns the credentials you want to be returned on auth.

##example

```javascript
var Hapi = require('hapi');

var home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome '
      + request.auth.credentials.name
      + '!</h3><br/></body></html>');
};

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.register(require('hapi-auth-fake'), function (err) {

    server.auth.strategy('session', 'fake', {
        dataFunc: function() {
            return { name: 'bob' }
        }
    });
});

server.route([
    {
        method: 'GET',
        path: '/',
        config: {
            handler: home,
            auth: 'session'
        }
    }
]);

server.start(function (err) {

    if (err) {
        throw err;
    }
    console.log('Server started at: ' + server.info.uri);
});
```