import React from 'react'
import './rankings.css'
import Empirelogo from '../../images/empirelogo.png'
import Select from 'react-select';
import img from '../../images/imageOnTrending3.jpeg'
import token from '../../images/empirelogo.png'

const collectionimages=[img,img,img,img,img,img,img,img,img,img]

const options = [
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 24 hours', label: 'Last 24 hours' },
    { value: 'Last 14 days', label: 'Last 14 days' },
    { value: 'All Time', label: 'All Time' }
  ];

  const category = [
    { value: 'All Categories', label:'All Categories'},
    { value: 'New', label: 'New' },
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Domain Names', label: 'Domain Names' },
    { value: 'Virtual Worlds', label: 'Virtual Worlds' },
    { value: 'Trading Cards', label: 'Trading Cards'},
    { value: 'Collectables', label: 'Collectables' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Utility', label: 'Utility' }
  ];
  const chain = [
    { value: 'All Chains', label: 'All Chains' },
    { value: 'Ethereum', label: 'Ethereum' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'Klaytn', label: 'Klaytn' }
  ];
  
class RankingsMiddle extends React.Component{
    constructor(){
        super()
        this.state = {
            daysOption: options[0],
            categoryOption: category[0],
            chainOption: chain[0],
            sortVolume:false
        };
    }
    daysChange = daysOption => {
        this.setState({ daysOption });
    };

    categoryChange = categoryOption => {
      this.setState({ categoryOption });
    };

    chainChange = chainOption => {
      this.setState({ chainOption });
    };
    
    volumetoggle=()=>{
        this.setState({
          sortVolume:!this.state.sortVolume
        })
    }

    render(){
        return(
            <div>
                <p className="h1 text-white text-center pb-3">TOP NFTs</p>
                <p className="h5 text-white text-center mx-5 pb-3 light-font">The top NFTs on Empire, ranked by volume, floor price and other statistics.</p>
                <div className="container">
                    <div className="row mt-5 mx-2 mx-lg-2" >
                        <div className="col-4 px-1 px-sm-3">
                            <Select
                            id="ranking-select"
                            value={this.state.daysOption}
                            onChange={this.daysChange}
                            options={options}
                            />              
                        </div>

                        <div className="col-4 px-1 px-sm-3">
                            <Select
                            id="ranking-select"
                            value={this.state.categoryOption}
                            onChange={this.categoryChange}
                            options={category}
                            />              
                        </div>

                        <div className="col-4 px-1 px-sm-3">
                            <Select
                            id="ranking-select"
                            value={this.state.chainOption}
                            onChange={this.chainChange}
                            options={chain}
                            />              
                        </div>
                    </div>
                </div>


                
                {/* <div>
                    <div className="container mt-5">
                        <div className="row" style={{borderBottom:'2px solid #808080'}}>
                            <div className="col-3">
                                <p className="text-white medium-font">Collection</p>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-2">
                                        <p className="text-white  text-center  medium-font">Volume</p>
                                    </div>
                                    <div className="col-2">
                                        <p className="text-white text-center  medium-font">24%</p>
                                    </div>
                                    <div className="col-2">
                                        <p className="text-white text-center  medium-font">7d%</p>     
                                    </div>
                                    <div className="col-2">
                                        <p className="text-white text-center  medium-font">Floor Price</p>
                                    </div>
                                    <div className="col-2">
                                        <p className="text-white  text-center medium-font">Owners</p>
                                    </div>
                                    <div className="col-2">
                                        <p className="text-white text-center  medium-font">Assets</p>
                                    </div>

                                </div>
                            </div>

                        </div>  
                        <div className="row"  style={{borderBottom:'2px solid #808080'}}>
                            <div className="col-3 pt-2">
                                <p className="text-white medium-font">1 <img src={img} className="px-2" style={{borderRadius:'50%',width:'100px'}}></img> Pudgy Penguins</p>

                            </div>
                            <div className="col-9 pt-3">
                                <div className="d-flex justify-content-between">
                                    <p className="text-white light-font">16236.7</p>
                                    <p className="text-white light-font">-40.46</p>
                                    <p className="text-white light-font">+399.19%</p>
                                    <p className="text-white light-font">2.16</p>
                                    <p className="text-white light-font">4.2k</p>
                                    <p className="text-white light-font">8.9k</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  */}



                <div className="px-3 px-sm-5 table-responsive-lg" style={{position:'relative'}}>
                    <img src={Empirelogo} alt="..." id="ranking-bg-logo" style={{zIndex:'-1'}}></img>

                    <table className="table text-white mt-5" style={{whiteSpace:'nowrap'}} >
                        <thead>
                            <tr>
                                <th className="light-font h5" scope="col">Collection</th>
                                <th className="text-center mx-4 light-font h5 pointer" onClick={this.volumetoggle} scope="col" style={{cursor:'pointer'}}>Volume{this.state.sortVolume ?<i className="fal fa-chevron-square-up pl-1" id="sortByVolume"></i>:<i class="fal fa-chevron-square-down pl-1" id="sortByVolume"></i>}</th>
                                <th className="text-center mx-4 light-font h5" scope="col">24%</th>
                                <th className="text-center mx-4 light-font h5" scope="col">7d%</th>
                                <th className="text-center mx-4 light-font h5" scope="col">Floor Price</th>
                                <th className="text-center mx-4 light-font h5" scope="col">Owners</th>
                                <th className="text-center mx-4 light-font h5" scope="col">Assets</th>                       
                            </tr>
                        </thead>

                        <tbody>
                            {collectionimages.map((img,index)=>{
                                return (
                                    <tr key={index}>
                                        <td scope="row" className="light-font h5">{++index} <img src={img} className="px-2" id="collection-img"></img> Pudgy Penguins</td>
                                        <td className="text-center pt light-font"><img src={token} style={{width:'20px'}}></img> 16236.7</td>
                                        <td className="text-center pt light-font">-40.46%</td>
                                        <td className="text-center pt light-font">+399.19%</td>
                                        <td className="text-center pt light-font"><img src={token} style={{width:'20px'}}></img> 2.16</td>
                                        <td className="text-center pt light-font">4.2k</td>
                                        <td className="text-center pt light-font">8.9k</td>                                 
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                </div>


            </div>
        )
    }
}
export default RankingsMiddle