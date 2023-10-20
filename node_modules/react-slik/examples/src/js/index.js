import React from 'react';
import ReactDOM from 'react-dom';
import Slik from 'slik';
import { animate } from '../../../src/index';

let animation;

function reverseEachLoop () {
  animation.reverse();
}

animation = new Slik.Animation({
  from: 0,
  to: 1,
  loop: true,
  duration: 1000,
  ease: Slik.Easing.EaseInOutSine
})
  .on('loop', reverseEachLoop);

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      duration: 1000,
      type: 'position',
      easing: 'EaseInOutSine'
    };

    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeEasing = this.onChangeEasing.bind(this);
  }

  onChangeDuration (event) {
    animation.duration(event.target.value);

    this.setState({
      duration: event.target.value
    });
  }

  onChangeType (event) {
    this.setState({
      type: event.target.value
    });
  }

  onChangeEasing (event) {
    animation.ease(Slik.Easing[event.target.value]);

    this.setState({
      easing: event.target.value
    });
  }

  render () {
    const {
      easing,
      type,
      duration
    } = this.state;

    const {
      animated
    } = this.props;

    let transform;

    switch (type) {
      case 'position':
        const offset = (animated - 0.5) * 2 * 400;
        transform = `translate(${offset - 50}%, -50%)`;
        break;
      case 'scale':
        transform = `translate(-50%, -50%) scale(${animated}, ${animated})`;
        break;
      case 'rotation':
        transform = `translate(-50%, -50%) rotate(${animated * 180}deg)`;
        break;
      default:
        transform = 'transform(-50%, -50%)';
        break;
    }

    return (
      <div>
        <div className="canvas">
          <div className="box" style={{transform}} />
        </div>

        <label>
          <span className="text">
            Easing
          </span>
          <span className="input">
            <select value={easing} onChange={this.onChangeEasing}>
              <option value="Linear">
                Linear
              </option>
              <option value="EaseInOutSine">
                EaseInOutSine
              </option>
              <option value="EaseInSine">
                EaseInSine
              </option>
              <option value="EaseOutSine">
                EaseOutSine
              </option>
              <option value="Dip">
                Dip
              </option>
              <option value="Spring">
                Spring
              </option>
            </select>
          </span>
        </label>

        <label>
          <span className="text">
            Animated value
          </span>
          <span className="input">
            <select value={type} onChange={this.onChangeType}>
              <option value="position">
                Position
              </option>
              <option value="scale">
                Scale
              </option>
              <option value="rotation">
                Rotation
              </option>
            </select>
          </span>
        </label>

        <label>
          <span className="text">
            Duration (milliseconds)
          </span>
          <span className="input">
            <select value={duration} onChange={this.onChangeDuration}>
              <option value={500}>
                500
              </option>
              <option value={1000}>
                1000
              </option>
              <option value={2000}>
                2000
              </option>
              <option value={4000}>
                4000
              </option>
            </select>
          </span>
        </label>

      </div>
    );
  }
}

const AnimatedApp = animate(App, {animated: animation});

ReactDOM.render(<AnimatedApp />, document.getElementById('app'));
