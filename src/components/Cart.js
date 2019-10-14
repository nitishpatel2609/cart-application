import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Recipe from './Recipe';

class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
        let ItemCount = 0;
        this.props.items.map(item=>{
            ItemCount += item.quantity;
        }); 

              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                        
                        <li className="collection-item avatar" key={item.id}>
                                <div className="w60">
                                    <div className="itemName">
                                        <div className="w10"><img src="https://via.placeholder.com/30" alt={item.name} className=""/></div> 
                                        <div className="w70">{item.name}</div> 
                                        <div className="w201"><button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button></div>                                        
                                        </div>
                                    </div>
                                <div className="w20">
                                     <div className="dflex">
                                     <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                            <span className="bfull">{item.quantity}</span>
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                     </div>    
                                </div>
                                <div className="w20"><b>${item.price}</b></div>      
                                </li>
                         
                    )
                })
            ):

             (
                <div align="center"><p>Cart is empty</p></div>
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>My Cart:</h5>
                    <ul className="collection-top-bottom">
                        <li className="border-btm">
                            <div className="w60"><b>Items ({ItemCount})</b></div>
                            <div className="w20"><b>Qty</b></div>
                            <div className="w20"><b>Price</b></div>
                        </li>
                        {addedItems}
                    </ul>
                </div> 
                <Recipe />          
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        total_quantity: state.total_quantity,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)