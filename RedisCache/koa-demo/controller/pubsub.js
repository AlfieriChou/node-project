var redis = require("redis");
const config = require('../config/config')
// var sub = redis.createClient({
//   host: config.redis.host,
//   port: config.redis.port
// }), pub = redis.createClient({
//   host: config.redis.host,
//   port: config.redis.port
// });
// var msg_count = 0;

// sub.on("subscribe", function (channel, count) {
//   pub.publish("a nice channel", "I am sending a message.");
//   pub.publish("a nice channel", "I am sending a second message.");
//   pub.publish("a nice channel", "I am sending my last message.");
// });

// sub.on("message", function (channel, message) {
//   console.log("sub channel " + channel + ": " + message);
//   msg_count += 1;
//   if (msg_count === 3) {
//     sub.unsubscribe();
//     sub.quit();
//     pub.quit();
//   }
// });

// sub.subscribe("a nice channel");

var client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
}); //creates a new client

client.on('connect', function() {
  console.log('connected');
});

client.hmset('frameworks', {
  'javascript': 'AngularJS',
  'css': 'Bootstrap',
  'node': 'Express'
});

// client.hmset('frameworks', {
//   'node': 'Express4',
//   'db' : 'MongoDB'
// });