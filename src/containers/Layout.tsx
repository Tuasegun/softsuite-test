import { ReactNode} from 'react';
import { Header, Sidebar, Footer } from '../components';
import '../styles/Layout.scss';

interface LayoutProps {
    children: ReactNode;
}
  

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="body-container">
        <div className="sidebar-container-layout">
        <Sidebar />
        </div>
        <div className="children-container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

