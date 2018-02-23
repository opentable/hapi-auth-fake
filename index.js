const Hoek = require('hoek');

const internals = {};

const register = async (plugin, options) => {
    plugin.auth.scheme('fake', internals.implementation);
};
internals.implementation = function (server, options) {

    Hoek.assert(options, 'Missing fake auth strategy options');
    Hoek.assert(typeof options.dataFunc === 'function', 'options.dataFunc must be a valid function in basic scheme');

    const settings = Hoek.clone(options);

    const scheme = {
        authenticate: function (request, h) {
            return h.authenticated({ credentials: settings.dataFunc() });
        }
    };

    return scheme;
};


module.exports = {
    register,
    pkg: require('./package.json')
};
