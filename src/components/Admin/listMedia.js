import React from 'react'
import ListMediaTable from './listMediaTable';


class ListMedia extends React.Component{
    render(){
        var title = parseInt(this.props.mediaType) === 1 ? "Lista de películas" : "Lista de series";
        var btnTitle = parseInt(this.props.mediaType) === 1 ? "Agregar nueva película" : "Agregar nueva serie";

        return (
           <div className="col-12 col-lg-8 pr-5 pt-4">
                <div className="row pb-2 border-bottom">
                    <div className="col-12 col-sm-6">
                        <h3>{title}</h3>
                    </div>  
                    <div className="col-12 col-sm-6 d-flex flex-row-reverse ">
                        <button 
                            onClick={()=>{this.props.handler("addmedia")}}
                            type="button" 
                            className="btn btn-primary">
                                {btnTitle}
                        </button>
                    </div>
                </div>
                <ListMediaTable 
                    mediaType={this.props.mediaType} 
                    handler = {this.props.handler} 
                    handlerEdit = {this.props.handlerEdit} /> 
           </div> 
        );
    }
}

export default ListMedia;