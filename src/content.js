
var chatmessages = document.getElementsByClassName('text-fragment')
var regex = /((?:(?:O-O[-0]?)|(?:[KQNBRkqnbr][a-h]?x?[a-h]x?[1-8])|(?:[a-hA-H]x?[a-hA-H]?[1-8]))\+?)\#?/g

replaceMove();
function replaceMove(){
  for( var i = 0, l = chatmessages.length; i < l; i++ ){
    chatmessages[i].innerHTML = chatmessages[i].innerHTML.replace(regex, '[chess move spoiler]')
    }
    setTimeout(replaceMove, 500);
}