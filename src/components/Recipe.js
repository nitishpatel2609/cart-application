import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
class Recipe extends Component{
    
    

    render(){
        let DiscountPrice = this.props.total * this.props.discount/100;
        let OrdertotalPrice = this.props.total - this.props.total * this.props.discount/100;

        let ItemRecipeCount = 0;
        this.props.addedItems.map(item=>{
            ItemRecipeCount += item.quantity;
        }); 

        let TotalBlock = this.props.addedItems.length > 0  ?   <div className="container">
        <div className="collection">
                <div className="collection-item">
                  <div className="dblock"><b>Total:</b><br/></div>
                 <div className="dflexTotal">
                     <div className="w45">Items ({ItemRecipeCount})</div>
                     <div className="w5">:</div>
                     <div className="w45"><b>${this.props.total}</b></div>
                 </div>   
                 <div className="dflexTotal">
                     <div className="w45">Discount</div>
                     <div className="w5">:</div>
                     <div className="w45"><b>${DiscountPrice}</b></div>
                 </div>   
                 <div className="dflexTotal">
                     <div className="w45">Order Total</div>
                     <div className="w5">:</div>
                     <div className="w45"><b>${OrdertotalPrice}</b></div>
                 </div>   
                </div>
            </div>
         </div> : '';


        return(
            <div>{TotalBlock}</div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total,
        discount: state.discount,
        ordertotal: state.ordertotal
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
