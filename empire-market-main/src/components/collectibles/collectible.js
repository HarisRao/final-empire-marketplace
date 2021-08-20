import React from 'react'
import './collectible.css'
import Nav from '../Navbar/Nav'
import Footer from '../Footer/footer'
import CollectibleMiddle from './collectibleMiddle'

function Profile({connectMetamask, match}){
  return(
    <div id="main-collectible-div">
        <Nav connectMetamask={connectMetamask} />
        <div style={{marginTop: '20px'}}>
            <CollectibleMiddle match={match} />
            <div className="mt-5">
                <Footer></Footer>
            </div>
        </div>
            
    </div>
  )
}
export default Profile;