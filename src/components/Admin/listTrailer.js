import React from 'react';
import Api from '../api.json'
import DataTable  from 'react-data-table-component';
import SweetAlert from 'react-bootstrap-sweetalert';

const columns = clickHandler => [
    {
        name: 'Preview',
        cell:(row) => <img alt="cover" width="25%" src={Api.url+row.img_url} />,
        ignoreRowClick: true,
        allowOverflow: true,
    },  
    {
      name: 'Titulo del trailer',
      selector: 'name',
      sortable: true,
    },
    {
        
        name: 'Editar',
        cell:(row) =>   <div>
                            <i alt="Ver" title="Ver" onClick={clickHandler} 
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={"1,"+row.id+","+row.url}
                                className="fa fa-search fa-2x"></i>
                            <i alt="Editar" title="Editar" onClick={clickHandler} 
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={"2,"+row.id}
                                className="fa fa-pencil-square fa-2x"></i>
                            <i alt="eliminar" title="Eliminar" onClick={clickHandler} 
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={"3,"+row.id}
                                className="fa fa-trash fa-2x"></i>
                        </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },  
  ];
  
class ListTrailer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            trailerList : [],
            isDataTableLoaded: false,
            onDeleteClick: false,
            onDeleteClickConfirm: false,
            onDeleteData: 0,
        };
    }

    componentDidMount() {
        fetch(Api.url+Api.trailersByDesc)
            .then(data => data.json())
            .then((data) => { 
                this.setState({
                    trailerList: data,
                    isDataTableLoaded: true,
                })
            }); 
    }

    

    handleTableClick = (state) => {
        var varList = state.target.id.split(",");
        var action = {
            type: parseInt(varList[0]), //1: ver, 2: editar, 3: eliminar
            id: parseInt(varList[1]), //trailer's id
        }

        console.log(varList);
        switch(action.type){
            case 1:
                var win = window.open(varList[2], '_blank');
                win.focus();
                break; 
            case 2:
                this.props.handlerEdit("edittrailer",action.id,0);
                break;
            case 3:
                console.log("eliminar")
                this.setState({
                    onDeleteClick: true,
                    onDeleteData: action.id,
                });
                break;
            default:
                break;
        }
    };

    TableLoader(){
        if(this.state.isDataTableLoaded){
            return (
                <div>
                    <DataTable 
                        title="Lista de trailers"
                        data={this.state.trailerList}
                        columns={columns(this.handleTableClick)}
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

    DeleteConfirmManager(){
        fetch(Api.url+Api.trailerDelete+this.state.onDeleteData, {
            method: 'DELETE',
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    onDeleteClick: false,
                    onDeleteClickConfirm: true,
                });
        }); 
    }
    DeleteWindowManager(){
        if(this.state.onDeleteClick){
            return (
                <SweetAlert 
                    key="1"
                    warning
                    showCancel
                    cancelBtnText="Cancelar"
                    confirmBtnText="Si, Eliminar"
                    confirmBtnBsStyle="danger"
                    title="¿Esta seguro que desea eliminar este trailer?"
                    onConfirm={() => this.DeleteConfirmManager()}
                    onCancel={() => this.setState({onDeleteClick: false})}
                    focusCancelBtn>
                    Nota: Una vez eliminado no será posible recuperarlo
                </SweetAlert>
            );
        }
    }

    ConfirmWindowManager(){
        if(this.state.onDeleteClickConfirm){
            return (
                <SweetAlert 
                    success title="¡Bien!" 
                    onConfirm={() => {this.props.handler("listtrailer");}}
                    onCancel={() => this.setState({ 
                                        onDeleteClickConfirm: false,
                                    })}
                    >
                        "¡El trailer ha sido eliminado!"
                </SweetAlert>
            )
        }
    }

    render(){
        return (
            <div className="col-12 col-lg-8 pr-5 pt-4">
                {this.DeleteWindowManager()}
                {this.ConfirmWindowManager()}
                <div className="row pb-2 border-bottom">
                    <div className="col-12 col-sm-6">
                        <h3>Administrar trailers</h3>
                    </div>  
                    <div className="col-12 col-sm-6 d-flex flex-row-reverse ">
                        <button 
                            onClick={()=>{this.props.handler("newtrailer")}}
                            type="button" 
                            className="btn btn-primary">
                                Agregar trailer
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.TableLoader()}
                    </div>
                </div>

            </div> 
        );
    }
}

export default ListTrailer;