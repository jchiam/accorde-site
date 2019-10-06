import React, { PropsWithChildren } from 'react';

import Header from 'components/Header';

const App = (props: PropsWithChildren<{}>) => (
  <>
    <Header />
    {props.children}
  </>
);

export default App;
