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
        var str = "Question: " + this.qText;
        return str;
    };
    return Question;
}());
var ShortAnswerQuestion = /** @class */ (function (_super) {
    __extends(ShortAnswerQuestion, _super);
    function ShortAnswerQuestion(qText, answer) {
        var _this = _super.call(this, qText) || this;
        _this.answer = answer;
        return _this;
    }
    ShortAnswerQuestion.prototype.toString = function () {
        var str = _super.prototype.toString.call(this) + "\n        Answer is: " + this.answer;
        return str;
    };
    ShortAnswerQuestion.prototype.getCorrectAnswer = function () {
        return this.answer;
    };
    ShortAnswerQuestion.prototype.addCorrectAnswer = function (answer) {
        return this.answer = answer;
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
                throw "error: too much answers";
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
    MultipleChoiceQuestion.prototype.toString = function () {
        var str = _super.prototype.toString.call(this) + "\n        The answers are: ";
        this.answers.forEach(function (an) {
            str += an = "/n";
        });
        return str;
    };
    MultipleChoiceQuestion.prototype.getCorrectAnswer = function () {
        return this.answers[this.correctAnswerIndex];
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
                throw "max number of questions reached";
            }
            this._numberOfQuestions = num;
        },
        enumerable: true,
        configurable: true
    });
    QuestionsCatalog.prototype.addQuestion = function (q) {
        if (this.questions.length < 20) {
            this.questions[this._numberOfQuestions] = q;
            this._numberOfQuestions++;
        }
        else {
            throw "max number of questions reached";
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
    function Questionnaire(num, type, cat) {
        this.objQ = cat;
        this.objQ.generateQuestionnaire(num, type);
        this.corentQ = 1;
        this.rightA = 0;
    }
    Questionnaire.prototype.hasNext = function () {
        if (this.objQ.numberOfQuestions > this.corentQ + 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Questionnaire.prototype.getNext = function () {
        this.corentQ++;
        return this.objQ.questions[this.corentQ - 1];
    };
    Questionnaire.prototype.checkAnswer = function (myAnswer) {
        debugger;
        var rightAnswer = this.objQ.questions[this.corentQ - 1].getCorrectAnswer();
        if (myAnswer == rightAnswer) {
            this.rightA++;
        }
        if (this.objQ.numberOfQuestions > this.corentQ)
            this.corentQ++;
    };
    Questionnaire.prototype.getTotalQuestions = function () {
        return this.corentQ;
    };
    Questionnaire.prototype.getCorrectAnswers = function () {
        return this.rightA;
    };
    return Questionnaire;
}());
function main() {
    var cat = new QuestionsCatalog();
    var q1 = new ShortAnswerQuestion("How much legs does the spider have?", "8");
    // q1.addCorrectAnswer("8");
    cat.addQuestion(q1);
    var q2 = new MultipleChoiceQuestion("Where is the sun rise?", "East");
    q2.addAnswer("West");
    q2.addAnswer("North");
    q2.addAnswer("South");
    cat.addQuestion(q2);
    // add more questions to the catalog
    // my answers
    var myAnswer = ["8", q2.answers[0]];
    var qnr = new Questionnaire(5, QuestionsCatalog.BOTH, cat);
    console.log("Welcome to our questionnaire, its starts now!");
    for (var i = 0; i < qnr.getTotalQuestions(); i++) {
        var q = qnr.objQ.questions[i];
        console.log(q);
        var answer = myAnswer[i];
        qnr.checkAnswer(answer);
        console.log("Your answer: " + answer);
    }
    console.log("Thank you for participating in our test");
    var correct = qnr.getCorrectAnswers();
    var total = qnr.getTotalQuestions();
    console.log("You've answered " + correct + " correct answers out of " +
        total + " questions");
}
main();
