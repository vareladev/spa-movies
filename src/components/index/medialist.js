import React from 'react';
import Api from '../api.json'

class MediaList extends React.Component{
    render (){
        var mediaList = [];
        this.props.media.map(med => {
            var urlBase = Api.url;
            //  var urlHref = "media.html?id="+med.id+"&mediatype="+med.media_type;
            mediaList.push(
                <div  onClick={(event) => {event.preventDefault(); this.props.handler('media',med.id,med.media_type);}} key={med.id} className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex flex-column justify-content-center"> 
                    <a href="# ">   
                        <div className="d-flex justify-content-center w-100">  
                            <picture>
                                <source media="(max-width: 576px)" srcSet={urlBase+med.img_url} />
                                <source media="(min-width: 577px)" srcSet={urlBase+med.img_url} />
                                <img className="img-fluid img-thumbnail" src={urlBase+med.img_url} alt="med" />
                            </picture>
                        </div>  
                        <p className="text-center text-lg-left">{med.title}</p>
                    </a>
                </div>
            );
            return null;
        })
        return mediaList;
    }
}

export default MediaList;