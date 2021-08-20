import React from 'react'
import cat3 from '../../images/cat3.jpg'
import CategoriesCards from './categoriesCards'

const categoryimages=[{image: cat3, name: 'Unique'}, {image: cat3, name: 'Gaming'}, {image: cat3, name: 'MEME'}, {image: cat3, name: 'Signed'}, {image: cat3, name: 'Art'}, {image: cat3, name: 'Trading Cards'}, {image: cat3, name: 'Digital'}]

class Categories extends React.Component{
    render(){
        return(
            <div>
                <div className="row">
                  {categoryimages.map((images,index)=>
                    <div key={index} className="col-12 mt-4 col-md-4">
                      <CategoriesCards img={images} ></CategoriesCards>
                    </div>
                  )}
                </div>
            </div>
        )
    }
}
export default Categories