import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    // return () => {
    //   effect
    // };
    // generate the special stripe secret which allows us to change a customer
    const getClientSecret = async () => {
      console.log("value: ", getBasketTotal(basket) * 100);
      try {
        const response = await axios({
          method: "post",
          // stripe expects the total in currencies subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        console.log("secret key: ", response.data);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>>", clientSecret);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    console.log("value: ", elements.getElement(CardElement));

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      //   .then(( paymentIntent ) => {
      //     // paymentIntent = payment confirmation

      //    console.log(paymentIntent);
      //     db
      //     .collection('users')
      //     .doc(user?.uid)
      //     .collection('orders')
      //     .doc(paymentIntent.id)
      //     .set({
      //         basket: basket,
      //         amount: paymentIntent.amount,
      //         created: paymentIntent.created
      //     })

      .then(({ id, amount, created, error }) => {
        if (error) {
          // error handling
          // dispatch error action
          console.log("error in 2nd then: ",error)
          history.replace("/orders");
          console.log("userid: ",user?.uid)
          setProcessing(false);
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(id) // destructured id from paymentIntent object
            .set({
              basket: basket,
              amount, // destructured amount from paymentIntent object
              created, // destructured created from paymentIntent object
            });
        } else {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(id) // destructured id from paymentIntent object
            .set({
              basket: basket,
              amount, // destructured amount from paymentIntent object
              created, // destructured created from paymentIntent object
            });
        }
        setSucceeded(true);
        setError(null);

        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Chitrakut nagar,bibiganj</p>
            <p>Muzaffarpur,Bihar 842003</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go */}
            <h3>Card Details</h3>
            <form onSubmit={handleSubmit}>
              <CardElement className="payment__card" onChange={handleChange} />
              <div className="payment_priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* error  */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
