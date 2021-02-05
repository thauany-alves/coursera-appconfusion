import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
// import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components'
import Loading from './LoadingComponent'

function RenderCard({item, isLoading, errMess}){
    if(isLoading){
        return(
            <Loading />
        )
    }else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }else 
        return (
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }} >
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle className="text-muted mb-3">{item.designation}</CardSubtitle> : null}
                        <CardSubtitle></CardSubtitle>
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start mt-3">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} 
                        isLoading={props.promotionsLoading}
                        errMess={props.promotionsErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;