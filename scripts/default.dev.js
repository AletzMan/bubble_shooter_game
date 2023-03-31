"use strict";

var containerAnimation = document.getElementById("containerAnimation");
var explosion = document.querySelector(".explosion");
var soundExplosion = document.getElementById("soundExplosion");
var soundPainballShoot = document.getElementById("painball_shoot");
var time = document.getElementById("time").children[0];
var hits = document.getElementById("hits").children[0];
var misses = document.getElementById("misses").children[0];
var targetImg = document.getElementById("targetImg");
var scoreboard = document.querySelector(".scoreboard");
var shoots = document.getElementById("shoots").children[0];
var mutedButton = document.getElementById("mutedButton");
var gameOverCard = document.querySelector(".gameovercard");
var buttonHowToPlay = document.querySelector(".header__howtoplay");
var windosHowToPlay = document.querySelector(".header__window");
var imageTargetID = GetRandomNumber(1, 41);
targetImg.src = "../images/comp_".concat(imageTargetID, ".svg");
var deflectedShoot = true;
var elementStates = [];
var startTime = 0;
var totalmisses = 0;
var totalhits = 0;
var totalShots = 30;
var maxMisses = 20;
var gameOver = false;
var viewWindowHowToPlay = false;
shoots.innerText = totalShots;
CreateSquares(45);
buttonHowToPlay.addEventListener('mousedown', function () {
  viewWindowHowToPlay = !viewWindowHowToPlay;
  if (viewWindowHowToPlay) windosHowToPlay.style.display = "flex";else windosHowToPlay.style.display = "none";
});
mutedButton.children[0].addEventListener('mousedown', function () {
  var styleElement = getComputedStyle(mutedButton.children[0], null);
  var translateElement = styleElement.getPropertyValue("transform");
  console.log(translateElement);

  if (translateElement == "none" || translateElement == "matrix(1, 0, 0, 1, 0, 0)") {
    mutedButton.children[0].style.transform = "translateX(35px)";
    mutedButton.children[0].style.background = "rgb(34, 34, 34)";
    mutedButton.style.backgroundImage = "url('../icons/mute.svg')";
    mutedButton.style.backgroundPositionX = '10px';
    soundPainballShoot.muted = true;
    soundExplosion.muted = true;
  } else {
    mutedButton.children[0].style.transform = "translateX(0px)";
    mutedButton.children[0].style.background = "#db9005";
    mutedButton.style.backgroundImage = "url('../icons/up_volume.svg')";
    mutedButton.style.backgroundPositionX = '35px';
    soundPainballShoot.muted = false;
    soundExplosion.muted = false;
  }
});

function CreateSquares(numberSquares) {
  var html = "<div></div>";

  for (var index = 0; index < numberSquares; index++) {
    containerAnimation.insertAdjacentHTML("afterbegin", html);
  }

  AddSizeAndStylesToSquares();
}

var bullet = document.addEventListener('mousedown', function (e) {
  if (e.clientY > 222 && totalShots && !gameOver) {
    var newChild = document.createElement("div");
    newChild.className = "bulletMark";
    setTimeout(function () {
      document.children[0].children[1].children[0].appendChild(newChild);
      newChild.style.left = e.clientX - newChild.getBoundingClientRect().width / 2 + "px";
      newChild.style.top = e.clientY - newChild.getBoundingClientRect().width / 2 + "px";
      var backgroundnewChild = GetRandomNumber(1, 9);
      newChild.style.backgroundImage = "url('../images/mark_painball_".concat(backgroundnewChild, ".png')");
      var colornewChild = GetRandomNumber(1, 360);
      newChild.style.filter = "hue-rotate(".concat(colornewChild, "deg)");
      deflectedShoot = true;
    }, 200);
    totalShots--;
    UpdateStats();
    setTimeout(function () {
      document.children[0].children[1].children[0].removeChild(newChild);
    }, 9000);

    if (deflectedShoot) {
      shotNumber = 0;
      deflectedShoot = true;
    }

    console.log(deflectedShoot);
  }

  if (e.clientY > 222) {
    soundPainballShoot.currentTime = 0;
    soundPainballShoot.play();
  }

  if (!totalShots) {
    GameOver();
  }
});

function AddSizeAndStylesToSquares() {
  for (var index = 0; index < containerAnimation.childElementCount; index++) {
    var sizeSquare = GetRandomNumber(3, 7);
    var leftSquare = GetRandomNumber(5, 90);
    var topSquare = GetRandomNumber(900, 1000);
    var timeAnimation = GetRandomNumberFloat(8, 13);
    var timeDelay = GetRandomNumberFloat(0.5, 8);
    var animationnumber = GetRandomNumber(1, 3);
    var backgroundSquare = GetRandomNumber(1, 41);
    containerAnimation.children[index].style.width = "".concat(sizeSquare, "vw");
    containerAnimation.children[index].style.height = "".concat(sizeSquare, "vw");
    containerAnimation.children[index].style.animationName = "animateSquares".concat(animationnumber);
    containerAnimation.children[index].style.animationDuration = "".concat(timeAnimation, "s");
    containerAnimation.children[index].style.animationTimingFunction = "linear";
    containerAnimation.children[index].style.animationIterationCount = "infinite";
    containerAnimation.children[index].style.animationDelay = "".concat(timeDelay, "s");
    containerAnimation.children[index].style.left = "".concat(leftSquare, "vw");
    containerAnimation.children[index].style.transform = "translateY".concat(topSquare, "px");

    if (index > 5 && index < 13) {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(imageTargetID, ".svg')");
    } else if (index > 25 && index < 35) {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(imageTargetID, ".svg')");
    } else {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(backgroundSquare, ".svg')");
    }

    containerAnimation.children[index].addEventListener("mousedown", function (e) {
      ComponentChange(e);
    });
  }
}

