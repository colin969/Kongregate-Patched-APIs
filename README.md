# Kongregate Patched APIs

Contains a set of patched Kongregate APIs designed to allow functionality with the offical Website, as well as instructions to create them.

Designed to run on top of Kongregate flash games fixer by Matrix, since that fixes flashvars being decoded properly when given to Ruffle. When run without, it will attempt to establish a connection to Kongregate with incorrectly formatted parameters and fail.

Matrix's flashvar fixing script: https://greasyfork.org/en/scripts/438325-kongregate-flash-games-fixer

Original source links:
- AS2: http://api.kongregate.com/flash/API_f99fa1a5a43e48224ae2c0177064456d.swf
- AS3: https://chat.kongregate.com/flash/API_AS3_d43c4b859e74432475c1627346078677.swf

## Modification Details

Ruffle does not currently implement the `ExternalInterface.call` functionality to run arbitrary JavaScript that the Flash API uses, and won't in the forseeable future due to security concerns.

This repo describes the changes needed (which can be done via JPEXS) to the Flash API swfs to use pre-defined JavaScript functions instead. `replace.js` contains these pre-defined functions, as well as a `fetch()` interceptor which will return the pre-modified API files from this repo instead of those on Kongregate's servers.

The pre-defined JS functions should be loaded inside the game's frame. e.g `https://game115608.konggames.com/games/light_bringer777/learn-to-fly-2/frame/3c45607c-c718-4027-ad27-333bdd6a3473/?kongregate_host=www.kongregate.com` (Matcher `*://*.konggames.com/games/*/*/frame/*`)

### Note on AS2 games

AS2 games will not work on Kongregate, though I have verified the API changes work locally.

Ruffle is also missing behaviour to properly expose the API to the game, which is currently waiting to be reviewed in this pull request: https://github.com/ruffle-rs/ruffle/pull/16210/

Normally, the AS2 api is loaded directly and passed the game swf url via the `game_swf` parameter. Kongregate currently loads the game directly instead, so the API never loads at all, though this would be trivial to change back, and may be revisited once the Ruffle changes are merged.

## Flash API Modifications

Modify using JPEXS

Replace `com.kongregate.as3.client.services.KongregateServices L565` with `result = ExternalInterface.call("window.flashApiBootstrap",swfId,apiUrl);`

Replace `com.kongregate.as3.common.comm.external.ExternalMessageConnection L56` with `ExternalInterface.call("window.flashApiSendMessage",param1.getOpcode(),_loc3_);`

----

Replace `com.kongregate.client.KongregateServices L420` with `var _loc3_ = flash.external.ExternalInterface.call("window.flashApiBootstrap",_loc2_);`

Replace `com.kongregate.common.comm.external.ExternalMessageConnection L72` with `flash.external.ExternalInterface.call("window.flashApiSendMessage",msg.getOpcode(),_loc4_);`

### Debug Output

The pre-modified AS2 swf in this repo forces debug output to level 4. I can't see a way to set it with flashvars.

AS3 api requires `debug_level=4` in the query params for the page.

### User Script

Script link: https://greasyfork.org/en/scripts/494088-kong-flash-api-patcher

Designed to run on top of Kongregate flash games fixer by Matrix, since that fixes flashvars being loaded in Ruffle correctly: https://greasyfork.org/en/scripts/438325-kongregate-flash-games-fixer
