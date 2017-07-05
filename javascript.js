

var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;


//if player clicks on the start game button
document.getElementById('startreset').onclick = function(){
	//if player is playing the game
	if (playing === true) {
		location.reload();//reload page to reset game values
	}else{//if the player is not playing
		playing = true;//change to playing made
		score = 0;//set score to zero for start of the game
		document.getElementById('scorevalue').innerHTML = score;
		//shows the countdown box for the game
		show("timeremaining");
			timeremaining = 60;
			document.getElementById('timeremainingvalue').innerHTML = timeremaining;
			//function hides the final score board at reset of game
			hide("gameOver");
			//change the button to reset after the game
			document.getElementById('startreset').innerHTML = "RESET GAME";
		//function initiates the start of the game clock
		startCountdown();
		//function generates questions and answers
		generateQA();
	
	}
}

for (i = 1; i<5; i++) {
	//clicking and interacting with an answer box
document.getElementById('box' + i).onclick = function(){
	//check if the user is playing
	if (playing === true) {
		if (this.innerHTML == correctAnswer) {
			//update score for the correct answer
			score++;
			document.getElementById('scorevalue').innerHTML = score;
			//hide wrong box and show correct box
			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			}, 2000);

			//generate a new question/answer set
			generateQA();

		}else{
		//wrong answer
		hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			}, 2000);	
		}
	}
}
}


function startCountdown(){
	action = setInterval(function(){
		timeremaining -= 1;
		document.getElementById('timeremainingvalue').innerHTML = timeremaining;
		if (timeremaining === 0){
			stopCountdown();
			show("gameOver");
			document.getElementById('gameOver').innerHTML = "<p>GAME OVER!</p><p>your score is " + score + "</p>";
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById('startreset').innerHTML = "START GAME";
		}
	}, 1000);
}


//function stops the game clock from counting down into negatives
function stopCountdown(){
		clearInterval(action);
}


//function hides elements whose displays are seen
function hide(Id){
	document.getElementById(Id).style.display = "none";
}


//function shows elements whose displays are det to none
function show(Id){
	document.getElementById(Id).style.display = "block";
}

//function generates questions and answers
function generateQA(){
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById('question').innerHTML = x + "x" + y;
	var correctPosition = 1 + Math.round(3 * Math.random());
	document.getElementById('box' + correctPosition).innerHTML = correctAnswer; //fills one box with the correct answer

	var answers = [correctAnswer];

	//fill the other boxes with wrong answers
	for(i = 1; i<5; i++)  {
		if (i != correctPosition) {
			var wrongAnswer; 
			
			do{
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));//generates wrong answer
			}
			while (answers.indexOf(wrongAnswer)>-1)
			
			document.getElementById('box'+i).innerHTML = wrongAnswer;

			answers.push(wrongAnswer);
		}
	}
}











