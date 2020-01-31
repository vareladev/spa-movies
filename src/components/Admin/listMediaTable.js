import React from 'react'
import DataTable  from 'react-data-table-component';
import Api from '../api.json'
import SweetAlert from 'react-bootstrap-sweetalert';

const columns = clickHandler => [
    {
        name: 'Cover',
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
        cell:(row) =>   <div>
                            <i alt="editar" title="Editar" onClick={clickHandler}
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={"1,"+row.id+","+row.media_type}
                                className="fa fa-pencil-square fa-2x"></i>
                            <i alt="Eliminar" title="Eliminar" onClick={clickHandler}
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={"2,"+row.id+","+row.media_type}
                                className="fa fa-trash fa-2x"></i>
                        </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },  
  ];

class ListMediaTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isPageLoaded: false,
            clickOnDelete: false,
            OnDeleteData: {id: 0, mediaType: 0},
        };
      }

    handleButtonClick = (state) => {
        var varList = state.target.id.split(",");
        var actionType = parseInt(varList[0]);
        var id = parseInt(varList[1]);
        var mediaType = parseInt(varList[2]);
        if(actionType===1){ //editar
            this.props.handlerEdit("editmedia", id, mediaType)
        }
        else if(actionType===2){ //eliminar
            this.setState({
                OnDeleteData: {id, mediaType},
                clickOnDelete: true,
            });
        }
    };

    componentDidMount() {
        var url = parseInt(this.props.mediaType) === 1 ? Api.url+Api.moviesAll : Api.url+Api.seriesAll;
        
        fetch(url)
            .then(data => data.json())
            .then((data) => { 
                this.setState({
                    isPageLoaded: true,
                    data: data,
                });
            }); 
        
    }

    TableLoader(){
        if(this.state.isPageLoaded){
            var title = parseInt(this.props.mediaType) === 1 ? "Peliculas" : "Series";
            return (
                <div>
                    {this.AlertsManager()}
                    <DataTable 
                        title={title}
                        data={this.state.data}
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

    AlertOnConfirm(){
        var url = this.state.OnDeleteData.mediaType===1 ?
                    Api.url+Api.moviesDelete+this.state.OnDeleteData.id :
                    Api.url+Api.seriesDelete+this.state.OnDeleteData.id;
        var pageLoaded = this.state.OnDeleteData.mediaType===1 ? "listmovie" : "listserie";

        fetch(url, {
            method: 'DELETE',
            })
            .then(res => res.json())
            .then(res => {
                this.setState({clickOnDelete: false});
                this.props.handler(pageLoaded);
        });   
    }

    AlertsManager(){
        if(this.state.clickOnDelete){
            return (
                <SweetAlert 
                    key="1"
                    warning
                    showCancel
                    cancelBtnText="Cancelar"
                    confirmBtnText="Si, Eliminar"
                    confirmBtnBsStyle="danger"
                    title="¿Esta seguro que desea eliminar este contenido?"
                    onConfirm={() => this.AlertOnConfirm()}
                    onCancel={() => this.setState({clickOnDelete: false,})}
                    focusCancelBtn>
                    Nota: Una vez eliminado no será posible recuperarlo
                </SweetAlert>
            );
        }
    }

    render(){
        return this.TableLoader();
    }
}

export default ListMediaTable;