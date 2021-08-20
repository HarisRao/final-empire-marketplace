import React from 'react'
import Categories from '../Category/categories'
import Trending from '../Trending/trending' 
import empirelogo from '../../images/empirelogo.png'
import BackCollectors from '../../images/backCollectors.png'
import TopCollectors from '../TopCollector/TopCollectors'
import Auction from '../Auction/auction'
import NewsLetter from '../NewsLetter/newsLetter'
import Coins from '../Coins/Coins'



class HomeMiddle extends React.Component{
    render(){
        return(
          <div id="content-upto-banner-image">
            <div className="mx-5" id="homemiddle-maindiv">
              <h1 className="text-center" id="categories">Categories</h1>
              <div>
                <img src={empirelogo} alt=".."  id="background-category"></img>
              </div>
              <Categories></Categories>     
            </div>


            <div className="mx-5 mt-5 pt-5">
              <h1 className="text-center" id="categories">Top Trending Items</h1>
              <Trending></Trending>
            </div>



            <div id="homemiddle-maindiv" className="mt-5">
              <h1 className="text-center pb-4" id="categories">Top Collectors</h1>
                <div>
                  <img src={BackCollectors} alt="..." id="background-collectors" ></img>
                </div>
                <div className="mt-4 mx-sm-5"  >    
                  <TopCollectors></TopCollectors>
                </div>
            </div>

            <div className="mx-5 mb-5 pb-3 mt-5 pt-3">
              <h1 className="text-center" id="categories">Live Auction</h1>
              <Auction></Auction>
            </div>


            <NewsLetter></NewsLetter>

            <Coins></Coins>

          </div>
        )
    }
}
export default HomeMiddle