import React from 'react'
import {Button} from 'reactstrap'

class Notification extends React.Component{
    constructor(){
        super()
        this.state={
            notificationArray:[{
                notificationHeader: 'Items Sold',
                notificationDescription: 'When someone purchased your items',
            },{
                notificationHeader: 'Bid Activity',
                notificationDescription: 'When someone bids on one of your items',
            },{
                notificationHeader: 'Price Change',
                notificationDescription: 'When an item you made an offer on changes in price',
            },{
                notificationHeader: 'Auction Expiration',
                notificationDescription: 'When an auction you created it ends',
            },{
                notificationHeader: 'Outbid',
                notificationDescription: 'When an offer you placedis exceeded by another user',
            },{
                notificationHeader: 'Refferal Successfull',
                notificationDescription: 'When an item you referred is purchased ',
            },{
                notificationHeader: 'Owned Assets Updates',
                notificationDescription: 'When an update occurs for one of the items yu have purchased',
            },{
                notificationHeader: 'Successfull Purchase',
                notificationDescription: 'When you successfully buy an item',
            },{
                notificationHeader: 'Empire Newsletter',
                notificationDescription: 'Occasional updates from the Empire token team',
            }]
        }
        
    }
    render(){
        return(
            <div className="ml-4 ml-md-0 mt-4 mt-md-0">
                <div className="mt-2 mb-4">
                    <p className="h1 text-white"  id="general-settings">Notifications</p>
                </div>
                <div>
                    <p className="h4 text-white mb-2"  id="logo-image-font">Notification Settings</p>
                    <p className="text-white" id="logo-image-description-font">Select which notifications you would like to receive</p>
                </div>

                <div className="mt-5" id="notify-div">
                    {this.state.notificationArray.map((item,index)=>
                        <div key={index} className="py-3" style={{borderBottom:'2px solid #031225'}}>
                            {/* <div className="custom-control custom-checkbox py-2" id="notify-box">
                                <input type="checkbox" className="custom-control-input" id="checkbox1"></input>
                                <label className="custom-control-label mb-0 text-white" id="notify-header-font" htmlFor="checkbox1">{item.notificationHeader}</label>
                                <small className="d-block text-white mb-0" id="notify-description-font">{item.notificationDescription}</small>
                            </div>   */}
                            <div key={index} className="custom-control custom-checkbox py-2" id="notify-box">
                                <input type="checkbox" className="custom-control-input" id={index}></input>
                                <label className="custom-control-label mb-0 pl-2 text-white" id="notify-header-font" htmlFor={index}>{item.notificationHeader}</label>
                                <small className="d-block text-white mb-0 pl-2" id="notify-description-font">{item.notificationDescription}</small>
                            </div>
                        </div>  
                    )}
                </div>
                <div className="mt-4 d-flex justify-content-center" style={{width:'92%'}}>
                    <Button id="add-fund-button">Save</Button>
                </div>
            </div>
        )
    }
}
export default Notification