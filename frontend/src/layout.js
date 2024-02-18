import React,{lazy} from 'react';
import Header from './header/header';
import Body from './body/body';
import Footer from './footer/footer';
import AdminLogin from './auth/Login';
import SignUp from './auth/signUp';
import { Route,Routes,useLocation  } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  // Determine whether to display header and footer based on current path
  const showHeaderAndFooter = !['/signup', '/login'].includes(location.pathname);

  return (
    <div>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<AdminLogin />} />
      </Routes>
      {showHeaderAndFooter && (
        <>
          <Header />
          <Body />
          {/* <Footer /> */}
        </>
      )}
    </div>
  )
}

export default Layout