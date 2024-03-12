"user client"

import dynamic from 'next/dynamic';
import Header from '../pages/components/header.tsx';
import Navbar from '../pages/components/navbar.tsx';
import {AuthProvider} from './context/AuthContext.tsx'
import './globals.css'

// import styles from './Layout.module.css';
const ClientSideComponent = dynamic(() => import('../pages/components/header.tsx'), {
  ssr: false, // This will make sure the component only loads on the client-side
});
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
      <body>
        <div>
          <main>
            <AuthProvider>
              <ClientSideComponent />
              <Navbar />
              {children}
            </AuthProvider>
          </main>
        </div>
      </body>
    </html>
);

export default Layout;
