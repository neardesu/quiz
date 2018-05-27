var questions = [
{
  question: 'What is known as Japanese horseradish?',
  choices: [ 'wasabi', 'nigori', 'mooli', 'ninjin' ],
  correctAnswer: 0
},
{
  question: 'Which of these is the name for geoduck?',
  choices: [ 'hokkigai', 'mirugai', 'akagai', 'tairagai' ],
  correctAnswer: 1
},
{
  question: 'What does \"sushi\" actually mean?',
  choices: [ 'raw fish', 'sashimi', 'rice with vinegar', 'seaweed and rice' ],
  correctAnswer: 3
},
{
  question: 'Which is not an egg?',
  choices: [ 'ikura', 'tamago', 'tobiko', 'awabi' ],
  correctAnswer: 3
},
{
  question: 'Besides water, what is the main ingredient in soy sauce?',
  choices: [ 'water', 'wheat', 'salt', 'soybeans' ],
  correctAnswer: 1
},
{
  question: 'Sushi is most closely associated with which Japanese city?',
  choices: [ 'Kyoto', 'Tokyo', 'Osaka', 'Sapporo' ],
  correctAnswer: 1
},
{
  question: 'Nori is: ',
  choices: [ 'green algae', 'blue algae', 'red algae', 'brown algae'],
  correctAnswer: 2
},
{
  question: 'What part of the sea urchin (uni) is eaten?',
  choices: [ 'brain', 'eggs', 'gonads', 'tongue' ],
  correctAnswer: 2
},
{
  question: 'Which of these is not tuna?',
  choices: [ 'Skipjack', 'Albacore', 'Bluefin', 'Hamachi' ],
  correctAnswer: 3
},
{
  question: 'Who is often considered the \"world\'s greatest\" sushi chef?',
  choices: [ 'Daisuke Nakazawa', 'Nobu Matsuhisa', 'Jiro Ono', 'Masaharu Morimoto' ],
  correctAnswer: 2
}]

var number;
var scoreCorrect;
var scoreIncorrect;


function render(){
  displayQuestion()
  displayAnswers()
  endGame()
}

function newGame(){
  location.reload();
}

function startGame(){
  number = 0;
  scoreCorrect = 0;
  scoreIncorrect = 0;
  $('#welcome-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  $('#endgame-container').addClass("hidden");
  render();
}

function endGame(){
  if (number === 9){
    $('#quiz-container').addClass("hidden");
    $('#endgame-container').removeClass("hidden");
    if (scoreCorrect >= 8){
      $('.end-score').html("Congratulations sushi master! <br> You scored " + scoreCorrect + " out of 10 points!")
    } else {
      $('.end-score').html("Do you even eat sushi? <br> You only scored " + scoreCorrect + " out of 10 points...<b>Try again...</b>")
    }
  }
}


// GAME LOGIC //
function displayQuestion(){
  var questionArea = $('.questions');
  var questionNumber = $('.q-number');
  var currentScore = $('.scoring');
  questionArea.html(questions[number].question);
  questionNumber.html(number + 1 + " of " + questions.length);
  currentScore.html("Correct: " + scoreCorrect + ", Incorrect: " + scoreIncorrect);

  $('.answer-choices').removeClass("incorrect-answer");
  $('.answer-choices').removeClass("correct-answer");

  console.log(questions[number].question);
  console.log(questions[number].choices[0])

}

function displayAnswers(){
  var answerChoices = questions[number].choices;
  //iterate through answer choices for that question and fill in the choice inputs
  for (var i = 0; i < answerChoices.length; i++){
    $('#choice'+ i).html(answerChoices[i]);
  }
}

function checkAnswer(answer){
  var rightAnswer = questions[number].correctAnswer;
  if (answer === rightAnswer){
    console.log("Correct!");
    $('#choice'+answer).addClass("correct-answer");
    $('.js-next').removeClass('hidden');
    scoreCorrect++;

  } else {
    console.log("Wrong answer");
    $('#choice'+answer).addClass("incorrect-answer");
    $('#choice'+rightAnswer).addClass("correct-answer");
    $('.js-next').removeClass('hidden');
    scoreIncorrect++;
  }
}

function nextQuestion(){
  if (number < 9){
    number++;
    console.log(number);
  }
  render();
}



// EVENT LISTENERS //
function handlePlayButton(){
  $('#welcome-container').on('click', '.js-play-button', startGame);
  $('#endgame-container').on('click', '.js-play-button', newGame);
}

function handleRestartButton(){
  $('#quiz-container').on('click', '.js-restart', startGame);
  $('#quiz-container').on('click', '.js-next', function(){
    $('.js-next').addClass("hidden");
  });
}

function handleChoices() {
  $('#choice0').click(function(){ checkAnswer(0);})
  $('#choice1').click(function(){ checkAnswer(1);})
  $('#choice2').click(function(){ checkAnswer(2);})
  $('#choice3').click(function(){ checkAnswer(3);})
}

function handleNextButton() {
  $('#quiz-container').on('click', '.js-next', nextQuestion);
}

function handleHover(){
  $('.answer-choices').hover(function() {
        $(this).css('cursor','pointer');
        $(this.css('font-size', ''))
    });
}



$(handlePlayButton);
$(handleRestartButton);
$(handleChoices);
$(handleNextButton);
$(handleHover);
