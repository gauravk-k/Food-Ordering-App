import { useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import Cart_img from "../../imgs/images.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const handleClearCart = () => {
      dispatch(clearCart());
    };
 

  const navigate = useNavigate();

  function handleClick() {
    navigate("/order")
    handleClearCart();
  }
  var tprice = 0;
  cartItems.forEach((item) => {
    tprice =
      tprice +
      ((item.price * item.qty) / 100 || (item.defaultPrice * item.qty) / 100);
  });

  console.log(cartItems);

  return cartItems.length === 0 ? (
    <div className="flex flex-col items-center p-5 bg-black">
      <img className=" h-88 w-96 m-5" src={Cart_img}></img>
      <div className=" text-lg font-bold text-gray-200">Your Cart is empty</div>
      <p className="text-sm text-gray-400">
        You can go to home page to view more restaurants
      </p>
      <button className="bg-blue-600 text-white p-2 m-7 text-sm font-bold rounded-md hover:scale-105">
        <Link to="/"> Click here to go back to Restaurants </Link>
      </button>
    </div>
  ) : (
    <div className=" flex justify-between lg:mx-28 flex-col sm:flex-row">
      <div className="mt-10 sm:w-3/5">
        <div className="flex mb-2 p-2 justify-between border-b-2 border-gray-800">
          <p className=" text-lg md:text-2xl font-bold text-gray-200">
            Your cart ({cartItems.length} items)
          </p>
          <Link to="/" className="underline text-medium text-gray-400">Continue shopping</Link>
        </div>
        <div className="text-gray-300">
          {cartItems.map((item) => (
            <FoodItem key={item.id} items={item} />
          ))}
        </div>
      </div>
      <div className="mb-auto sm:m-10 border-2 border-gray-900 rounded-md">
        <h2 className="text-2xl font-bold m-3 text-gray-200">Order Summary:</h2>

        <div className=" border-b-2 border-gray-900 m-3 p-2">
          <div className="flex justify-between p-1 text-gray-300">
            <p className=" mr-4">Item total</p> <p> ₹{tprice}</p>
          </div>
          <div className="flex justify-between p-1 text-gray-300">
            <p>Delivery Fee</p>
            <p>FREE</p>
          </div>
          <div className="flex justify-between p-1 text-gray-300">
            <p className=" mr-10">GST and Restaurant charges</p>
            <p> ₹40.0</p>
          </div>
        </div>
        <div className="flex justify-between m-3 font-semibold p-2 text-gray-300">
          <p>TO PAY</p>
          <p>₹{tprice + 40}</p>
        </div>
        <button className="mx-3 my-3 bg-blue-800 hover:bg-blue-500 active:bg-blue-950 text-white p-2 block w-11/12 font-semibold rounded-md hover:scale-105" onClick={()=> handleClick()}>Checkout </button>
      </div>
    </div>
  );
};

export default Cart;
