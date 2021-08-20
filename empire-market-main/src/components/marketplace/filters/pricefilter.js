import React from 'react'
import Select from 'react-select'
import { Button } from 'reactstrap';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
class PriceFilter extends React.Component{
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
                  <p className="text-white pl-4 py-3 h4" id="filter-header-font">Price</p>
                  <i className="fas fa-sort-down pt-2 pr-4" onClick={this.toggle}></i>
                </div>

                <div className="mx-3 mt-3" id="price-none" style={{display:this.state.show && this.state.val}}>
                    <Select options={options} placeholder="$ United States Dollar" className="mb-3"></Select>
                    <form>
                      <div className="form-row mb-3">
                        <div className="col">
                          <input type="number" id="min-placeholder" className="form-control text-white" placeholder="Min"></input>
                        </div>
                        <div className="col">
                          <input type="number" id="max-placeholder" className="form-control text-white" placeholder="Max"></input>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center pb-4"><Button id="apply-btn">Apply</Button></div>
                    </form>

                </div>
                   
            </div>
        )
    }
}
export default PriceFilter