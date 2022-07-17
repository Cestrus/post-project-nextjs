import { ILayout } from './Layout.props';
import MainNavigation from './MainNavigation/MainNavigation';

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
