let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let body = document.querySelector("body");
let turnO = true;
let winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let count = 0;
let win = "";
//handler for box
const handler = (e) =>{
    let val = ""
    if(turnO == true){
        val = "O";
        turnO=false;
        e.target.style.color = ("blue");
        e.target.disabled = true;
    }
    else{
        val = "X";
        turnO=true;
        e.target.style.color = ("red");
        e.target.disabled = true;
    }
    e.target.innerText = val
    let isWinner = checkWinner(winPatterns)
    if(count==8 && isWinner!=true){
        announceWinner("draw");
        disableAllButton();
        count=0;
    }
    count++;
}

//Code start from adding event
boxes.forEach(box =>{
    box.addEventListener("click", handler);
})

function checkWinner(winPatterns){
    for(let pattern of winPatterns){
        val1=boxes[pattern[0]].innerText;
        val2=boxes[pattern[1]].innerText;
        val3=boxes[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1==val2 && val2==val3){
                announceWinner(val1);
                disableAllButton();
                return true;
            }
        }
    }
}

function disableAllButton(){
    boxes.forEach(box =>{
        box.disabled = true;
    });
}

const announceWinner = winner => {
    h1 = document.createElement("h1");
    h1.setAttribute("class","winner");
    if(winner==="draw"){
        h1.innerText = "Match Draw"
    }
    else{
    h1.innerText=`Winner is ${winner}`;
    }
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
    turnO = true;
    count = 0;
}
reset.addEventListener("click",resetHandler)