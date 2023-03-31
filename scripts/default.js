const containerAnimation = document.getElementById("containerAnimation");
const explosion = document.querySelector(".explosion");
const soundExplosion = document.getElementById("soundExplosion");
const soundPainballShoot = document.getElementById("painball_shoot");
const time = document.getElementById("time").children[0];
const hits = document.getElementById("hits").children[0];
const misses = document.getElementById("misses").children[0];
const targetImg = document.getElementById("targetImg");
const scoreboard = document.querySelector(".scoreboard");
const shoots = document.getElementById("shoots").children[0];
const mutedButton = document.getElementById("mutedButton");
const gameOverCard = document.querySelector(".gameovercard");
const buttonHowToPlay = document.querySelector(".header__howtoplay");
const windosHowToPlay = document.querySelector(".header__window");





let imageTargetID = GetRandomNumber(1, 41);
targetImg.src = `../images/comp_${imageTargetID}.svg`;
let deflectedShoot = true;
let elementStates = [];
let startTime = 0;
let totalmisses = 0;
let totalhits = 0;
let totalShots = 30;
let maxMisses = 20;
let gameOver = false;
let viewWindowHowToPlay = false;
shoots.innerText = totalShots;
CreateSquares(45);

buttonHowToPlay.addEventListener('mousedown', () => {
    viewWindowHowToPlay = !viewWindowHowToPlay;
    if (viewWindowHowToPlay)
        windosHowToPlay.style.display = "flex";
    else
        windosHowToPlay.style.display = "none";
})


mutedButton.children[0].addEventListener('mousedown', function () {
    const styleElement = getComputedStyle(mutedButton.children[0], null);
    let translateElement = styleElement.getPropertyValue("transform");
    console.log(translateElement);
    if (translateElement == "none" || translateElement == "matrix(1, 0, 0, 1, 0, 0)") {
        mutedButton.children[0].style.transform = "translateX(35px)";
        mutedButton.children[0].style.background = "rgb(34, 34, 34)";
        mutedButton.style.backgroundImage = `url('./icons/mute.svg')`
        mutedButton.style.backgroundPositionX = '10px';
        soundPainballShoot.muted = true;
        soundExplosion.muted = true;
    } else {
        mutedButton.children[0].style.transform = "translateX(0px)";
        mutedButton.children[0].style.background = "#db9005";
        mutedButton.style.backgroundImage = `url('./icons/up_volume.svg')`;
        mutedButton.style.backgroundPositionX = '35px';
        soundPainballShoot.muted = false;
        soundExplosion.muted = false;
    }
})




function CreateSquares(numberSquares) {
    let html = "<div></div>";
    for (let index = 0; index < numberSquares; index++) {
        containerAnimation.insertAdjacentHTML("afterbegin", html);
    }
    AddSizeAndStylesToSquares();
}

const bullet = document.addEventListener('mousedown', function (e) {
    if (e.clientY > 222 && totalShots && !gameOver) {
        const newChild = document.createElement("div");
        newChild.className = "bulletMark";
        setTimeout(() => {
            document.children[0].children[1].children[0].appendChild(newChild);
            newChild.style.left = (e.clientX - newChild.getBoundingClientRect().width / 2) + "px";
            newChild.style.top = (e.clientY - newChild.getBoundingClientRect().width / 2) + "px";
            let backgroundnewChild = GetRandomNumber(1, 9);
            newChild.style.backgroundImage = `url('./images/mark_painball_${backgroundnewChild}.png')`;
            let colornewChild = GetRandomNumber(1, 360);
            newChild.style.filter = `hue-rotate(${colornewChild}deg)`;
            deflectedShoot = true;
        }, 200);
        totalShots--;
        UpdateStats();
        setTimeout(() => {
            document.children[0].children[1].children[0].removeChild(newChild);
        }, 9000);
        if (deflectedShoot) {
            shotNumber = 0;
            deflectedShoot = true;
        }
        console.log(deflectedShoot)
    }
    if (e.clientY > 222) {
        soundPainballShoot.currentTime = 0;
        soundPainballShoot.play();
    }
    if (!totalShots) {
        GameOver();
    }
})

