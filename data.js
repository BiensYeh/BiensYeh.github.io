var BLUE = "#00BFFF";
var RED = "#FF6347";
var BLACK = "#696969";
var NEUTRAL = "#FFF8DC";
var font = "Bookman";
var width = 200;
var height = 100;
var margin = 10;
var n = 5;
var nbBlue = 8;
var nbRed = 7;
var frameImg = createImage("frame.png");

function onIndexLoad() {
  console.log("load");
  makeSecretTable(); 
  makeWordTable();
  console.log(getCookie("color_0_0"));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function randint(lb, ub) {
  return Math.floor((Math.random() * ub) + lb);
}

function makeMatrix(nbRows, nbCols, value) {
  var array = new Array(nbRows);
  for(var i = 0; i < nbRows; i++) {
    array[i] = new Array(nbCols);
    for(var j = 0; j < nbCols; j++) {
      array[i][j] = value;
    }
  }
  return array;
}

function makeSecretTable() {
  var table = makeMatrix(n, n, NEUTRAL);
  var blue = new Set();
  while(blue.size < nbBlue) {
    blue.add(randint(0, 24));
  }
  var red = new Set();
  while(red.size < nbRed) {
    var i = randint(0, 24);
    if(!blue.has(i)) {
      red.add(i);
    }
  }
  var black = randint(0, 24);
  while(red.has(black) || blue.has(black)) {
    black = randint(0, 24);
  }
  var row = Math.floor(black / n);
  var col = black % n;
  table[row][col] = BLACK;
  blue = Array.from(blue);
  for(var i = 0; i < blue.length; i++) {
    var row = Math.floor(blue[i] / n);
    var col = blue[i] % n;
    table[row][col] = BLUE;
  }
  red = Array.from(red);
  for(var i = 0; i < red.length; i++) {
    var row = Math.floor(red[i] / n);
    var col = red[i] % n;
    table[row][col] = RED;
  }
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      setCookie("color_" + i + "_" + j, table[i][j], 1);
    }
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function createImage(imgSrc) {
  var img = new Image();
  img.src = imgSrc;
  return img;
}

function makeWordTable() {
  var table = makeMatrix(n, n, "N");
  var indexes = new Set();
  while(indexes.size < n * n) {
    indexes.add(randint(0, words.length - 1));
  }
  indexes = Array.from(indexes);
  for(var i = 0; i < indexes.length; i++) {
    var row = Math.floor(i / n);
    var col = i % n;
    table[row][col] = words[indexes[i]];
    setCookie("word_" + row + "_" + col, table[row][col], 1);
  }
}
