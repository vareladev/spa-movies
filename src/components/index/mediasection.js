import React from 'react';
import MediaList from './medialist';

class MovieSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {media: []};
    }

    componentDidMount() {
        fetch(this.props.api)
          .then(data => data.json())
          .then((data) => { this.setState({ media: data }) }); 
    }

    render(){
        return (
            <div className="row p-2">
                <div className="col-12">
                    <p className="h4">{this.props.title}</p>
                </div>
                <div className="row d-flex justify-content-around align-items-start flex-wrap p-2">  
                    <MediaList media={this.state.media} handler = {this.props.handler} />
                </div>
            </div>         
        )
    }
}

export default MovieSection;