function AddSizeAndStylesToSquares() {
    for (let index = 0; index < containerAnimation.childElementCount; index++) {
        let sizeSquare = GetRandomNumber(3, 7);
        let leftSquare = GetRandomNumber(5, 90);
        let topSquare = GetRandomNumber(900, 1000);
        let timeAnimation = GetRandomNumberFloat(8, 13);
        let timeDelay = GetRandomNumberFloat(0.5, 8);
        let animationnumber = GetRandomNumber(1, 3);
        let backgroundSquare = GetRandomNumber(1, 41);
        containerAnimation.children[index].style.width = `${sizeSquare}vw`;
        containerAnimation.children[index].style.height = `${sizeSquare}vw`;
        containerAnimation.children[index].style.animationName = `animateSquares${animationnumber}`;
        containerAnimation.children[index].style.animationDuration = `${timeAnimation}s`;
        containerAnimation.children[index].style.animationTimingFunction = `linear`;
        containerAnimation.children[index].style.animationIterationCount = `infinite`;
        containerAnimation.children[index].style.animationDelay = `${timeDelay}s`;
        containerAnimation.children[index].style.left = `${leftSquare}vw`;
        containerAnimation.children[index].style.transform = `translateY${topSquare}px`;
        if (index > 5 && index < 13) {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${imageTargetID}.svg')`;
        } else if (index > 25 && index < 35) {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${imageTargetID}.svg')`;
        } else {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${backgroundSquare}.svg')`;
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
        explosion.style.left = (e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width / 8) + "px";
        explosion.style.top = (e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().width / 2) + "px";
        if (e.target.style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('.', '') == targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ', '') && e.target.style.backgroundColor != "transparent") {
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

let shotNumber = 0;
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

for (let index = 0; index < containerAnimation.children.length; index++) {
    containerAnimation.children[index].addEventListener("animationiteration", function () {
        let leftSquare = GetRandomNumber(10, 90);
        let backgroundSquare = GetRandomNumber(1, 41);
        let sizeSquare = GetRandomNumber(3, 7);
        containerAnimation.children[index].style.opacity = 1;
        containerAnimation.children[index].style.left = `${leftSquare}vw`;
        containerAnimation.children[index].style.top = "0px";
        containerAnimation.children[index].style.backgroundColor = "#87dfe222";
        containerAnimation.children[index].style.boxShadow = "-10px -10px 7px 25px #FFFFFF18  inset, -7px -1px 7px 5px #8f8f8f65 inset";
        containerAnimation.children[index].style.width = `${sizeSquare}vw`;
        containerAnimation.children[index].style.height = `${sizeSquare}vw`;

        if (index > 5 && index < 13) {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${imageTargetID}.svg')`;
        } else if (index > 25 && index < 33) {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${imageTargetID}.svg')`;
        } else {
            containerAnimation.children[index].style.backgroundImage = `url('./images/comp_${backgroundSquare}.svg')`;
        }
        containerAnimation.children[index].style.scale = 1;
        elementStates[index].hasCollided = false;
    });
}

for (let i = 0; i < containerAnimation.childElementCount; i++) {
    elementStates.push({ hasCollided: false });
}

async function GameOver() {
    if (!gameOver) {
        soundExplosion.currentTime = 0;
        for (let index = 0; index < containerAnimation.childElementCount; index++) {
            containerAnimation.children[index].style.animationPlayState = "paused";
        }
        for (let index = 0; index < containerAnimation.childElementCount; index++) {
            containerAnimation.children[index].style.top = "1000px";
            containerAnimation.children[index].style.boxShadow = "none";
            containerAnimation.children[index].style.backgroundColor = "transparent";
            //
            soundExplosion.play();
            await sleep(50);
        }
    }
    gameOverCard.style.transform = "translateX(0%)"
    gameOver = true;
}

function checkCollision() {
    // Iterar sobre los elementos hijos de containerAnimation
    for (let i = 0; i < containerAnimation.childElementCount; i++) {
        const childElement = containerAnimation.children[i];
        if (elementStates[i].hasCollided) {
            continue;
        }
        // Obtener las dimensiones y la posición de cada elemento
        const childElementPosition = childElement.getBoundingClientRect();
        const scoreboardPosition = scoreboard.getBoundingClientRect();
        // Verificar si los elementos se solapan
        if (childElementPosition.left < scoreboardPosition.right &&
            childElementPosition.right > scoreboardPosition.left &&
            childElementPosition.top + childElementPosition.height < scoreboardPosition.bottom &&
            childElementPosition.bottom > scoreboardPosition.top) {
            //console.log(containerAnimation.children[i].style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('..', ''));
            //console.log(targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ',''));
            if (containerAnimation.children[i].style.backgroundImage.replace(/^url\(|\)$|"/g, '').replace('.', '') === targetImg.src.substring(targetImg.src.indexOf('/images')).replace(' ', '')) {
                totalmisses++;
                if (totalmisses == maxMisses) GameOver();
                UpdateStats();
            }
            elementStates[i].hasCollided = true;
        }
    }
    requestAnimationFrame(checkCollision);
}
requestAnimationFrame(checkCollision);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


setInterval(() => {
    if (!gameOver) {
        time.innerText = startTime++;
        if (startTime < 10) {
            time.innerText = '000' + startTime;
        } else if (startTime < 100) {
            time.innerText = '00' + startTime;
        }
        else if (startTime < 1000) {
            time.innerText = '0' + startTime;
        }
    }
}, 1000);