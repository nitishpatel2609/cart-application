import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import axios from 'axios';


 class Home extends Component{
    state = {
        items: []
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    componentDidMount(){
        axios.get('https://api.myjson.com/bins/qhnfp').then(res => {
            const items = res.data;
            this.setState({ items });
            
          }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render(){
        let DiscountVal = '', OrignalPrice = '', DiscountPrice, DiscountPriceVal = '';
        let itemList = this.state.items.map((item, index)=>{
            if(item.discount > 0){

                DiscountPriceVal = item.price - item.price * item.discount/100;
                DiscountPrice = <b> ${DiscountPriceVal}</b>

                DiscountVal = <span className="discountval">{item.discount}% off</span>
                OrignalPrice = <span className="cutprice"><span className="cuttextclr">${item.price}</span></span>
            }else{
                DiscountPriceVal = '';
                DiscountVal = '';
                OrignalPrice = <span><span className="cuttextclr"><b>${item.price}</b></span></span>;
                DiscountPrice = '';
            }

            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src="https://via.placeholder.com/300" alt={item.name}/>
                            {DiscountVal}
                        </div>

                        <div className="card-content">
                            <span className="card-title"><b>{item.name}</b></span>
                            <p>{OrignalPrice} {DiscountPrice}</p>
                            <span to="/" className="addtocart" onClick={()=>{this.handleClick(item.id)}}>Add to cart</span>    
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">All items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)