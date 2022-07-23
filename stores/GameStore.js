import { autorun, makeAutoObservable } from "mobx";


class GameStore {

    gameCards = [];
    RefArray = {
        answerRefs: [],
        questionRefs: []
    }
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

    }

    createGameCard(question, answer) {
        this.gameCards.push(new GameCard(question, answer))
    }

    ArrayRefPush(answer, question) {
        this.RefArray.answerRefs.push(answer)
        this.RefArray.questionRefs.push(question)
    }



}

class GameCard {

    constructor(question, answer) {
        makeAutoObservable(this, { autoBind: true })
        this.question = question;
        this.answer = answer;

    }

}

export default new GameStore()