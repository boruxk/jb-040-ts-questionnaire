abstract class Question {
    private _qText: string;

    set qText (newQText: string) {
        this._qText = newQText;
    }

    constructor(qText: string){
        this._qText = qText;
    }

    public toString(): string {
        let str = `Question: ${this.qText}`;
        return str;
    }

    public abstract getCorrectAnswer(): string;
    public abstract addCorrectAnswer(answer: string): void;
}

class ShortAnswerQuestion extends Question {
    answer: string;

    constructor(qText: string, answer: string){
        super(qText);
        this.answer = answer;
    }

    toString(): string {
        let str = `${super.toString()}
        Answer is: ${this.answer}`
        return str;
    }

    getCorrectAnswer(){
        return this.answer;
    }
    
    addCorrectAnswer(answer: string): string{
        return this.answer = answer;
    }
}

class MultipleChoiceQuestion extends Question {
    answers: string[];
    private _numberOfAnswers: number;
    correctAnswerIndex: number;

    get numberOfAnswers(): number {
        return this._numberOfAnswers;
    }
    
    set numberOfAnswers(num: number) {
        if (num < 6) {
            this._numberOfAnswers = num;
        }
        else {
            throw "error: too much answers";
        }
    }

    constructor(qText: string, an: string) {
        super(qText);
        this.answers = [];
        this.answers[0] = an;
        this._numberOfAnswers = an.length;
        this.correctAnswerIndex = 0; 
    }

    checkRightAnswer(){
        for(var i=0;i<this.answers.length;i++) {
            if(this.correctAnswerIndex == Number(this.answers[i])){
                return `right answer is ${this.correctAnswerIndex}`
            }
        }
    } 

    toString(): string {
        let str = `${super.toString()}
        The answers are: `;
        this.answers.forEach(an => {
            str += an = "/n";
        });
        return str;
    } 

    getCorrectAnswer() {
        return this.answers[this.correctAnswerIndex];
    }

    addCorrectAnswer(newAnswer: string): string[] {
        if (this.correctAnswerIndex < 6) {
            this.answers.push(newAnswer);
            return this.answers;
        } else {
            return this.answers;
        }
    }

    public addAnswer(newWrongAnswer: string): void {
        if (this.correctAnswerIndex < 6) {
            this.answers.push(newWrongAnswer);
        }
    };
}

class QuestionsCatalog {
    questions: Question[];
    private _numberOfQuestions: number;

    get numberOfQuestions(): number {
        return this._numberOfQuestions;
    }

    set numberOfQuestions(num: number) {
        if (this._numberOfQuestions == 20) {
            throw "max number of questions reached";
        }
        this._numberOfQuestions = num;
    }

    public static SHORT = 1;
    public static MULTIPLE = 2;
    public static BOTH = 3;

    constructor(){
        this._numberOfQuestions = 0;
        this.questions = [];
    }

    public addQuestion(q: Question): void {
        if (this.questions.length < 20) {
            this.questions[this._numberOfQuestions] = q;
            this._numberOfQuestions++;
        } else {
            throw "max number of questions reached";
        }
    }

    //num = number of q in output //type = s, m, b
    private generator(num: number, type: number, arrQ: Question[]): Question[] {
        let arr = [ShortAnswerQuestion, MultipleChoiceQuestion, Question];
        this.questions.forEach(q => {
            if (q instanceof arr[type - 1]) {
                arrQ.push(q);
            };
            if (arr[type - 1].length == arrQ.length || arrQ.length == num) {
                return arrQ;
            }
        });
        return arrQ;
    }

    public generateQuestionnaire(num: number, type: number): Question[] {
        let arrQ: Question[] = [];
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
    }
}

class Questionnaire {
    objQ: QuestionsCatalog;
    private corentQ: number;
    private rightA: number;

    public constructor(num: number, type: number, cat: QuestionsCatalog){
        this.objQ = cat;
        this.objQ.generateQuestionnaire(num, type);
        this.corentQ = 1;
        this.rightA = 0;
    }

    public hasNext(): boolean {
        if (this.objQ.numberOfQuestions > this.corentQ + 1) {
            return true;
        }
        else {
            return false;
        }
    }

    public getNext(): Question {
        this.corentQ++;
        return this.objQ.questions[this.corentQ - 1];
    }

    public checkAnswer(myAnswer: string): void {
        debugger;
        var rightAnswer = this.objQ.questions[this.corentQ - 1].getCorrectAnswer()
        if (myAnswer == rightAnswer) {
            this.rightA++;
        }
        if (this.objQ.numberOfQuestions > this.corentQ)
        this.corentQ++;
    }

    public getTotalQuestions(): number {
        return this.corentQ;
        
    }

    public getCorrectAnswers(): number {
        return this.rightA;
    }
}

function main() {
    var cat: QuestionsCatalog = new QuestionsCatalog();
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

    var qnr: Questionnaire = new Questionnaire(5, QuestionsCatalog.BOTH, cat);
    console.log("Welcome to our questionnaire, its starts now!");
    for (var i = 0; i < qnr.getTotalQuestions(); i++){
        var q: Question = qnr.objQ.questions[i];
        console.log(q);
        var answer: string = myAnswer[i];
        qnr.checkAnswer(answer);
        console.log(`Your answer: ${answer}`);
    }
    console.log("Thank you for participating in our test");
    var correct: number = qnr.getCorrectAnswers();
    var total: number = qnr.getTotalQuestions();
    console.log("You've answered " + correct + " correct answers out of " +
        total + " questions"); 
}
main();