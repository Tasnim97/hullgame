function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth /* window.devicePixelRatio; */
    var windowHeight = window.innerHeight /* window.devicePixelRatio; */
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = 1280 / 720;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}