import React from "react";
import Footerlogo from '../../images/footerLogo.png'
import facebook from '../../images/fb.png'
import instagram from '../../images/insta.png'
import twitter from '../../images/twitte.png'
import pinterest from '../../images/pinterest s.png'
import youtube from '../../images/youtube.png'

class Footer extends React.Component {
  render() {
    return (
        <div id="footer-main-div">
      {this.props.connectFooter && (
        <div className="col-12 p-0">
            <hr style={{
                backgroundImage: 'linear-gradient(90deg, #17e9d9 0%, #4fa3e1 50%, #875fe9 100%)',
                height: '2px'
                }} />
        </div>

      )}
      <div className="row mx-5 mt-5 py-5">
          
        <div className="col-lg-4 mb-4 mb-lg-0 col-12 px-0 px-sm-1">
            <div><img src={Footerlogo} alt="..." className="d-block"></img></div>
            <div className="row mt-4">
                <div className="col-12">
                    <div><i className="fal fa-phone-alt"></i><p className="d-inline ml-3 text-white" id="footer-content">(123) 123-1234</p></div>
                    <div className="mt-3"><i className="fal fa-envelope"></i><p className="d-inline ml-3 text-white" id="footer-content">Sample@gmail.com</p></div>
                    <div className="mt-3"><i className="fal fa-map-marker-alt"></i><p className="d-inline ml-3 text-white" id="footer-content">711-2880 Nulla St.Mankato Mississippi 96522</p></div>

                </div>

            </div>
        </div>
        <div className="col-lg-2 col-6 mb-4 mb-lg-0 px-0 px-sm-1">
            <ul className="pl-0 pl-lg-5">
                <li className="list-type text-white h5 py-2" id="footer-heading">About Us</li>
                <li className="list-type text-white py-2" id="footer-content">Privacy Policy</li>
                <li className="list-type text-white py-2" id="footer-content">Statistics</li>
                <li className="list-type text-white py-2" id="footer-content">My Profile</li>
                <li className="list-type text-white py-2" id="footer-content">FAQs</li>
            </ul>
        </div>
        <div className="col-lg-2 col-6 mb-4 mb-lg-0 px-0 px-sm-1">
            <ul className="pl-0 pl-sm-3">
                <li className="list-type text-white h5 py-2" id="footer-heading">Marketplace</li>
                <li className="list-type text-white py-2" id="footer-content">Create NFT</li>
                <li className="list-type text-white py-2" id="footer-content">My Account</li>
                <li className="list-type text-white py-2" id="footer-content">Resources</li>
                <li className="list-type text-white py-2" id="footer-content">My Profile</li>
            </ul>
        </div>
        <div className="col-lg-4 col-12 px-0 px-sm-1">
            <p className="h5 text-white py-2" id="footer-heading">Join The Community</p>
            <img className="m-2" alt="..." src={facebook}></img>
            <img className="m-2" alt="..." src={instagram}></img>
            <img className="m-2" alt="..." src={twitter}></img>
            <img className="m-2" alt="..." src={pinterest}></img>
            <img className="m-2" alt="..." src={youtube}></img>
        </div>
        </div>
         <p className="text-center text-white pt-5 pb-4 mb-0" id="footer-content">Copyright 2021. All rights reserved</p>
      </div>

    );
  }
}
export default Footer;
