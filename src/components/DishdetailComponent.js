import React from 'react';
import { List, Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderDish({dish}){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );  
    }

    function RenderComments({comments}){
        if(comments == null) return <div></div>
        
        return comments.map((comment)=> {            
            return (
                <List key={comment.id} type="unstyled">
                    <li>{comment.comment}</li>
                    <li className="text-muted">-- {comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
                </List>
            )
        });
    }


 
    const DishDetail = (props) => {

        const dish = props.dish;
        
        if(dish == null) return <div></div>;
        
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={dish.comments} />
                    </div>            
                </div>
            </div>
        );
    }

export default DishDetail;
