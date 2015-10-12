/* globals React */
'use strict';

var NavBtns= React.createClass({
  getInitialState: function() {
    return({
      hovered: false
    });
  },
  render: function() {
    var toggleHovered = this.props.toggleState.bind(this, 'hovered');
    var navBtns = [React.createElement(window.NavBtn, {
      key: this.props.keyHead,
      path: this.props.path,
      display: this.props.display
    })];
    if (this.state.hovered) {
      navBtns.push(this.props.navBtns.map(function(props) {
        return React.createElement(window.NavBtn, props);
      }));
    }

    return React.createElement('div', {
      className: 'nav-btns',
      onMouseEnter: toggleHovered,
      onMouseLeave: toggleHovered
    }, navBtns);
  }
});