function ParticlesExplosion() {
  setTimeout(function () {
    explosion.style.opacity = 0;
  }, 500);
  setTimeout(function () {
    soundExplosion.currentTime = 0;
    soundExplosion.play();
    explosion.style.opacity = 1;
  }, 250);
}

function UpdateStats() {
  shoots.innerText = totalShots;
  hits.innerText = totalhits;
  misses.innerText = totalmisses;

  if (totalShots > 30) {
    totalShots = 30;
  }
}

function GetRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function GetRandomNumberFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function ComponentChange(e) {
  if (!gameOver) {
    explosion.style.left = e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width / 8 + "px";
    explosion.style.top = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().width / 2 + "px";

    if (e.target.style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('..', '') == targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ', '') && e.target.style.backgroundColor != "transparent") {
      totalhits++;
      ParticlesExplosion();
      CountHits(true);
    } else {
      totalmisses++;
      if (totalmisses == maxMisses) GameOver();
      ParticlesExplosion();
      CountHits(false);
    }

    deflectedShoot = false;
    setTimeout(function () {
      e.target.style.backgroundColor = "transparent";
    }, 50);
    setTimeout(function () {
      e.target.style.top = "1200px";
      e.target.style.boxShadow = "none";
    }, 200);
    setTimeout(function () {
      explosion.style.left = "-350px";
      UpdateStats();
    }, 400);
  }
}

var shotNumber = 0;

function CountHits(typeOfShot) {
  typeOfShot ? shotNumber++ : shotNumber = 0;

  if (shotNumber == 5) {
    totalShots += 5;
    shotNumber = 0;
  }

  if (shotNumber % 100 == 0) {
    totalShots += 10;
  }
}

var _loop = function _loop(index) {
  containerAnimation.children[index].addEventListener("animationiteration", function () {
    var leftSquare = GetRandomNumber(10, 90);
    var backgroundSquare = GetRandomNumber(1, 41);
    var sizeSquare = GetRandomNumber(3, 7);
    containerAnimation.children[index].style.opacity = 1;
    containerAnimation.children[index].style.left = "".concat(leftSquare, "vw");
    containerAnimation.children[index].style.top = "0px";
    containerAnimation.children[index].style.backgroundColor = "#87dfe222";
    containerAnimation.children[index].style.boxShadow = "-10px -10px 7px 25px #FFFFFF18  inset, -7px -1px 7px 5px #8f8f8f65 inset";
    containerAnimation.children[index].style.width = "".concat(sizeSquare, "vw");
    containerAnimation.children[index].style.height = "".concat(sizeSquare, "vw");

    if (index > 5 && index < 13) {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(imageTargetID, ".svg')");
    } else if (index > 25 && index < 33) {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(imageTargetID, ".svg')");
    } else {
      containerAnimation.children[index].style.backgroundImage = "url('../images/comp_".concat(backgroundSquare, ".svg')");
    }

    containerAnimation.children[index].style.scale = 1;
    elementStates[index].hasCollided = false;
  });
};

for (var index = 0; index < containerAnimation.children.length; index++) {
  _loop(index);
}

for (var i = 0; i < containerAnimation.childElementCount; i++) {
  elementStates.push({
    hasCollided: false
  });
}

function GameOver() {
  var _index, _index2;

  return regeneratorRuntime.async(function GameOver$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (gameOver) {
            _context.next = 14;
            break;
          }

          soundExplosion.currentTime = 0;

          for (_index = 0; _index < containerAnimation.childElementCount; _index++) {
            containerAnimation.children[_index].style.animationPlayState = "paused";
          }

          _index2 = 0;

        case 4:
          if (!(_index2 < containerAnimation.childElementCount)) {
            _context.next = 14;
            break;
          }

          containerAnimation.children[_index2].style.top = "1000px";
          containerAnimation.children[_index2].style.boxShadow = "none";
          containerAnimation.children[_index2].style.backgroundColor = "transparent"; //

          soundExplosion.play();
          _context.next = 11;
          return regeneratorRuntime.awrap(sleep(50));

        case 11:
          _index2++;
          _context.next = 4;
          break;

        case 14:
          gameOverCard.style.transform = "translateX(0%)";
          gameOver = true;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkCollision() {
  // Iterar sobre los elementos hijos de containerAnimation
  for (var _i = 0; _i < containerAnimation.childElementCount; _i++) {
    var childElement = containerAnimation.children[_i];

    if (elementStates[_i].hasCollided) {
      continue;
    } // Obtener las dimensiones y la posición de cada elemento


    var childElementPosition = childElement.getBoundingClientRect();
    var scoreboardPosition = scoreboard.getBoundingClientRect(); // Verificar si los elementos se solapan

    if (childElementPosition.left < scoreboardPosition.right && childElementPosition.right > scoreboardPosition.left && childElementPosition.top + childElementPosition.height < scoreboardPosition.bottom && childElementPosition.bottom > scoreboardPosition.top) {
      //console.log(containerAnimation.children[i].style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('..', ''));
      //console.log(targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ',''));
      if (containerAnimation.children[_i].style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('..', '') === targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ', '')) {
        totalmisses++;
        if (totalmisses == maxMisses) GameOver();
        UpdateStats();
      }

      elementStates[_i].hasCollided = true;
    }
  }

  requestAnimationFrame(checkCollision);
}

requestAnimationFrame(checkCollision);

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

setInterval(function () {
  if (!gameOver) {
    time.innerText = startTime++;

    if (startTime < 10) {
      time.innerText = '000' + startTime;
    } else if (startTime < 100) {
      time.innerText = '00' + startTime;
    } else if (startTime < 1000) {
      time.innerText = '0' + startTime;
    }
  }
}, 1000);