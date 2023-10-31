import React, { Fragment, useEffect, useRef } from "react";
import MetaData from "../Layout/MetaTag";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import "./Profile.css";
import { clearErrors, deleteUser, logoutUser } from "../../actions/userAction";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const {
    loading: deleteLoading,
    error,
    isDeleted,
  } = useSelector((state) => state.deleteUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteProfileHandler = (e) => {
    e.preventDefault();

    dispatch(deleteUser());
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(`Account Deleted Successfully`);
      navigate(`/`);
      dispatch(logoutUser());
      dispatch({ type: "DELETE_USER_RESET" });
    }
  }, [isAuthenticated, navigate, dispatch, error, isDeleted]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isAuthenticated && (
            <Fragment>
              <MetaData title={`${user.name}'s Profile`} />

              <Header />

              <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={user.avatar.url} alt={user.name} />
                  <Link to="/profile/update">Edit Profile</Link>
                </div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>

                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>

                  <div>
                    <Link onClick={onOpen}>Delete Account</Link>
                    <Link to="/password/update">Change Password</Link>
                  </div>
                </div>
              </div>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      WARNING!!!
                    </AlertDialogHeader>

                    <AlertDialogBody display={"flex"} flexDirection={"column"}>
                      <Text>
                        Are you sure you wanna{" "}
                        <b style={{ color: "red" }}>DELETE</b> this Account.
                        This Action will delete everything related to you.
                      </Text>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        backgroundColor="red"
                        color={"white"}
                        onClick={deleteProfileHandler}
                        ml={3}
                        _hover={{ backgroundColor: "red.400" }}
                        isDisabled={deleteLoading ? true : false}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <Footer />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
