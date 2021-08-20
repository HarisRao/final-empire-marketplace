import React from 'react'
import '../marketplace.css'



const checkbox1array=['New','On Sale','Auction']

class StatusFilter extends React.Component{
    constructor(){
        super()
        this.state={
            show:false,
            val:'none',
        }
    }

    toggle=()=>{
        this.setState({
            show:!this.state.show,
            val:'block'
        })

    }
    render(){
        return(
            <div id="checkbox-border">
                <div className="d-flex justify-content-between"  id="checkbox-header">
                    <p className="text-white pl-4 py-3 h4" id="filter-header-font">Status</p>
                    <i className="fas fa-sort-down pt-2 pr-4" onClick={this.toggle}></i>
                </div>
                    {checkbox1array.map((item,index)=>
                    <div key={index} className="custom-control custom-checkbox ml-4 py-2" id="status-none" style={{display:this.state.show && this.state.val}}>
                        <input type="checkbox" className="custom-control-input" id="checkbox1"></input>
                        <label className="custom-control-label pl-1 text-white" htmlFor="checkbox1">{item}</label>
                    </div>
                    )}
            </div>
            
        )
    }
}
export default StatusFilter