/* eslint-disable max-len */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmailIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  render() {
    const { hovered } = this.state;
    const { className } = this.props;
    return (
      <div
        className={className}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
      >
        <svg style={{ width: '100%', height: '100%' }} width="175px" height="175px" viewBox="0 0 175 175">
          <defs>
            <rect id="path-1" x={0} y={0} width="85.4993885" height="56.3044753" rx={2} />
          </defs>
          <g id="Take-2" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g id="Desktop-HD-Copy-7" transform="translate(-974.000000, -446.000000)">
              <g id="Group-2" transform="translate(291.000000, 253.000000)">
                <g id="Group" transform="translate(0.000000, 188.000000)">
                  <g id="Group-5" transform="translate(683.000000, 5.000000)">
                    <g id="mail">
                      <circle id="Oval-3" fill="#F5A623" cx="87.5" cy="87.5" r="87.5" />
                      <g id="Group-11" transform="translate(45.000000, 60.000000)">
                        <g id="Rectangle-2">
                          <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1" />
                          <rect stroke="#FFFFFF" strokeWidth={4} x={2} y={2} width="81.4993885" height="52.3044753" rx={2} />
                        </g>
                        <path
                          d="M2.74655808,2.10786221 L39.862403,25.2981259 C41.2657827,26.1749683 43.5534782,26.1941365 44.9815351,25.3352732 L82.6384711,2.68760372"
                          id="Path-9"
                          stroke="#979797"
                          strokeWidth={4}
                        />
                      </g>
                      <circle id="Oval-4-Copy-2" fill="#000000" opacity={hovered ? 0.3 : 0} cx="87.5" cy="87.5" r="87.5" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

EmailIcon.propTypes = {
  className: PropTypes.string
};

EmailIcon.defaultProps = {
  className: ''
};
