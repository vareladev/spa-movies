import React from 'react';
import Api from '../api.json'

class SidebarList extends React.Component{
    checkType(urlBase, media){
        var data = new Map();
        if(this.props.type === "outstanding"){
            data.set('url', "# ");
            data.set('img', urlBase+media.img_url_preview);
            data.set('title', media.title);
            data.set('alt', "movie");
            data.set('target',"_self");
        }
        else if(this.props.type === "trailer"){
            data.set('url', media.url);
            data.set('img', urlBase+media.img_url);
            data.set('title', media.name);
            data.set('alt', "trailer");
            data.set('target',"_blank");
        }
        return data;
    }
    

    render (){
        var mediaList = [];
		mediaList.push(<li key="-1" className="list-group-item border-0"><h4>{this.props.title}</h4></li>);
        this.props.media.map((med,i) => {
            var data = this.checkType(Api.url, med);

            mediaList.push(
                    <li key={i} className="list-group-item border-0 pt-0 pb-3" onClick={(event) => {if(this.props.type === "trailer") return false; event.preventDefault(); this.props.handler('media',med.id,med.media_type)}}> 
                        <a href={data.get('url')} target={data.get('target')} rel="noopener noreferrer">
                            <div className="row pl-4 pr-4 pl-lg-3 pr-lg-3"> 
                                <div className="col-12 col-sm-12 col-md-12 col-lg-3 p-0 d-flex align-items-center justify-content-center"> 
                                        <picture> 
                                            <source media="(max-width: 768px)" srcSet={data.get('img')} /> 
                                            <source media="(min-width: 767px)" srcSet={data.get('img')} /> 
                                            <img className="img-fluid img-thumbnail" src={data.get('img')} alt={data.get('alt')} /> 
                                        </picture> 
                                </div> 
                                <div className="col-12 col-sm-12 col-md-12 col-lg-9 p-2 d-flex align-items-center"> 
                                    <div className="w-100 text-center text-lg-left" > 
                                        <div className="ml-2" >{data.get('title')}</div> 
                                    </div>  
                                </div> 
                            </div> 
                        </a>
                    </li> 
                
            );
            return null;
        })
        return mediaList;
    }
}

export default SidebarList;