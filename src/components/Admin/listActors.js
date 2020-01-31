import React from 'react'
import Api from '../api.json'
import SweetAlert from 'react-bootstrap-sweetalert';
import DataTable  from 'react-data-table-component';

const columns = clickHandler => [
    {
        name: 'Editar',
        cell:(row) => <img alt="cover" width="10%" src={Api.url+row.img_url} />,
        ignoreRowClick: true,
        allowOverflow: true,
    },  
    {
      name: 'Nombre',
      selector: 'name',
      sortable: true,
    },
    {
        
        name: 'Editar',
        cell:(row) =>   <div>
                            <i alt="eliminar" title="Eliminar" onClick={clickHandler} 
                                style={{marginRight: "5px",cursor: "pointer",}} 
                                id={row.id}
                                className="fa fa-trash fa-2x"></i>
                        </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },  
  ];

class ListActors extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            actor: {
                name: "",
            },
            isActorSaved: false,
            isDeletedConfirmed: false,
            dataTable:[],
            isDataTableLoaded: false,
            clickOnDelete: false,
            idToDelete: 0,
            incompleteField: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendActor = this.sendActor.bind(this);
    }

    componentDidMount() {
        fetch(Api.url+Api.getActorByDesc)
            .then(data => data.json())
            .then((data) => { 
                this.setState({
                    dataTable: data,
                    isDataTableLoaded: true,
                })
            }); 
    }

    handleTableClick = (state) => {
        this.setState({
            idToDelete: state.target.id,
            clickOnDelete: true,
        })
    };

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
    
        this.setState({
            actor: {
                name: value,
            }
        });
    }

    WarningWindowManager(){
        if(this.state.incompleteField){
            return (
                <SweetAlert 
                    key="1"
                    warning
                    confirmBtnText="Entendido"
                    title="¡Algunos campos estan vaciós!"
                    onConfirm={() => {this.setState({incompleteField: false,})}}
                    focusCancelBtn>
                        Verifica los campos obligatorios
                </SweetAlert>
            );
        }
    }

    renderAlert(){
        if(this.state.isActorSaved || this.state.isDeletedConfirmed){
            var title = this.state.isActorSaved ? "¡El actor ha sido guardado!" : "¡El actor ha sido eliminado!";
            return (
                <SweetAlert 
                    success title="¡Bien!" 
                    onConfirm={() => {this.props.handler("editactor");}}
                    onCancel={() => this.setState({isActorSaved: false, isDeletedConfirmed: false,})}
                    >
                        {title}
                </SweetAlert>
            )
        }
    }

    renderDeleteAlert(){
        if(this.state.clickOnDelete){
            return (
                <SweetAlert 
                    key="1"
                    warning
                    showCancel
                    cancelBtnText="Cancelar"
                    confirmBtnText="Si, Eliminar"
                    confirmBtnBsStyle="danger"
                    title="¿Esta seguro que desea eliminar este actor?"
                    onConfirm={() => this.deleteConfirm()}
                    onCancel={() => this.setState({clickOnDelete: false,})}
                    focusCancelBtn>
                    Nota: Una vez eliminado no será posible recuperarlo
                </SweetAlert>
            );
        }
    }
    deleteConfirm(){

        fetch(Api.url+Api.actorDelete+this.state.idToDelete, {
        method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => {
            this.setState({clickOnDelete: false, isDeletedConfirmed: true,});
        });
    }

    sendActor(event){
        event.preventDefault();

        var actorImg = document.querySelector('input[name="imgUrl"]');
        //checking important input state
        if(!actorImg.files.length || this.state.actor.name === "" ){
            this.setState({
                incompleteField: true,
            })
        }
        else{
            //generating cover and preview filenames
            var extension = actorImg.files[0].name.split('.').pop();
            var tempName = this.state.actor.name.replace(/\s+/g, '_') + "_" +
                            Math.floor(Math.random() * 1000);
            var imgName = tempName + "." + extension;
            //creating formData to send and setting all data that will contain
            const formData = new FormData();
            var actor = {
                name: this.state.actor.name,
                img_url: "img/actor/"+imgName,
            }
            formData.append('actorData',JSON.stringify(actor));    
            formData.append('imgName',imgName);
            formData.append('imgActor', actorImg.files[0]);
            
            const that = this;
            fetch(Api.url+Api.actorAdd, {
                method: 'POST',
                body: formData,
            }).then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log("ok");
                that.setState({
                    isActorSaved: true,
                })
            })
            .catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
        }


    }

    TableLoader(){
        if(this.state.isDataTableLoaded){
            return (
                <div>
                    <DataTable 
                        title="Lista de actores"
                        data={this.state.dataTable}
                        columns={columns(this.handleTableClick)}
                        onRowSelected={this.handleChange}
                        pagination
                        paginationPerPage = {10} />
                </div>
            );
        }
        else {
            return (<h4>Cargando...</h4>) ;          
        }
    }

    render(){
        return (
            <div className="col-12 col-lg-8 pr-5 pt-4">
                {this.renderAlert()}
                {this.renderDeleteAlert()}
                {this.WarningWindowManager()}
                <h3 className="pb-2 border-bottom">Administrar actores</h3>
                <h4 className="pb-2">Agregar actor</h4>
                <form>
                    <div className="form-row">
                        <div className="col-12 col-sm">
                            <div className="form-group">
                                <label htmlFor="name"><span style={{color: "red", fontWeight: "bold"}}>*</span> Nombre: </label>
                                <input 
                                    style={{height: "45px",}}
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    type="text" className="form-control" id="name" required/>
                            </div>
                        </div>
                        <div className="col-12 col-sm">
                            <div className="form-group">
                                <label htmlFor="imgUrl"><span style={{color: "red", fontWeight: "bold"}}>*</span> Fotografía del actor: </label>
                                <input 
                                    style={{height: "45px",}}   
                                    type="file" className="form-control" name="imgUrl" id="imgUrl" 
                                    accept="image/x-png,image/gif,image/jpeg"
                                    required/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-2 d-flex align-items-end">
                            <button 
                                onClick={this.sendActor}
                                style={{marginBottom: "20px",}}
                                className="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </form>
                <h4 className="pb-2">Lista de actores</h4>
                {this.TableLoader()}
           </div> 
        );
    }
}

export default ListActors;