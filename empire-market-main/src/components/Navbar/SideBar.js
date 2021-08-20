import React from 'react'
import SideBarBg from '../../images/sidebar.png'
import sidebarlogout from '../../images/logout.png'
import sidebarrefresh from '../../images/refresh.png'
import sidebarfooter from '../../images/sidebarfooterbg.png'
import {Button} from 'reactstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';



class SideBar extends React.Component{
    constructor(){
        super()
            this.state = {
                copied: false,
                empirepage:false,
                depositpage:false,
                copiedfromfield:false
            };  
    }  
 
    componentDidUpdate(){
        if(this.state.copied===true){
            setTimeout(() => {
                this.setState({
                    copied:false
                })
            }, 2000);
        }
        if(this.state.copiedfromfield===true){
            setTimeout(() => {
                this.setState({
                    copiedfromfield:false
                })
            }, 2000);
        }
    }
    empire=()=>{
        this.setState({
            empirepage:true
        })

    }
    depositexchange=()=>{
        this.setState({
            depositpage:true,
        })
    }
    render(){
        return(
            <div style={{position:'relative'}}>
                <img src={SideBarBg}></img>
                <div style={{position:'absolute',width:'100%',top:'5%'}}>
                    <div className="container d-flex justify-content-between px-5" >
                        <img src={sidebarlogout}></img>
                        <img src={sidebarrefresh}></img>
                    </div>
                    <div style={{marginTop:'-22px'}}>
                        <p className="text-center mb-0" id="sidebar-wallet-font">My Wallet</p>
                    </div>
                    <div>
                        <p className="text-white text-center" id="sidebar-wallet-address-font">{this.props.address}</p>
                    </div>
                    <CopyToClipboard  text={this.props.address}
                        onCopy={() => this.setState({copied: true})}>
                        <i className="fal fa-copy" id="sidebar-copy-address"></i>
                    </CopyToClipboard>
                    {this.state.copied ? <span id="copy-address" >Copied.</span>:''}
                </div>

                {!this.state.empirepage &&
                    <div>
                        <div className="d-flex justify-content-center pt-5">
                            <div className="px-5 py-4" id="sidebar-price-bg">
                                <span className="d-block text-center text-white" id="sidebar-wallet-address-font">Total Available</span>
                                <span className="d-block text-center text-white" id="empire-price">278193 EMPIRE</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center pt-4">
                            <Button id="sidebar-btn" onClick={this.empire}>Add Funds</Button>
                        </div>
                    </div>
                }
                
                {this.state.empirepage && !this.state.depositpage &&
                <div>
                    <div className="d-flex justify-content-center pt-5">
                        <div className="" id="">
                            <span className="d-block text-center text-white" id="sidebar-wallet-address-font">Select one of the option to deposit</span>
                            <span className="d-block text-center text-white" id="sidebar-wallet-address-font"><span id="empire-price">EMPIRE</span> in the wallet <i className="fal fa-long-arrow-right"></i></span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-4">
                        <Button id="deposit-exchange-btn" onClick={this.depositexchange}><i className="fal fa-exchange" style={{fontSize:'22px'}}></i> Deposit from Exchange</Button>
                    </div>
                </div>      
                }


                {this.state.depositpage &&
                <div>
                    <div className="d-flex justify-content-center pt-5">
                        <div className="" id="">
                            <span className="d-block text-center text-white" id="sidebar-wallet-address-font">Deposit EMPIRE from your <span id="empire-price">EXCHANGE</span> to</span>
                            <span className="d-block text-center text-white" id="sidebar-wallet-address-font">to the following wallet address:</span>
                        </div>
                    </div>
                    <div className="px-2 py-2 mx-3 mt-3" id="sidebar-price-bg">
                        <span className="d-block text-white" id="sidebar-wallet-address-font">{this.props.address}</span>
                    </div>
                    <CopyToClipboard  text={this.props.address}
                        onCopy={() => this.setState({copiedfromfield: true})}>
                        <i className="fal fa-copy" id="sidebar-copy-address-in-deposit"></i>
                    </CopyToClipboard>
                    {this.state.copiedfromfield ? <span id="copy-address-from-field" >Copied.</span>:''}

                    <div className="d-flex justify-content-center pt-3 mt-2">
                        <Button id="deposit-btn">Deposit</Button>
                    </div>
                </div>
                }






                <div className="mt-4" style={{display:'flex',justifyContent:'flex-end'}}>
                    <img src={sidebarfooter} className=""></img>
                </div>



            </div>
        )
    }
} 
export default SideBar