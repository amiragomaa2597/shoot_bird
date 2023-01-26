
///////////////////class of bomb /////////////////////////////////
class Bomb 
{
   constructor ()
   {
      this.imageObject = document.createElement("img");
      document.querySelector("#canvas").appendChild(this.imageObject);
      this.imageObject.src="bom.png";
      this.imageObject.style.top = '0px';
      
      let bomb = this.imageObject;
      let bomb_position = 0 ;
      
         let event_kill_ALL = new Event("killAll", {
            bubbles: true
          });
          let event_disappear = new Event("disappear", {
            bubbles: true
          });
        
   
          let random_x_position= Math.floor(Math.random() * window.innerWidth);
          bomb.style.left =random_x_position+"px";
          let interval=setInterval(function(){
              bomb.style.top = bomb_position +"px";
              bomb_position+=10;
           /////////////////////////lose//////////////////////////////////////////
              if (bomb_position > (window.innerHeight-bomb.height))
              {
                  console.log("stop here");
                  clearInterval(interval);
                  bomb.dispatchEvent(event_disappear);
              }
              else 
              {
               if (isTouched(bomb,shoot))
               {
                bomb.dispatchEvent(event_kill_ALL);
               } 
              }
   },50);
   }
  
}

///////////////////class of bird /////////////////////////////////
class Bird 
{

   constructor(folderPath="2",direction=0, id=0) {
      this.folderPath = folderPath;
      this.id= id;
      this.imageObject=document.createElement("img");
      document.querySelector("#canvas").appendChild(this.imageObject);
     
      this.slide_pic();
      if ( direction == 0)
      {this.moveRight();}
      else {this.moveLeft();}
    }
    
/////////////////moving right////////////////////
 moveRight = function()
{   
   
    this.imageObject.style.left = '0px';
    let random_y = Math.floor(Math.random() * (300- 0) ) + 0;
    this.imageObject.style.bottom= `${random_y}px`;
    this.imageObject.style.width = "40px"; 
    let image = this.imageObject;
    this.id= setInterval (function(){
      let event_kill = new Event("kill", {
         bubbles: true
       });
       let event_disappear = new Event("disappear", {
         bubbles: true
       });
    let position_bird = parseInt(image.style.left); 
    if (position_bird < parseInt(window.innerWidth)-parseInt(image.style.width))
     {

        image.style.left = position_bird + 10 + 'px';
        if (isTouched(image,shoot))
        {
         image.dispatchEvent(event_kill);
        } 
        
     }
     else 
     {
        image.dispatchEvent(event_disappear);  
     }
},50);
}
/////////////////// moving left/////////////////////
 moveLeft = function()
{
   this.imageObject.classList.add("flip");
   this.imageObject.style.left = `${window.innerWidth}px`;
   let random_y = Math.floor(Math.random() * (300 -0) ) +0;
   this.imageObject.style.bottom = `${random_y}px`;
   let image = this.imageObject;
   this.id = setInterval (function(){
   let position_bird = parseInt(image.style.left);
   let event_kill = new Event("kill", {
      bubbles: true
    });
    let event_disappear = new Event("disappear", {
      bubbles: true
    });
    if (position_bird >= -100)
     {
        image.style.left = position_bird - 10 + 'px';
        if (isTouched(image,shoot))
        {
         image.dispatchEvent(event_kill);
        }    
      }
     else 
     {  
      
       image.dispatchEvent(event_disappear);
     
     }
},50);
}
/////////////////slide pic///////////////////////////////
 slide_pic = function ()
{
   let i = 1;
   let folder = this.folderPath;
   let image = this.imageObject;
   let id  = setInterval (function(){
      if ( i > 9)
      {
         i = 1 ;
      }
      image.src=`${folder}/${i}.png`;
      i++;
      return id ;    
  },100); 
}

}//end of class 
/////////////////custoum event handeler //////////////////////
////////////////kill event ///////////////////////////////////
document.addEventListener("kill", function(event) {
         
         document.querySelector("#canvas").removeChild(event.target);
          killed.innerText=parseInt(killed.innerText)+1;
          let pathname = parseInt(new URL(event.target.src).pathname.split('/')[1]);
         switch (pathname)
         {
            case 1 :score.innerText=parseInt(score.innerText)-10;break;
            case 2 :score.innerText=parseInt(score.innerText)+10;break;
            case 3 :score.innerText=parseInt(score.innerText)+5;break;

         }
       
          
});
////////////////disappear event ///////////////////////////////////
document.addEventListener("disappear", function(event) {
          document.querySelector("#canvas").removeChild(event.target);

});
////////////////kill all event ///////////////////////////////////
document.addEventListener("killAll",function(event)
{
   document.querySelector("#canvas").removeChild(event.target);
   console.log("kill all");
   kill_all();
   
});
   
             





 
window.addEventListener("load",function()
{
   /////////////////////selectors/////////////////////////////////
 let score = document.querySelector("#score"); 
 score.innerText="0";
 let killed = document.querySelector("#killed"); 
 killed.innerText="0";
 let button = (this.document.querySelector("button"));
 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const textBox = urlParams.get('textBox')
    let shoot = document.querySelector("#shoot") ;
    shoot.style.left="0px"; 
    const select = urlParams.get('select');
    this.document.querySelector("#hi").innerText="hi "+textBox +"\nAre you ready for "+select;        
     
     this.document.querySelector("#user").innerText=textBox;
     button.onclick=function()
     {
        this.parentElement.classList.add("hideBox");
        startTheGame();
     }

      this.document.onmousemove = function (e){
      let x = e.clientX;
      let y = e.clientY;
      shoot.style.left =x-200+"px";
      shoot.style.top=y-200+"px";

      
     }
});

