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
    bot.reply(message, "Hello.");
});

controller.hears(['address', 'atlanta'], 'message_received', function(bot, message) {
    bot.reply(message, {
                attachment: {
                    'type':'template',
                    'payload':{
                         'template_type':'generic',
                         'elements':[
                           {
                             'title':'Atlanta',
                             'image_url':'https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=33.749249,-84.387314&zoom=25&markers=33.749249,-84.387314',
                             'subtitle':'Map of Atlanta.',

                           }
                         ]
                    }
                }
    });
});

controller.hears(['shirt'], 'message_received', function(bot, message) {
    bot.reply(message, {
            attachment: {
                'type':'template',
                'payload':{
                     'template_type':'generic',
                     'elements':[
                       {
                         'title':'Classic White T-Shirt',
                         'image_url':'http://petersapparel.parseapp.com/img/item100-thumb.png',
                         'subtitle':'Soft white cotton t-shirt is back in style',
                         'buttons':[
                           {
                             'type':'web_url',
                             'url':'https://petersapparel.parseapp.com/view_item?item_id=100',
                             'title':'View Item'
                           },
                           {
                             'type':'web_url',
                             'url':'https://petersapparel.parseapp.com/buy_item?item_id=100',
                             'title':'Buy Item'
                           },
                           {
                             'type':'postback',
                             'title':'Bookmark Item',
                             'payload':'USER_DEFINED_PAYLOAD_FOR_ITEM100'
                           }
                         ]
                       },
                       {
                         'title':'Classic Grey T-Shirt',
                         'image_url':'http://petersapparel.parseapp.com/img/item101-thumb.png',
                         'subtitle':'Soft gray cotton t-shirt is back in style',
                         'buttons':[
                           {
                             'type':'web_url',
                             'url':'https://petersapparel.parseapp.com/view_item?item_id=101',
                             'title':'View Item'
                           },
                           {
                             'type':'web_url',
                             'url':'https://petersapparel.parseapp.com/buy_item?item_id=101',
                             'title':'Buy Item'
                           },
                           {
                             'type':'postback',
                             'title':'Bookmark Item',
                             'payload':'USER_DEFINED_PAYLOAD_FOR_ITEM101'
                           }
                         ]
                       }
                     ]
                   }
            }
        });
});


//added to stop the debug tick remarks in console
controller.on('tick', function(bot, event) {});

controller.setupWebserver(process.env.PORT || 7000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');

    });
});

