import React from 'react'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import Select from 'react-select';
import Api from '../api.json'

class AddMedia extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "El perfume",
            year: "2006",
            yearStart: "2007",
            yearEnd: "2008",
            duration : "12:12",
            seasons: 0,
            description: "descrpcion",
            director: "director",
            mediaType: 1,
            outstanding: 0,
            creators: ["Erick varela","Andrea Navarrete"],
            actorOptions : [],
            actorsSelectedOptions: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleActorSelectChange = this.handleActorSelectChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
        

        this.imgUrl = React.createRef();
        this.imgUrlPreview = React.createRef();
    }

    //after load page
    componentDidMount() {
        //getting actors data and setting actorOptions
        fetch(Api.url+Api.getActors)
          .then(data => data.json())
          .then((data) => { 
                var actorOptionsTemp = [];
                data.map((actor) => {
                    actorOptionsTemp.push({value: actor.id, label: actor.name});
                    return null;
                });
                this.setState({
                    actorOptions: actorOptionsTemp,
                });
        });

    }

    //manage data for multiple select used for select an actor's list
    handleActorSelectChange = (actorsSelectedOptions) => {
        this.setState({ actorsSelectedOptions });
      }

    //manage form inputs and setting state
    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        //casteando el tipo de media de String a Int (para no tener que hacerlo luego)
        if(name==="mediaType" || name==="outstanding")
            value = parseInt(value);
    
        this.setState({
          [name]: value
        });
    }

    //creates and configure the input form, it's depends of media type: movie or serie
    renderForm(){
        var form = []; //form's repository
        var i = 0; //auxiliar for key
        //mediatype selector
        form.push(
            <div key={i++} className="form-group">
                <label htmlFor="mediaType">Seleccione tipo de recurso:</label>
                <select name="mediaType" className="form-control" onChange={this.handleInputChange} value={this.state.mediaType}>
                    <option key="1" value="1">Película</option>
                    <option key="2" value="2">Serie</option>
                </select>
            </div>
        );
        ///////////////////////////////////////////////////////////
        //setting title and outstanding
        var type = this.state.mediaType === 1 ? "pelicula" : "serie";
        form.push(
            <div key={i++}  className="form-row">
                <div key={i++} className="form-group col-md-6">
                    <label htmlFor="title">Titulo:</label>
                    <input onChange={this.handleInputChange} type="text" className="form-control" name="title" required value={this.state.title}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="">¿Marcar como {type} destacada?:</label>

                    <div className="form-row ml-5">
                        <div className="form-check col-md-2">
                            <input className="form-check-input" type="radio" name="outstanding" id="out1" value="1" onClick={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="out1">
                                Si
                            </label>
                        </div>
                        <div className="form-check col-md-2"> 
                            <input className="form-check-input" type="radio" name="outstanding" id="out2" value="0" onClick={this.handleInputChange}/>
                            <label className="form-check-label" htmlFor="out2">
                                No
                            </label>
                        </div>
                    </div>

                    
                </div>
            </div> 

        )
        ///////////////////////////////////////////////////////////
        //setting year, duration and seasons
        if(this.state.mediaType === 1){
            form.push(
                <div key={i++}  className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="year">Año:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="year" value={this.state.year}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="duration">Duración:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="duration"  value={this.state.duration}/>
                    </div>
                </div>                
            )
        }
        else{
            form.push(
                <div key={i++} className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="yearStart">Año de inicio:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="yearStart" value={this.state.yearStart}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="yearEnd">Año de finalización:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="yearEnd" value={this.state.yearEnd}/>
                    </div>
                </div>                
            );
            form.push(
                <div key={i++}  className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="seasons">Temporadas:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="seasons" value={this.state.seasons}/>
                    </div>
                </div>                    
            );
        }
        ///////////////////////////////////////////////////////////
        //setting description
        form.push(
            <div key={i++} className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea onChange={this.handleInputChange} className="form-control" rows="3" name="description" value={this.state.description}></textarea>
            </div>
        );
        ///////////////////////////////////////////////////////////
        //setting director or creators
        if(this.state.mediaType === 1){
            form.push(
                <div key={i++} className="form-group">
                    <label htmlFor="director">Director:</label>
                    <input onChange={this.handleInputChange} type="text" className="form-control" name="director" value={this.state.director} />
                </div>
            );
        }
        else{
            form.push(
                <div key={i++} className="form-group">
                    <label htmlFor="creators">Creadores:</label>
                    <ReactTagInput 
                        name="creators"
                        {...{ placeholder: "Ingresa un nombre y presiona Enter", maxTags: 10, removeOnBackspace: true }}
                        tags={this.state.creators} 
                        onChange={(newTags) => this.setState({ creators: newTags })}
                    />
                </div> 
            );
        }
        ///////////////////////////////////////////////////////////
        //setting conver and previe images
        form.push(
            <div key={i++} className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="img_url">Cover:</label>
                    <input ref={this.imgUrl} type="file" className="form-control-file" name="img_url" accept="image/x-png,image/gif,image/jpeg"  required />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="img_url_preview">Preview:</label>
                    <input ref={this.imgUrlPreview} type="file" className="form-control-file" name="img_url_preview" accept="image/x-png,image/gif,image/jpeg"  required />
                </div>
            </div>
        );
        ///////////////////////////////////////////////////////////
        //setting actors
        form.push(
            <div key={i++} className="form-group">
                <label htmlFor="actors">Selecciona los actores participantes:</label>
                <Select
                isMulti
                value={this.state.actorsSelectedOptions}
                onChange={this.handleActorSelectChange}
                options={this.state.actorOptions}
                />
            </div>
        );
        ///////////////////////////////////////////////////////////
        //setting confirm button
        var btnText = this.state.mediaType === 1 ? "Guardar pelicula" : "Guardar serie";
        form.push(
            <button key={i++} onClick={this.sendForm} type="button" className="btn btn-primary">{btnText}</button>
        );
        ///////////////////////////////////////////////////////////
        //returning form
        return (
            <form>
                {form}
            </form>
        );
    }

    //manage all about send data to API
    sendForm(){
        //getting conver and preview data
        var inputCover = document.querySelector('input[name="img_url"]');
        var inputPreview = document.querySelector('input[name="img_url_preview"]');

        //checking important input state
        if(
            !inputCover.files.length ||
            !inputPreview.files.length ||
            this.state.title === "" ){
                alert("Algunos campos importantes estan vacios");
        }
        else{
            //generating cover and preview filenames
            var inputCoverExt = inputCover.files[0].name.split('.').pop();
            var inputPreviewExt = inputPreview.files[0].name.split('.').pop();
            var tempName = this.state.title.replace(/\s+/g, '_') + "_" +
                            Math.floor(Math.random() * 1000);
            var inputCoverName = tempName + "." + inputCoverExt;
            var inputPreviewName =  tempName + "_preview." + inputPreviewExt;

            //formatting data to send
            var mediaData;
            //checking what kind of info is in the form (movie or serie info)
            if(this.state.mediaType === 1){ //it's movie's info
                mediaData  = {
                    title: this.state.title,
                    year: this.state.year,
                    duration : this.state.duration,
                    description: this.state.description,
                    director: this.state.director,
                    media_type: 1,
                    img_url: "img/media/"+inputCoverName,
                    img_url_preview: "img/media/"+inputPreviewName,
                    outstanding: this.state.outstanding,
                    url: "",
                };
            }else{ //its serie's info
                mediaData  = {
                    title: this.state.title,
                    year_start: "2007",
                    year_end: "2008",
                    seasons : this.state.seasons,
                    description: this.state.description,
                    media_type: 2,
                    img_url: "img/media/"+inputCoverName,
                    img_url_preview: "img/media/"+inputPreviewName,
                    outstanding: this.state.outstanding,
                    url: "",
                };
            }
            //creating arrays with id's actors
            var actorList = [];
            if(this.state.actorsSelectedOptions){
                this.state.actorsSelectedOptions.map((actor) => {
                    actorList.push(actor.value);
                    return null;
                });
            }


            //creating formData to send and setting all data that will contain
            const formData = new FormData();
            formData.append('mediaData',JSON.stringify(mediaData));        
            formData.append('inputCover', inputCover.files[0]);
            formData.append('inputPreview', inputPreview.files[0]);
            formData.append('coverName', inputCoverName);
            formData.append('previewName', inputPreviewName);
            formData.append('actorList', actorList);
            if(this.state.mediaType === 2) //if it's serie send creator's infor too!
                formData.append('creators', this.state.creators);
            
            //using fetch to send information to API
            var url = this.state.mediaType === 1 ?  Api.moviesAdd : Api.seriesAdd;
            fetch(Api.url+url, {
                method: 'POST',
                body: formData,
            }).then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                console.log("ok");
              })
              .catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
              });
        }
    }

    render(){
        return (
            <div className="col-12 col-lg-8 pr-5 pt-4">
                <h3 className="pb-2 mb-4 border-bottom">Agregar nuevo contenido</h3>
                {this.renderForm()}
            </div>
            );
    }
}

export default AddMedia;