"use strict";
const cardListDAL = require('../data/cardList_dataAccess');

const addList = function (req) {
    try {
        let tempList = req.body.list;
        if (!tempList.name) {
            throw 'List name is required.'
        }
        // add list to model and return new list id
        let newlistId = cardListDAL.addList(req.body.list);

        // let newlistId = cardListModel.addList(req.body.list);
        // console.log(`list added with id ${newlistId}`);
        return newlistId;
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

        // console.log(`get list by list id -> ${id}`);
        // let list = new Object();
        // // get list by id
        // let listName = cardListModel.getListById(parseInt(id));
        // list["id"] = id;
        // list["name"] = listName;
        // let cardsMapping = cardListModel.getCardsMappingFromList(parseInt(id));;
        // console.log('at service getListById');
        // console.log(JSON.stringify(cardsMapping));

        // let cards = cardListModel.getCardsFromList(parseInt(id));

        // console.log(`getListById->Cards found${JSON.stringify(cards)}`);

        //     let foundList = new object();
        //     foundList["list"] = list;
        //    // foundlist["list"]["cards"] = cards;


        // console.log(JSON.stringify(listFound));
        return list;
    }
    catch (error) {
        console.log(`error -> ${error}`)
        throw error;
    }
}
const getAllList = function () {
    try {
        return cardListDAL.getAllList();
        // // throw error if no list available
        // let allLists = new Array();
        // // get all lists 
        // let lists = Array.from(cardListModel.getAllList());
        // lists.forEach(listItem => {
        //     let listId = parseInt(listItem[0]);
        //     //let cards = cardListModel.getCardsFromList(listId);
        //     let cardsArray = new Array();
        //     let i;
        //     // for (i = 0; i < 5; i++) {
        //     //     let card = new Object();
        //     //     card["id"] = i;
        //     //     card["name"] = `card${i}`;
        //     //     cardsArray.push(card);
        //     // }
        //     let list = new Object();
        //     list["id"] = listItem[0];
        //     list["name"] = listItem[1];
        //     list["cards"] = cardsArray;
        //     allLists.push(list);
        // });
        //console.log(`allList->${JSON.stringify(allLists)}`)

    }
    catch (error) {
        console.log(`allList error -> ${error}`);
        throw error;
    }
}

const getCardFromList = function (cardListParam) {
    try {
        let card = cardListDAL.getCardFromList(cardListParam);
        return { "id": card.id, "name": card.name, "parentListId": cardListParam.listId };
    }
    catch (err) {
        console.log(err);
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



