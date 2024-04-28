
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/singup/Signup';
import Home from './pages/home/Home';
import RequireUser from './components/RequireUser';
import LoadingBar from 'react-top-loading-bar' ;
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import AlreadyLoggedIn from './components/AlreadyLoggedIn';
import toast, { Toaster } from 'react-hot-toast';
export const TOAST_SUCCESS =  "taost_success" ; 
export const TOAST_FAILURE =  "toast_failure" ; 

function App() {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);


  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  
  useEffect(() => {
    switch(toastData.type) {
      case TOAST_SUCCESS :
        toast.success(toastData?.message) ; 
        break ;  
      case TOAST_FAILURE :
        toast.error(toastData?.message) ;
        break ;  
    }
  }, [toastData]);
  


  return (
    <>
     <div className="App"> 
      <LoadingBar height={4} color="#458eff" ref={loadingRef} />
      <div><Toaster/></div>
      <Routes>
        <Route element={<RequireUser />}>
            <Route  element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </Route>
        </Route>
        <Route element={<AlreadyLoggedIn/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
     </div>
    </>
  )
}

export default App