import React from 'react';
import Sidebarlist from './sidebarlist'

class SidebarBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {media: [], type: this.props.type};
    }

    componentDidMount() {
        fetch(this.props.apiurl)
          .then(data => data.json())
          .then((data) => this.setState({ media: data }) ); 
    }

    render(){
        return (
            <ul className="list-group border">
                <Sidebarlist title={this.props.title} media={this.state.media} type={this.state.type} handler = {this.props.handler} />
            </ul>        
        )
    }
}

export default SidebarBlock;