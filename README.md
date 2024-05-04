# Kongregate Patched APIs

Contains a set of patched Kongregate APIs designed to allow functionality with the offical Website

Original source links:
- AS2: http://api.kongregate.com/flash/API_f99fa1a5a43e48224ae2c0177064456d.swf
- AS3: https://chat.kongregate.com/flash/API_AS3_d43c4b859e74432475c1627346078677.swf

## JavaScript Modifications

Ruffle does not currently implement the arbitrary JS calls that the API requires. Instead, you must insert the functions described in replace.js to allow it to function properly, and to patch an issue with Kong incorrectly finding compataible divs.

Function must run inside the game's iframe.

## Flash API Modifications

Modify using JPEXS

Replace `com.kongregate.as3.client.services.KongregateServices L565` with `result = ExternalInterface.call("window.flashApiBootstrap",swfId,apiUrl);`

Replace `com.kongregate.as3.common.comm.external.ExternalMessageConnection L56` with `ExternalInterface.call("window.flashApiSendMessage",param1.getOpcode(),_loc3_);`

----

Replace `com.kongregate.client.KongregateServices L420` with `var _loc3_ = flash.external.ExternalInterface.call("window.flashApiBootstrap",_loc2_);`

Replace `com.kongregate.common.comm.external.ExternalMessageConnection L72` with `flash.external.ExternalInterface.call("window.flashApiSendMessage",msg.getOpcode(),_loc4_);`

### Debug Output

Pre-patched AS2 api forces debug output to level 4. I can't see a way to set it with flashvars.

AS3 api requires `?debug_level=4` in the query params for the page.

### User Script

Script link: https://greasyfork.org/en/scripts/494088-kong-flash-api-patcher

Must run on top of Kongregate flash games fixer by Matrix: https://greasyfork.org/en/scripts/438325-kongregate-flash-games-fixer