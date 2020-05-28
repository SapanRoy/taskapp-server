"use strict";

const listService = require('../services/list-service');
const HTTPSTATUSCODE = require('../constant/app-const');

const addList = function(req, res) {
    try {
        let newList = listService.addList(req);
        return res.status(HTTPSTATUSCODE.CREATED).json(newList);
    } catch (err) {
        res.status(HTTPSTATUSCODE.INTERNALSERVERERROR).json({ error: err.toString() });
    }
}

const editList = function(req, res) {
    try {
        let updatedList = listService.editList(req);
        return res.status(HTTPSTATUSCODE.CREATED).json(updatedList);
    } catch (err) {
        res.status(HTTPSTATUSCODE.INTERNALSERVERERROR).json({ error: err.toString() });
    }
}
const deleteList = function(req, res) {
    try {
        listService.deleteList(req.params.id);
        return res.status(HTTPSTATUSCODE.OK).json();
    } catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}

const getListById = function(req, res) {
    try {
        let list = listService.getListById(req.params.id);
        return res.status(HTTPSTATUSCODE.OK).json(list);
    } catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}

const getAllList = function(req, res) {
    try {
        let lists = listService.getAllList();
        return res.status(HTTPSTATUSCODE.OK).json(lists);
    } catch (err) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: err.toString() });
    }
}
const getCardsFromList = function(req, res) {
    try {
        let card = listService.getCardFromList(req.body);
        return res.status(HTTPSTATUSCODE.OK).json({ "card": card });
    } catch (error) {
        res.status(HTTPSTATUSCODE.NOCONTENT).json({ error: error.toString() });
    }
}

module.exports = {
    addList: addList,
    editList: editList,
    deleteList: deleteList,
    getListById: getListById,
    getAllList: getAllList,
    getCardsFromList: getCardsFromList
};