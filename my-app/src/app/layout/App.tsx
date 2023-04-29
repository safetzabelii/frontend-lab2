
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import HomePage from './Homepage';
import AboutUs from './Aboutus';
import ContactUs from './Contactus';
import LoginForm from './LoginForm';
import List from '../../features/admin/role/list';
import Navbar from './navbar';
import Footer from './footer';
import RoleForm from '../../features/admin/role/roleForm';
import ChangePassword from '../../features/user/changePassword';
import ForgotPassword from '../../features/user/forgotPassword';
import VerifyAccount from '../../features/user/verifyAccount';
import LoggedInUserRoute from './ProtectedRoutes/LoggedInUserRoute';
import AdminNavbar from '../../features/admin/features/adminNavbar';
import { store } from '../stores/store';
import MenuItem from '../../features/user/Menu/MenuItem/MenuItem';
import Restaurants from '../../features/user/Restaurant/Restaurants';
import AccountVerified from '../../features/user/accountVerified';
import UserAlreadyLoggedInRoute from './ProtectedRoutes/UserAlreadyLoggedInRoute';

function App() {
  const verificationToken = store.commonStore.verificationToken;
  const userId = store.commonStore.userId;

  
  return (
   <BrowserRouter>
      <Routes>
        <Route  path={"/*"} element={<>
        <Navbar/>
        {/* <AdminNavbar/> */}
        <div>
          <Routes>
          {
          /*
            Route me posht nuk lejon useri qe eshte i bam logged in 
            me shku ne routes te login edhe signup.
            Mos e fshi ose komento.
          */
        } 
          <Route element={<UserAlreadyLoggedInRoute/>}>
          <Route  path="/login" element={<LoginForm/>} />
          <Route  path="/signup" element={<Signup/>} />
          </Route>
          <Route  path="/" element={<HomePage/>} />
          <Route  path="/aboutus" element={<AboutUs/>} />
          <Route  path="/contactus" element={<ContactUs/>} />

          <Route  path="/menu" element={<MenuItem/>} />
          <Route  path="/restaurants" element={<Restaurants/>} />


          {/* <Route path="/adminNavbar" element={<AdminNavbar/>} /> */}
          <Route  path="/verifyaccount" element={<VerifyAccount/>}/>
          {verificationToken ? (
            <Route
              path={`/verifyAccount/${verificationToken}`}
              element={<AccountVerified verificationToken={verificationToken} />}
            />
          ) : null}
          <Route  path="/changepw" element={<ChangePassword/>}/>
          <Route  path="/forgotpw" element={<ForgotPassword/>}/>

          <Route element={<LoggedInUserRoute/>}>
          <Route  path="/roleform" element={<RoleForm/>} />
          <Route  path="/list" element={<List/>}/>
          <Route  path="/roleform" element={<RoleForm/>}/>
        
          <Route path="/list" element={<List/>}/>
          <Route path="/roleform" element={<RoleForm/>}/>
          </Route>
          
          </Routes>

        </div>
        </>} />
       

      </Routes>
    </BrowserRouter>
  );
}
export default App;