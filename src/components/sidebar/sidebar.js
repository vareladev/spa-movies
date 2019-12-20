import React from 'react';
import Sidebarblock from './sidebarblock'
import Api from '../api.json'

class SideBar extends React.Component {
    render (){
        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                <Sidebarblock title="Destacados" apiurl={Api.url+Api.outStanding} type="outstanding"  handler = {this.props.handler}/>
                <Sidebarblock title="Trailers" apiurl={Api.url+Api.trailers} type="trailer"  handler = {this.props.handler}/>
            </div>
        );
    }
}

export default SideBar;