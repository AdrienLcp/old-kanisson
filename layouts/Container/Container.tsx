import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  
}>;

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