////////////////////start the game ///////////////////

const startTheGame = function()
{
   score.innerText = 0 ;
   killed.innerText = 0 ;
   let clone_id=clones();
   let bomb_id =  random_bomb();
   let timer =  document.querySelectorAll("label")[5] ;
   timer.innerHTML = 0;
   let sec = 0 ;
   let min = 0 ;
   let timer_id=setInterval(function () {
      sec += 1;
      if ( sec == 60)
      {
         sec = 0 ; 
         min +=1;
      }
      if ( min == 1)
      {
         clearInterval(timer_id);
         clearInterval(clone_id);
         clearInterval(bomb_id);
         finish();
         
      }
      timer.innerHTML = min + ":" + sec ;

   }, 1000);
}
/////////////////creating random clones /////////////////////
const clones=function()
{
 
   let clone_id = setInterval(function(){
      let random_type = Math.floor(Math.random() * (4 -1) ) +1 ;
      let random_dir =  Math.floor(Math.random() * (2 -0) ) +0 ;

    let myBird = new Bird(random_type.toString(),random_dir);
   
   },Math.floor(Math.random() * (4000 -500) ) +500);
 return clone_id;
}

//////////////////////////////////touch function //////////////////
const isTouched = function (object1,object2)
{
   let returnValue = 0 ; 
    if(   object1.x < object2.x + object2.width &&
        object1.x > object2.x - object2.width &&
        object1.y < object2.y + object2.height &&
        object1.y > object2.y - object2.height) 
        {
           
            returnValue = 1 ;
        }
    return returnValue;
}
////////////////////////////////finish function ////////////////////
const finish = function()
{
 let birds = document.querySelectorAll("images");

   birds.forEach(bird => {
   bird.remove();
    });

    document.querySelector(".box").classList.remove("hideBox");
    let label = document.querySelector("#hi");
    let button = document.querySelector("#btn");
    if ( parseInt(score.innerText) > 55 )
    {
    label.innerText=`yeah you won ! your score is ${score.innerText}`
    }
    else
    {
       label.innerText="Game Over !" 
    }
    button.innerText="play agin"
    
}
//////////////////////////random time to drop the bomb /////////////
const random_bomb=function()
{
 
let bomb_id = setInterval(function(){
      

    let bomb = new Bomb();
   
   },Math.floor(Math.random() * (9000 -3000) ) +3000);
 return bomb_id;
}
/////////////////kill all ///////////////////////////
const kill_all=function()
{
   let killed_birds = document.querySelectorAll("images");
   console.log(killed_birds);
   killed_birds.forEach(bird => {
   //bird.imageObject.dispatchEvent(event_kill);
   bird.remove();
    });
}