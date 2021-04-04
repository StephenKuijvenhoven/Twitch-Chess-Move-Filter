function save_options() {
    var moves = document.getElementById('moves').checked;
    var terms = document.getElementById('terms').checked;
    var retroactively = document.getElementById('retroactively').checked;
    chrome.storage.local.set({
      chessMoves: moves,
      chessTerms: terms,
      retroActive: retroactively
    }, function() {
    });
  }

function restore_options() {
    // Default values
    chrome.storage.local.get({
        chessMoves: false,
        chessTerms: false,
        retroActive: false
    }, function(items) {
      document.getElementById('moves').checked = items.chessMoves;
      document.getElementById('terms').checked = items.chessTerms;
    });
  }

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('moves').addEventListener('change', save_options);
document.getElementById('terms').addEventListener('change', save_options);