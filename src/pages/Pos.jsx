import { useContext } from "react";
import posContext from "../context/pos/posContext";
import { useEffect } from "react";
import { POSConstant } from "../context/pos/constant";

export default function Pos() {
    const { state, dispatch } = useContext(posContext);
    const format = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    useEffect(() => {
        (async () => {
            const raw = await fetch("/products.json");
            const cooked = await raw.json();
            dispatch({
                type: POSConstant.LOAD_DATA,
                payload: cooked,
            });
        })();
    }, []);

    return (
        <div className="flex p-10 bg-slate-100 w-full h-screen">
            <div className="grid resize-x scrollbar-thin w-[70%] border-r-2 border-r-black/25 p-4 gap-6 h-full overflow-y-auto grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {state.products.length > 0 ? (
                    state.products.map((item) => {
                        return (
                            <div
                                key={"products-" + item.id}
                                onClick={() => {
                                    dispatch({
                                        type: POSConstant.ADD_TO_CART,
                                        payload: item,
                                    });
                                }}
                                className="grid bg-white rounded-lg cursor-pointer border border-black/25 p-4 grid-rows-[80%_10%_10%] justify-center items-center content-center"
                            >
                                <img
                                    className="h-full object-contain w-full"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <span className="truncate">{item.title}</span>
                                <span>{format.format(item.price * 18000)}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full col-span-4 h-full flex justify-center items-center">
                        <p>No product yet</p>
                    </div>
                )}
            </div>
            <div className="h-full w-[30%] scrollbar-thin flex justify-start gap-4 p-4 items-center flex-col overflow-y-auto">
                {state.cart.length > 0 ? (
                    state.cart.map((item) => {
                        return (
                            <div
                                key={"cart-" + item.id}
                                className="bg-white w-full rounded-lg  cursor-pointer border border-black/25 grid grid-cols-[20%_80%] px-6 py-4 gap-4 justify-center items-center content-center"
                            >
                                <img
                                    className="h-full object-contain w-full"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <div className="flex border-l border-l-black/25 pl-4 flex-col gap-2 justify-between h-full">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-wrap">
                                            {item.title}
                                        </span>
                                        <span>
                                            Total :{" "}
                                            {format.format((item.price * item.qty).toFixed(2) * 18000)}
                                        </span>
                                    </div>
                                    <div className="w-50 p-2 border border-black/25 rounded-lg items-center justify-between flex">
                                        <button
                                            onClick={() => {
                                                if (item.qty <= 1) {
                                                    dispatch({
                                                        type: POSConstant.REMOVE_FROM_CART,
                                                        payload: item.id,
                                                    });
                                                    return;
                                                }
                                                dispatch({
                                                    type: POSConstant.DECREMENT_QTY,
                                                    payload: item,
                                                });
                                            }}
                                            className="px-4 py-2 rounded-lg border border-black/25"
                                        >
                                            -
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: POSConstant.INCREMENT_QTY,
                                                    payload: item,
                                                });
                                            }}
                                            className="px-4 py-2 rounded-lg border border-black/25"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <p>Cart empty please add an item</p>
                    </div>
                )}
            </div>
        </div>
    );
}
