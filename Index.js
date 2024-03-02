const opr=document.querySelector("[data-operation]");
const value1=document.querySelector("[data-val1]");
const valu2=document.querySelector("[data-val2]");
const result=document.querySelector("[data-result]");
const btn=document.querySelectorAll(".btn");
var select=document.getElementById('counter');
let score_display=document.querySelector(".score-display");
const container =document.querySelector(".container");
const container_gamestart=document.querySelector(".conatiner_startgame");
const instruction_list=document.querySelector(".instruction_list");
const start_game=document.querySelector(".start_game");
const symbol="+-*/";
let num1;
let num2;
let res;
let arr=[];
let btnval=[];
let  time=30;
let sy;
let con=1;
let score=0;
instruction_list.addEventListener("click",showInstructions);
start_game.addEventListener("click",startgammer);
 function startgammer()
 {       container_gamestart.classList.add("startgame");
        symopr(); 
        container.classList.add("active");

        intervaltimeout();
        arr.length=0;
        btnval.length=0;
        time=30;
        con=1;
        score=0;
        for(let i=0;i<btn.length;i++)
        {
                btn[i].disabled=false;
        }  
 }
function getrnd(min,max)
{
    let r=Math.floor(Math.random()*(max-min)+min);
    return r;
}
function symopr()
{ 
     arr.length=0;
   sy=symbol.charAt(getrnd(0,symbol.length));
    num1=getrnd(1,50);
    num2=getrnd(1,50);
    con++;
    peropr(sy);
}
function peropr(sym)
{
   opr.innerText=sym;    
   if(sym=="+")
    {
    res=num1+num2;
    }
    else if(sym=="-")
    {
        res=num1-num2;
    }
    else if(sym=="*")
    {
        res=num1*num2;
    }
    else if(sym=="/")
    {
        if(num1<num2)
        {
            let temp=num1;
            num1=num2;
            num2=temp;   
        }
        let rem=num1%num2;
        num1=num1-rem;
        res=num1/num2;
    }
    result.innerText=res;
    arr.push(num1);
    arr.push(num2);
   for(i=0;i<10;i++)
   {
      let s=getrnd(1,50)
      if(num1===s && num2===s)
      {
        s=getrnd(50,100);
      }
      else if(num1===s)
      {
        s=getrnd(50,100);
      }
      else if(num2==s)
      {
        s=getrnd(50,100);
      }
     arr.push(s);
   }
   console.log(arr);
   suffle(arr);
   display(arr);
}
function suffle(o)
{
    for(let i=0;i<arr.length;i++)
    {
      let n=getrnd(0,arr.length);
       let s=o[i];
       o[i]=o[n];
       o[n]=s; 
    } 
}
function display(ar)
{
    for(i=0;i<ar.length;i++)
    {
        console.log(ar[i]);
        btn[i].innerText=ar[i];
    }
}

function getval(x)
{

        if(btnval.length==0)
        {
        btnval.push(Number(x.innerText));
        x.disabled=true;
        } 
        else 
        {
            btnval.push(Number(x.innerText));
            x.disabled=true;
           answer();
        }
    
}
function undisblebtn()
{
    for(let i=0;i<btn.length;i++)
    {
        if(btn[i].disabled==true)
        {
            btn[i].disabled=false;
        }
    }   
}
for(let i=0;i<btn.length;i++)
{
    btn[i].addEventListener('click',()=>getval(btn[i]));
}
let flag=false;
function rest()
{   
         if(btnval.length>1)
     {  
         if(sy=="+")
          {
           if(btnval[0]+btnval[1]==res)
           {
              flag=true;
           }

          } 
          else if(sy=="-")
          {
            if(btnval[0]-btnval[1]==res)
           {
              flag=true;
           }
          }
          else if(sy=="*")
          {
            if(btnval[0]*btnval[1]==res)
            {
               flag=true;
            }
          }
          else
          {
            if(btnval[0]/btnval[1]==res)
           {
              flag=true;
           }
          }
     }
}


function timer()
{
    if(con<6)
    {
    time=time-1;
    select.innerText=time;
    if(time===0)
    {
        flag=false;
        time=30;
        btnval.length=0;
        symopr();
        undisblebtn();  
    }
 }
 else
 { 
     repaly();
 }
}
var timeout;
function intervaltimeout()
{
 timeout=setInterval(timer,1000);
}

function answer()
{   
      rest();
      if(btnval.length>1)
      { 
         if(flag==true)
        {
        score++;
        M.toast({html: 'right'})
       }
       else
       {
       M.toast({html: 'wrong'});
       }
        flag=false;
        time=30;
        btnval.length=0;
        symopr();
        undisblebtn();
      } 
      if(con==6)
      {
   clearInterval(timeout);
   sweetallert();
    }
}

function repaly()
{
    time=0;
    select.innerText=time;
    for(let i=0;i<btn.length;i++)
    {
            btn[i].disabled=true;
    }   
    clearInterval(timeout);
    sweetallert();
}
function sweetallert()
{
Swal.fire({
    title: "Game Over",
    text: "Unfortunately, you lost the game.",
    html: `<div class="score-div">Your score:${score} </div>`,
   
    showCancelButton: "start again",
    cancelButtonText: "start again",
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle Replay Game button click
      clearInterval(timeout);
      container.classList.remove("active");
      container_gamestart.classList.remove("startgame");
    } else if (result.isDismissed)
     {
      // Handle Exit button click
      startgammer();
    }
  }); 
} 

let startgame=true;
// function showInstructions() {
//     Swal.fire({
//       title: "Math Game",
//       showCancelButton: true,
//       cancelButtonText: "?",
//       confirmButtonText: "Start Game",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Handle Start Game button click
//         startganme();
//         symopr();
//       } else if (result.isDismissed) {
//         // Handle Close button click
//         clearInterval(timeout);
//         container.classList.add("active");
//       }
//     });
//   }
  function showInstructions() {
    Swal.fire({
      title: "HOW TO PLAY?",
      html: `<ol>
                <li>1. You Will Be Give An Operation,Ex : A * B = 10</li>
                <li>2.YOU CAN SELECT 2 NUMBERS OUT OF 12 AND CALCULATE AND GIVE CORRECT RESULT</li>
                <li>3.TOTAL OPEARTION IS 5 (+,-,*,/)</li>
                <li>4.TOTAL QUESTIONS IS 5</li>
                <li>5.EACH CORRECT ANSWER WILL GIVE 1 MARK</li>
             </ol>`,
      showCloseButton: true,
      closeButtonAriaLabel: "Close",
    });
  }
  
  
