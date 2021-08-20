import React from 'react'
import './Settings.css'
import wallet from '../../images/wallet.png'
import general from '../../images/settings.png'
import notification from '../../images/notification.png'
import appearance from '../../images/appearance.png'
import empirelogo from '../../images/empirelogo.png'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames'
import MyWallet from './MyWallet/MyWallet'
import General from './General/General'
import Notification from './Notification/Notfication'
import Appearance from './Appearance/Appearance'



class SettingsMiddle extends React.Component{
    constructor(){
        super()
        this.state={
            activeTab:'1'
        }
    }
    render(){

        const toggle = tab => {
            if(this.state.activeTab !== tab) 
            this.setState({
                activeTab:tab
            })
          }
        return(
            <div style={{position:'relative'}}>
                <img src={empirelogo} alt="..." style={{position:'absolute',top:'10%' ,left:'20%',width:'60%' ,opacity:'0.1'}}></img>
                <hr className="mt-5"></hr>
                <div className="row" style={{margin:'100px 0px'}}>
                    <div className="col-12 col-md-3">
                        <Nav tabs className="flex-md-column border-0">
                            <NavItem className="mt-2">
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1'}),"text-white settings-tab"}
                                onClick={() => { toggle('1'); }}
                                style={{background:this.state.activeTab ==='1' && 'radial-gradient(#204169 , #102135)'}}
                                >
                                <img src={wallet} alt="..." className="mx-3"></img>
                                    My Wallet
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-2">
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' }),"text-white settings-tab"} 
                                onClick={() => { toggle('2'); }}
                                style={{background:this.state.activeTab ==='2' && 'radial-gradient(#204169 , #102135)'}}
                                >
                                <img src={general} alt="..." className="mx-3"></img>
                                    General
                                </NavLink>
                            </NavItem>

                            <NavItem className="mt-2">
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' }),"text-white settings-tab"}
                                onClick={() => { toggle('3'); }}
                                style={{background:this.state.activeTab ==='3' && 'radial-gradient(#204169 , #102135)'}}

                                >
                                <img src={notification} alt="..." className="mx-3"></img>
                                    Notification
                                </NavLink>
                            </NavItem>

                            <NavItem className="mt-2">
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '4' }),"text-white settings-tab"}
                                onClick={() => { toggle('4'); }}
                                style={{background:this.state.activeTab ==='4' && 'radial-gradient(#204169 , #102135)'}}
                                >
                                <img src={appearance} alt="..." className="mx-3"></img>
                                    Appearance
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    <div className="col-12 col-md-9">
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <MyWallet></MyWallet>
                            </TabPane>
                            <TabPane tabId="2">
                                <General></General>
                            </TabPane>
                            <TabPane tabId="3">
                                <Notification></Notification>
                            </TabPane>
                            <TabPane tabId="4">
                                <Appearance></Appearance>
                            </TabPane>
                        </TabContent>
                        
                    </div>
                </div>

                <hr></hr>





            </div>
        )
    }
}
export default SettingsMiddle