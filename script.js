
const BODY = document.querySelector('body');
let TEXTAREA;
let lang;
let getLang;

let objEN = {
    "Backquote": "`",
    "Digit1": "1",
    "Digit2": "2",
    "Digit3": "3",
    "Digit4": "4",
    "Digit5": "5",
    "Digit6": "6",
    "Digit7": "7",
    "Digit8": "8",
    "Digit9": "9",
    "Digit0": "0",
    "Minus": "-",
    "Equal": "=",
    "Backspace": "Backspace",
    "Tab": "Tab",
    "KeyQ": "q",
    "KeyW": "w",
    "KeyE": "e",
    "KeyR": "r",
    "KeyT": "t",
    "KeyY": "y",
    "KeyU": "u",
    "KeyI": "i",
    "KeyO": "o",
    "KeyP": "p",
    "BracketLeft": "[",
    "BracketRight": "]",
    "Backslash": "\\",
    "CapsLock": "CapsLock",
    "KeyA": "a",
    "KeyS": "s",
    "KeyD": "d",
    "KeyF": "f",
    "KeyG": "g",
    "KeyH": "h",
    "KeyJ": "j",
    "KeyK": "k",
    "KeyL": "l",
    "Semicolon": ";",
    "Quote": "'",
    "Enter": "Enter",
    "ShiftLeft": "Shift",
    "KeyZ": "z",
    "KeyX": "x",
    "KeyC": "c",
    "KeyV": "v",
    "KeyB": "b",
    "KeyN": "n",
    "KeyM": "m",
    "Comma": ",",
    "Period": ".",
    "Slash": "/",
    "ArrowUp": "↑",
    "ShiftRight": "Shift",
    "ControlLeft": "Ctrl",
    "MetaLeft": "Win",
    "AltLeft": "Alt",
    "Space": " ",
    "AltRight": "Alt",
    "ArrowLeft": "←",
    "ArrowDown": "↓",
    "ArrowRight": "→",
    "ControlRight": "Ctrl",
}

let objRUS = {
    "Backquote": "ё",
    "Digit1": "1",
    "Digit2": "2",
    "Digit3": "3",
    "Digit4": "4",
    "Digit5": "5",
    "Digit6": "6",
    "Digit7": "7",
    "Digit8": "8",
    "Digit9": "9",
    "Digit0": "0",
    "Minus": "-",
    "Equal": "=",
    "Backspace": "Backspace",
    "Tab": "Tab",
    "KeyQ": "й",
    "KeyW": "ц",
    "KeyE": "у",
    "KeyR": "к",
    "KeyT": "е",
    "KeyY": "н",
    "KeyU": "г",
    "KeyI": "ш",
    "KeyO": "щ",
    "KeyP": "з",
    "BracketLeft": "х",
    "BracketRight": "ъ",
    "Backslash": "\\",
    "CapsLock": "CapsLock",
    "KeyA": "ф",
    "KeyS": "ы",
    "KeyD": "в",
    "KeyF": "а",
    "KeyG": "п",
    "KeyH": "р",
    "KeyJ": "о",
    "KeyK": "л",
    "KeyL": "д",
    "Semicolon": "ж",
    "Quote": "э",
    "Enter": "Enter",
    "ShiftLeft": "Shift",
    "KeyZ": "я",
    "KeyX": "ч",
    "KeyC": "с",
    "KeyV": "м",
    "KeyB": "и",
    "KeyN": "т",
    "KeyM": "ь",
    "Comma": "б",
    "Period": "ю",
    "Slash": ".",
    "ArrowUp": "↑",
    "ShiftRight": "Shift",
    "ControlLeft": "Ctrl",
    "MetaLeft": "Win",
    "AltLeft": "Alt",
    "Space": " ",
    "AltRight": "Alt",
    "ArrowLeft": "←",
    "ArrowDown": "↓",
    "ArrowRight": "→",
    "ControlRight": "Ctrl",
}






function createElem () {
    let container = document.createElement('div');
    container.classList.add("container");
    let h1 = document.createElement('h1');
    h1.innerHTML = 'RSS Keyboard';
    TEXTAREA = document.createElement('textarea');
    let keyboard = document.createElement('div');
    keyboard.id = 'keyboard';
    let p1 = document.createElement('p');
    p1.innerHTML = 'Клавиатура создана в операционной системе Windows';
    let p2 = document.createElement('p');
    p2.innerHTML = 'Для переключения языка комбинация: левый Shift + левый Alt';
    container.appendChild(h1);
    container.appendChild(TEXTAREA);
    container.appendChild(keyboard);
    container.appendChild(p1);
    container.appendChild(p2);


    BODY.appendChild(container);
}


