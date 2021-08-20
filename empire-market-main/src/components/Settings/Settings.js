import React from 'react'
import Nav from '../Navbar/Nav'
import SettingsMiddle from './SettingsMiddle'
import Footer from '../Footer/footer'
import './Settings.css'



class Settings extends React.Component{
    render(){
        return(
            <div id="main-wallet-div">
                <Nav></Nav>
                <SettingsMiddle></SettingsMiddle>
                <Footer></Footer>
            </div>
        )
    }
}
export default Settings