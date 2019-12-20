import React from 'react'
import Actor from './actor'
import Api from '../api.json'

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mData: [],
            isReady: false
        };
    }

    componentDidMount() {
        var url = Api.url;
        if(this.props.mediaType === 1)
            url += Api.movieDetail;
        else if(this.props.mediaType === 2)
            url += Api.serieDetail;
        url += this.props.idMedia;
    
        fetch(url)
          .then(data => data.json())
          .then((data) => { this.setState({ mData: data, isReady: true}); 
        }); 
    }

    manageLoad(){
        if(this.state.isReady){
            var year = this.props.mediaType === 1 ?  "Año: "+this.state.mData.year : "Año: "+this.state.mData.year_start+" - "+this.state.mData.year_end; 
            var duration = this.props.mediaType === 1 ? "Duración: "+this.state.mData.duration : 'Temporadas: '+this.state.mData.seasons;
            var director = "";
            if(this.props.mediaType === 1)
                director = "Director: "+this.state.mData.director;
            else{
                director = "Creadores: "
                this.state.mData.creators.forEach(item => {
                    director = director + item.name + ". ";
               });
            }
            return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-8" >
                    <div className="row p-2">
                        <div className="col-12 col-sm-5 col-md-5 col-lg-4 d-flex justify-content-center align-items-center"> 
                            <picture>
                                <source media="(max-width: 769px)" srcSet={this.state.mData.img_url} />
                                <source media="(min-width: 768px)" srcSet={this.state.mData.img_url} />
                                <img className="img-fluid img-thumbnail w-sm-50" src={this.state.mData.img_url} alt="cover" />
                            </picture>
                        </div>
                        <div className="col-12 col-sm-7 col-md-7 col-lg-8">
                            <div className="row">
                                <div className="col-12 text-center text-sm-left" >
                                    <div className="h4">{this.state.mData.title}</div>
                                    <div>{year}</div>
                                    <div>{duration}</div>
                                    <div className="border-bottom pb-2"></div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <p className="text-justify">{this.state.mData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col-12">
                            <div className="h5 text-center text-sm-left">
                                {director}
                            </div>
                        </div>
                    </div>
                    <div className="row pt-2 pl-2 pr-2">
                        <div className="col-12">
                            <div className="h5 text-center text-sm-left">Reparto:</div>
                        </div>
                    </div>
                    <div className="row m-2 pb-2 pl-2 pr-2 d-flex flex-wrap">
                        <Actor casting={this.state.mData.casting} />
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                    <h3>Loading...</h3>
                </div>
            )   
        }
    }

    render () {
        return this.manageLoad();
    }
}


export default Detail;