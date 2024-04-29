import './Home.scss';
import NavBar from '../../components/navbar/NavBar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfo } from '../../redux/slices/appConfigSlice';
import { useEffect } from 'react';

function Home() {
  const dispatch = useDispatch() ; 
  const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
  const feedData = useSelector(state => state.feedReducer.feedData) ;  
  useEffect( ()=> {
      dispatch(getMyInfo()) ; 
  } , [myProfile ,feedData]) ; 
  return (
    <>
      <NavBar/>
      <Outlet/>
      
    </>
  )
}
  
export default Home ;