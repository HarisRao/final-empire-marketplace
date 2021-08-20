import React from 'react'
import img4 from "../../images/imageOnTrending4.jpeg";
import img2 from "../../images/imageOnTrending2.jpeg";
import img3 from "../../images/imageOnTrending3.jpeg";
import img1 from "../../images/imageOnTrending1.jfif";
import img7 from "../../images/imageOnTrending7.jfif";
import img8 from "../../images/imageOnTrending8.jpg";
import img5 from "../../images/imageOnTrending5.jfif";
import img6 from "../../images/imageOnTrending6.jfif";
import img9 from "../../images/imageOnTrending9.jpeg";




const collectorImages=[img1,img2,img3,img4,img5,img6,img7,img8,img9]
class TopCollectors extends React.Component{
    render(){
        return(
            <div>
                <ul id="collector-ul">
                    {collectorImages.map((img,index)=>{
                        return(
                            <li key={index} className="d-inline-block mb-4" id="collector-li">
                                <div className="d-inline" style={{position:'relative'}}>
                                    <img src={img} alt="..." style={{borderRadius:'50%',width:'100px'}}></img>
                                    <span className="text-white ml-3 h4" id="collector-images-name">@KleinLopez</span>
                                    <div className="px-2 rounded-circle" id="collector-abs-div" style={{position:'absolute',left:'75px',top:'-35px'}}>1</div>
                                </div>
                            </li>)
                    })}
                </ul>

            </div>

                
        )
    }
}
export default TopCollectors