
var chatmessages = document.getElementsByClassName('text-fragment')
var regexMoves = new RegExp(/((?:(?:O-O[-O]?)|(?:[KQNBRkqnbr][a-h]?x?[a-h]x?[1-8])|(?:[a-hA-H]x?[a-hA-H]?[1-8]))\+?)\#?/g, 'gi')
var regexTerms = new RegExp(/\b(king|queen|rook|bishop|knight|horse|pawn|pin|fork|check|mate|checkmate|skewer|zugzwang)\b/g, 'gi')
var selectedRegEx;
var previous_index = 0;


findSpoiler();
function findSpoiler(){
  checkSettings();
  if(previous_index < chatmessages.length){
    if(selectedRegEx!= null){
      replaceSpoiler(selectedRegEx)
    }
  }
    setTimeout(findSpoiler, 100);
}

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

function replaceSpoiler(regex){
for( var i = previous_index, l = chatmessages.length; i < l; i++ ){
      chatmessages[i].innerHTML = chatmessages[i].innerHTML.replace(regex, function(x){
        return x = '<a class="chessspoiler">[♞ spoiler] <span class="chessspoilertext"> ' + x + '</span></a>';
      })
      }
      previous_index = chatmessages.length;
}