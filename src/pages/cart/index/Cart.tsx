import styles from "../css/Cart.module.css";
import {useCart} from "./use-cart.ts";

export function Cart() {
    const {
        handleOpenCheckout,
        handleCloseCheckout,
        handleSubmit,
        checkoutModalIsOpen,
        cartViewModel
    } = useCart()
    return (
        <main className="page">
            <h1>Shopping Cart</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartViewModel.cartItems.map((item) => {

                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={item.quantity}
                                    onChange={(event) =>
                                        cartViewModel.handleChangeQuantity(+event.target.value, item.id)
                                }
                                />
                            </td>
                            <td>${cartViewModel.total(item)}</td>
                            <td>
                                <button onClick={() => cartViewModel.handleRemoveCartItem(item)}
                                        aria-label="Remove Magnifying Glass from Shopping Cart">
                                    X
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td className={styles.total}>${cartViewModel.cartTotalCost}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            <form onSubmit={(event)=>{
                event.preventDefault()
                handleSubmit()
            }}>
                <dialog open={checkoutModalIsOpen} id="mypopover">
                    <p>Greetings, one and all!</p>
                    <div className={styles.flexCenter}>
                        <button onClick={handleCloseCheckout}>Cancel</button>
                        <button>Checkout</button>
                    </div>
                </dialog>
            </form>
            <button
                className={styles.button}
                type="button"
                onClick={handleOpenCheckout}
            >
                Checkout
            </button>
        </main>
    );
}
