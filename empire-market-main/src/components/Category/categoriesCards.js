import React from 'react'
import { Card,CardText, CardImg, CardImgOverlay } from 'reactstrap';

class CategoriesCards extends React.Component{
    render(){
        return(
            <div>
                <Card inverse>
                    <CardImg width="100%" src={this.props.img.image} alt="Card image cap" id="cat-img" />
                    <CardImgOverlay>
                    <CardText className="text-white h1" id="overlay-content">{this.props.img.name}</CardText>
                    </CardImgOverlay>
                </Card>
            </div>
        )
    }
}
export default CategoriesCards