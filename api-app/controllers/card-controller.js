"use strict";

const cardService = require('../services/card-service');
const HTTPSTATUSCODE = require('../constant/app-const');

const addCard = function (req, res) {
    try {
        let newCardListMapping = cardService.addCard(req);
        return res.status(HTTPSTATUSCODE.CREATED).json({ "cardList": newCardListMapping });
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.INTERNALSERVERERROR).json({ error: err.toString() });
    }
}
const deleteCard = function (req, res) {
    try {
        cardService.deleteCard(req.params.listId, req.params.cardId);
        return res.status(HTTPSTATUSCODE.OK).json();
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}
const moveCard = function (req, res) {
    try {
        let cardId = cardService.moveCard(req);
        return res.status(HTTPSTATUSCODE.CREATED).json({ "cardId": cardId });
    }
    catch (err){
        res.status(HTTPSTATUSCODE.INTERNALSERVERERROR).json({ error: err.toString() });
    }
}
const getCardById = function (req, res) {
    try {
        let list = cardService.getCardById(req.params.listId, req.params.cardId);
        return res.status(HTTPSTATUSCODE.OK).json(list);
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}
module.exports = {
    getCardById: getCardById,
    addCard: addCard,
    moveCard: moveCard,
    deleteCard: deleteCard
};