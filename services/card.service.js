import { fetchWrapper } from "helpers"
import getConfig from "next/config";
import { userService } from "./user.service"

const { publicRuntimeConfig } = getConfig();


const userid = userService.userValue?.id
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export const cardService = {
    addCategory,
    _addCard,
    getAllCards,
    getAllCategories,
    _removeCard,
    _updateCard
}

function addCategory(name) {
    return fetchWrapper.post(`${baseUrl}/card/category/add`, { userid, name })
        .then(category => {
            return Promise.resolve(category)
        }).catch(err => {
            return Promise.reject(err)
        })
}

function getAllCategories() {
    return fetchWrapper.get(`${baseUrl}/card/category/all`, { userid })
        .then(cards => {
            return Promise.resolve(cards)
        }).catch(err => {
            return Promise.reject(err)
        })
}

function getAllCards() {
    return fetchWrapper.get(`${baseUrl}/card/all`, { userid })
        .then(cards => {
            return Promise.resolve(cards)
        }).catch(err => {
            return Promise.reject(err)
        })
}


function _addCard(categoryId, front_text, back_text) {
    return fetchWrapper.post(`${baseUrl}/card/add`, { userid, categoryId, front_text, back_text })
        .then(card => {
            return Promise.resolve(card)
        }).catch(err => {
            return Promise.reject(err)
        })
}

function _removeCard(cardId) {
    return fetchWrapper.delete(`${baseUrl}/card/${cardId}`)
        .then(card => {
            return Promise.resolve(card)
        }).catch(err => {
            return Promise.reject(err)
        })
}
function _updateCard(cardId, categoryId, front_text, back_text) {
    return fetchWrapper.put(`${baseUrl}/card/${cardId}`, { categoryId, front_text, back_text })
        .then(card => {
            return Promise.resolve(card)
        }).catch(err => {
            return Promise.reject(err)
        })
}
