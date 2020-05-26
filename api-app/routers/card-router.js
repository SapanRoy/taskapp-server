"use strict";

const express = require('express');
const cardRouter = express.Router();
const cardController = require('../controllers/card-controller');

cardRouter.post("/lists/cards", (req, res) => {
    cardController.addCard(req,res);
});
cardRouter.delete("/lists/cards/:listId/:cardId", (req, res) => {
    cardController.deleteCard(req, res);
});
cardRouter.post("/lists/cards/move", (req, res) => {
    cardController.moveCard(req,res);
});

module.exports.cardRouter = cardRouter;