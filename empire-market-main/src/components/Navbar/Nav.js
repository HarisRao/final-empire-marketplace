import React,{useState} from 'react'
import {NavLink} from 'react-router-dom'
import empirelogo from '../../images/empirelogo.png'
import {Button} from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import walletOnConnect from '../../images/walletOnConnect.png'
import SideBar from './SideBar'


import '../marketplace/marketplace.css'
import { useDispatch, useSelector } from 'react-redux'
import { logInRequest, getMyItems } from '../../redux/ActionCreators'

function Nav(){
    const [isOpen, setDropdownOpen] = useState(false);
    // const [hidebtn, showHideBtn] = useState(false);
    const [isSidebarOpen, setSideBarOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [isStats, statsDropdownOpen] = useState(false);

    const toggleStats = () => statsDropdownOpen(isStats => !isStats);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const authedUser = useSelector(state => state.authedUser);
    // authedUser.authedUser.address='265525558855852556555500000000000000000000000000000000000000000000000000000000000005555555555555555555555555'
    const dispatch = useDispatch();
    const connectMetamask = async () => {
        console.log('here');
        if (!window.ethereum){
            alert('Install metamask first!');
        }
        else if (window.ethereum.chainId !== process.env.REACT_APP_CHAIN_ID){
            alert('Connect to BSC Testnet')
        }
        else{
            var accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accs.length > 0){
              dispatch(logInRequest(accs[0]))
              .then(res => {
                if (res.type === "LOGGED_IN"){
                  //retrieve user's items
                  dispatch(getMyItems(accs[0]));
                }
              });
            }
            else{
              alert('Please connect to MetaMask.');
            }
        }
    }
    const sidebar = () => {
        setSideBarOpen(prevState => !prevState)
        setAddress(`${authedUser.authedUser.address.substring(0,5)}...${authedUser.authedUser.address.substring(38,42)}`)

        // if(!isSidebarOpen){
        //     document.body.style.overflowY="hidden"
        // }else{
        //     document.body.style.overflowY="scroll"
        // }
    
    };
    const sidebarclose=()=>{
        setSideBarOpen(isSidebarOpen=>!isSidebarOpen)
    }
    return(
        <div id="marketplace-nav-bg">
            <nav className="navbar navbar-dark navbar-expand-lg mx-4 pl-0 py-3">
                <div>
                    <img src={empirelogo} alt="..." id="navbar-logo" className="mr-2"></img>
                </div>


                <div id="on-taggleScreen-show" className="ml-auto">
                    {authedUser.authedUser.address ? (
                        <img src={walletOnConnect} style={{width:'29px',height:'29px',cursor:'pointer'}} className="mr-3" onClick={sidebar}></img>
                        // `${authedUser.authedUser.address.substring(0,5)}...${authedUser.authedUser.address.substring(38,42)
                        ) :
                        <Button  className="text-white px-4 ml-auto mr-3" id="connect-btn-nav-displayOnToggler" onClick={connectMetamask}>
                            Connect Wallet
                        </Button>
                    }
                </div>



                {/* <Button  className="text-white px-4 ml-auto mr-3" id="connect-btn-nav-displayOnToggler" onClick={connectMetamask}>
                    {authedUser.authedUser.address ? (
                        `${authedUser.authedUser.address.substring(0,5)}...${authedUser.authedUser.address.substring(38,42)}`
                    ) : 'Connect Wallet'}
                </Button> */}



                <button className="navbar-toggler mr-sm-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <div className="input-group d-flex justify-content-center ml-4" style={{width:"35%"}} >
                        <input className="form-control text-white" id="search-field-nav" type="search" placeholder="Search NFTs,items,collections etc."></input>
                        <i className="fal fa-search text-white" id="search-icon-nav"></i>
                    </div>
                    <div className="navbar-nav ml-auto">
                        <NavLink id="navbar-link" activeClassName="act" exact={true} to="/" className="nav-link nav-item px-2">Home</NavLink>
                        <NavLink id="navbar-link" activeClassName="act" exact={true} to="/marketplace" className="nav-link nav-item px-2">Marketplace</NavLink>
                        {/* <NavLink id="navbar-link" activeClassName="active" exact={true} to="/statistics" className="nav-link nav-item px-2">Stats</NavLink> */}
                        {/* <NavLink id="navbar-link" activeClassName="act" exact={true} to="/resources" className="nav-link nav-item px-2">Resources</NavLink> */}
                        {/* <NavLink id="navbar-link" activeClassName="active" exact={true} to="/profile" className="nav-link nav-item px-2">Profile</NavLink> */}

                        <Dropdown isOpen={isStats} toggle={toggleStats}>
                                <DropdownToggle caret id="navbar-link" className="user-icon-circle">
                                    Stats
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink id="navbar-link" activeClassName="act" exact={true} to="/rankings" className="nav-link nav-item px-2 text-center" style={{borderBottom:'1px solid white'}}>Rankings</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink id="navbar-link" exact={true} to="/activity" className="nav-link nav-item text-center px-2">Activity</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                        </Dropdown>





                        <NavLink id="navbar-link-create-collection" activeClassName="act" exact={true} to="/create" className="nav-link nav-item px-2">Create NFT</NavLink>
                        <NavLink id="navbar-link-create-collection" activeClassName="act" exact={true} to="/create-collection" className="nav-link nav-item px-2">Create Collection</NavLink>
                    

                        <Dropdown isOpen={isOpen} toggle={toggle}>
                                <DropdownToggle caret  className="user-icon-circle">
                                    <i className="fal fa-user-circle" style={{fontSize:'24px'}}></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink id="navbar-link" exact={true} to="/profile" className="nav-link nav-item text-center" style={{borderBottom:'1px solid white'}}>Profile</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink id="navbar-link" exact={true} to="/settings" className="nav-link nav-item text-center px-2">Account Settings</NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                        </Dropdown>


                        



                    </div>



                    <div id="btn-wallet-hide">
                        {authedUser.authedUser.address ? (
                            <img src={walletOnConnect} style={{width:'29px',height:'29px',cursor:'pointer'}} className="ml-2" onClick={sidebar}></img>
                            // `${authedUser.authedUser.address.substring(0,5)}...${authedUser.authedUser.address.substring(38,42)}`
    
                            ) : 
                            <Button  className="text-white px-4" id="connect-btn-nav" onClick={connectMetamask}>
                                Connect Wallet
                            </Button>
                        }
                    </div>



                    {/* <Button  className="text-white px-4" id="connect-btn-nav" onClick={connectMetamask} style={{background:hidebtn?'none':'block',boxShadow:hidebtn?'none':'block'}}>
                        {authedUser.authedUser.address ? (
                            <img src={walletOnConnect} style={{width:'29px',height:'29px'}} onClick={sidebar}></img>
                            // `${authedUser.authedUser.address.substring(0,5)}...${authedUser.authedUser.address.substring(38,42)}`
    
                            ) : 'Connect Wallet'}
                    </Button> */}


                </div>

            </nav>

            {<div id="sidebar-div" style={{width:isSidebarOpen?'400px':'0px',opacity:isSidebarOpen?'1':'0',transform:isSidebarOpen?'none':'translate3d(0px,100%,0px)'}}>
                <i className="fal fa-times" id="close-sidebar" onClick={sidebarclose}></i>
                <SideBar address={address}></SideBar>
            </div>
            }


        </div>
    )
}

export default Nav