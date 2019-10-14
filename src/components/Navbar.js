import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
 
class Navbar extends Component{
    render(){
        let QuantityCount = 0; 

        this.props.addedItems.map(item=>{
            QuantityCount += item.quantity;
        });
        
        return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping</Link>
                    
                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart">My cart ({QuantityCount})</Link></li>
                     </ul>
                </div>
            </nav>    
        )
    }

}
const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

export default connect(mapStateToProps)(Navbar)