createElem()


getLang = JSON.parse(localStorage.getItem('langOnSite'));


if (getLang == undefined) {
    lang = objEN;
} else {
    lang = getLang;
}



function init() {
    let out = "";

    let langForKeyboard = new Map(Object.entries(lang));

    langForKeyboard.forEach((value, key) => {
        out += '<div class="k-key" data="'+key+'" >'+value+'</div>';
      });

    
    localStorage.setItem('langOnSite', JSON.stringify(lang));
    document.querySelector('#keyboard').innerHTML = out;
}

init()



let capslock;
let pressed = new Set();

document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    if(pressed.size > 2) {
        pressed.clear();
    } else if (pressed.size == 2){
        for (let value of pressed) {
            document.querySelector('#keyboard .k-key[data="'+value+'"]').classList.add('active');
        }
    } else {
        document.querySelector('#keyboard .k-key[data="'+event.code+'"]').classList.add('active');
    }


    for (let value of pressed) {
        if(value == "ShiftLeft" || value=="ShiftRight") {
            if(value != "ShiftLeft" && value !="ShiftRight") {
                TEXTAREA.value += (event.key).toUpperCase();
            }
        }
    }
    

    if (event.key == "Tab") {
        TEXTAREA.value += '    ';
    } else if ((event.key == "Enter")) {
        TEXTAREA.value += '\n'
    } else if ((event.key == "Backspace")) {
        TEXTAREA.value = TEXTAREA.value.slice(0, -1);
    } else if (event.key == "CapsLock") {
        if(capslock == 'true') {
            capslock = 'false';
        } else {
            capslock = 'true';
        }
    } else if (event.key == "ArrowUp") {
        TEXTAREA.value += '↑'
    } else if (event.key == "ArrowDown") {
        TEXTAREA.value += '↓'
    } else if (event.key == "ArrowLeft") {
        TEXTAREA.value += '←'
    } else if (event.key == "ArrowRight") {
        TEXTAREA.value += '→'
    } else {
        if(event.code !== "MetaLeft" && event.code !== "CapsLock" && event.code !== "ShiftLeft" && event.code !== "ShiftRight" && event.code !== "AltLeft" && event.code !== "AltRight" && event.code !== "ControlLeft" && event.code !== "ControlRight") {
            if(capslock == 'true') {
                TEXTAREA.value += (event.key).toUpperCase();
            } else {
                TEXTAREA.value += event.key;
            }
        }
    }


});



document.addEventListener('keyup', function(event) {
    if(pressed.has('AltLeft') && pressed.has('ShiftLeft')) {
        changeLan()
    }
    document.querySelectorAll('#keyboard .k-key').forEach(function (element) {
        element.classList.remove('active');
    });
    pressed.delete(event.code);
    
});





let changeLan = () => {
    document.querySelector('#keyboard').innerHTML = "";
      if (lang == objEN) {
          lang = objRUS;
      } else {
        lang = objEN;
      }
      
    init();
}


document.querySelectorAll('#keyboard .k-key').forEach(function (element) {
    
    element.onmousedown = function (event) {
        document.querySelectorAll('#keyboard .k-key').forEach(function (element) {
            
            element.classList.remove('active');
        });

        let code = this.getAttribute('data');
        this.classList.add('active');


        if (code == "Tab") {
            TEXTAREA.value += '    ';
        } else if ((code == "Enter")) {
            TEXTAREA.value += '\n'
        } else if ((code == "Backspace")) {
            TEXTAREA.value = TEXTAREA.value.slice(0, -1);
        } else if (code == "CapsLock") {
            if(capslock == 'true') {
                capslock = 'false';
            } else {
                capslock = 'true';
            }
        } else {
            if(code !== "MetaLeft" && code !== "CapsLock" && code !== "ShiftLeft" && code !== "ShiftRight" && code !== "AltLeft" && code !== "AltRight" && code !== "ControlLeft" && code !== "ControlRight") {
                if(capslock == 'true') {
                    TEXTAREA.value += (this.innerHTML).toUpperCase();
                } else {
                    TEXTAREA.value += this.innerHTML;
                }
            }
        }

    }
    element.onmouseup = function (event) {
        element.classList.remove('active');
    }
});

