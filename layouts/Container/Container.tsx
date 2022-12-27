import type { FunctionComponent, PropsWithChildren } from 'react';

const Container: FunctionComponent<PropsWithChildren> = ({
  children
}) => {

  return (
    <>
      {/* Navbar, Background, ...  */}

      {children}
    </>
  );
};

export default Container;