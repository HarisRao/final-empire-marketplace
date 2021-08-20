import React from 'react'
import './marketplace.css'
import Nav from '../Navbar/Nav'
import MarketplaceMiddle from './maketplacemiddle'
import Footer from '../Footer/footer'


class Marketplace extends React.Component{
    render(){
        return(
                <div id="main-marketplace-div">
                    <Nav />
                    <div className="middle-content-section">
                        <MarketplaceMiddle></MarketplaceMiddle>
                        <div className="mt-5">
                            <Footer></Footer>
                        </div>
                    </div>
                        
                </div>
        )
    }
}
export default Marketplace