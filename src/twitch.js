const MESSAGE_CLASS = 'text-fragment'

function findMessageTW(mutation) {
    if (mutation.type === 'childList') {
      if(mutation.target.getElementsByClassName(MESSAGE_CLASS).length !=0){
        console.log(mutation.target.getElementsByClassName(MESSAGE_CLASS)[mutation.target.getElementsByClassName(MESSAGE_CLASS).length-1].innerHTML)
        return mutation.target.getElementsByClassName(MESSAGE_CLASS)[mutation.target.getElementsByClassName(MESSAGE_CLASS).length-1].innerHTML
        }
        return "Empty message"
      }
  }
  
function filterMessageTW(mutation, newestMessage) {
      console.log(selectedRegEx)
    if(selectedRegEx!= null){ 
      mutation.target.getElementsByClassName(MESSAGE_CLASS)[mutation.target.getElementsByClassName(MESSAGE_CLASS).length-1].innerHTML = newestMessage.replace(selectedRegEx, function(message){
      return spoiler(message);
      })
    }
  }