import React from 'react'

class Actor extends React.Component {
    render (){
        var actorList = [];
        var k = 0;
        this.props.casting.forEach(item => {
            actorList.push(
                <div key={k++} className="col-6 col-sm-6 col-md-6 col-lg-4 p-1 text-primary mylink" >
                    <div className="row">
                        <div className="col-12 col-sm-4 d-flex justify-content-center">
                            <img className="img-fluid img-thumbnail" src={item.img_url} alt="actor" />
                        </div>
                        <div className="col-12 col-sm-8 d-flex align-items-center justify-content-center justify-content-sm-start">
                            <span>{item.name}</span>
                        </div>
                    </div>
                </div>
            );
        });
        return actorList;        
    }
}

export default Actor;