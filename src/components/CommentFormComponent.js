import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import { Control , LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export default class CommentForm extends Component{
    constructor(){
        super();
        this.state = { isModalOpen: false };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }
    
    render(){
        return(
            <React.Fragment>
                <Button className="mt-4" outline onClick={this.toggleModal}>
                     Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.toggleModal}>
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

//export default CommentForm;