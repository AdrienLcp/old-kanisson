import type { FunctionComponent, PropsWithChildren } from 'react';
import Background from '../Background/Background';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => {

  return (
    <>
      <Background />

      {children}
    </>
  );
};

export default Container;