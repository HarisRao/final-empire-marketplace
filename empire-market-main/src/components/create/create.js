import React from 'react'
import './create.css'
import Nav from '../Navbar/Nav'
import Footer from '../Footer/footer'
import CreateMiddle from './createMiddle'
import ConnectPage from '../connectpage/connectpage'
import { useSelector } from 'react-redux'

function Create(){
  const authedUser = useSelector(state => state.authedUser);

  if (Object.keys(authedUser.authedUser).length > 0){
    return(
      <div id="main-create-div">
          <Nav ></Nav>
          <div style={{marginTop: '20px'}}>
              <CreateMiddle/>
              <div className="mt-5">
                  <Footer></Footer>
              </div>
          </div>
              
      </div>
    )
  }
  else{
    return(
      <div id="main-connect-div">

          <Nav />
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
export default Create;