"use strict";
const cardListDAL = require('../data/data-access-layer');

const addList = function (req) {
    try {
        if (!req.body.name) {
            throw 'List name is required.'
        }
        return cardListDAL.addList(req.body);
    }
    catch (error) {
        throw error;
    }
}

const deleteList = function (id) {
    try {
        cardListDAL.deleteList(id);
    }
    catch (error) {
        throw error;
    }
}
const getListById = function (id) {
    try {
        let list = cardListDAL.getListById(id);
        return list;
    }
    catch (error) {
        throw error;
    }
}
const getAllList = function () {
    try {
        return cardListDAL.getAllList() ;;
    }
    catch (error) {
        throw error;
    }
}

const getCardFromList = function (cardListParam) {
    try {
        let card = cardListDAL.getCardFromList(cardListParam);
        return { "id": card.id, "name": card.name, "parentListId": cardListParam.listId };
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    addList: addList,
    deleteList: deleteList,
    getListById: getListById,
    getAllList: getAllList,
    getCardFromList: getCardFromList
};



