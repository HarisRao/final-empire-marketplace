import React from 'react'
import '../marketplace.css'
import ScrollArea from 'react-scrollbar'

const checkbox1array=['VeeFreinds','PUNK Comics','The Sandbox','Gutter Rats','Pulsquare','Decentraland','Cryptovoxels','Rarible','PEGZ','Art','Sports','Music','Gaming','Domains','Collectables']

class CollectionFilter extends React.Component{
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
                        <p className="text-white pl-4 py-3 h4" id="filter-header-font">Collections</p>
                        <i className="fas fa-sort-down pt-2 pr-4" onClick={this.toggle}></i>
                    </div>
                    <div id="collection-none" style={{display:this.state.show && this.state.val}}>
                        <ScrollArea>
                            {checkbox1array.map((item,index)=>
                            <div key={index} className="custom-control custom-checkbox ml-4 py-2">
                                <input type="checkbox" className="custom-control-input" id="checkbox1"></input>
                                <label className="custom-control-label pl-1 text-white" htmlFor="checkbox1">{item}</label>
                            </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>
        )
    }
}
export default CollectionFilter