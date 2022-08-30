import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import blueCardsData from '../data/mythicCards/blue/index.js'
import brownCardsData from '../data/mythicCards/brown/index.js'
import greenCardsData from '../data/mythicCards/green/index.js'

const mix = document.querySelector('.mix');
const showCard = document.querySelector('.result');
const showCardButton = document.querySelector('.shirt');

function getRandom(num) {
    return Math.ceil(Math.random() * num);
};

const levels = document.querySelector('.levels');

difficulties.forEach(e => {
    let li = document.createElement('li');
    li.id = (e.id)
    li.className = ('level');
li.textContent = e.name;
levels.appendChild(li);
})

const monsters = document.querySelectorAll('.monster');

const dotsBlock = document.querySelectorAll('.dots-container');

for(let i = 0; i < monsters.length; i++){
    monsters[i].style.backgroundImage = `url(${ancientsData[i].cardFace})`;
}

monsters.forEach((e)=>{e.addEventListener('click', ()=> {

    monsters.forEach(e => e.classList.remove('active'));
    mix.classList.remove('active-show');
    let name = e.id;
    e.classList.add('active');

    ancientsData.forEach(e=>{

        if(e.id == name){
            makePack(e);
        }
    })
})

})

function makePack(monster){

    let dots = document.querySelectorAll('.dots-container');
    dots.forEach(e => {
        for(let item of e.children){
            if(item.textContent != 0){
                item.textContent = 0;
            }
        }
    })

    let result = [];
    let greenCards = [];
    let blueCards = [];
    let brownCards = [];

    const complexity = document.querySelectorAll('.level');

    complexity.forEach(e => e.classList.remove('active-show'));
    complexity.forEach(e => {
        e.onclick = function(){
            complexity.forEach(e => e.classList.remove('active-show'));
            e.classList.add('active-show');
            let hardness;
            let very = false;
            if(e.id == 'easy'){
                hardness = 'hard'
            }else if( e.id == 'hard'){
                hardness = 'easy';
            }else if(e.id == 'very-hard'){
                hardness = 'easy';
                very = true;

            }else if(e.id == 'very-easy'){
                hardness = 'hard';
                very = true;
            }
            else{
                hardness = 'normal';
            }
            greenCards = getBlock('green', hardness, very);
            blueCards = getBlock('blue', hardness, very);
            brownCards = getBlock('brown', hardness, very);
        }
    })
    
    function getBlock(color, hardness, very){

        let array = []; 


        if(color == 'blue'){
            array = blueCardsData;
        }else if( color == 'green'){
            array = greenCardsData;
        }else{
            array = brownCardsData;
        }   

        let cardsData = array.concat();

        let firstArr = [];
        let secondArr = [];
    
        if(hardness != 'normal'){   

            let delElem = [];
            for(let item of cardsData){
                if(item.difficulty === hardness){       

                    delElem.push(cardsData.indexOf(item));
                }
            }

            delElem.reverse();  

            delElem.forEach(e =>{
            cardsData.splice(e, 1);
            })

            function byField(field) {
                return (a, b) => a[field] > b[field] ? 1 : -1;
            }



    if(very){

        cardsData.sort(byField('difficulty'));
        if(hardness == 'hard'){
            firstArr = cardsData.filter(e => e.difficulty.includes('easy'));
        }else if(hardness == 'easy'){
            firstArr = cardsData.filter(e => e.difficulty.includes('hard'));
        }


        secondArr = cardsData.filter(e => e.difficulty.includes('normal'));

    }


    }

    function getQuantityOfCards(color){
        let res = 0;
        for(let key in monster){
            if(key.includes('Stage')){
                res = res + (monster[key][`${color}Cards`]);
        }
    }
    return res;
    }   
    
    let quantityCards = getQuantityOfCards(color);
    
    let arr = []

    
    while(quantityCards > 0){
        let card;
        if(very){
            let cardNum;
            if(firstArr.length > 0){
                cardNum = getRandom(firstArr.length -1);
                card = firstArr[cardNum];
                firstArr.splice(cardNum, 1);
            }else{            
            cardNum = getRandom(secondArr.length -1);
            card = secondArr[cardNum];
            secondArr.splice(cardNum, 1);
        }


        }else{
            card = cardsData[getRandom(cardsData.length -1)];
        }
        if(arr.includes(card)){
            continue;
        }else{
            arr.push(card);
            quantityCards--;
        }
    }

    return arr;
    }

    function getDots(){

    dotsBlock.forEach(e => {
    for(let i of e.children){
        i.textContent = 0;
    }
    })

    for( let key in monster){

    if(key.includes('Stage')){

        let arr = [];
        for(let card in monster[key]){

        
            let stage = document.querySelector(`.${key}`);

            let quanOfCards = monster[key][card];

            if(card == 'greenCards'){


                while(quanOfCards > 0){

                    for(let key of stage.children){
                        if(key.className.includes('green')){
                            key.textContent++;
                        }
                    }

                    let numOfGreenCard = getRandom(greenCards.length -1);

                    arr.push(greenCards[numOfGreenCard]);
                    greenCards.splice(numOfGreenCard, 1);
                    
                    quanOfCards--;
                }
            }else if(card == 'blueCards'){
                while(quanOfCards > 0){

                    for(let key of stage.children){
                        if(key.className.includes('blue')){
                            key.textContent++;
                        }
                    }

                    let numOfBlueCard = getRandom(blueCards.length -1);

                    arr.push(blueCards[numOfBlueCard])
                    blueCards.splice(numOfBlueCard, 1);
                    quanOfCards--;
                }
            }else if(card == 'brownCards'){
                while(quanOfCards > 0){

                    for(let key of stage.children){
                        if(key.className.includes('brown')){
                            key.textContent++;
                        }
                    }

                    let numOfBrownCards = getRandom(brownCards.length -1);

                    arr.push(brownCards[numOfBrownCards]);
                    brownCards.splice(numOfBrownCards, 1);
                    quanOfCards--;
                }

            }
        }
        result.push(arr);

    }
    }   

    }   

    mix.onclick = function(){
        mix.classList.add('active-show');
        complexity.forEach(e => e.onclick = undefined); 
    
        getDots();
        
        showCardButton.classList.remove('hidden');
        mix.onclick = undefined;
    }   


    showCardButton.onclick = function(){    
        console.log(result)

        mix.classList.remove('active-show');    

        for(let i = 0; i < result.length; i++){ 
            // console.log(result)

            if(result[i].length > 0){
                let num = [getRandom(result[i].length -1)];    

                showCard.style.backgroundImage = `url(${result[i][num].cardFace})`; 

                for(let item of dotsBlock[i].children){

                    if(item.className.includes(`${result[i][num].color}`)){

                        item.textContent--;
                    }
                }
                result[i].splice(num, 1);  
                break;  

            }else if(result[result.length-1] == 0){ 
                result = [];
                showCardButton.onclick = undefined;
                showCardButton.classList.add('hidden');
                
            }else{

                continue;
            }   

        }
        
    }

}