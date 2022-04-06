function parentBoxAnimation() {

    gsap.from(".parentBox", {
        scale: 0,
        rotation: 360,

        duration: 1,
        opacity: 0,

    })
}

function anime(param) {
    gsap.to(param, {
        scale: 0.5,
        duration: .5,
        ease: "bounce.out",
    })
}


var winner;
var redwinner = 0;
var totalMatch = 0;
var bluewinner = 0;
var draw = 0;
var player1, player2
var alertClass = '';

var x = true

function playGame() {
    player1 = document.querySelector("#player1Name").value
    player2 = document.querySelector("#player2Name").value

    document.querySelector("#player1show").innerHTML = player1
    document.querySelector("#player2show").innerHTML = player2


    document.querySelector("#playerCard").classList.add("d-none")
    document.querySelector("#gameCard").classList.remove("d-none")
}

function game(arg) {
    anime(arg)
    var box = document.querySelector(arg)
    var hasRed = box.classList.contains("red")

    var hasBlue = box.classList.contains("blue")


    if (!(hasRed || hasBlue)) {
        x ?
            box.classList.add("red")
            :
            box.classList.add("blue");
        x = !x
    }



    if (checkWinner()) {
        winner === "red" ? redwinner++ : bluewinner++


        setTimeout(resetGame, 300)



    } else {
        if (checkFill()) {
            draw++;
            setTimeout(resetGame, 300)
        }
    }
}

function checkWinner() {
    var arr = [isWinner("#box1", "#box2", "#box3", "red"),
    isWinner("#box1", "#box4", "#box7", "red"),
    isWinner("#box1", "#box5", "#box9", "red"),
    isWinner("#box2", "#box5", "#box8", "red"),
    isWinner("#box4", "#box5", "#box6", "red"),
    isWinner("#box3", "#box6", "#box9", "red"),
    isWinner("#box7", "#box8", "#box9", "red"),
    isWinner("#box3", "#box5", "#box7", "red"),
    isWinner("#box1", "#box2", "#box3", "blue"),
    isWinner("#box1", "#box4", "#box7", "blue"),
    isWinner("#box1", "#box5", "#box9", "blue"),
    isWinner("#box2", "#box5", "#box8", "blue"),
    isWinner("#box4", "#box5", "#box6", "blue"),
    isWinner("#box3", "#box6", "#box9", "blue"),
    isWinner("#box7", "#box8", "#box9", "blue"),
    isWinner("#box3", "#box5", "#box7", "blue")]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            return true
        }
    }
    return false
}

function isWinner(id1, id2, id3, color) {

    var testBox1 = document.querySelector(id1).classList.contains(color);
    var testBox2 = document.querySelector(id2).classList.contains(color);
    var testBox3 = document.querySelector(id3).classList.contains(color);

    if (testBox1 && testBox2 && testBox3) {
        // console.log(color)
        // console.log(id1)
        // console.log(id2)
        // console.log(id3)
        winner = color

        // console.log(winner)
        return true
    } else {
        return false
    }


}
function checkFill() {

    return isFill('#box1') &&
        isFill('#box2') &&
        isFill('#box3') &&
        isFill('#box4') &&
        isFill('#box5') &&
        isFill('#box6') &&
        isFill('#box7') &&
        isFill('#box8') &&
        isFill('#box9')
}
function isFill(id) {
    return document.querySelector(id).classList.contains("red") ||
        document.querySelector(id).classList.contains("blue")
}
function resetGame() {
    for (let i = 1; i <= 9; i++) {
        document.querySelector(`#box${i}`).classList.remove("red", "blue")
    }
    x = true
    totalMatch++


    displayData()
    addToLocalStorage()
    resetAnime()
}
function displayData() {

    document.querySelector("#redTotalWins").innerHTML = redwinner
    document.querySelector("#blueTotalWins").innerHTML = bluewinner
    document.querySelector("#total").innerHTML = totalMatch
    document.querySelector("#totalDraw").innerHTML = draw


    addAlert()


}
function addAlert() {
    console.log(winner);

    document.querySelector("#displayAlert").innerHTML = `<h1 class="alert">${winner} is winner</h1>`
    setTimeout(removeAlert, 2000)
}
function removeAlert() {
    document.querySelector("#displayAlert").innerHTML = ""

}
function addToLocalStorage() {
    var data = {
        player1: { name: player1, count: redwinner },
        player2: { name: player1, count: bluewinner },
        totalMatch,
        draw
    }
    localStorage.setItem("game", JSON.stringify(data))
}
function resetAnime() {
    for (i = 1; i <= 9; i++) {
        gsap.to(`#box${i}`, {
            scale: 1,

        })

    }
}




