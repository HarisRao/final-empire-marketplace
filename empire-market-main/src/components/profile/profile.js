import React from 'react'
import './profile.css'
import Nav from '../Navbar/Nav'
import Footer from '../Footer/footer'
import ProfileMiddle from './profileMiddle'
import ConnectPage from '../connectpage/connectpage'
import { useSelector } from 'react-redux'


function Profile({connectMetamask}){
  const authedUser = useSelector(state => state.authedUser);

  if (Object.keys(authedUser.authedUser).length > 0){
    return(
      <div id="main-profile-div">
          <Nav connectMetamask={connectMetamask} />
          <div style={{marginTop: '20px'}}>
              <ProfileMiddle/>
              <div className="mt-5">
                  <Footer></Footer>
              </div>
          </div>
              
      </div>
    );
  }
  else{
    return(
      <div id="main-connect-div">

          <Nav connectMetamask={connectMetamask} />
          <div style={{marginTop: '20px'}}>
              {/* <ProfileMiddle/> */}
              <ConnectPage />
              <div className="mt-5" style={{position: 'relative', zIndex: '2'}}>
                  <Footer connectFooter={true}></Footer>
              </div>
          </div>
              
      </div>
    );
  }
}
export default Profile;