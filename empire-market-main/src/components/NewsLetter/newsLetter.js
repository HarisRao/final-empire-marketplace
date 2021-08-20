import React from 'react'
class NewsLetter extends React.Component{
    render(){
        return(
            <div id="newsletter-div" className="pb-5">
                <div className="pt-5">
                    <p className="text-white h3 text-center" id="font-heading">Newsletter</p>

                    <div className="row mx-2 mx-sm-5">
                        <div className="col-1"></div>
                        <div className="d-flex justify-content-center col-12 col-sm-10">
                            <form>
                                <div className="form-group" >
                                    <div><p className="text-white"  id="font-content">Stay Updated with our latest News, We promise not to spam</p></div>
                                    <div id="pos-rel"><input type="email" id="newsletterinput" className="form-control text-white" placeholder="Your Email" style={{}}></input>
                                        <div id="pos-abs"><i className="text-white fal fa-paper-plane"></i></div>   
                                    </div>     
                                </div>
                            </form>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsLetter