import React from 'react'
import { connect } from'react-redux'

class ProductList extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                 
            }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.products.length !== nextProps.products.length
    }

    handleAddToCart = (e) => {
        this.props.onAddToCart(this.props.products[e.target.getAttribute('data-id')]);
    }

    generateProductlist = () => {
        return this.props.products.length > 0 ? (
            this.props.products.map( (item, key) => 
            <div style={{height: '150px', width: '200px', backgroundColor: 'rgb(234, 234, 234)', marginBottom: '10px'}}>
                <p style={{paddingLeft: '5px', paddingTop: '5px'}}>Product Name: {item.name}</p>
                <p style={{paddingLeft: '5px'}}>Price: {item.price} ₹</p>
                {item.offer.isOffer && <p style={{paddingLeft: '5px'}}>Buy {item.offer.qty} for {item.offer.price} {'₹'}</p>}
                <input data-id={key} style={{paddingLeft: '5px'}} onClick= {this.handleAddToCart} type='button' value='Add to cart'></input>
            </div>)
        ) : 'Sorry there is no product!'; 
    
    }

	render() {

  	return(
        <div>
    	    <div>{this.generateProductlist()}</div>
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
        onAddToCart : (Product) => {
            dispatch({
                type : "addtocart",
                payload : Product
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);