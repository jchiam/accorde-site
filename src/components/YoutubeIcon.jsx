import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class YoutubeIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  render() {
    const { hovered } = this.state;
    const { className, onClick } = this.props;
    return (
      <button
        className={className}
        onClick={onClick}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
      >
        <svg style={{ width: '100%', height: '100%' }} width="175px" height="175px" viewBox="0 0 175 175">
          <g id="Take-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Desktop-HD-Copy-7" transform="translate(-300.000000, -446.000000)">
              <g id="Group-2" transform="translate(291.000000, 253.000000)">
                <g id="Group" transform="translate(0.000000, 189.000000)">
                  <g id="Group-3" transform="translate(0.000000, 4.000000)">
                    <g id="YouTube" transform="translate(9.000000, 0.000000)">
                      <circle id="Oval-1-Copy-2" fill="#BF0000" cx="87.5" cy="87.5" r="87.5" />
                      <polygon id="Fill-9" fill="#FFFFFF" points="62.5 47.5 62.5 130 130.517857 88.75" />
                      <circle id="Oval-4" fill="#000000" opacity={hovered ? 0.3 : 0} cx="87.5" cy="87.5" r="87.5" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
    );
  }
}

YoutubeIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

YoutubeIcon.defaultProps = {
  className: '',
  onClick: () => {}
};
