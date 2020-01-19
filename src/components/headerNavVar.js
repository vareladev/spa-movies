import React from 'react';
import MenuJson from './menu.json'

class HeaderNavBar extends React.Component {
    navMenu () {
        var menu = [];
        MenuJson.items.map(({id, title, href}) => {
            if(title === "Inicio")
                menu.push(
                    <a key={id} className="nav-item nav-link" href={href} onClick={(event) => {event.preventDefault(); this.props.handler('index',-1,-1);}}>{title}</a>
                );
            else if(title === "Administración")
                menu.push(
                    <a key={id} className="nav-item nav-link" href={href} onClick={(event) => {event.preventDefault(); this.props.handler('login',-1,-1);}}>{title}</a>
                );
            else
                menu.push(
                    <a key={id} className="nav-item nav-link" href={href}>{title}</a>
                );
            return null;
        });
        return menu; 
    }

    render () {
        return (
            <div className="row">
                <div className="col-12" >
                    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-0">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                            <div className="navbar-nav text-center mr-auto ml-auto">
                                {this.navMenu()}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>                
        );
    }
}

export default HeaderNavBar;