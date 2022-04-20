const TWITCH_URL = "https://www.twitch.tv/"
const LICHESS_URL = "https://lichess.org/"
const YOUTUBE_URL = "https://www.youtube.com/"

const TWITCH_CHAT = 'chat-scrollable-area__message-container'
const LICHESS_CHAT = 'mchat__messages'
const YOUTUBE_CHAT = '' //TODO


const currentSite = window.location.toString();

var chat;

if(currentSite.includes(TWITCH_URL)){
  this.findMessage = (mutation) => findMessageTW(mutation);
  this.filterMessage = (mutation, newMessage) => filterMessageTW(mutation, newMessage);
  chat = document.getElementsByClassName(TWITCH_CHAT);
}
if(currentSite.includes(LICHESS_URL)){
  this.findMessage = (mutation) => findMessageLC(mutation);
  this.filterMessage = (mutation, newMessage) => filterMessageLC(mutation, newMessage);
  chat = document.getElementsByClassName(LICHESS_CHAT);
}
if(currentSite.includes(YOUTUBE_URL)){
  //TODO
}

// Regular expression for the English Algebraic notation of chess
var regexMoves = new RegExp(/((?:(?:O-O[-O]?)|(?:[KQNBRkqnbr][a-h]?x?[a-h]x?[1-8])|(?:[a-hA-H]x?[a-hA-H]?[1-8]))\+?)\#?/g, 'gi')
// Regular expression for English piece names and common terms
var regexTerms = new RegExp(/\b(king|queens?|rooks?|bishops?|knights?|horses?|pawns?|pins?|forks?|checks?|mate|checkmate|skewer|zugzwang|push|takes?|diagonals?|blunders?)\b/g, 'gi')

// Enable the mutation observer to observe the child elements of the Twitch chat, the chat messages
var mutationConfig = {childList: true};

// Global viable to track the RegEx in use
var selectedRegEx;

// Recursive function to check if the Twitch chat contains messages 
function addObserverIfDesiredNodeAvailable() {
  if(chat.length == 0) {
      window.setTimeout(addObserverIfDesiredNodeAvailable,500);
      return;
  }
  Array.from(chat).forEach(x =>{
    observer.observe(x, mutationConfig)
  })
}

// Main function for replacing the Chess moves with the chess-spoiler HTML element 
const callback = function(mutationsList, observer) {
  Array.from(mutationsList).forEach(mutation =>{
    checkSettings();
    console.log("callback test")
    newestMessage = findMessage(mutation);
    if(!newestMessage.includes('<a class="chess-spoiler">')){
      filterMessage(mutation, newestMessage)
    }
  })
};

const observer = new MutationObserver(callback);

// The spoiler message that will replace the chess move
const spoiler = (message)=>  {
  return '<a class="chess-spoiler">[♞ spoiler]<span class="chess-spoiler-text"> ' + message + '</span></a>'
}

addObserverIfDesiredNodeAvailable();

// Method for setting the RegEx used in filtering
function checkSettings(){
  chrome.storage.local.get({
    chessMoves: false,
    chessTerms: false,
  },
  function(items) {
    if(items.chessMoves){
      selectedRegEx = regexMoves
    }
    if(items.chessTerms){
      selectedRegEx = regexTerms
    }
    if(items.chessMoves && items.chessTerms){
      selectedRegEx = new RegExp(regexMoves.source + "|" + regexTerms.source, 'gi');
    }
    if(!items.chessMoves && !items.chessTerms){
      selectedRegEx = null;
    }
  });
}