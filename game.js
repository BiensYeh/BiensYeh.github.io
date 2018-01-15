
var fontMatrix = makeMatrix(n, n, null);

function onPrivateBodyLoad() {
  console.log("private");
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      makeCanvas(i, j, true);
    }
  }
}

function onPublicBodyLoad() {
  console.log("public");
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      makeCanvas(i, j, false);
    }
  }
}

function deleteById(id) {
  var element = document.getElementById(id);
  if(element != null) {
    element.outerHTML = "";
    delete element;
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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



function clearCanvas(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function fill(canvas, color) {
  var context = canvas.getContext("2d");
  context.fillStyle = color;
  context.fillRect(11, 8, 188 - 11, 90 - 8);
}

function getWord(row, col) {
  return getCookie("word_" + row + "_" + col);
}

function getColor(row, col) {
  return getCookie("color_" + row + "_" + col);
}

function makeCanvas(row, col, private) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");
  var size = 30;
  context.font = size + "px " + font;
  while(context.measureText(getWord(row, col)).width > 160) {
    size -= 1;
    context.font = size + "px " + font;
  }

  if(private) {
    fill(canvas, getColor(row, col));
  }

  fontMatrix[row][col] = size + "px " + font;

  var textWidth = context.measureText(getWord(row, col)).width;
  //context.fillRect(0, 0, width, height);
  context.drawImage(frameImg, 0, 0);
  context.fillStyle = "#000000";
  context.fillText(getWord(row, col), (width - textWidth) / 2, (height + 10) / 2);
  var x = (width + margin) * col + (screen.width - 50 - n * (width + margin)) / 2;
  var y = (height + margin) * row + (screen.height - 200 - n * (height + margin)) / 2;
  canvas.style = "position: fixed; left: " + x + "px; top: " + y + "px;";

  if(private) {
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
  }

  document.getElementById("container").appendChild(canvas);
}
