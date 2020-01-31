import React from 'react';
import Api from '../api.json'
import SweetAlert from 'react-bootstrap-sweetalert';
  
class ListTrailerEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            trailer: {
                id: 0,
                name: "",
                url: "",
                img_url: "",
            },
            imgPreview: "https://via.placeholder.com/300x169",
            incompleteField: false,
            confirm: false,
            isDataLoaded: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.formManager = this.formManager.bind(this);        
    }

    componentDidMount() {
        if(parseInt(this.props.actionType) === 1){
            this.setState({
                isDataLoaded: true,
            })
        }
        else { //edit
            fetch(Api.url+Api.trailerDetail+this.props.id)
            .then(data => data.json())
            .then((data) => { 
                    console.log(data)
                    this.setState({
                        trailer: data,
                        imgPreview: Api.url+data.img_url,
                        isDataLoaded: true,
                    });
            });
        }

    }

    //manage form inputs and setting state
    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        if(name==="name"){
            this.setState({
                trailer: {
                    id: this.state.trailer.id,
                    name: value,
                    url: this.state.trailer.url,
                    img_url: this.state.trailer.img_url,
                }
            });
        }
        else if(name==="url"){
            this.setState({
                trailer: {
                    id: this.state.trailer.id,
                    name: this.state.trailer.name,
                    url: value,
                    img_url: this.state.trailer.img_url,
                }
            });
        }
    }

    onImageChangeHandler(){
        var imgPreview = document.querySelector('input[name="img_url"]');
        if(!imgPreview.files.length){
            if(parseInt(this.props.actionType)===1){
                console.log("imagen por defecto")
                this.setState({
                    imgPreview:  "https://via.placeholder.com/300x169",
                });
            }
            else{
                this.setState({
                    imgPreview:  Api.url+this.state.trailer.img_url,
                });
            }
            
        }
        else{
            this.setState({
                imgPreview:  URL.createObjectURL(imgPreview.files[0]),
            });
        }
    }

    formManager(event){
        event.preventDefault();

        var extension;
        var tempName;
        var trailerImg;
        var trailer;
        //getting preview data
        var previewImg = document.querySelector('input[name="img_url"]');

        if(parseInt(this.props.actionType)===2 && (this.state.trailer.name!=="" || this.state.trailer.url !=="")){ //edit
            var imgData = {};
            if(!previewImg.files.length){ //imagen no actualizada
                imgData = {
                    image: null,
                    imgName: null,
                    imgUrl: this.state.trailer.img_url,
                }
            }
            else{ //actualizar imagen
                extension = previewImg.files[0].name.split('.').pop();
                tempName = this.state.trailer.name.replace(/\s+/g, '_') + "_" +
                                Math.floor(Math.random() * 1000);
                trailerImg = tempName + "." + extension;
                imgData = {
                    image: previewImg.files[0],
                    imgName: trailerImg,
                    imgUrl: "img/trailers/"+trailerImg,
                }
            }

            trailer = {
                id: this.state.trailer.id,
                name: this.state.trailer.name,
                url: this.state.trailer.url,
                img_url: imgData.imgUrl,
            };

            const formData = new FormData();
            formData.append('trailerData',JSON.stringify(trailer));        
            formData.append('previewImg', imgData.image);
            formData.append('imgName',imgData.imgName);

            const that = this;
            fetch(Api.url+Api.trailerEdit, {
                method: 'PUT',
                body: formData,
            }).then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log("ok");
                    that.setState({
                        confirm: true,
                    })
                })
                .catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                });
        }
        else if(this.state.trailer.name==="" || this.state.trailer.url ==="" || !previewImg.files.length){ //checking empty values
            this.setState({
                incompleteField: true,
            })
        }
        else{
            extension = previewImg.files[0].name.split('.').pop();
            tempName = this.state.trailer.name.replace(/\s+/g, '_') + "_" +
                            Math.floor(Math.random() * 1000);
            trailerImg = tempName + "." + extension;
            trailer = {
                id: this.state.trailer.id,
                name: this.state.trailer.name,
                url: this.state.trailer.url,
                img_url: "img/trailers/"+trailerImg,
            };
            const formData = new FormData();
            formData.append('trailerData',JSON.stringify(trailer));        
            formData.append('previewImg', previewImg.files[0]);
            formData.append('imgName',trailerImg);

            const that = this;
            fetch(Api.url+Api.trailerAdd, {
                method: 'POST',
                body: formData,
            }).then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log("ok");
                    that.setState({
                        confirm: true,
                    })
                })
                .catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                });
        } 
    }


    ConfirmWindowManager(){
        if(this.state.confirm){
            var msg = parseInt(this.props.actionType) === 1 ? "¡El trailer ha sido guardado!" : "¡El trailer ha sido actualizado!";
            return (
                <SweetAlert 
                    success title="¡Bien!" 
                    onConfirm={() => {this.props.handler("listtrailer");}}
                    onCancel={() => this.setState({ 
                                        confirm: false,
                                    })}
                    >
                        {msg}
                </SweetAlert>
            )
        }
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

    loadForm(){
        if(this.state.isDataLoaded){
            var buttonText = parseInt(this.props.actionType) === 1 ? "Guardar trailer" : "Editar trailer";
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor="name"><span style={{color: "red", fontWeight: "bold"}}>*</span> Titulo</label>
                        <input 
                            onChange={this.handleInputChange}
                            value={this.state.trailer.name}
                            type="text" className="form-control" name="name" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url"><span style={{color: "red", fontWeight: "bold"}}>*</span> YouTube URL: </label>
                        <input 
                            onChange={this.handleInputChange}
                            value={this.state.trailer.url}
                            type="text" className="form-control" name="url" id="url" />
                    </div>
                    <div className="form-group">
                        <div style={{height: "150px",}} className="d-flex justify-content-center">
                            <img alt="img_url" height="150px" src={this.state.imgPreview} />
                        </div> 
                        <label htmlFor="img_url"><span style={{color: "red", fontWeight: "bold"}}>*</span> Preview:</label>
                        <input 
                            onChange={()=>{
                                this.onImageChangeHandler()
                            }}
                            type="file" className="form-control-file" name="img_url" id="img_url"
                            accept="image/x-png,image/gif,image/jpeg" />
                    </div>
                    <div className="row" style={{marginBottom: "10px"}}>
                        <div className="col-12">
                            <span style={{color: "red"}}>* Campos obligatorios.</span> 
                        </div>
                    </div>
                    <button 
                        onClick={this.formManager}
                        type="submit" className="btn btn-primary">{buttonText}</button>
                </form>
            );
        }
        else{
            return <h4>Cargando...</h4>
        }
    }


    render(){
        var title = parseInt(this.props.actionType) === 1 ? "Nuevo trailer" : "Editar trailer";
        return (
            <div className="col-12 col-lg-8 pr-5 pt-4">
                {this.WarningWindowManager()}
                {this.ConfirmWindowManager()}
                <h3 className="pb-2 border-bottom">{title}</h3>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-6 ">
                        {this.loadForm()}
                    </div>
                </div>
            </div> 
        );
    }
}

export default ListTrailerEdit;