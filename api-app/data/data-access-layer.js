const DB = require('node-json-db');
const JsonDBConfig = require('../node_modules/node-json-db/dist/lib/JsonDBConfig');

// set db
var db = new DB.JsonDB(new JsonDBConfig.Config("listCardDB", true, false, '/'));
const shortid = require('shortid');

const addList = function(listData) {
    try {
        let id = shortid.generate();
        db.push("/lists[]", { id: id, name: listData.name }, true);
        return getListById(id);
    } catch (err) {
        throw err;
    }
};

const getAllList = function() {
    try {
        return db.getData("/lists");
    } catch (err) {
        throw err;
    }
}
const getListById = function(id) {
    try {
        let index = db.getIndex("/lists", id)
        return db.getData(`/lists[${index}]`);

    } catch (err) {
        throw err;
    }
}
const deleteList = function(id) {
    try {
        let listIndex = db.getIndex("/lists", id);
        db.delete(`/lists[${listIndex}]`);
    } catch (err) {
        throw err;
    }
}
const addCard = function(cardData) {
    try {
        let id = shortid.generate();
        let listIndex = db.getIndex("/lists", cardData.parentListId);
        db.push(`/lists[${listIndex}]/cards[]`, { id: id, name: cardData.name }, true);
        card = getCardById(cardData.parentListId, id);
        let newCard = { id: id, name: card.name, parentListId: cardData.parentListId };
        return newCard;
    } catch (err) {
        throw err
    }
}
const getCardById = function(listId, cardId) {
    try {
        let listIndex = db.getIndex("/lists", listId);
        let cardIndex = db.getIndex(`/lists[${listIndex}]/cards`, cardId);
        return db.getData(`/lists[${listIndex}]/cards[${cardIndex}]`);
    } catch (err) {
        throw err;
    }
}
const deleteCard = function(listId, cardId) {
    try {
        let listIndex = db.getIndex("/lists", listId);
        let cardIndex = db.getIndex(`/lists[${listIndex}]/cards`, cardId);
        db.delete(`/lists[${listIndex}]/cards[${cardIndex}]`);
    } catch (err) {
        throw err;
    }
}
const moveCard = function(sourceListId, targetListId, cardId) {
    try {
        // local copy
        let card = getCardById(sourceListId, cardId);
        // delete from source
        deleteCard(sourceListId, card);

        let cardData = new Object();
        cardData["parentListId"] = targetListId;
        // cardData["id"] = card.id;
        cardData["name"] = card.name;
        // add to target
        addCard(cardData);

    } catch (err) { throw err }
}
const getCardFromList = function(cardListParam) {
    let listIndex = db.getIndex("/lists", cardListParam.listId);
    let cardIndex = db.getIndex(`/lists[${listIndex}]/cards`, cardListParam.cardId);
    return db.getData(`/lists[${listIndex}]/cards[${cardIndex}]`);
}
module.exports = {
    addList: addList,
    deleteList: deleteList,
    getListById: getListById,
    getAllList: getAllList,
    getCardFromList: getCardFromList,
    addCard: addCard,
    deleteCard: deleteCard,
    moveCard: moveCard,
    getCardById: getCardById
};