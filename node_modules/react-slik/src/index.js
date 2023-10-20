'use strict';

(function () {

  function assign () {
    var args = Array.prototype.slice.call(arguments);
    var newObj = args[0];

    for (var i = 1; i < args.length; i += 1) {
      for (var key in args[i]) {
        newObj[key] = args[i][key];
      }
    }

    return newObj;
  }

  function getDefault (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }

  function getReactSlik (Slik, React, createReactClass) {
    function animate (Component, animations, options) {
      options = getDefault(options, {}) || {};
      var bind = getDefault(options.bind, 'update');
      var startOnMount = getDefault(options.startOnMount, true);
      var stopOnUnmount = getDefault(options.stopOnUnmount, true);

      return createReactClass({
        getInitialState: function () {
          var initialState = {};

          for (var key in animations) {
            initialState[key] = animations[key].values();
          }

          return initialState;
        },

        componentWillMount: function () {
          this.subscriptions = {};

          for (var key in animations) {
            this.subscriptions[key] = animations[key].subscribe(bind, this.updateState.bind(this, key));
          }
        },

        componentDidMount: function () {
          if (startOnMount) {
            for (var key in animations) {
              animations[key].start();
            }
          }
        },

        componentWillUnmount: function () {
          if (stopOnUnmount) {
            for (var animationKey in animations) {
              animations[animationKey].stop();
            }
          }

          for (var subscriptionKey in this.subscriptions) {
            this.subscriptions[subscriptionKey]();
          }
        },

        updateState: function (key, values) {
          var state = {};
          state[key] = values;

          this.setState(state);
        },

        render: function () {
          return React.createElement(Component, assign({}, this.state, this.props));
        }
      });
    }

    return {
      animate: animate
    };
  }

  // Export for commonjs / browserify
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    /* eslint-disable no-undef */
    module.exports = getReactSlik(
      require('slik'),
      require('react'),
      require('create-react-class')
    );
    /* eslint-enable no-undef */
  // Export for amd / require
  } else if (typeof define === 'function' && define.amd) { // eslint-disable-line no-undef
    define(['slik', 'react', 'create-react-class'], function ( // eslint-disable-line no-undef
      Slik,
      React,
      createReactClass
    ) {
      return getReactSlik(
        Slik,
        React,
        createReactClass
      );
    });
  // Export globally
  } else {
    var root;

    if (typeof window !== 'undefined') {
      root = window;
    } else if (typeof global !== 'undefined') {
      root = global; // eslint-disable-line no-undef
    } else if (typeof self !== 'undefined') {
      root = self; // eslint-disable-line no-undef
    } else {
      root = this;
    }

    root.Slik = getReactSlik(
      root.Slik,
      root.React,
      root.createReactClass
    );
  }

})();
