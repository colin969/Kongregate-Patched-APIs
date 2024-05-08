(function() {
    'use strict';
    // Create JS replacement funcs
    window.flashApiSendMessage = (opcode, parameters) => {
        setTimeout(() => {
            kongregateAPI.messageConnection.sendMessage(opcode, decodeURIComponent(parameters));
        });
    };

    window.flashApiBootstrap = (swfId, apiUrl) => {
        console.log('Flash setting up from ' + swfId);
        setTimeout(() => {
            function setGameSwf(){
                if (typeof kongregateAPI !== 'undefined') {
                    // Ruffle doesn't have Play function, removed from check
                    kongregateAPI._isSwf = function(e) {
                        return e && void 0 !== e.setConnectionObject;
                    };

                    // Modified to check for ruffle-player, not just objects and embeds
                    kongregateAPI._findSwf = function(e) {
                        var t = document.getElementById(e),
                            n = this,
                            s = function(e) {
                                for (var s = 0; s < e.length; s++)
                                    if (t = e[s], n._isSwf(t)) return t
                            };
                        return this._isSwf(t) ? t : t = s(document.getElementsByName(e)) || s(document.querySelectorAll("[id='" + e + "']")) || s(document.getElementsByTagName("object")) || s(document.getElementsByTagName("embed")) || s(document.getElementsByTagName("ruffle-player"))
                    };
                    setTimeout(function(){ kongregateAPI._setGameSwf(swfId); }, 1);
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

    // Replace fetch so we can capture the api
    const originalFetch = window.fetch;

    window.fetch = function(req, options) {
        let request = new URL(req instanceof Request ? req.url : req);

        if (request.href.includes("API_AS3_d43c4b859e74432475c1627346078677.swf") || request.href.includes("API_AS3.swf")) {
            request.href = "https://colin969.github.io/Kongregate-Patched-APIs/API_AS3_MODIFIED.swf";
        }

        if (request.href.includes("API_f99fa1a5a43e48224ae2c0177064456d.swf") || request.href.includes("/flash/API.swf")) {
            request.href = "https://colin969.github.io/Kongregate-Patched-APIs/API_AS2_MODIFIED.swf";
        }

        return originalFetch(request, options);
    };
})();
