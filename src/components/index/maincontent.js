import React from 'react';
import MediaSection from './mediasection';
import Api from '../api.json';

class MainContent extends React.Component {
    render (){
        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                <MediaSection title="Nuevas peliculas" api={Api.url+Api.moviesNews} handler = {this.props.handler}/>
                <MediaSection title="Nuevas Series" api={Api.url+Api.seriesNews} handler = {this.props.handler}/>
            </div>
        );
    }
}

export default MainContent;