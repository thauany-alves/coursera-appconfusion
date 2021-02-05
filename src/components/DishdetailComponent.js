import React, { Component} from 'react';
import { List, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control , LocalForm, Errors} from 'react-redux-form';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish}){
    return(
        <FadeTransform in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }} >
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );  
}

function RenderComments({comments, postComment, dishId}){
    if(comments != null)
        return(
            <div className="col-12 col-md-5 m-1" >
                <h4>Comments</h4>
                <List type="unstyled">
                    <Stagger in>
                        {comments.map((comment)=> {            
                            return (
                                <Fade in>
                                    <li key={comment.id} >
                                        <p>{comment.comment}</p>
                                        <p className="text-muted">-- {comment.author},{' '}  
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                                    </li>
                                </Fade>
                            )
                        })}
                    </Stagger>
                </List>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    else 
        return(<div></div>);    
}



const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if(props.dish != null)    
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />          
                </div>
            </div>
        );
    else 
        return( <div></div>);
}

export default DishDetail;

class CommentForm extends Component{
    constructor(){
        super();
        this.state = { isModalOpen: false };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render(){
        return(
            <React.Fragment>
                <Button className="mt-4" outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg mr-1"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group m-auto">                               
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" 
                                    id="rating" 
                                    name="rating" 
                                    className="form-control"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group  m-auto">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" 
                                    className="form-control"
                                    validators = {{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger" 
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Mus be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group  m-auto">
                                <Label htmlFor="comment">Your comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                        className="form-control"
                                        rows="6"
                                    />                               
                            </Row>
                            <Button className="mt-2" type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )  
    }
}