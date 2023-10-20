# React Slik [![CircleCI](https://circleci.com/gh/JakeSidSmith/react-slik.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/react-slik)

**React higher order component for [Slik](https://github.com/jakesidsmith/slik) animations**

## About

A library that wraps your React components, providing them with animation values as props when they update.

## Installation

Use npm to install react-slik.

```shell
npm install react-slik --save --save-exact
```

I'd recommend pinning to a specific version and using `--save-exact` and `--save` to add this to your package.json automatically.

## Getting started

1. Require react-slik in the file where you'll be animating.

    ```javascript
    import Slik from 'slik';
    import { animate } from 'react-slik';
    ```

1. Create your animations.

    ```javascript
    const animation = new Slik.Animation({from: 0, to: 1});
    ```

1. Create a component.

    ```javascript
    class Component extends React.Component {
      render () {
        const { scale } = this.props;

        return (
          <div style={{transform: `scale(${scale}, ${scale})`}}>
            Hello, World!
          </div>
        );
      }
    }
    ```

1. Animate your component.

    ```javascript
    const options = {
      bind: 'update', // Default, update on all events
      startOnMount: true, // Default
      stopOnUnmount: true // Default
    };

    const AnimatedComponent = animate(Component, {scale: animation}, options);
    ```

1. Render your component.

    ```javascript
    <AnimatedComponent />
    ```
