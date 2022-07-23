import e from "cors";
import { autorun, makeAutoObservable, reaction, runInAction } from "mobx";
import { cardService } from "services/card.service";

class CardStore {
    IsAddCard = false;
    IsaddedCard = false;
    cards = [];
    categories = [];
    addCategoryNameInputText = '';
    selectedCategory;
    previewCard;
    error = {
        category_name_length: true,
        create_category: false
    }
    response = {
        actionName: '',
        message: '',
        type: ''
    }
    editcard = {
        card: null,
        status: false,
    }
    requests = {
        getallcards: false,
        getallcategories: false
    }


    /*
    if you not use autobind inside makeAutoObservable you cant access class variables in inside of function 
    so, you should bind function for use class variables
    this.changeIsAddCard = this.changeIsAddCard.bind(this);
     */
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })


        reaction(
            () => this.editcard.card,
            card => {
                if (card !== null) {
                    this.IsAddCard = true;
                    this.previewCard = this.editcard.card
                    this.selectedCategory = this.categories.find(c => c.id === this.editcard.card.categoryId)
                } else {
                    this.editcard.status = true;
                }
            }
        )

        reaction(
            () => this.editcard.status,
            status => {
                if (status) {
                    this.editcard.status = false;
                    this.editcard.card = null;
                    this.IsAddCard = false;
                    this.editcard.status = true;
                }
            }
        )

    }


    editingCard(card) {
        this.editcard.card = card
    }

    changeEditCardState() {
        this.editcard.status = !this.editcard.status
    }


    changeIsAddCard() {
        if (this.IsAddCard) {
            this.IsAddCard = false
            this.previewCard = null
            if (this.editcard.status) {
                this.editcard.status = false;
                this.editcard.card = null
            }
        } else {
            this.IsaddedCard = false;
            this.previewCard = new Card('', '', '')
            this.IsAddCard = true;
            this.error = {
                category_name_length: true,
                create_category: false
            }

            if (this.selectedCategory.id === 0) {
                this.selectedCategory = this.categories[1]
            }
        }
    }


    addCard(id, frontText, backText, categoryId, order) {
        const card = new Card(id, frontText, backText, categoryId, order)
        this.cards.push(card)

    }




    useErrorResetToDefault() {
        this.error = {
            category_name_length: true,
            create_category: false
        }
    }
    useError(errorName, { errorValue, condition }) {
        if (condition) {
            this.error[errorName] = condition
        } else {
            this.error[errorName] = errorValue
        }
    }

    useResponseMessage(actionName, message, type) {

        this.response = { actionName, message, type }
    }
    useResponseMessageReset() {

        this.response = {}
    }

    changeselectedCategory(category) {
        this.selectedCategory = category
    }

    changeAddCategoryNameInputText(text) {
        this.addCategoryNameInputText = text
    }


    // request actions

    //get list from db
    *getCategoryList() {

        try {
            const categories = yield cardService.getAllCategories()
            this.categories = [new Category(0, 'Hepsi'), ...Array.from(categories, x => new Category(x.id, x.name))]
            this.selectedCategory = this.categories[0]
        } catch (err) {
            console.error(err)
        }

    }
    //get all cards list
    *getCardList() {
        try {
            const cards = yield cardService.getAllCards()
            this.cards = [...Array.from(cards, x => new Card(x.id, x.front_text, x.back_text, x.categoryId, x.order))]
        } catch (err) {
            console.error(err)
        }
    }

    //add category to db
    createCategory(name) {

        cardService.addCategory(name).then((cat) => {
            runInAction(() => {
                const category = new Category(cat.id, cat.name)
                this.categories.push(category)
                this.useResponseMessage('create_category', 'Kategori Başarıyla Eklendi', 'success')
                this.selectedCategory = category
            })

        }).catch(err => {
            runInAction(() => {
                this.useResponseMessage('create_category', err, 'error')
            })

        })
    }

    //add card to db
    addedCard() {
        cardService._addCard(this.selectedCategory.id, this.previewCard.frontText, this.previewCard.backText, this.previewCard.order).then((card) => {
            runInAction(() => {

                this.IsaddedCard = true;
                this.addCard(card.id, card.front_text, card.back_text, card.categoryId)
                this.useResponseMessage('added_card', 'Kart Başarıyla Eklendi', 'success')
                this.previewCard.edit({ frontText: '', backText: '' })

            })
        }).catch(err => {
            runInAction(() => {
                this.useResponseMessage('added_card', err.message, 'error')
            })
        })
    }

    //remove card from db
    removeCard(cardId) {
        cardService._removeCard(cardId).then((card) => {
            runInAction(() => {
                this.cards = this.cards.filter(c => c.id !== card.id)
                this.useResponseMessage('removed_card', 'Kart Başarıyla Silindi', 'success')
            })
        }).catch(err => {
            runInAction(() => {
                this.useResponseMessage('removed_card', err.message, 'error')
            })

        })
    }
    updateCard() {
        cardService._updateCard(this.editcard.card.id, this.selectedCategory.id, this.previewCard.frontText, this.previewCard.backText).then((card) => {
            runInAction(() => {
                let changedcard = this.cards.find(c => c.id === card.id)
                changedcard.frontText = card.front_text
                changedcard.backText = card.back_text
                changedcard.categoryId = card.categoryId
                this.useResponseMessage('update_card', 'Kart Başarıyla Güncellendi', 'success')
            })
        }).catch(err => {
            runInAction(() => {
                this.useResponseMessage('update_card', err.message, 'error')
            })

        })
    }

    /*
    get showAllCards() {
        return Object.keys(this.cards).reduce((prev, current) => {
            return [...this.cards[prev] ?? [], ...this.cards[current] ?? []]
        }, []);
    }
     */


}



class Card {
    id = null
    frontText = ''
    backText = ''
    newCard = false
    categoryId = this.selectedCategory
    constructor(id, frontText, backText, categoryId, order, newCard) {
        makeAutoObservable(this);
        this.id = id
        this.frontText = frontText
        this.backText = backText
        this.categoryId = categoryId
        this.order = order
        this.newCard = newCard
    }

    edit({ frontText, backText }) {
        runInAction(() => {
            frontText != undefined && (this.frontText = frontText)
            backText != undefined && (this.backText = backText)
        })

    }
    get value() {
        return { frontText: this.frontText, backText: this.backText, newCard: this.newCard }
    }
    set newCardSet(value) {
        this.newCard = value
    }
    get newCardValue() {
        return this.newCard
    }

}

class Category {
    id;
    name = ''

    constructor(id, name) {
        makeAutoObservable(this)
        this.id = id
        this.name = name
    }
    get name() {
        return this.name
    }
    get id() {
        return this.id
    }

}

export default new CardStore()