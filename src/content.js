
const chatmessages = document.getElementsByClassName('text-fragment');
const chat = document.getElementsByClassName('chat-scrollable-area__message-container tw-flex-grow-1 tw-pd-b-1');


var regexMoves = new RegExp(/((?:(?:O-O[-O]?)|(?:[KQNBRkqnbr][a-h]?x?[a-h]x?[1-8])|(?:[a-hA-H]x?[a-hA-H]?[1-8]))\+?)\#?/g, 'gi')
var regexTerms = new RegExp(/\b(king|queen|rook|bishop|knight|horse|pawn|pawns|pin|fork|check|mate|checkmate|skewer|zugzwang|push|takes|diagonal)\b/g, 'gi')

var mutationConfig = {attributes: true, childList: true, subtree: true};

var selectedRegEx;
var previous_index = 0;

function addObserverIfDesiredNodeAvailable() {
  if(chat.length == 0) {
      window.setTimeout(addObserverIfDesiredNodeAvailable,500);
      return;
  }
  Array.from(chat).forEach(x =>{
    observer.observe(x, mutationConfig)
  })
}

const callback = function(mutationsList, observer) {
  Array.from(mutationsList).forEach(mutation =>{
    checkSettings();
      if (mutation.type === 'childList') {
        if(mutation.target.getElementsByClassName('text-fragment').length !=0){
          var newestMessage = mutation.target.getElementsByClassName('text-fragment')[mutation.target.getElementsByClassName('text-fragment').length-1].innerHTML
          if(!newestMessage.startsWith('<')){
            if(selectedRegEx!= null){ 
              mutation.target.getElementsByClassName('text-fragment')[mutation.target.getElementsByClassName('text-fragment').length-1].innerHTML = newestMessage.replace(selectedRegEx, function(x){
              console.log('found ' + x)
              return x = '<a class="chessspoiler">[♞ spoiler] <span class="chessspoilertext"> ' + x + '</span></a>';
            })
          }
        }}
      }
  })
};

const observer = new MutationObserver(callback);

addObserverIfDesiredNodeAvailable();

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