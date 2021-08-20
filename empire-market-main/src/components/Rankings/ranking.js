import React from 'react'
import Nav from '../Navbar/Nav'
import RankingsMiddle from './rankingsmiddle'
class Rankings extends React.Component{
    render(){
        return(
            <div id="main-marketplace-div">
                <Nav />
                <div className="middle-content-ranking-section">
                    <RankingsMiddle></RankingsMiddle>
                </div>
                        
            </div>
        )
    }
}
export default Rankings