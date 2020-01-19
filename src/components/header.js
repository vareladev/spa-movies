import React from 'react';
import Logo from '../img/logo.png'

class Header extends React.Component {
    render () {
        return (
            <div className="row pt-3 pl-3 pr-3">
                <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end header">
                    <a className="title" href=".">
                        <img alt="logo" className="mt-4 mb-sm-4 img-fluid" src={Logo} />
                    </a>
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-start align-items-center header">
                    <div className="h2 mt-0 mt-sm-4 mb-4 ">
                        <a className="title" href=".">Netflux</a>
                    </div>
                </div> 
            </div>               
        );
    }
}

export default Header;