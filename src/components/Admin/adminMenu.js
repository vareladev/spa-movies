import React from 'react'

class AdminMenu extends React.Component{
    render(){
        return (
            <div className="col-12 col-lg-4 pt-4" >
                <nav className="navbar navbar-expand-lg navbar-light w-100">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div className="list-group w-100 h-100">
                            <p className="list-group-item"><strong>Menú</strong></p>  
                            <a href="# " onClick={(event) => {event.preventDefault(); this.props.handler('listmovie');}} className="list-group-item list-group-item-action">Contenido</a>
                            <a href="# " onClick={(event) => {event.preventDefault(); this.props.handler('addmedia');}} className="list-group-item list-group-item-action">Agregar actor</a>
                            <a href="# " className="list-group-item list-group-item-action">Agregar contenido</a>
                            <a href="# " onClick={(event) => {event.preventDefault(); this.props.handler('index');}} className="list-group-item list-group-item-action">Cerrar sesión</a>
                        </div>
                    </div>
                </nav>
            </div> 
        );
    }
}

export default AdminMenu;