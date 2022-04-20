const MESSAGE_TAG = 't'

function findMessageLC(mutation) {
    console.log("test")
    if (mutation.type === 'childList') {
      if(mutation.target.getElementsByTagName(MESSAGE_TAG).length !=0){
        console.log(mutation.target.getElementsByTagName(MESSAGE_TAG)[mutation.target.getElementsByTagName(MESSAGE_TAG).length-1].innerHTML)
            return mutation.target.getElementsByTagName(MESSAGE_TAG)[mutation.target.getElementsByTagName(MESSAGE_TAG).length-1].innerHTML
        }
        return "Empty message"
      }
  }
  
function filterMessageLC(mutation, newestMessage) {
        console.log(selectedRegEx)
    if(selectedRegEx!= null){ 
        console.log('Gets here')
        mutation.target.getElementsByTagName(MESSAGE_TAG)[mutation.target.getElementsByTagName(MESSAGE_TAG).length-1].innerHTML = newestMessage.replace(selectedRegEx, function(message){
        console.log('Final here')
        return spoiler(message);
      })
    }
  }