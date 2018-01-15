
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


/*

*/

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
  return table;
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
  }
  return table;
}

function clearCanvas(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function fill(canvas, color) {
  var context = canvas.getContext("2d");
  context.fillStyle = color;
  context.fillRect(11, 8, 188 - 11, 90 - 8);
}

function makeCanvas(row, col) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");

  
  //fill(canvas, secretTable[row][col]);

  var size = 30;
  context.font = size + "px " + font;
  while(context.measureText(wordTable[row][col]).width > 160) {
    size -= 1;
    context.font = size + "px " + font;
  }

  fontMatrix[row][col] = size + "px " + font;

  var textWidth = context.measureText(wordTable[row][col]).width;
  //context.fillRect(0, 0, width, height);
  context.drawImage(frameImg, 0, 0);
  context.fillStyle = "#000000";
  context.fillText(wordTable[row][col], (width - textWidth) / 2, (height + 10) / 2);
  var x = (width + margin) * col + (screen.width - 50 - n * (width + margin)) / 2;
  var y = (height + margin) * row + (screen.height - 200 - n * (height + margin)) / 2;
  canvas.style = "position: fixed; left: " + x + "px; top: " + y + "px;";

  canvas.addEventListener("click", function() {
    clearCanvas(canvas);
    fill(canvas, secretTable[row][col]);
    context.drawImage(frameImg, 0, 0);
    context.font = fontMatrix[row][col];
    var textWidth = context.measureText(wordTable[row][col]).width;
    console.log(wordTable[row][col]);
    context.fillStyle = "#000000";
    context.fillText(wordTable[row][col], (width - textWidth) / 2, (height + 10) / 2);
  }, false);

  cardCanvas[row][col] = canvas;

  document.getElementById("test").appendChild(canvas);
}

  
/*
import random

class Word:

  def __init__(self, fr, en):
    self.fr = fr
    self.en = en

  def __str__(self):
    return '{0} {1}'.format(self.fr, self.en)

def upfirst(s):
  return s[0].upper() + s[1:]

def read_words():
  f = open('words', 'r')
  lines = [line.strip() for line in f.readlines()]
  f.close()
  words = [ ]
  for line in lines:
    data = line.split(' ')
    fr = upfirst(data[0])
    en = upfirst(data[1])
    words.append(Word(fr, en))
  return words

def get_pos(i):
  return (i / 5, i % 5)

def make_word_matrix(words):
  indexes = set()
  while len(indexes) < 25:
    indexes.add(random.randint(0, len(words) - 1))
  print(indexes)
  M = [ [ ''  for j in range(5) ] for i in range(5) ]
  k = 0
  for i in indexes:
    x, y = get_pos(k)
    k += 1
    M[x][y] = words[i]
  return M

def make_secret_matrix():
  M = [ [ 'Neutral' for j in range(5) ] for i in range(5) ]
  blue = set()
  red = set()
  while len(blue) < 8:
    i = random.randint(0, 24)
    blue.add(i)
  while len(red) < 7:
    i = random.randint(0, 24)
    if not i in blue:
      red.add(i)
  i = random.randint(0, 24)
  while i in blue or i in red:
    i = random.randint(0, 24)
  black = i
  for i in blue:
    x, y = get_pos(i)
    M[x][y] = 'Blue'
  for i in red:
    x, y = get_pos(i)
    M[x][y] = 'Red'
  x, y = get_pos(black)
  M[x][y] = 'Black'
  return M

words = read_words()

secret = make_secret_matrix()
for l in secret:
  print(l)

matrix = make_word_matrix(words)
s = ''
for i in range(5):
  for j in range(5):
    s += str(matrix[i][j]) + '\t'
  s += '\n'
print(s)
*/
