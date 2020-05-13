"use strict";

const listService = require('../services/list-service');
const HTTPSTATUSCODE = require('../constant/app-const');

const addList = function (req, res) {
    try {
        let newID = listService.addList(req);
        return res.status(HTTPSTATUSCODE.CREATED).json({ "id": newID });
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.INTERNALSERVERERROR).json({ error: err.toString() });
    }
}
const deleteList = function (req, res) {
    try {
        listService.deleteList(req.params.id);
        return res.status(HTTPSTATUSCODE.OK).json();
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}

const getListById = function (req, res) {
    try {
        let list = listService.getListById(req.params.id);
        return res.status(HTTPSTATUSCODE.OK).json(list);
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}

const getAllList = function (req, res) {
    try {
        let lists = listService.getAllList();
        return res.status(HTTPSTATUSCODE.OK).json(lists);
    }
    catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}
// TODO: Not needed
// const getCardsByListId = function (req, res) {
//     try {
//         let cards = listService.getCardsByList(req.params.id);
//         return res.status(HTTPSTATUSCODE.OK).json({ "id": req.params.id, "name": listName });
//     }
//     catch (err) {
//         res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
//     }
// }

const getCardsFromList = function (req, res) {
    try {
        let card = listService.getCardFromList(req.body);
        return res.status(HTTPSTATUSCODE.OK).json({ "card": card});
    }
    catch (error) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: error.toString() });
    }
}

module.exports = {
    addList: addList,
    deleteList: deleteList,
    getListById: getListById,
    getAllList: getAllList,
    // getCardsByListId: getCardsByListId,
    getCardsFromList: getCardsFromList
};