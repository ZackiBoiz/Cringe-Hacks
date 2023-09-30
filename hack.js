// ==UserScript==
// @name         Bloxd.io Keybinds v2.2
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  (NEW - With GUI!) Easy keybinds to make gameplay more desirable
// @author       zackiboiz
// @match        *://bloxd.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bloxd.io
// @grant        none
// @license      MIT
// ==/UserScript==
const version = "v2.2";
localStorage.gui_top ??= 0;
localStorage.gui_left ??= 0;

var gui = document.createElement("div");
gui.setAttribute("id", "gui");
gui.setAttribute("style", `position: absolute; z-index: 9; background-color: #f1f1f1; border: 1px solid #d3d3d3; top: ${localStorage.gui_top}px; left: ${localStorage.gui_left}px;`);
gui.innerHTML = `
<div id="gui-header" style="padding: 10px; cursor: move; z-index: 10; background-color: #4eaddb; color: #fff; text-align: center;">
<span style="font-size: 1.5em;">
Bloxd.io Keybinds ${version}
<br>
By ZackiBoiz
</span>
</div>
<div style="background-color: #ffaa00; color: #000;">
<span style="font-size: 1.5em;">
Keybinds:<br>
</span>
<span id="kb-span" style="color: #222; text-align: left;">
<span id="kb-use">Alt + ; - Spam Use Item</span><br>
<span id="kb-drop">Alt + , - Spam Drop Item</span><br>
<span id="kb-mine">Alt + . - Mine 2x Speed</span><br>
<span id="kb-respawn">Alt + ' - Auto Respawn</span><br>
<span id="kb-chat">Alt + \\ - Spam Chat (BETA)</span><br>
</span>
</div>
`;
document.body.appendChild(gui);
var keybinds = document.querySelector("#kb-span").children;
for (var kb of keybinds) {
  kb.style.color = "#dd0000";
}
var spam_use_span = document.querySelector("#kb-use");
var fast_mine_span = document.querySelector("#kb-mine");
var spam_drop_span = document.querySelector("#kb-drop");
var auto_respawn_span = document.querySelector("#kb-respawn");
var spam_chat_span = document.querySelector("#kb-chat");

dragElement(gui);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    localStorage.gui_top = elmnt.offsetTop - pos2;
    localStorage.gui_left = elmnt.offsetLeft - pos1;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
const wait = ms => new Promise(res => setTimeout(res, ms));

// alert("HOLD ALT ON KEYBINDS\n\nPress ; to start auto E/right click\nPress , to start auto Q/drop\nPress ./' to stop scripts");

var timers = {};
var timer;
var ke1;
var ke2;
var original = Date.now;

document.addEventListener("keydown", e => {
  if (e.altKey) {
    switch (e.key) {
      case ";": {
        if (!timers.spam_use) {
          ke1 = new KeyboardEvent('keydown', {
            code: 'KeyE',
            key: 'e',
            charCode: 69,
            keyCode: 69,
            view: window,
            bubbles: true
          });
          ke2 = new KeyboardEvent('keyup', {
            code: 'KeyE',
            key: 'e',
            charCode: 69,
            keyCode: 69,
            view: window,
            bubbles: true
          });

          clearInterval(timers?.spam_use ?? 0);
          timer = setInterval(() => {
            document.dispatchEvent(ke1);
            document.dispatchEvent(ke2);
          });
          timers.spam_use = timer;
          spam_use_span.style.color = "#00aa00";
        } else {
          clearInterval(timers.spam_use);
          timers.spam_use = null;
          spam_use_span.style.color = "#dd0000";
        }

        break;
      }
      case ",": {
        if (!timers.spam_drop) {
          ke1 = new KeyboardEvent('keydown', {
            code: 'KeyQ',
            key: 'q',
            charCode: 81,
            keyCode: 81,
            view: window,
            bubbles: true
          });
          ke2 = new KeyboardEvent('keyup', {
            code: 'KeyQ',
            key: 'q',
            charCode: 81,
            keyCode: 81,
            view: window,
            bubbles: true
          });

          clearInterval(timers?.spam_drop ?? 0);
          timer = setInterval(() => {
            document.dispatchEvent(ke1);
            document.dispatchEvent(ke2);
          });
          timers.spam_drop = timer;
          spam_drop_span.style.color = "#00aa00";
        } else {
          clearInterval(timers.spam_drop);
          timers.spam_drop = null;
          spam_drop_span.style.color = "#dd0000";
        }

        break;
      }
      case ".": {
        if (!timers.fast_mine) {
          Date.now = () => {
            return original() * 2;
          };
          //Date.now.toString = () => { return "function now() {\n    [native code]\n}" };
          timers.fast_mine = true;
          fast_mine_span.style.color = "#00aa00";
        } else {
          Date.now = () => {
            return original();
          };
          //Date.now.toString = original.toString;
          timers.fast_mine = false;
          fast_mine_span.style.color = "#dd0000";
        }

        break;
      }
      case "'": {
        if (!timers.auto_respawn) {
          clearInterval(timers?.auto_respawn ?? 0);
          timer = setInterval(() => {
            var respawn_btn = document.querySelector(".RespawnButton.BlueButton.NewButton");
            if (respawn_btn) {
              respawn_btn.click();
            }
          });
          timers.auto_respawn = timer;
          auto_respawn_span.style.color = "#00aa00";
        } else {
          clearInterval(timers.spam_use);
          timers.auto_respawn = null;
          auto_respawn_span.style.color = "#dd0000";
        }

        break;
      }
      case "\\": {
        if (!timers.spam_chat) {
          const ke = new KeyboardEvent('keydown', {
            code: 'Enter',
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            view: window,
            bubbles: true
          });
          clearInterval(timers?.spam_chat ?? 0);

          var message = prompt("Enter spam message (messages are split by 5 seconds due to rate limiting)");
          var i = 0;
          timer = setInterval(async () => {
            var chatbox = document.querySelector(".ChatInput");
            if (chatbox) {
              document.dispatchEvent(ke);
              chatbox.value = message + (i % 2 == 0 ? " " : "") + ".";
              document.dispatchEvent(ke);
              document.querySelector(".WholeAppWrapperInner").requestPointerLock(); // -- CONT -- // Find out how to hide cursor while still being able to move camera
              i++;
            }
          }, 3000);
          timers.spam_chat = timer;
          spam_chat_span.style.color = "#00aa00";
        } else {
          clearInterval(timers.spam_chat);
          timers.spam_chat = null;
          spam_chat_span.style.color = "#dd0000";
        }

        break;
      }
    }
  }
});
