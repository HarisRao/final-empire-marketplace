import React from 'react'
import '../Settings.css'
import {Button} from 'reactstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';



class MyWallet extends React.Component{
    constructor(){
        super()
            this.state = {
                value: '0xc158687aE91ecdE761d2795580D996BF18bCD823',
                copied: false,
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
    }
   
    render(){
        return(
            <div className="ml-4 ml-md-0 mt-4 mt-md-0">
                <div className="mt-2 mb-4">
                    <p className="h1 text-white"  id="create-wallet">My Wallet</p>
                </div>
                <form>
                    <p className="text-white" id="my-wallet">My Wallet Address</p>
                    <div style={{position:'relative'}}>
                        <div className=" mb-3 d-flex align-items-center" id="wallet-div" >
                            <p className="mb-0 pl-1 pl-sm-3 text-white" id="wallet-address-font">{this.state.value}</p>
                        </div>
                        <CopyToClipboard  text={this.state.value}
                            onCopy={() => this.setState({copied: true})}>
                            <i className="fal fa-copy" id="fa-copy"></i>
                        </CopyToClipboard>
                    </div>
                    {this.state.copied ? <span id="copy-text" >Copied.</span>:''}
                    <div className="mt-4">
                        <Button className="mr-3 mt-3 mt-sm-0" id="add-fund-button">Add Funds</Button>
                        <Button className="ml-2 mt-3 mt-sm-0" id="logout-button">Logout</Button>
                    </div>
                </form>
            </div>
        )
    }
}
export default MyWallet