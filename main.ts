abstract class Question {
    private _qText: string;

    set qText (newQText: string) {
        this._qText = newQText;
    }

    constructor(qText: string){
        this._qText = qText;
    }

    toString() {
        return this._qText;
    }

    public abstract getCorrectAnswer(): string;
    public abstract addCorrectAnswer(newAnswer: string): void;
    addAnswer(arg0: string): void {};
}

class ShortAnswerQuestion extends Question {
    answer: string;

    constructor(qText: string, answer: string){
        super(qText);
        this.answer = answer;
    }

    getCorrectAnswer(){
        var str = `Answer: ${this.answer}`;
        return str;
    }
    
    addCorrectAnswer(newAnswer: string): string{
        return this.answer = newAnswer;
    }
}

class MultipleChoiceQuestion extends Question {
    answers: string[];
    private _numberOfAnswers: number;
    get numberOfAnswers(): number {
        return this._numberOfAnswers;
    }
    set numberOfAnswers(num: number) {
        if (num < 6) {
            this._numberOfAnswers = num;
        }
        else {
            throw "Too much answers";
        }
    }
    correctAnswerIndex: number;

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
// test tostring
    toString() {
        return `Question: ${this.qText} /n
                Answers: /n
                ${this.answers.map((item, i) => `  
                Answer number ${this.answers[i]}. /n
                `)}`;
    }  

    getCorrectAnswer() {
        var str = `Correct answer is: ${this.answers[this.correctAnswerIndex]}`;
        return str;
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
            return; // if more the 20 -> pop() and throw error
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
            this.questions.push(q);
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
    arrQ: any[];
    constructor(num: number, type: number){
        let cat = new QuestionsCatalog();
        this.arrQ = cat.generateQuestionnaire(num, type);
    }

    public hasNext(): boolean {
        for (let i = 0; i <= this.arrQ.length;i++){
            if (i = this.arrQ.length) {
                return false;
            }
        }
        return true;
    }

    public getNext(): Question {
        for (let i = 0; i <= this.arrQ.length; i++) {
            let nextQ: Question;
            nextQ = this.arrQ[i];
            return nextQ;
        }
    }

    public checkAnswer(answer: string): void {
        this.arrQ.myAnswer = answer;
    }

    public getTotalQuestions(): number {
        return this.arrQ.length;
    }

    public getCorrectAnswers(): number {
        let rightA = [];
        for (let i = 0; i <= this.arrQ.length; i++) {
            if (this.arrQ.myAnswer == this.arrQ.answers[0]){
                rightA.push(i);
            }
        }
        return rightA.length;
    }
}

function main() {
    let cat: QuestionsCatalog = new QuestionsCatalog();
    let q1: Question = new ShortAnswerQuestion("How much legs does the spider have?", "8");
    cat.addQuestion(q1);
    let q2: Question = new MultipleChoiceQuestion("Where is the sun rise?", "East");
    q2.addAnswer("West");
    q2.addAnswer("North");
    q2.addAnswer("South");
    cat.addQuestion(q2);
    // add more questions to the catalog

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
        total + " questions"); 
}
main();