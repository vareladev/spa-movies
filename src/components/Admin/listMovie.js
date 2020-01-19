import React from 'react'
import DataTable  from 'react-data-table-component';
import Api from '../api.json'

const columns = clickHandler => [
    {
        name: 'Editar',
        cell:(row) => <img alt="cover" width="10%" src={Api.url+row.img_url} />,
        ignoreRowClick: true,
        allowOverflow: true,
    },  
    {
      name: 'Titulo',
      selector: 'title',
      sortable: true,
    },
    {
        name: 'Editar',
        cell:(row) => <img alt="edit" onClick={clickHandler} id={"1,"+row.id+","+row.media_type} src="http://via.placeholder.com/20x20" />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },  
    {
        name: 'Eliminar',
        cell:(row) => <img alt="asd" onClick={clickHandler} id={"2,"+row.id+","+row.media_type} src="http://via.placeholder.com/20x20" />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },  
  ];

class ListMedia extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movieData:[],
            serieData:[],
            isPageLoaded: false,
        };
      }

    handleButtonClick = (state) => {
        console.log(state.target.id);
    };

    componentDidMount() {
        fetch(Api.url+Api.moviesAll)
          .then(data => data.json())
          .then((data) => { 
              console.log(data);
              this.setState({
                movieData: data,
            });
           }); 

        fetch(Api.url+Api.seriesAll)
        .then(data => data.json())
        .then((data) => {
            this.setState({
                isPageLoaded: true,
                serieData: data,
            });
        });
    }

    MovieContentLoader(){
        if(this.state.isPageLoaded){
            return (
                <div>
                    <DataTable 
                    title="Peliculas"
                        data={this.state.movieData}
                        columns={columns(this.handleButtonClick)}
                        onRowSelected={this.handleChange}
                        pagination
                        paginationPerPage = {5} />
                </div>
            );
        }
        else {
            return (<h4>Cargando...</h4>) ;          
        }
    }

    SerieContentLoader(){
        if(this.state.isPageLoaded){
            return (
                <div>
                    <DataTable 
                    title="Series"
                        data={this.state.serieData}
                        columns={columns(this.handleButtonClick)}
                        onRowSelected={this.handleChange}
                        pagination
                        paginationPerPage = {5}/>
                </div>
            );
        }
    }

    render(){
        return (
           <div className="col-12 col-lg-8 pr-5 pt-4">
                <h3 className="pb-2 border-bottom">Lista de Peliculas</h3>
                {this.MovieContentLoader()}
                <h3 className="pb-2 border-bottom">Lista de Series</h3>
                {this.SerieContentLoader()}
           </div> 
        );
    }
}

export default ListMedia;