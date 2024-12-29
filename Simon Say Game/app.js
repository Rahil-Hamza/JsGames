let gameSeq=[];
let userSeq=[];

let colors=["red","yellow","green","purple"];

let level=0,highestScore=0;
let started=false;

let h2=document.querySelector("h2");
let high=document.querySelector("#Highest");
let body=document.querySelector("body");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true; // once

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

//hint--
let hint=document.querySelector("#hint");
let flag=1;
let h3=document.querySelector("h3"); 

hint.addEventListener("click",function(){
    if(level !=0 && flag){
        flag=0;
        h3.style.color="purple";
        let gameHint=""
        for(c of gameSeq){
            gameHint+=c+"&nbsp&nbsp";
        }
        h3.innerHTML=gameHint;
    }
});

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    if(level>highestScore) highestScore=level;
    high.innerText=`Highest Score: ${highestScore}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=colors[randIdx];
    let randBtn=document.querySelector(`#${randColor}`)
    gameSeq.push(randColor)
    console.log(gameSeq);
    gameFlash(randBtn);
    
    if(flag==0){
        h3.innerHTML=`&nbsp HINT  &nbsp USED`;
        h3.style.color="red";
    }
}

function checkAns(idx){
    //let idx=level-1;

    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
       }
    }else{
        h2.innerHTML=`Game Over! Your Score is ${level}<br> Press any key to start.`;
        body.classList.add("gameOver");
        setTimeout(function(){
            body.classList.remove("gameOver");
        },250);
        reset();
    
    }
}
function userPress(){
    //console.log(this);
    if(level==0) return;
    let btn=this;
    userFlash(btn);
    
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let btns=document.querySelectorAll(".btn");
for(let btn of btns){
    btn.addEventListener("click",userPress);
}
function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
    h3.style.color="black";//hint
    h3.innerText=`You can only use it once !!`;//hint
    flag=1
}

