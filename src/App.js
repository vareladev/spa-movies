import React from 'react';

import Header from './components/header'
import HeaderNavVar from './components/headerNavVar'
import Jumbotron from './components/jumbotron'
import Footer from './components/footer'

import Sidebar from './components/sidebar/sidebar'
import MainContent from './components/index/maincontent'
import MediaContent from './components/media/mediacontent'
import Login from './components/Admin/login'

//admin
import ListMedia from './components/Admin/listMovie'
import AdminMenu from './components/Admin/adminMenu'
import AddMedia from './components/media/addmedia'
import EditMedia from './components/media/editMedia'


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      //page: "index", 
      page: "listmovie",
      idMedia: -1,
      mediaType: -1,
      mediaKey: 100  //useful for MediaContent key update, first 99 elements are reserved for rest of components
    };
    // without bind, replaced by arrow func below
  }

  handler = (pagename, id, mt) => {
    this.setState({
      page: pagename,
      idMedia: id,
      mediaType: mt,
      mediaKey: this.state.mediaKey + 1
    });
  }
  handlerAdmin = (pagename) => { this.setState({ page: pagename, }); }

  setPage(){
    var page = [];
    var i = 0;

    page.push(<Header  key={i++}/>);
    if(this.state.page === "index" || this.state.page === "media" || this.state.page === "login")
      page.push(<HeaderNavVar key={i++} handler = {this.handler} pageName={this.state.page}/>);
    
    //loading index (main page) components
    if(this.state.page === "index"){
      page.push (
        <div key={i++}>
          <Jumbotron page="index" data={[]}  />
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

    else if(this.state.page === "listmovie"){
      page.push (
        <div key={this.state.mediaKey} className="row">
          <AdminMenu handler = {this.handlerAdmin}/>
          <ListMedia />
        </div>
      ); 
    }

    else if(this.state.page === "addmedia"){
      page.push (
        <div key={this.state.mediaKey} className="row">
          <AdminMenu handler = {this.handlerAdmin}/>
          <AddMedia />
        </div>
      ); 
    }

    else if(this.state.page === "editMedia"){
      console.log("page: editMedia");
      page.push (
        <div key={this.state.mediaKey}> 
          <EditMedia mediaType="2" idMedia="3" />
        </div>
      ); 
    }

    else if(this.state.page === "login"){
      console.log("page: login");
      page.push (
        <div key={this.state.mediaKey}> 
          <Login handler = {this.handlerAdmin} />
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
