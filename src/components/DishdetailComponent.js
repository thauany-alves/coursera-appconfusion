import React, {Component} from 'react';
import { List, Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props)

    }

    renderDish(dish){
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

    renderComments(comments){
        if(comments == null) return <div></div>
        
        const comment = comments.map((comment)=>{
            let d = new Date(comment.date);
            
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            let dateFormat = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
            
            return (
                <List key={comment.id} type="unstyled">
                    <li>{comment.comment}</li>
                    <li className="text-muted">-- {comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
                </List>
            )
        });

        return comment;
    }
      

    render() {
        const dish = this.props.dish;
        
        if(dish == null) return <div></div>;
        
        
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(dish.comments)}
                    </div>            
                </div>
            </div>
        );
    }

}

export default DishDetail;
