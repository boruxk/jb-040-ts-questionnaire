var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Question = /** @class */ (function () {
    function Question(qText) {
        this._qText = qText;
    }
    Object.defineProperty(Question.prototype, "qText", {
        set: function (newQText) {
            this._qText = newQText;
        },
        enumerable: true,
        configurable: true
    });
    Question.prototype.toString = function () {
        return this._qText;
    };
    Question.prototype.addAnswer = function (arg0) { };
    ;
    return Question;
}());
var ShortAnswerQuestion = /** @class */ (function (_super) {
    __extends(ShortAnswerQuestion, _super);
    function ShortAnswerQuestion(qText, answer) {
        var _this = _super.call(this, qText) || this;
        _this.answer = answer;
        return _this;
    }
    ShortAnswerQuestion.prototype.getCorrectAnswer = function () {
        var str = "Answer: " + this.answer;
        return str;
    };
    ShortAnswerQuestion.prototype.addCorrectAnswer = function (newAnswer) {
        return this.answer = newAnswer;
    };
    return ShortAnswerQuestion;
}(Question));
var MultipleChoiceQuestion = /** @class */ (function (_super) {
    __extends(MultipleChoiceQuestion, _super);
    function MultipleChoiceQuestion(qText, an) {
        var _this = _super.call(this, qText) || this;
        _this.answers = [];
        _this.answers[0] = an;
        _this._numberOfAnswers = an.length;
        _this.correctAnswerIndex = 0;
        return _this;
    }
    Object.defineProperty(MultipleChoiceQuestion.prototype, "numberOfAnswers", {
        get: function () {
            return this._numberOfAnswers;
        },
        set: function (num) {
            if (num < 6) {
                this._numberOfAnswers = num;
            }
            else {
                throw "Too much answers";
            }
        },
        enumerable: true,
        configurable: true
    });
    MultipleChoiceQuestion.prototype.checkRightAnswer = function () {
        for (var i = 0; i < this.answers.length; i++) {
            if (this.correctAnswerIndex == Number(this.answers[i])) {
                return "right answer is " + this.correctAnswerIndex;
            }
        }
    };
    // test tostring
    MultipleChoiceQuestion.prototype.toString = function () {
        var _this = this;
        return "Question: " + this.qText + "<br>\n                Answers:<br>\n                " + this.answers.map(function (item, i) { return "  \n                Answer number " + _this.answers[i] + ". /n\n                "; });
    };
    MultipleChoiceQuestion.prototype.getCorrectAnswer = function () {
        var str = "Correct answer is: " + this.answers[this.correctAnswerIndex];
        return str;
    };
    MultipleChoiceQuestion.prototype.addCorrectAnswer = function (newAnswer) {
        if (this.correctAnswerIndex < 6) {
            this.answers.push(newAnswer);
            return this.answers;
        }
        else {
            return this.answers;
        }
    };
    MultipleChoiceQuestion.prototype.addAnswer = function (newWrongAnswer) {
        if (this.correctAnswerIndex < 6) {
            this.answers.push(newWrongAnswer);
        }
    };
    ;
    return MultipleChoiceQuestion;
}(Question));
var QuestionsCatalog = /** @class */ (function () {
    function QuestionsCatalog() {
        this._numberOfQuestions = 0;
        this.questions = [];
    }
    Object.defineProperty(QuestionsCatalog.prototype, "numberOfQuestions", {
        get: function () {
            return this._numberOfQuestions;
        },
        set: function (num) {
            if (this._numberOfQuestions == 20) {
                return; // if more the 20 -> pop() and throw error
            }
            this._numberOfQuestions = num;
        },
        enumerable: true,
        configurable: true
    });
    QuestionsCatalog.prototype.addQuestion = function (q) {
        if (this.questions.length < 20) {
            this.questions.push(q);
        }
    };
    //num = number of q in output //type = s, m, b
    QuestionsCatalog.prototype.generator = function (num, type, arrQ) {
        var arr = [ShortAnswerQuestion, MultipleChoiceQuestion, Question];
        this.questions.forEach(function (q) {
            if (q instanceof arr[type - 1]) {
                arrQ.push(q);
            }
            ;
            if (arr[type - 1].length == arrQ.length || arrQ.length == num) {
                return arrQ;
            }
        });
        return arrQ;
    };
    QuestionsCatalog.prototype.generateQuestionnaire = function (num, type) {
        var arrQ = [];
        if (type == QuestionsCatalog.SHORT) {
            arrQ = this.generator(num, type, arrQ);
        }
        if (type == QuestionsCatalog.MULTIPLE) {
            arrQ = this.generator(num, type, arrQ);
        }
        if (type == QuestionsCatalog.BOTH) {
            arrQ = this.generator(num, type, arrQ);
        }
        arrQ = arrQ.sort(function () {
            return 0.5 - Math.random();
        });
        return arrQ;
    };
    QuestionsCatalog.SHORT = 1;
    QuestionsCatalog.MULTIPLE = 2;
    QuestionsCatalog.BOTH = 3;
    return QuestionsCatalog;
}());
var Questionnaire = /** @class */ (function () {
    function Questionnaire(num, type) {
        var cat = new QuestionsCatalog();
        this.arrQ = cat.generateQuestionnaire(num, type);
    }
    Questionnaire.prototype.hasNext = function () {
        for (var i = 0; i <= this.arrQ.length; i++) {
            if (i = this.arrQ.length) {
                return false;
            }
        }
        return true;
    };
    Questionnaire.prototype.getNext = function () {
        for (var i = 0; i <= this.arrQ.length; i++) {
            var nextQ = void 0;
            nextQ = this.arrQ[i];
            return nextQ;
        }
    };
    Questionnaire.prototype.checkAnswer = function (answer) {
        this.arrQ.myAnswer = answer;
    };
    Questionnaire.prototype.getTotalQuestions = function () {
        return this.arrQ.length;
    };
    Questionnaire.prototype.getCorrectAnswers = function () {
        var rightA = [];
        for (var i = 0; i <= this.arrQ.length; i++) {
            if (this.arrQ.myAnswer == this.arrQ.answers[0]) {
                rightA.push(i);
            }
        }
        return rightA.length;
    };
    return Questionnaire;
}());
function main() {
    var cat = new QuestionsCatalog();
    var q1 = new ShortAnswerQuestion("How much legs does the spider have?", "8");
    cat.addQuestion(q1);
    var q2 = new MultipleChoiceQuestion("Where is the sun rise?", "East");
    q2.addAnswer("West");
    q2.addAnswer("North");
    q2.addAnswer("South");
    cat.addQuestion(q2);
    // add more questions to the catalog
    /*
        let qnr: Questionnaire = new Questionnaire(5, QuestionsCatalog.BOTH);
        console.log("Welcome to our questionnaire, its starts now!");
        while (qnr.hasNext()) {
            let q: Question = qnr.getNext();
            console.log(q);
            console.log("Your answer: ");
            let answer: string = scan.nextLine();
            qnr.checkAnswer(answer);
        }
        console.log("Thank you for participating in our test");
        let correct: number = qnr.getCorrectAnswers();
        let total: number = qnr.getTotalQuestions();
        console.log("You've answered " + correct + " correct answers out of " +
            total + " questions"); */
}
main();
