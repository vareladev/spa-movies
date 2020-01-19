import React from 'react'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            password: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleLogin(event){
        event.preventDefault();
        if(this.state.nickname === "admin" && this.state.password==="admin"){
            this.props.handler('listmovie');
        }
        else{
            alert("Usuario y/o contraseña no válida");
        }
    }


    render(){
        return (
          <div className="row">
              <div className="col-12 d-flex justify-content-center align-items-center" style={{height: 400}}>
                <form className="w-50">
                    <div className="form-group">
                        <label htmlFor="nickname">Usuario:</label>
                        <input onChange={this.handleInputChange} type="text" className="form-control" id="nickname" name="nickname" />
                        <small className="form-text text-muted">usuario de prueba: admin</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input onChange={this.handleInputChange} type="password" className="form-control" id="password" name="password"  />
                        <small className="form-text text-muted">contraseña de prueba: admin</small>
                    </div>
                    <button onClick={this.handleLogin} className="btn btn-primary">Submit</button>
                </form>
              </div>
          </div>  
        );
    }
}

export default Login