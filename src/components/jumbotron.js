import React from 'react';
import Api from './api.json';

class Notice extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            isReady: false
        };
    }

    componentDidMount () {
        if(this.props.page === "index"){
            this.setState({isReady: true});
        }
        else if(this.props.page === "media"){
            var idMedia = this.props.data[0].id;
            var url = Api.url;
            if(this.props.data[0].mediaType === 1)
                url += Api.movieDetail;
            else if(this.props.data[0].mediaType === 2)
                url += Api.serieDetail;
            url += idMedia;
            console.log(url);
            
            fetch(url)
              .then(data => data.json())
              .then((data) => { console.log(data); this.setState({ data: data, isReady: true}); 
            });
        }
    }

    manageData(){
        if(this.state.isReady){
            if(this.props.page === "index"){
                return (
                    <div className="jumbotron rounded-0">
                        <h2>Novedades</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda laudantium nam voluptatem illum esse recusandae, voluptate obcaecati ea iure vitae nemo vero. Iure beatae consequatur placeat vitae laboriosam quidem vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, nam dolorum, perferendis perspiciatis itaque fugiat sit deserunt, nisi laborum asperiores neque. Earum adipisci ratione perferendis aut qui quod excepturi iusto!
                        </p>
                    </div>
                )
            }
            else if(this.props.page === "media"){
                var year = this.props.data[0].mediaType === 1 ? this.state.data.year : this.state.data.year_start + " - " + this.state.data.year_end;
                return (
                    <div className="jumbotron text-center rounded-0">
                        <h2>{this.state.data.title}</h2>
                        <div className="d-flex flex-row justify-content-center" >
                            <p className="w-75 border-bottom border-secondary" >{year}</p>
                        </div>
                        <button type="button" className="btn btn-dark">Ver en Netflux</button>
                    </div>
                );
            }
        }
        else{
            return (
                <div className="jumbotron rounded-0">
                    <h2>Loading...</h2>
                    <p>
                        Loading...
                    </p>
                </div>
            )
        }
    }


    render(){

        return (
            <div className="row" >
                <div className="col-12">
                    {this.manageData()}
                </div>
            </div>  
        );
    }
}

export default Notice;