var cells = document.getElementsByTagName("td");
var gridTable = document.getElementById("gridTable");
var x = document.getElementById("x");
var y = document.getElementById("y");
var empty = gridTable.rows[2].cells[2];
var isMove = false;
var canMove = true;
var selectedColor = "blue";

var colorbutton = document.getElementById("colorApply");
var color = document.getElementById("myColor");

var clear = document.getElementById("clear");
var user = document.getElementById("user");

getAddresses();

user.innerHTML = localStorage.getItem("cs2550timestamp");
clear.onclick = function(){
	localStorage.clear();
}

colorbutton.onclick = function() {
	selectedColor = color.value;
    changeBoxColor(selectedColor);
}

function changeBoxColor(color){
    selectedColor = color;
    for (var i = 0; i < cells.length; i++) {
        if(cells[i].innerHTML != ""){
            cells[i].style.backgroundColor = color;
        }
    }
}

var canMove = true;

for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
        var col = this.cellIndex;
        var row = this.parentNode.rowIndex;
        var cell = gridTable.rows[row].cells[col];

        x.innerHTML = row;
        y.innerHTML = col;
		
		//.log(canMove);

		if(canMove && this.innerHTML != ""){
            console.log("disabling moving");
            canMove = false;            
            console.log("moving");
			move(this, empty);
            console.log("finsih moving");
		}
    }
}

var notAble = false;

function move(target, destination) {
    target.style["position"] = "relative";
    target.style["left"] = "0px";
    target.style["top"] = "0px";
    target.style["zIndex"] = "99999";
    moveCell(target, destination);
	//console.log(isMove);
    if (isMove) {
        setTimeout(function() {
            target.style["background"] = "white";
            destination.innerHTML = target.innerHTML;
            target.innerHTML = "";
            destination.style["background"] = selectedColor;
            target.style["left"] = "0px";
            target.style["top"] = "0px";
            target.style["zIndex"] = "0";
            empty = target;	
            console.log("enabling moving");
            setTimeout(function(){
                canMove = true;
            }, 100);
        }, 100);
    }

    if(notAble){
        notAble = false;
        setTimeout(function(){
            canMove = true;
        }, 100);
    }
}

function moveCell(target, destination) {
    isMove = false;
    var tCol = parseInt(target.cellIndex);
    var dCol = parseInt(destination.cellIndex);
    var tRow = parseInt(target.parentNode.rowIndex);
    var dRow = parseInt(destination.parentNode.rowIndex);
    if ((tCol - dCol) == 1 && dRow == tRow) {
        target.style["left"] = (parseInt(target.style["left"]) - 11) + "px";
        if (parseInt(target.style["left"]) != -55) {
            setTimeout(function() {
                moveCell(target, destination);
            }, 20);
        }
        isMove = true;
    } else if ((tCol - dCol) == -1 && dRow == tRow) {
        target.style["left"] = (parseInt(target.style["left"]) + 11) + "px";
        if (parseInt(target.style["left"]) != 55) {
            setTimeout(function() {
                moveCell(target, destination);
            }, 20);
        }
        isMove = true;
    } else if (tCol == dCol && (tRow - dRow) == 1) {
        target.style["top"] = (parseInt(target.style["top"]) - 11) + "px";
        if (parseInt(target.style["top"]) != -55) {
            setTimeout(function() {
                moveCell(target, destination);
            }, 20);
        }
        isMove = true;
    } else if (tCol == dCol && (tRow - dRow) == -1) {
        target.style["top"] = (parseInt(target.style["top"]) + 11) + "px";
        if (parseInt(target.style["top"]) != 55) {
            setTimeout(function() {
                moveCell(target, destination);
            }, 20);
        }
        isMove = true;
    } else{
        notAble = true;
    }
}

// source http://universe.tc.uvu.edu/cs2550/assignments/XML/addresses.html
function getAddresses() {
    var request = new XMLHttpRequest();
    request.open("GET", "player.xml", false);
    request.send(null);


    var player = document.getElementById("name");
    var email = document.getElementById("email");
    var html = "";

    var xmldoc = request.responseXML;

    var xmlrows = xmldoc.getElementsByTagName("player");
    var player1 = xmlrows[0];
    var playerConfig = player1.getElementsByTagName("player-config")[0];
    var color = playerConfig.getElementsByTagName("initial-box-color")[0];

    player.innerHTML = player1.getAttribute("name");
    email.innerHTML = player1.getElementsByTagName("email")[0].innerHTML;
    changeBoxColor(color.innerHTML);
}