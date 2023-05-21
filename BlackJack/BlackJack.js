// black jack game 
/*
	if sum of cards become 21 it is black jack (win condition)
	if sum is less than 21 then we can draw the new random card
	if sum is greater than 21 then game over and we can't draw the new card further.(loss condition)

*/

let player = {
	name : null  ,
	chips : 50 }

let cards = [];
let firstTime = true;
let isAlive = false;
let hasBlackJack = false;
let sum = 0;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardEl = document.getElementById("card-el");
let playerEl = document.querySelector("#player-el");
let outEl = document.querySelector("#out-el");
player.name = prompt("Enter Your Name ");



//function to generate the random number between 1 and 13.
// if number is 1 then return 11 and if number is greater than 10 i.e 11,12,13 then return value 10

function getRandomNumber(){

	let randomNumber = Math.floor(Math.random()*13) + 1;
	if(randomNumber === 1){
		return 11;
	}

	else if(randomNumber > 10){
		return 10;
	}

	else{
		return randomNumber;
	}
}

function startGame()
{	if(player.chips > 0){
		cards = [];
		if(firstTime === true){
		player.chips = 50;
		}
		firstTime = false;
		playerEl.textContent = player.name + " : $" + player.chips;
		outEl.textContent = "";
		isAlive = true;
		hasBlackJack = false;
		let firstCard = getRandomNumber();
		let secondCard = getRandomNumber();
		cards[0] = firstCard;
		cards[1] = secondCard;// cards = [ firstCard, secondCard ] ,then no need to reassign the array to empty array
		sum = firstCard + secondCard;
		renderGame();
	}
	else{
		outEl.textContent = "You're out of money ! Close the program!"
	}
}

function renderGame()
{
	cardEl.textContent = "Cards : ";
	for(let i = 0 ; i < cards.length ; i++ ){
		cardEl.textContent += cards[i] + " ";
	}
	sumEl.textContent = "Sum : " + sum;
	if(sum <= 20)
	{
		message = `Do you want to draw a new card ?`; 
					
		
	}
	else if(sum === 21){
		message = `<hr>You've got BlackJack! 
					<br> And $20 is credited to your balance!<br><hr>
					`;
		hasBlackJack = true;
		player.chips = player.chips + 20;
	}
	else{
		message = "<hr>You're out of the game !"+ "<br>"  +"And 10$ is deducted from your balance.<hr>";
		isAlive = false;
		player.chips = player.chips - 10;
	}
	playerEl.textContent = player.name + " : $" + player.chips;
	messageEl.innerHTML = message;
}

function newCard(){
	if(player.chips > 0 ){
	if(isAlive && !hasBlackJack)
	{
		let card = getRandomNumber();
		cards.push(card);
		sum += card;
		renderGame();
	}
	else{
		
		outEl.textContent = "Can't draw a new card , Start the new game to play again.";
	}
	}
	else{
		outEl.textContent = "You're out of money ! Close the program!"
	}
}

