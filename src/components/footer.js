import React from 'react';
import Facebook from '../img/social/facebook.png'
import Instagram from '../img/social/instagram.png'
import Twitter from '../img/social/twitter.png'
import Youtube from '../img/social/youtube.png'



class Footer extends React.Component {
    render (){
        return (
            <div className="row p-3 pb-0 pb-sm-3" >
                <div className="col-12 col-sm-12 col-md-4 footer">
                    <div className="p-3 d-flex flex-column text-center text-lg-left">
                        <p className="h5">Contactanos: </p>
                        <p className="mt-3">
                            Lorem ipsum<br/>
                            1001, magni ut, <br/>
                            sit hic voluptatum, <br/>
                            ipsum voluptatem praesentium. <br/>
                            Ducimus magnam <br/>
                            iusto optio molestiae?
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 footer">
                    <div className="p-3 d-flex flex-column text-center text-lg-left">
                        <p className="h5">Lorem: </p>
                        <p className="mt-3">
                            Lorem ipsum<br/>
                            1001, magni ut, <br/>
                            sit hic voluptatum, <br/>
                            ipsum voluptatem praesentium. <br/>
                            Ducimus magnam <br/>
                            iusto optio molestiae?
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 footer">
                    <div className="p-3 d-flex flex-column text-center text-lg-left mb-4 mb-md-0">
                        <p className="h5">Siguenos: </p>
                        <div className="mt-3 d-flex justify-content-center">
                            <a className="p-2" href="# "><img src={Facebook} alt="facebook"/></a>
                            <a className="p-2" href="# "><img src={Instagram} alt="instagram"/></a>
                            <a className="p-2" href="# "><img src={Twitter} alt="twitter"/></a>
                            <a className="p-2" href="# "><img src={Youtube} alt="youtube"/></a>
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}

export default Footer;