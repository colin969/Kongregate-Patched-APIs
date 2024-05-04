window.flashApiSendMessage = (opcode, parameters) => {
    setTimeout(() => {
        kongregateAPI.messageConnection.sendMessage(opcode, decodeURIComponent(parameters));
    });
};

window.flashApiBootstrap = (swfId, apiUrl) => {
  setTimeout(() => {
      function setGameSwf(){
          if (typeof kongregateAPI !== 'undefined') {
              setTimeout(function(){
                if (!document.findElementById(swfId)) {
                    // Ruffle always reports gamediv, fixer script breaks this, so try game_wrapper instead
                    swfId = "game_wrapper";
                }

                // Fix _isSwf conditional
                kongregateAPI._isSwf = function (elem) {
                    return elem && elem.setConnectionObject !== undefined
                };

                kongregateAPI._setGameSwf(swfId);
              }, 1);
              return true;
          }
      }

      function loadKongregateApi() {
          var s = document.createElement('script');
          s.type ='text/javascript';
          s.src = apiUrl;
          if(s.addEventListener) {
              s.addEventListener('load', setGameSwf)
          } else if(s.readyState) {
              s.onreadystatechange = setGameSwf;
          }
          document.getElementsByTagName('head')[0].appendChild(s);
      }

      if (!setGameSwf()) {
          loadKongregateApi();
      }
      return 'pending';
  });
  return "pending";
};