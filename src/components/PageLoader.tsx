import React, { Component, ReactNode } from 'react';
import Loader from 'react-loader';

const LOADER_COLOR = '#4990E2';

interface PageLoaderProps {
  className?: string;
  loaded: boolean;
  children: ReactNode;
}

export default class PageLoader extends Component<PageLoaderProps> {
  static defaultProps = {
    loaded: true,
  }

  render() {
    const { className, loaded, children } = this.props;
    return (
      <Loader className={className} loaded={loaded} position="relative" color={LOADER_COLOR}>
        {children}
      </Loader>
    );
  }
}
