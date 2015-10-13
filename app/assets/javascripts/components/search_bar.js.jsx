/* globals React, ajax */
'use strict';

var SearchBar = React.createClass({
  getInitialState: function() {
    return({
      value: '',
      results: []
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  focusInput: function() {
    this.refs.searchBar.getDOMNode().focus();
  },
  updateSearch: function(event) {
    var newValue = event.target.value;
    if (newValue.length) {
      ajax.get(this.props.url,
        { input: newValue },
        function(output) {
          var rawResults = JSON.parse(output);
          var results = [];
          var result;
          var i = rawResults.length;
          var z = 0;
          while (i-- > 0) {
            result = rawResults[i];
            result.zIndex = z;
            results.unshift(React.createElement(window.SearchResult, result));
            results.unshift(React.createElement(window.NavBtn, {
              key: 'top-block-' + i,
              zIndex: z + 1,
              path: result.path,
              display: ''
            }));
            results.unshift(React.createElement(window.NavBtn, {
              key: 'bot-block-' + i,
              zIndex: z,
              path: rawResults[i - 1] && rawResults[i - 1].path,
              display: '',
              onClick: i ? null : this.focusInput
            }));
            z+= 2;
          }

          this.setState({
            value: newValue,
            results: results
          });
        }.bind(this),
        true);
    } else {
      this.setState({
        value: newValue,
        results: []
      });
    }
  },
  submitSearch: function(event) {
    if (event.keyCode === 13) {
      this.goToFirstResult();
    }
  },
  goToFirstResult: function() {
    var firstResult = this.state.results[0];
    if (firstResult) {
      window.location.href = firstResult.props.path;
    }
  },
  render: function() {
    var results = this.state.results;
    var searchBarStyle = results.length ? {
      zIndex: results.length * 2
    } : {
      WebkitBorderRadius: '180px 0 180px 0 \/ 26.5px 0 26.5px 0',
      MozBorderRadius: '180px 0 180px 0 \/ 26.5px 0 26.5px 0',
      msBorderRadius: '180px 0 180px 0 \/ 26.5px 0 26.5px 0',
      OBorderRadius: '180px 0 180px 0 \/ 26.5px 0 26.5px 0',
      borderRadius: '180px 0 180px 0 \/ 26.5px 0 26.5px 0'
    };
    var input = React.createElement('input', {
      type: 'text',
      ref: 'searchBar',
      style: searchBarStyle,
      value: this.state.value,
      placeholder: this.props.placeholder,
      onChange: this.updateSearch,
      onKeyUp: this.submitSearch
    }, React.createElement('button', { onClick: this.goToFirstResult }));


    var searchBar = React.createElement('div', {
      key: 'search-bar',
      className: 'search-bar',
      style: searchBarStyle
    }, input);

    return React.createElement('div', {
      className: 'search-results'
    }, [searchBar].concat(results));
  }
});
