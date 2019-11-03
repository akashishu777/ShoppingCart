import React from 'react'
import { connect } from 'react-redux'
import ProductList from './ProductList';
import Cart from './Cart';

class App extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                 
            }
    }
    
    shouldComponentUpdate(nextProps) {
        if (nextProps.cart.length !== this.props.cart.length){
            return true;
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     if (this.props.cart.length !== nextProps.cart.length) {
    //         // console.log()
    //     }
    // }

	render() {
  	return(
        <div>
            <div style={{float: 'left', width: 'auto', marginLeft: '40px'}}>
                <h1>Shop your product</h1>
                <ProductList/>
            </div>
            <div style={{float: 'right', width: 'auto', minWidth: '50%'}}>
                <Cart />
            </div>
    	</div>
    ); 
  }
}


const mapStateToProps = (state) => {
    return {
        value: state.value,
        products: state.products,
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        _onInc : () =>{
            dispatch({
                type :"ON_INCREMENT",
                value :1
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);