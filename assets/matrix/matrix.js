var c = document.getElementById("c");
var ctx = c.getContext("2d");

//var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
var letters = alphabet;

//var colors = ["#5AA509"] // matrix green
var colors = ["red","green","blue","yellow","orange"]
var font_size = 14;
var chance_of_redrop = 0.025;
var fade_alpha = 0.04;
var refresh_interval = 30;

var columns = 0;
var drops = [];
var last_height = 0;
var last_width = 0;

function draw() {

    var curr_height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    var curr_width = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;

    if (curr_height != last_height || curr_width != last_width) {

        // Re-compute canvas dimensions after window is resized, or on first call.
        c.height = curr_height;
        c.width = curr_width;
        last_height = curr_height;
        last_width = curr_width;

        columns = c.width / font_size;
        drops = [];

        for (var x = 0; x < columns; x++) drops[x] = 1;
    }

    // Fade to black by applying alpha on each call.
    ctx.fillStyle = "rgba(0, 0, 0, " + fade_alpha + ")";
    ctx.fillRect(0, 0, c.width, c.height);

    // Pick next color.
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
    ctx.font = font_size + "px arial";

    for (var i = 0; i < drops.length; i++) {
       if (drops[i] * font_size <= c.height) {
          var text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * font_size, drops[i] * font_size);
          drops[i]++;
       }
       else if (Math.random() < chance_of_redrop) {
         // After the first cascade, rain drops will begin to stagger.
         drops[i] = 0;
       }
    }
}

setInterval(draw, refresh_interval);
