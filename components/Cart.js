import React from 'react'
import { connect } from'react-redux'

class Cart extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                offerItem: []
            }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.cart.length !== nextProps.cart.length
    }

    handleDeleteFromCart = (e) => {
        this.props.onDeleteFromCart(e.target.getAttribute('data-id'));
    }

    generateCartlist = () => {

        return this.props.cart.length > 0 ? (
            this.props.cart.map((item) => 
            <div style={{height: '150px', width: '200px', backgroundColor: 'rgb(234, 234, 234)', marginBottom: '10px'}}>
                <p style={{paddingLeft: '5px', paddingTop: '5px'}}>Product Name: {item.name}</p>
                <p style={{paddingLeft: '5px'}}>Price: {item.price} ₹</p>
                <input data-id={item._id} style={{paddingLeft: '5px'}} onClick= {this.handleDeleteFromCart} type='button' value='Delete'></input>
            </div>)
        ) : 'Your cart is empty!'; 
    }
    
    getTotalAmount = () => {
        let totalAmount = 0;
        let offerItem = [];
        if (this.props.cart.length === 0) {
            return '0 ₹';
        }  else {
            this.props.cart.map((item) => {
                if(item.offer.isOffer) {
                    let search = -1;
                    
                    offerItem.forEach((el, key) => {
                        if (el._id === item._id) {
                            search = key;
                        }
                    });
                  
                    if (search > -1) {
                        const itemAttributes = { _id: item._id, count: offerItem[search].count + 1} 

                        const newConditionsArr =  [
                            ...offerItem.slice(0,search),
                            Object.assign({}, offerItem[search], itemAttributes),
                            ...offerItem.slice(search + 1)
                        ];

                        offerItem = newConditionsArr; 
                    } else {
                        offerItem.push({ _id: item._id, count: 1});
                    }
                }    
            });

            const key = '_id';
            this.props.cart.map((item) => {
                if (!item.offer.isOffer) {
                    // without offer
                    totalAmount += item.price;
                } 
            });
            const arrayUniqueByKey = [...new Map(this.props.cart.map(item =>
            [item[key], item])).values()];

            arrayUniqueByKey.map((item) => {
                    // with offer
                    if(item.offer.isOffer && item._id === 1) {
                        let indx = -1;
                        offerItem.forEach((el, key) => {
                            if (el._id === item._id) {
                                indx = key;
                            }
                        });
                        if (indx > -1) {
                            const itemCount = offerItem[indx].count;
                            totalAmount += parseInt(itemCount/3 ) * 130 + parseInt(itemCount%3) * 50;
                        }
                        
                    } else if (item.offer.isOffer && item._id === 2) {
                        let indx = -1;
                        offerItem.forEach((el, key) => {
                            if (el._id === item._id) {
                                indx = key;
                            }
                        });
                        if (indx > -1) {
                            const itemCount = offerItem[indx].count;
                            totalAmount += parseInt(itemCount/2) * 45 + parseInt(itemCount%2) * 30;
                        }
                    }
            });
            return totalAmount;
        }
    }

	render() {

  	return(
        <div>
            <h1>Cart</h1>
            <p>Total Item: {this.props.cart.length}  <span style={{marginLeft: '30px'}}>Total Price: {this.getTotalAmount()}</span></p>
            <div>{this.generateCartlist()}</div>
    	</div>
    ); 
  }
}


const mapStateToProps = (state) =>{
    return {
        products: state.products,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onDeleteFromCart : (productKey) => {
            dispatch({
                type : "deletefromcart",
                payload : productKey
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);