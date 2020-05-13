"use strict";

const express = require('express');
const cardRouter = express.Router();
const cardController = require('../controllers/card-controller');

cardRouter.post("/card/add", (req, res) => {
    cardController.addCard(req,res);
});
cardRouter.delete("/list/card/delete/:listId/:cardId", (req, res) => {
    cardController.deleteCard(req, res);
});
cardRouter.post("/card/move", (req, res) => {
    cardController.moveCard(req,res);
});

cardRouter.get("/list/card/get/:listId/:cardId", (req, res) => {
    cardController.getCardById(req, res);
});

module.exports.cardRouter = cardRouter;