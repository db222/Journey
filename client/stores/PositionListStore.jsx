/** @jsx React.DOM */
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

console.log('hello PositionListStore');


var _store = {
    list: [ 'Nurse', 'Rodeo Clown', 'Software Developer', 'Attorney']
};

var PositionStore = objectAssign({}, EventEmitter.prototype, {
    getList : function () {
        return _store.list;
    },
});

module.exports = PositionStore;