const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let scoreValue = document.querySelector('.score-value');
let isJumping = false;
let position = 0;
let points = 0;
let pointSound = new Audio('src/sounds/point.wav');
let dieSound = new Audio('src/sounds/die.wav');
let jumpSound = new Audio('src/sounds/jump.wav');








function handleKeyUp(event){
    if(event.keyCode === 32 || event.keyCode === 38){
       if(!isJumping){
           jump();
           jumpSound.play();
       }
    }
};

function jump(){
    
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
                
            },20); 
        }else{
            position += 20;
            dino.style.bottom = position + 'px';
        }


        
    }, 20);
};


function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

  

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            points++;
            scoreValue.innerText = points;
            pointSound.play();
            
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
           
          clearInterval(leftInterval);
           document.body.innerHTML = '<h1 class="game-over">Game Over</h1>'
           dieSound.play();
           
           
           
           
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';    
            
        }
    }, 20);
      
    setTimeout(createCactus, randomTime);
    
    
}



createCactus();

document.addEventListener('keyup', handleKeyUp);





