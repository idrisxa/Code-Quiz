const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
var timeContainer = $("#timer");
var highscoreButton = $("#highscores");
var minutesDisplay = $("#minutes");
var secondsDisplay = $("#seconds");
var totalSeconds = 105;
var secondsElapsed = 0;




const myQuestions = [
    {
      question: "In 537 AD, The Hagia Sophia was first built as a basilica in which present day city?",
      answers: {
        a: "Tehran",
        b: "Riyadh",
        c: "Istanbul",
        d: "Damascus"
      },
      correctAnswer: "c"
    },
    {
      question: "In what year was george Orwell's masterpiece, Nineteen Eighty-Four, written ?",
      answers: {
        a: "1924",
        b: "1962",
        c: "1948",
        d: "1895"
      },
      correctAnswer: "c"
    },
    {
      question: "What word means abiding by an accepted standard",
      answers: {
        a: "Understudied",
        b: "Apostize",
        c: "Conventional",
        d: "Heterodox"
      },
      correctAnswer: "c"
    },
    {
      question: "The Rohingya Muslims were targeted in 2017 in which nation?",
      answers: {
        a: "Italy",
        b: "Egypt",
        c: "Ireland",
        d: "Myanmar"
      },
      correctAnswer: "d"
    },
    {
      question: "What are the Springboks, the All Blacks, the Lions and the Pumas",
      answers: {
        a: "Professional Football Teams",
        b: "African Soccer Teams",
        c: "International Cricket Teams",
        d: "International Rugby Teams"
      },
      correctAnswer: "d"
    },
    {
      question: "In May 2011, Sohaib Athar unknowingly live-tweeted what historic event?",
      answers: {
        a: "The fall of Hosni Mubarak",
        b: "The killing of Osama bin Laden",
        c: "An Isreali invasion of Lebanon",
        d: "The start of the Iraq War"
      },
      correctAnswer: "b"
    },
    {
      question: "The Komodo Dragon, the world's largest lizard, can only be found in what country?",
      answers: {
        a: "Cambodia",
        b: "Indonesia",
        c: "Malaysia",
        d: "Papua New Guinea"
      },
      correctAnswer: "b"
    }
  ];


function buildQuiz(){

    $(".quiz-container").addClass('displayNone');
    $('#submit').attr("disabled", true);
  
    const output = [];
  
    
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
      
        const answers = [];
  
    
        for(letter in currentQuestion.answers){
  

          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
 
        output.push(
          `
        
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>
          `
        );
      }
    );
  
    
    quizContainer.innerHTML = output.join('');
  }






function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  return minutesLeft;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  return secondsLeft;
}

  function startTimer() {

    $('#begin').attr("disabled", true);
    $('#submit').attr("disabled", false);
    $(".quiz-container").addClass('displayBlock');
    $(".quiz-container").removeClass('displayNone');

  
    interval = setInterval(function() {
      secondsElapsed++;
      
      renderTime();
      console.log (`seconds elapsed: ${secondsElapsed}`);
      if (secondsElapsed >= totalSeconds)
    {
      showResults();
      clearInterval(interval);
      $('#begin').attr("disabled", false);
    }
      
    }, 1000);
    
  }


  
  function renderTime() {
    
    
    let minutesDisplay = document.querySelector('#minutes');
    let secondsDisplay = document.querySelector('#seconds');
    
    minutesDisplay.innerHTML = getFormattedMinutes();
    if (getFormattedSeconds() >= 10){
    secondsDisplay.innerHTML = getFormattedSeconds();
    }
    else{
        secondsDisplay.innerHTML = `0${getFormattedSeconds()}`;
    }
  
  }

  $("#begin").on("click", function(event){
    event.preventDefault();
    startTimer();
    secondsElapsed = 0;
    

 });
 

 function showResults(){
   secondsElapsed = 105;
   renderTime();
   $('#submit').attr("disabled", true);
   $('#begin').attr("disabled", false);
  clearInterval(interval);
 
 const answerContainers = quizContainer.querySelectorAll('.answers');

 
 let numCorrect = 0;

 
 myQuestions.forEach( (currentQuestion, questionNumber) => {

   
   const answerContainer = answerContainers[questionNumber];
   const selector = 'input[name=question'+questionNumber+']:checked';
   const userAnswer = (answerContainer.querySelector(selector) || {}).value;

   
   if(userAnswer===currentQuestion.correctAnswer){
     
     numCorrect++;

     
     answerContainers[questionNumber].style.color = 'lightgreen';
   }
   
   else{
     
     answerContainers[questionNumber].style.color = 'red';
   }
 });

 
 resultsContainer.innerHTML = numCorrect + ' / ' + myQuestions.length;
}

buildQuiz();

 submitButton.addEventListener('click', showResults);

