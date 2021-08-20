import React from 'react'
import Nav from '../Navbar/Nav'
import DetailsMiddle from './detailsMiddle'
import Footer from '../Footer/footer'
import { useSelector } from 'react-redux'


function Details ({match}){
    return(
        <div id="main-marketplace-div">
            <Nav />
            <div className="middle-content-section">
                <DetailsMiddle match={match}></DetailsMiddle>
                <div className="mt-5">
                    <Footer></Footer>
                </div>
            </div>
                    
        </div>
    )
}

export default Details