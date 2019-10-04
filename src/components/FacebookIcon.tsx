import React, { Component, FormEvent } from 'react';

interface FacebookIconProps {
  className: string;
  onClick: (e: FormEvent<Element>) => void;
}

interface FacebookIconState {
  hovered: boolean;
}

export default class FacebookIcon extends Component<FacebookIconProps, FacebookIconState> {
  static defaultProps = {
    className: '',
    onClick: () => {}
  }

  constructor(props: FacebookIconProps) {
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
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <svg style={{ width: '100%', height: '100%' }} width="176px" height="176px" viewBox="0 0 176 176">
          <g id="Take-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Desktop-HD-Copy-7" transform="translate(-638.000000, -442.000000)">
              <g id="Group-2" transform="translate(291.000000, 253.000000)">
                <g id="Group" transform="translate(0.000000, 188.000000)">
                  <g id="Group-4" transform="translate(347.000000, 0.500000)">
                    <g id="Group-6">
                      <path
                        d="M110.222656,59.275 L101.986719,59.2804688 C95.528125,59.2804688 94.2757813,62.3484375 94.2757813,66.8492188 L94.2757813,76.7804688 L109.68125,76.7804688 L107.674219,92.3390625 L94.2757813,92.3390625 L94.2757813,132.25 L78.2140625,132.25 L78.2140625,92.3390625 L64.7828125,92.3390625 L64.7828125,76.7804688 L78.2140625,76.7804688 L78.2140625,65.3125 C78.2140625,51.9960938 86.3460938,44.75 98.21875,44.75 C103.90625,44.75 108.795312,45.1710937 110.222656,45.3625 L110.222656,59.275 Z M87.5,1 C39.178125,1 0,40.1726563 0,88.5 C0,136.821875 39.178125,176 87.5,176 C135.827344,176 175,136.821875 175,88.5 C175,40.1726563 135.827344,1 87.5,1 L87.5,1 Z"
                        id="Fill-183"
                        fill="#3B5998"
                      />
                      <circle id="Oval-4-Copy" fill="#000000" opacity={hovered ? 0.3 : 0} cx="88.5" cy="88" r="87.5" />
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
