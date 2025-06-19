import React from "react";
import { useSelector } from "react-redux";
import CartCourse from "../../components/dashboard/CartCourse";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  // console.log(cart);

  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Cart</h1>
      <section className="mx-10 my-5">
        <h2 className="text-gray-300 text-lg md:text-xl lg:text-3xl font-semibold">
          {cart?.length} courses in cart
        </h2>
      </section>
      <div className="flex flex-col gap-5 lg:gap-10">
        {cart?.map((course) => (
          <CartCourse key={course?._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
