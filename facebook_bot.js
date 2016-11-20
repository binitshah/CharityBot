var page_token = ("EAAX3bno16VYBAIYpqZCnnunwe7leFBF4pqdj9NdZAafgVogmtX0cvFbH68gZCp7vw0j02ofGqZC4W1UiVICZBhGpuDssEmIUG7VqVMiUNPF8zcnp6OMywnuPI73imMVa9Cts4Xk2xm5ZADovi2y5ntLe7u3fqmZBV2bYrUC7TOZCBwZDZD");
var verify_token = ("SzWo8tO6pN");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);

//////////////////////////////////////////////////
var Botkit = require('./lib/Botkit.js');
var controller = Botkit.facebookbot({
    debug: false,
    access_token: page_token,
    verify_token: verify_token
});

var bot = controller.spawn({

});

controller.hears(['hello', 'hi'], 'message_received', function(bot, message) {
    bot.reply(message, 'Hello.');
});


//added to stop the debug tick remarks in console
controller.on('tick', function(bot, event) {});

controller.setupWebserver(process.env.port || 7000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');

    });
});

