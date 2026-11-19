import { useReducer } from "react";
import PosContext from "./posContext.js";
import { POSConstant } from "./constant.js";

export default function PosContextProvider(props) {
    const posDataType = {
        products: [],
        cart: [],
    };
    const [state, dispatch] = useReducer((prevSate, action) => {
        const { type, payload } = action;
        switch (type) {
            case POSConstant.ADD_TO_CART: {
                const indexFound = prevSate.cart.findIndex(item => item.id === payload.id);
                if (indexFound !== -1) {
                    const selectedItem = prevSate.cart[indexFound];
                    selectedItem.qty += 1;
                    return {...prevSate};
                }
                return {
                    ...prevSate,
                    cart: [...prevSate.cart, {...payload, qty: 1}]
                }
            }

            case POSConstant.DECREMENT_QTY: {
                const indexFound = prevSate.cart.findIndex(item => item.id === payload.id);
                const selectedItem = prevSate.cart[indexFound];
                selectedItem.qty -= 1;
                return {...prevSate};
            }
            case POSConstant.INCREMENT_QTY: {
                const indexFound = prevSate.cart.findIndex(item => item.id === payload.id);
                const selectedItem = prevSate.cart[indexFound];
                selectedItem.qty += 1;
                return {...prevSate};
            }
            case POSConstant.LOAD_DATA:
                return {
                    ...prevSate,
                    products: payload
                }
            case POSConstant.REMOVE_FROM_CART:
                return {
                    ...prevSate,
                    cart: prevSate.cart.filter(item => item.id != payload)
                }
            default:
                return prevSate;
        }
    }, posDataType);

    return (
        <PosContext.Provider value={{state, dispatch}}>
            {props.children}
        </PosContext.Provider>
    );
}
