import { Button, CloseButton, Flex, Link } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AdminProductViewCardMeta } from "./BrokerBlogViewCardMeta";
import { AiTwotoneEdit as EditIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Loader from "../../Layout/Loader/Loader";
import {
  clearErrors,
  deleteBlog,
  getBrokerBlogs,
} from "../../../actions/blogAction";

export const AdminProductViewCardItem = (props) => {
  const { _id, title, previewContent, image } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isDeleted } = useSelector(
    (state) => state.brokerBlog
  );

  const removeItemHandler = (e) => {
    e.preventDefault();

    dispatch(deleteBlog(_id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: "DELETE_BLOG_RESET" });
      toast.success(`Blog Deleted Successfully`);
      dispatch(getBrokerBlogs());
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
            previewContent={previewContent}
            image={image}
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
            <CloseButton
              isDisabled={loading ? true : false}
              aria-label={`Delete ${title} from cart`}
              onClick={removeItemHandler}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/broker/blog/update/${_id}`);
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
                navigate(`/broker/blog/update/${_id}`);
              }}
            >
              Edit
            </Link>
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};
