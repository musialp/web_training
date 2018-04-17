(function() {
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };
    
    Question.prototype.showQuestion = function() {
        console.log(this.question);
    }
    
    Question.prototype.listAnswers = function() {
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }
    
    Question.prototype.checkAnswer = function(answer, updateScore) {
        var sc;

        if(answer === this.correctAnswer) {
            console.log('Correct!');
            sc = updateScore(true);
        } else {
            console.log('Wrong!');
            sc = updateScore(false);
        }

        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('--------------------------');
    }

    var questions = [];
        questions.push(new Question('Yes?', ['Yes', 'No'], 0));
        questions.push(new Question('No?', ['Yes', 'No'], 1));

    function keepScore() {
        var score = 0;
        return function(correct) {
            if(correct) {
                score++;
            }
            return score;
        }
    }

    var score = keepScore();
    
    function nextQuestion() {
        var selectedQuestion = Math.floor(Math.random() * questions.length);
        questions[selectedQuestion].showQuestion();
        questions[selectedQuestion].listAnswers();
        
        var answer = prompt('Choose and asnwer.');
        
        if(answer != 'exit') {
            questions[selectedQuestion].checkAnswer(Number(answer), score);
            nextQuestion();
        }
    }

    nextQuestion();
})();




