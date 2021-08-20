import React from "react";
import "../../App.css";
import HomeMiddle from './homeMiddle'
import HomeNav from './homeNav'
import Footer from '../Footer/footer'




class Home extends React.Component {
  render() {
    return (
      <div id="main-header">
        <HomeNav connectMetamask={this.props.connectMetamask} ></HomeNav>  
        <HomeMiddle></HomeMiddle>
        <Footer></Footer>
      </div>

            
    );
  }
}

export default Home;
