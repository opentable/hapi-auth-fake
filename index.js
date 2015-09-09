var Hoek = require('hoek');

var internals = {};

exports.register = function (plugin, options, next) {

    plugin.auth.scheme('fake', internals.implementation);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};

internals.implementation = function (server, options) {

    Hoek.assert(options, 'Missing fake auth strategy options');
    Hoek.assert(typeof options.dataFunc === 'function', 'options.dataFunc must be a valid function in basic scheme');

    var settings = Hoek.clone(options);

    var scheme = {
        authenticate: function (request, reply) {
            return reply.continue({ credentials: settings.dataFunc() });
        }
    };

    return scheme;
};


