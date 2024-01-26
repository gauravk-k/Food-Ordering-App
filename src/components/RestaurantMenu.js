import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { MENU_ITEM_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurant(resId);
  const dispatch = useDispatch();
  const addFoodItem = (item) => {
    //dispatch an action
    dispatch(addItem(item));
  };

  if (resInfo === null) return <Shimmer />;

  // const { name, cuisines, costForTwoMessage, city , areaName, avgRating ,totalRatings} =
  //   resInfo?.cards[0]?.card?.card?.info;
  const {
    name,
    cuisines,
    costForTwoMessage,
    city,
    areaName,
    avgRating,
    totalRatings,
  } = resInfo?.info;
  const itemCards = resInfo?.itemCards;
  console.log(itemCards);

  // console.log(resInfo?.cards[0]?.card?.card?.info);
  // const itemCardsCheck = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
  // var itemCards  = ((itemCardsCheck)?
  //resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards :
  //resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.categories[0]?.itemCards);
  // if(itemCards==undefined){
  //   const cardsCheck = resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
  //   if(cardsCheck==undefined) itemCards= resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.categories[0]?.itemCards;
  //   else itemCards=cardsCheck;
  // }

  if (itemCards.length != 0) {
    itemCards.forEach((element) => {
      element.card.info.qty = 0;
      console.log(element.card.info);
    });
  }
  console.log(itemCards);

  return (
    <div className="menu lg:mx-40 ">
      <p className="m-2 text-xs text-gray-200">Home/{name}</p>

      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          <h1 className=" m-3 text-3xl  font-bold">{name}</h1>
          <p className="mx-3">{cuisines.join(", ")}</p>
          <p className="mx-3">{costForTwoMessage}</p>
          <p className="mx-3">
            {areaName}, {city}
          </p>
        </div>
        <div className="text-center">
          <button className="font-semibold  bg-green-700 text-white p-2 rounded-sm">
            {" "}
            {avgRating} ★{" "}
          </button>
          <p className=" text-xs m-1 text-gray-400">{totalRatings} ratings</p>
        </div>
      </div>

      <div className="line h-0.5 bg-gray-900 mx-3 my-2"></div>

      {/* city, cost for two , time */}

      <h2 className="mx-3 font-bold text-xl text-gray-200 my-3">Menu</h2>
      <ul data-testid="menu" className="mx-3">
        {itemCards?.map((item) => (
          <li
            className="border-b-2 border-gray-900 flex justify-between p-2 items-center duration-200 hover:scale-105"
            key={item.card.info.id}
          >
            <div className="flex">
              <img
                className="p-2 w-40 rounded-xl"
                src={MENU_ITEM_URL + item.card.info.imageId}
              ></img>
              <div className="m-2 text-gray-300">
                <p className="text-lg font-semibold">{item.card.info.name} </p>
                <p className="m-1">
                  {" Rs."}
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </p>
                <button className="text-green-700 m-1 font-semibold">
                  {item.card.info.ratings.aggregatedRating.rating} ★
                </button>
              </div>
            </div>
            <button
              data-testid="addBtn"
              className="p-1 md:p-2 m-1 md:m-2 rounded-md text-sm md:text-md shadow-lg text-white bg-blue-800 hover:bg-blue-500 active:bg-blue-950 hover:scale-105"
              onClick={() => addFoodItem(item.card.info)}
            >
              + Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
