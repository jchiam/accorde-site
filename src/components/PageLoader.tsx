import React, { ReactNode } from 'react';
import Loader from 'react-loader';

const LOADER_COLOR = '#4990E2';

interface PageLoaderProps {
  className?: string;
  loaded: boolean;
  children: ReactNode;
}

const PageLoader = ({ className, loaded = true, children }: PageLoaderProps) => (
  <Loader
    className={className}
    loaded={loaded}
    position="relative"
    color={LOADER_COLOR}
  >
    {children}
  </Loader>
);

export default PageLoader;
