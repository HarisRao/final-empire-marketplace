import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TrendingCards from './trendingsCards';
import cat4 from '../../images/cat4.jpg'
import { useSelector } from 'react-redux';


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1441 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1440, min: 1076 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1075, min: 993 },
      items: 3
    },
    tablet1: {
        breakpoint: { max: 992, min: 768 },
        items: 2
      },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };

const trendingData=[cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4,cat4]
function Trending(){
  const items = useSelector(state => state.items);
  return(
      <div className="mt-4">
          <Carousel responsive={responsive}>
              {items.items.filter(i => i.status !== '0').map((item,index) => {
                  return(
                      <div key={index} className="mx-1">
                          <TrendingCards item={item}></TrendingCards>
                      </div>
                  )
              })}
          </Carousel>
      </div>
  )
}
export default Trending
