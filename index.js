function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isFinished = function(){
    return this.questionIndex === this.questions.length;
};
function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer=function(choice){
    return this.answer === choice;
};
function showScores(){
    var quizElement = document.getElementById("quiz");
    var resPercentage = (quiz.score / questions.length)*100;
    var result = `<h1> Result </h1>
        <h2 id='score'> Your Scores: ${quiz.score} and mark percentage is ${resPercentage}% </h2>`;
    quizElement.innerHTML = result;
}
function loadQuestions(){
    if(quiz.isFinished()){
        showScores();
    } else {
        var questionElement = document.getElementById("question");
        var questionLoaded = quiz.getQuestionByIndex();
        questionElement.innerHTML = questionLoaded.text;
        var choices = questionLoaded.choices;
        for(let i=0; i < choices.length; i++){
            var choiceElement = document.getElementById("choice"+i);
            choiceElement.innerHTML = choices[i];
            var btnElement = document.getElementById("btn"+i);
            btnElement.onclick = () => {
                quiz.checkOptionWithAnswer(choices[i]);
                loadQuestions();
            };
        }
        showProgress();
    }
}
function showProgress(){
    var currQuestIndex = quiz.questionIndex+1;
    var progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currQuestIndex} of ${quiz.questions.length}`;
}
var questions = [
    new Question(
    "Who is the founder of Apple?",
    ["Bob Marley", "Richard Branson","Steve Jobs", "Bill Gates"],
    "Steve Jobs"
    ),
    new Question(
    "Who is one of the founders of Google?",
    ["Sergey Brin", "Richard Branson","Steve Jobs", "Bill Gates"],
    "Sergey Brin"
    ),
    new Question(
    "Who is the second person stepped on Moon?",
    ["Rakesh Sharma", "Neil Armstrong","Steve Jobs", "Buzz Aldrin"],
    "Buzz Aldrin"
    ),
    new Question(
    "Where is Abdul Kalam island present?",
    ["Andhra Pradesh", "West Bengal","Odisha", "Punjab"],
    "Odisha"
    ),
    new Question(
    "Which company took over GL?",
    ["Byju's", "Upgrad","Pluralsight", "Udemy"],
    "Byju's"
    ),
];
//Shuffle the questions from the original order
var questionBank = questions.sort(() => Math.random() - 0.5);
var quiz = new Quiz(questionBank);
loadQuestions();