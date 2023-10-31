import React, { Fragment, useEffect, useState } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { TbPigMoney as sliderIcon } from "react-icons/tb";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Box,
} from "@chakra-ui/react";
import Pagination from "react-js-pagination";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { AiFillCaretDown as Down } from "react-icons/ai";
import { BiSolidUpArrow as Up } from "react-icons/bi";
import HouseCard from "../Home/HouseCard";
import "./House.css";
import { clearErrors, homeHouses } from "../../actions/houseAction";

const categories = ["Rent", "Sale"];

const House = () => {
  const dispatch = useDispatch();

  const { error, loading, houses, houseCount, filteredHouse, resultPerPage } =
    useSelector((state) => state.house);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 200000000]);
  const [selected, setSelected] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const selectHandler = (i) => {
    setSelected(i);
  };

  const searchSubitHandler = (e) => {
    e.preventDefault();
  };

  const setCurrentPageNo = (e) => {
    window.scrollTo(0, 0);
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(homeHouses(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  return (
    <Fragment>
      <Header />

      <div className="container">
        <div className="productContainer">
          <div>
            <div className="search">
              <h2>Search</h2>
              <form onSubmit={searchSubitHandler}>
                <input
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <SearchIcon />
                </button>
              </form>
            </div>
            {/*  */}
            {window.innerWidth <= Number(600) ? (
              <div>
                <button
                  className="filterBtn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span>Filters</span> {showFilters ? <Up /> : <Down />}
                </button>
                {showFilters ? (
                  <div className="filterDivForMobile">
                    <div
                      style={
                        showFilters
                          ? {
                              animationName: "dropDown",
                              animationDuration: "2s",
                              backgroundColor: "white",
                              height: "24vh",
                              borderBottom: "1px solid black",
                            }
                          : { animationName: "dropUp", animationDuration: "2s" }
                      }
                      className="expandable"
                    >
                      <div className="categories">
                        <h2>Type</h2>
                        <ul>
                          <li onClick={() => setCategory("")}>
                            <div>
                              <input
                                type="checkbox"
                                id="All"
                                name="All"
                                value={``}
                                checked={selected === "All"}
                                onChange={() => selectHandler("All")}
                              />
                              <label
                                htmlFor="All"
                                style={
                                  selected === "All"
                                    ? { color: "#4f7597" }
                                    : null
                                }
                              >
                                All
                              </label>
                            </div>
                          </li>
                          {categories &&
                            categories.map((category) => (
                              <li
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                <div>
                                  <input
                                    type="checkbox"
                                    id={category}
                                    name={category}
                                    value={category}
                                    checked={selected === category}
                                    onChange={() => selectHandler(category)}
                                  />
                                  <label
                                    htmlFor={category}
                                    style={
                                      selected === category
                                        ? { color: "#4f7597" }
                                        : null
                                    }
                                  >
                                    {category}
                                  </label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      {/*  */}
                      <div className="priceSlider">
                        <h2>Price</h2>
                        <div className="slider">
                          <RangeSlider
                            value={price}
                            onChange={(newPrice) => setPrice(newPrice)}
                            aria-labelledby="range-slider"
                            min={0}
                            max={200000000}
                            step={1000}
                          >
                            <RangeSliderMark
                              value={price[0]}
                              alignItems={`center`}
                              mt="-10"
                              ml="-5"
                            >
                              ₹{price[0]}
                            </RangeSliderMark>
                            <RangeSliderMark
                              value={price[1]}
                              alignItems={`center`}
                              mt="-10"
                              ml="-5"
                            >
                              ₹{price[1]}
                            </RangeSliderMark>
                            <RangeSliderTrack bg="black.100">
                              <RangeSliderFilledTrack bg="#4f7597" />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0}>
                              <Box color="#4f7597" as={sliderIcon} />
                            </RangeSliderThumb>
                            <RangeSliderThumb boxSize={6} index={1}>
                              <Box color="#4f7597" as={sliderIcon} />
                            </RangeSliderThumb>
                          </RangeSlider>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="filterDivForMobile">
                <div className="expandable">
                  <div className="categories">
                    <h2>Type</h2>
                    <ul>
                      <li onClick={() => setCategory("")}>
                        <div>
                          <input
                            type="checkbox"
                            id="All"
                            name="All"
                            value={``}
                            checked={selected === "All"}
                            onChange={() => selectHandler("All")}
                          />
                          <label
                            htmlFor="All"
                            style={
                              selected === "All" ? { color: "#4f7597" } : null
                            }
                          >
                            All
                          </label>
                        </div>
                      </li>
                      {categories &&
                        categories.map((category) => (
                          <li
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            <div>
                              <input
                                type="checkbox"
                                id={category}
                                name={category}
                                value={category}
                                checked={selected === category}
                                onChange={() => selectHandler(category)}
                              />
                              <label
                                htmlFor={category}
                                style={
                                  selected === category
                                    ? { color: "#4f7597" }
                                    : null
                                }
                              >
                                {category}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/*  */}
                  <div className="priceSlider">
                    <h2>Price</h2>
                    <div className="slider">
                      <RangeSlider
                        value={price}
                        onChange={(newPrice) => setPrice(newPrice)}
                        aria-labelledby="range-slider"
                        min={0}
                        max={200000000}
                        step={1000}
                      >
                        <RangeSliderMark
                          value={price[0]}
                          alignItems={`center`}
                          mt="-10"
                          ml="-5"
                        >
                          ₹{price[0]}
                        </RangeSliderMark>
                        <RangeSliderMark
                          value={price[1]}
                          alignItems={`center`}
                          mt="-10"
                          ml="-5"
                        >
                          ₹{price[1]}
                        </RangeSliderMark>
                        <RangeSliderTrack bg="black.100">
                          <RangeSliderFilledTrack bg="#4f7597" />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={6} index={0}>
                          <Box color="#4f7597" as={sliderIcon} />
                        </RangeSliderThumb>
                        <RangeSliderThumb boxSize={6} index={1}>
                          <Box color="#4f7597" as={sliderIcon} />
                        </RangeSliderThumb>
                      </RangeSlider>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*  */}
          <div>
            <h1>Houses</h1>
            <div>
              <div className="productCardContainer productCardContainerBorder">
                {loading ? (
                  <Loader />
                ) : (
                  <Fragment>
                    {houses && loading === false && houses.length > 0 ? (
                      <div className="houseContainer">
                        <div className="housesHouseContainer">
                          {houses &&
                            houses.map((house) => (
                              <div
                                key={house._id}
                                className="subHouseContainer"
                              >
                                <HouseCard house={house} />
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <h2 className="productCardContainerHeading">
                        House Not Found
                      </h2>
                    )}
                  </Fragment>
                )}
              </div>
              {/*  */}
              {resultPerPage < filteredHouse && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={houseCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">"
                    prevPageText="<"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default House;
