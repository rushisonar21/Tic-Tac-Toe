let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let body = document.querySelector("body");
turnO = true;
let winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let checkArrayO = [];
let checkArrayX = [];
let checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}

//handler for box
const handler = (e) =>{
    let val = ""
    if(turnO == true){
        val = "O";
        checkArrayO.push(+e.target.getAttribute("id"));
        turnO=false;
        e.target.style.color = ("blue");
        e.target.disabled = true;
    }
    else{
        val = "X";
        checkArrayX.push(+e.target.getAttribute("id"));
        turnO=true;
        e.target.style.color = ("red");
        e.target.disabled = true;
    }
    e.target.innerText = val
    checkWinner(winPatterns)
}

//Code start from adding event
boxes.forEach(box =>{
    box.addEventListener("click", handler);
})

function checkWinner(winPatterns){
    winPatterns.forEach(val => {
        if (checkSubset(checkArrayO,val)){
            announceWinner("O");
            removeButtonEvent();
        }
        if (checkSubset(checkArrayX,val)){
            announceWinner("X");
            removeButtonEvent();
        }
    })
    }

function removeButtonEvent(){
    boxes.forEach(box =>{
        box.disabled = true;
    });
}

const announceWinner = winner => {
    h1 = document.createElement("h1");
    h1.setAttribute("class","winner");
    h1.innerText=`winner is ${winner}`;
    body.appendChild(h1);
}

//handler for reset button
const resetHandler = () => {
    h1 = document.querySelector(".winner");
    if(h1 != null){
        h1.remove();
    }
    boxes.forEach(box =>{
        box.innerText = "";
        box.disabled = false;
    });
    checkArrayO=[];
    checkArrayX=[];
    turnO = true;
    checkCount = 0;
}
reset.addEventListener("click",resetHandler)