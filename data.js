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

var secretTable = makeSecretTable();

var wordTable = makeWordTable();
var cardCanvas = makeMatrix(n, n, null);
var fontMatrix = makeMatrix(n, n, null);

for(var i = 0; i < wordTable.length; i++) {
  for(var j = 0; j < wordTable[i].length; j++) {
    makeCanvas(i, j);
  }
}

