import React from 'react'
import coin1 from '../../images/coin1.png'
import coin2 from '../../images/coin2.png'
import coin3 from '../../images/coin3.png'
import coin4 from '../../images/coin4.png'
import coin5 from '../../images/coin5.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const coins=[coin1,coin2,coin3,coin4,coin5]

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1211 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1210, min: 1176 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1175, min: 992 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 991, min: 601 },
      items: 2
    },
    mobile1: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };


class Coins extends React.Component{
    render(){
        return(
            // <div className="my-5 pt-3">
            //     <ul className="p-0 mx-5" id="ul-slider">
            //         {coins.map((coinImg,index)=>{
            //             return(
            //                 <li key={index} className="d-inline li-margin">
            //                     <img src={coinImg} alt="..."></img>
            //                 </li>
            //             )
            //         })}
            //     </ul>
            // </div>


                <div className="my-5 pt-3 mx-4">       
                    <Carousel responsive={responsive}>
                        {coins.map((coinImg,index)=>{
                            return(
                            <div key={index} className="mx-4 d-flex justify-content-center justify-content-sm-around">
                                <img src={coinImg} alt="..."></img>
                            </div>
                            )
                        })}
                    </Carousel>
                </div>
        )
    }
}
export default Coins