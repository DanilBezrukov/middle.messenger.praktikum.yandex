/* eslint-disable no-unused-vars */
export const enum EVENT {
    // События мыши
    Click = 'click',
    DblClick = 'dblclick',
    MouseDown = 'mousedown',
    MouseEnter = 'mouseenter',
    MouseLeave = 'mouseleave',
    MouseMove = 'mousemove',
    MouseOut = 'mouseout',
    MouseOver = 'mouseover',
    MouseUp = 'mouseup',
    ContextMenu = 'contextmenu',

    // События клавиатуры
    KeyDown = 'keydown',
    KeyUp = 'keyup',
    KeyPress = 'keypress',

    // События фокуса
    Focus = 'focus',
    Blur = 'blur',
    FocusIn = 'focusin',
    FocusOut = 'focusout',

    // События формы
    Change = 'change',
    Input = 'input',
    Submit = 'submit',
    Reset = 'reset',
    Invalid = 'invalid',
    Select = 'select',
    BeforeInput = 'beforeinput',

    // События окна
    Resize = 'resize',
    Scroll = 'scroll',

    // События касания
    TouchStart = 'touchstart',
    TouchMove = 'touchmove',
    TouchEnd = 'touchend',
    TouchCancel = 'touchcancel',

    // События указателя
    PointerDown = 'pointerdown',
    PointerUp = 'pointerup',
    PointerMove = 'pointermove',
    PointerEnter = 'pointerenter',
    PointerLeave = 'pointerleave',
    PointerOver = 'pointerover',
    PointerOut = 'pointerout',
    PointerCancel = 'pointercancel',
    GotPointerCapture = 'gotpointercapture',
    LostPointerCapture = 'lostpointercapture',

    // События перетаскивания
    Drag = 'drag',
    DragEnd = 'dragend',
    DragEnter = 'dragenter',
    DragLeave = 'dragleave',
    DragOver = 'dragover',
    DragStart = 'dragstart',
    Drop = 'drop',

    // События медиа
    Abort = 'abort',
    CanPlay = 'canplay',
    CanPlayThrough = 'canplaythrough',
    DurationChange = 'durationchange',
    Emptied = 'emptied',
    Ended = 'ended',
    Error = 'error',
    LoadedData = 'loadeddata',
    LoadedMetadata = 'loadedmetadata',
    LoadStart = 'loadstart',
    Pause = 'pause',
    Play = 'play',
    Playing = 'playing',
    Progress = 'progress',
    RateChange = 'ratechange',
    Seeked = 'seeked',
    Seeking = 'seeking',
    Stalled = 'stalled',
    Suspend = 'suspend',
    TimeUpdate = 'timeupdate',
    VolumeChange = 'volumechange',
    Waiting = 'waiting',

    // События выполнения скриптов
    DOMContentLoaded = 'DOMContentLoaded',
    Load = 'load',
    Unload = 'unload',
    BeforeUnload = 'beforeunload',

    // События анимации и переходов
    AnimationStart = 'animationstart',
    AnimationEnd = 'animationend',
    AnimationIteration = 'animationiteration',
    TransitionStart = 'transitionstart',
    TransitionEnd = 'transitionend',
    TransitionRun = 'transitionrun',
    TransitionCancel = 'transitioncancel',

    // События сети
    Online = 'online',
    Offline = 'offline',

    // Колёсико мыши
    Wheel = 'wheel',

    // События копирования и вставки
    Copy = 'copy',
    Cut = 'cut',
    Paste = 'paste',

    // События всплытия
    PopState = 'popstate',

    // События WebSocket
    Open = 'open',
    Close = 'close',
    Message = 'message',
    MessageError = 'messageerror',

    // События видимости страницы
    PageHide = 'pagehide',
    PageShow = 'pageshow',
    VisibilityChange = 'visibilitychange',
}
