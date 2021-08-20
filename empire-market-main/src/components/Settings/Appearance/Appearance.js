import React from 'react'
import {Button} from 'reactstrap'
import ReactLanguageSelect from 'react-languages-select';
import 'react-languages-select/css/react-languages-select.css';


class Appearance extends React.Component{
    constructor(){
        super()
        this.state={
            flag:true
        }
    }


    themechange=()=>{
        this.setState({
            flag:!this.state.flag
        })
        
        if(this.state.flag){
            document.body.style.backgroundColor="#8a8a8e"
            // let e=document.getElementsByClassName('text-white')
            // console.log(e[3])
        }else {
            document.body.style.background="#051427"
        }
         
    }
    render(){
        return(
            <div className="ml-4 mt-4 mt-md-0">
                <div className="mt-2 mb-4">
                    <p className="h1 text-white"  id="general-settings">Appearance</p>
                </div>
                <div>
                    <p className="h4 text-white mb-2"  id="logo-image-font">Theme</p>
                    <p className="text-white" id="logo-image-description-font">Toggle between light and dark themes</p>
                    <Button id="appear-button" onClick={this.themechange} style={{background:this.state.flag ? "linear-gradient(to right,#18e9d9 0%,#4fa4e1 51%,#875fea 100%)":"transparent"}}><i className="fal fa-adjust" style={{color:this.state.flag?'white':'black'}}></i></Button>
                </div>
                <div className="mt-4">
                    <p className="text-white" id="logo-image-description-font">Set the displayed language</p>
                    <ReactLanguageSelect
                    languages={["en", "fr", "de", "it", "es"]}
                    placeholder="Languages"
                    />
                </div>

                


            </div>
        )
    }
}
export default Appearance