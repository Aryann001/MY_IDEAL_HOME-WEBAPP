import { Button, CloseButton, Flex, Link } from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminProductViewCardMeta } from "./BrokerHouseViewCardMeta";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { clearErrors, deleteHouse, getBrokerHouses } from "../../actions/houseAction";

export const AdminProductViewCardItem = (props) => {
  const { _id, title, description, address, images, price, bedrooms, bathrooms, type } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isDeleted } = useSelector(
    (state) => state.brokerHouse
  );

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteHouse(_id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: "DELETE_HOUSE_RESET" });
      toast.success(`House Deleted Successfully`);
      dispatch(getBrokerHouses());
    }
  }, [dispatch, error, isDeleted]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          justify="space-between"
          align="center"
        >
          <AdminProductViewCardMeta
            _id={_id}
            name={title}
            description={description}
            address={address}
            category={type}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            image={images[0]}
          />

          {/* Desktop */}
          <Flex
            width="full"
            justify="space-between"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <PriceTag price={price} currency={"INR"} />
            <CloseButton
              isDisabled={loading ? true : false}
              aria-label={`Delete ${title} from cart`}
              onClick={removeItemHandler}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/broker/house/update/${_id}`);
              }}
            >
              <EditIcon />
            </Button>
          </Flex>

          {/* Mobile */}
          <Flex
            mt="4"
            align="center"
            width="full"
            justify="space-between"
            display={{
              base: "flex",
              md: "none",
            }}
          >
            <Link fontSize="sm" onClick={removeItemHandler}>
              Delete
            </Link>
            <Link
              fontSize="sm"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/broker/house/update/${_id}`);
              }}
            >
              Edit
            </Link>
            <PriceTag price={price} currency={"INR"} />
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};
