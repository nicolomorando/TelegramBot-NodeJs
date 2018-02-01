var telegramBot = require('node-telegram-bot-api');
var sentiment = require('sentiment');

var token ='499098435:AAEdqTCTBAsx6-QqY3msQak-2t5azJYCEUU';

var api = new telegramBot(token, {polling: true});

api.onText(/\/author/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "Il mio sviluppatore si chiama: Morando Nicolò.\nAttualmente sono ancora in fase di sviluppo, tuttavia rimani aggiornato!\nVersione:1.1, Author Website: http://www.fuckjupp.com/");
});

api.onText(/\/start/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "Ciao! Io sono Fact Inside the bot!" + 
                          "\nAttualmente sono in fase di sviluppo, però sono già disponibili vari tools. "+
                          "\nCome ad esempio:\n/start\n/author\n/vmintelligence");
});

var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};

api.onText(/\/vmintelligence/, function(msg, match) {
  var fromId = msg.from.id;  
  api.sendMessage(fromId, "Ok, scrivimi qualcosa (In inglese) così che io possa darti le mie opinioni.", opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    api.onReplyToMessage(chatId, messageId, function (message) {
      var sentival = sentiment(message.text);
      api.sendMessage(fromId,"Le mie opinioni a riguardo sono:\n(da 0 in su: positive)(da 0 in giù: negative)\nOpinione: " + sentival.score +", Valore: "+sentival.comparative);
    });
  });                          
                          
});


console.log("bot run. Start conversations in your Telegram.");