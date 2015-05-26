/** @jsx React.DOM */
var React = require('react');
var PositionListStore = require('../stores/PositionListStore.jsx');

console.log('hello HomeViewComponent');
var HomeViewComponent = React.createClass({
  render: function(){
    return (
      <div>
        <h3 class='journeys-header'>Choose a Journey</h3>
        <PositionList />
      </div>
    )
  }
});

var PositionList = React.createClass({
    getInitialState : function() {
    return {
      positions: [ 'nurse' ]
    }
  },

  render : function() {
    var listItems = this.state.positions.map(function(position) {
      return <li> {position} </li>;
    });
    return (
      <div class='position-list-container'>
        <ul class='position-list'>
          { listItems }
        </ul>
      </div>
    )
  }
})

React.render(<HomeViewComponent />, document.getElementById('app'));