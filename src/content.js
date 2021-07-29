
// Get the Twitch chat HTML element
const chat = document.getElementsByClassName('chat-scrollable-area__message-container');

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
      if (mutation.type === 'childList') {
        if(mutation.target.getElementsByClassName('text-fragment').length !=0){
          var newestMessage = mutation.target.getElementsByClassName('text-fragment')[mutation.target.getElementsByClassName('text-fragment').length-1].innerHTML
          if(!newestMessage.includes('<a class="chess-spoiler">')){
            if(selectedRegEx!= null){ 
              mutation.target.getElementsByClassName('text-fragment')[mutation.target.getElementsByClassName('text-fragment').length-1].innerHTML = newestMessage.replace(selectedRegEx, function(message){
              return spoiler(message);
            })
          }
        }}
      }
  })
};

const observer = new MutationObserver(callback);

// The spoiler message that will replace the chess move
const spoiler = (message)=>  {
  return '<a class="chess-spoiler">[♞ spoiler] <span class="chess-spoiler-text"> ' + message + '</span></a>'
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