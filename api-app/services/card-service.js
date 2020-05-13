"use strict";
const cardListDAL = require('../data/cardList_dataAccess');

const addCard = function (req) {
    try {
        if (!req.body.card.name) {
            throw 'Card name is required.'
        }
        let cardId = cardListDAL.addCard(req.body.card);
        return { "parentListId": req.body.card.parentListId, "newCardId": cardId }

    }
    catch (error) {
        throw error;
    }
}

const deleteCard = function (listId, cardId) {
    try {
        cardListDAL.deleteCard(listId, cardId);
    }
    catch (error) {
        throw error;
    }
}
const moveCard = function (req) {
    try {
        if (!req.body.card.sourceListId) {
            throw 'Source list id is required.';
        }

        if (!req.body.card.targetListId) {
            throw 'Target list id is required.';
        }

        if (!req.body.card.cardId) {
            throw 'Card id is required.';
        }
        let cardId = cardListDAL.moveCard(req.body.card.sourceListId,
            req.body.card.targetListId, req.body.card.cardId);
        return cardId;
    }
    catch (err) {
        throw err;
    }
}
const getCardById = function (listId, cardId) {
    try {
        let card = cardListDAL.getCardById(listId, cardId);
        return card;
    }
    catch (error) {
        console.log(`error -> ${error}`)
        throw error;
    }
}
module.exports = {
    getCardById: getCardById,
    addCard: addCard,
    moveCard: moveCard,
    deleteCard: deleteCard
};


