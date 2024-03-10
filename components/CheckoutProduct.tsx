import Image from "next/image";
// @ts-ignore
import { urlFor } from "../sanity.js";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CurrencyFormat from "react-currency-format";
import { removeFromBasket } from "../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

const CheckoutProduct = ({ id, items }: Props) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b bg-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          alt="product image"
          src={urlFor(items[0]).url()}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="gap-x1 flex items-end font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
          <div className=" flex flex-col items-end space-y-4">
            <h4 className="text-xl font-semibold lg:text-2xl">
              <CurrencyFormat
                prefix={"$"}
                value={items.reduce((total, item) => total + item.price, 0)}
              />
            </h4>
            <button
              onClick={removeItemFromBasket}
              className="text-blue-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
