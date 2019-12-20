import React from 'react';
import Logo from '../img/logo.png'
import MenuJson from './menu.json'


class NavMenu extends React.Component{
    render(){
        var menu = [];
        MenuJson.items.map(({id, title, href}) => (
            menu.push(<a key={id} className="nav-item nav-link" href={href}>{title}</a>)
        ));
        return menu;
    }
}

class Header extends React.Component {
    render () {
        return (
            <div>
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
                
                <div className="row">
                    <div className="col-12" >
                        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-0">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                                <div className="navbar-nav text-center mr-auto ml-auto">
                                    <NavMenu/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>                
            </div>
            
        );
    }
}

export default Header;