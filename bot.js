const TelegramBot = require('node-telegram-bot-api');
let music = require('musicmatch')({apikey:"52d6ace43232f2a871e699dc324ffbe8"});


// replace the value below with the Telegram token you receive from @BotFather
const token = '1209283272:AAFTDTbBxr1-JdkdlJGoYsxLPwiTfhxWRsc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["Sample text", "Second sample"],   ["Чарт Топ-10 🇺🇸"], ["Чарт Топ-10 🇷🇺"]]
      }
  });
      
  });

  bot.on('message', async (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "Чарт Топ-10 🇺🇸";
    if (msg.text.indexOf(bye) === 0) {
      const chatId = msg.chat.id;

      async function chart () {
      let resp = await music.chartTracks({page:1, page_size:10, country:"US", f_has_lyrics:1})
      return resp
      }
      const findArr = await chart()
      console.log(findArr.message.body.track_list);
      // for (let index = 0; index < findArr.message.body.track_list.length; index++) {
        let counter = 0
      let interval = setInterval(() => {
        if (counter > 8) {
          // console.log(FEOFEOFOEFJ);
          clearInterval(interval)
        }
        bot.sendMessage(chatId, `=========${counter + 1}=========\nНазвание: ${findArr.message.body.track_list[counter].track.track_name}\nИсполнитель: ${findArr.message.body.track_list[counter].track.artist_name}\nАльбом: ${findArr.message.body.track_list[counter].track.album_name}\nId песни: ${findArr.message.body.track_list[counter].track.track_id}\nБольше информации здесь: ${findArr.message.body.track_list[counter].track.track_share_url}`);
        counter += 1
      }, 300)
    }    
    var robot = "Чарт Топ-10 🇷🇺";
    if (msg.text.indexOf(robot) === 0) {
  const chatId = msg.chat.id;

      async function chart () {
      let resp = await music.chartTracks({page:1, page_size:10, country:"RU", f_has_lyrics:1})
      return resp
      }
      const findArr = await chart()
      console.log(findArr.message.body.track_list);
      // for (let index = 0; index < findArr.message.body.track_list.length; index++) {
        let counter = 0
      let interval = setInterval(() => {
        if (counter > 8) {
          // console.log(FEOFEOFOEFJ);
          clearInterval(interval)
        }
        bot.sendMessage(chatId, `=========${counter + 1}=========\nНазвание: ${findArr.message.body.track_list[counter].track.track_name}\nИсполнитель: ${findArr.message.body.track_list[counter].track.artist_name}\nАльбом: ${findArr.message.body.track_list[counter].track.album_name}\nId песни: ${findArr.message.body.track_list[counter].track.track_id}\nБольше информации здесь: ${findArr.message.body.track_list[counter].track.track_share_url}`);
        counter += 1
      }, 300)
    }
    });
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
async function lyrics () {
  let text = await music.trackLyrics({track_id:197246819})
  return text
 }
// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;

//   // console.log(eee.message.body.lyrics.lyrics_body);

//   // send a message to the chat acknowledging receipt of their message
//   const eee = await lyrics()
  
//   bot.sendMessage(chatId, eee.message.body.lyrics.lyrics_body)
// })


bot.onText(/\/text (.+)/, async (msg, match) => {
  console.log(match);
  
  const resp = match[1];
  async function lyrics (resp) {
    let text = await music.trackLyrics({track_id: resp})
    return text
  }
  const eee = await lyrics(resp)
  const chatId = msg.chat.id;
  
    bot.sendMessage(chatId, eee.message.body.lyrics.lyrics_body);
  });


  bot.onText(/\/find (.+)/, async (msg, match) => {
    console.log(match);
    const resp = match[1];
    let size = 5
    // console.log(match[1][2]);
    
    async function find (resp) {
      let text = await music.trackSearch({q: resp, page:1, page_size: size})
      return text
    }
    const findArr = await find(resp)
    // console.log(eee.message.body.track_list[0].track);
    
    const chatId = msg.chat.id;
    let index = 0
    let interval = setInterval(() => {
      if (index > size - 2) {
        // console.log(FEOFEOFOEFJ);
        clearInterval(interval)
      } 
      bot.sendMessage(chatId, `=========${index + 1}=========\nНазвание: ${findArr.message.body.track_list[index].track.track_name}\nИсполнитель: ${findArr.message.body.track_list[index].track.artist_name}\nАльбом: ${findArr.message.body.track_list[index].track.album_name}\nId песни: ${findArr.message.body.track_list[index].track.track_id}\nБольше информации здесь: ${findArr.message.body.track_list[index].track.track_share_url}`);
      index += 1
    }, 300)
  });
  
  
