const initialState = {
    value: 0,
    products: [
        {
            _id: 1,
            name: 'A',
            price: 50,
            offer: {
                isOffer: true,
                qty: 3,
                price: 130 
            }
        },
        {
            _id: 2,
            name: 'B',
            price: 30,
            offer: {
                isOffer: true,
                qty: 2,
                price: 45 
            }
        },
        {
            _id: 3,
            name: 'C',
            price: 20,
            offer: {
                isOffer: false,
                qty: 3,
                price: 130 
            }
        },
        {
            _id: 4,
            name: 'D',
            price: 15,
            offer: {
                isOffer: false,
                qty: 3,
                price: 130 
            }
        }
    ],
    cart: [
    ]
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'addtocart':
            let cart = [...state.cart];
            cart.push(action.payload);
            return {
                ...state,
                cart
            }

        case 'deletefromcart':
            let newcart = [...state.cart];
            for(let i = 0; i < newcart.length; i++) {
                if (newcart[i]._id === parseInt(action.payload)) {
                    newcart.splice(i, 1);
                    return {
                        ...state,
                        cart: newcart
                    }
                }
            }
            
        default:
            return state
    }
}

export default reducer;