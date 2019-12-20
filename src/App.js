import React from 'react';
import Header from './components/header'
import Jumbotron from './components/jumbotron'
import Footer from './components/footer'

import Sidebar from './components/sidebar/sidebar'
import MainContent from './components/index/maincontent'
import MediaContent from './components/media/mediacontent'


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      page: "index", 
      idMedia: -1,
      mediaType: -1,
      mediaKey: 100  //useful for MediaContent key update, first 99 elements are reserved for rest of components
    };
    // without bind, replaced by arrow func below
  }

  handler = (pagename, id, mt, jdata) => {
    this.setState({
      page: pagename,
      idMedia: id,
      mediaType: mt,
      mediaKey: this.state.mediaKey + 1
    });
  }

  setPage(){
    var page = [];
    var i = 0;
    page.push( 
      <Header key={i++}/>
    );

    //loading index (main page) components
    if(this.state.page === "index"){
      page.push (
        <div key={i++}>
          <Jumbotron page="index" data={[]}/> 
          <div className="row d-flex ">
            <MainContent handler = {this.handler} />
            <Sidebar handler = {this.handler} />
          </div>  
        </div>
      );
    }

    //loading media components with movie/serie information
    else if(this.state.page === "media"){
      page.push (
        <div key={this.state.mediaKey}> 
          <Jumbotron page="media" data={[{id: this.state.idMedia, mediaType: this.state.mediaType}]}  />
          <div className="row d-flex ">
            <MediaContent idMedia = {this.state.idMedia} mediaType = {this.state.mediaType} />
            <Sidebar handler = {this.handler}/>
          </div>  
        </div>
      );
    }
    
    page.push(<Footer key={i++}/>);

    return (
      <div className="container">
        {page}
      </div>       
    );
  }

  render (){
    return this.setPage();
  }
}

export default App;
