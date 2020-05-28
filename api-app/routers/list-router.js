"use strict";

const express = require('express');
const listRouter = express.Router();
const listController = require('../controllers/list-controller');

listRouter.post("/lists", (req, res) => {
    listController.addList(req, res);
});
listRouter.put("/lists", (req, res) => {
    listController.editList(req, res);
});
listRouter.get("/lists", (req, res) => {
    listController.getAllList(req, res);
});
listRouter.delete("/lists/:id", (req, res) => {
    listController.deleteList(req, res);
});

module.exports.listRouter = listRouter;