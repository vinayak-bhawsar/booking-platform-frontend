import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = ({ type }) => {
  const location = useLocation();

  // 🔥 Read URL params
  const queryParams = new URLSearchParams(location.search);

  const city = queryParams.get("city") || "";
  const minParam = queryParams.get("min") || 0;
  const maxParam = queryParams.get("max") || 999;

  const [min, setMin] = useState(minParam);
  const [max, setMax] = useState(maxParam);

  // 🔥 Dynamic API
  const apiUrl =
    type === "cars"
      ? `/cars`
      : type === "flights"
      ? `/flights`
      : `/hotels?city=${city}&min=${min}&max=${max}`;

  const { data, loading, error } = useFetch(apiUrl);

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">

          {/* SEARCH PANEL */}
          <div className="listSearch">
            <h1 className="lsTitle">
              {type ? type.toUpperCase() : "Search"}
            </h1>

            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={city} type="text" />
            </div>

            <div className="lsItem">
              <label>Min price</label>
              <input
                type="number"
                onChange={(e) => setMin(e.target.value)}
              />
            </div>

            <div className="lsItem">
              <label>Max price</label>
              <input
                type="number"
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>

          {/* RESULTS */}
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : error ? (
              "Something went wrong"
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))
            ) : (
              <h2>No Data Found</h2>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default List;