# hapi-auth-fake
Will always auth, useful when developing.

The only option you need to supply is a data function, this returns the credentials you want to be returned on auth.

## Example

```javascript
const Hapi = require('hapi');

const home = function (request) {
    return `<html><head><title>Login page</title></head><body><h3>Welcome
      ${request.auth.credentials.name}
      !</h3><br/></body></html>`;
};

const server = new Hapi.Server({ port: 8000 });

await server.register(require('hapi-auth-fake'));
await server.auth.strategy('session', 'fake', {
        dataFunc: function() {
            return { name: 'bob' }
        }
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

await server.start();
console.log('Server started at: ' + server.info.uri);
```