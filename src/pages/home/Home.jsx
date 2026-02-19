import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Hotels = () => {

  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type");

  // 🔥 Important: type pass karo
  const { data, loading } = useFetch(
    type ? `/hotels?type=${type}` : "/hotels"
  );

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listResult">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {data.hotels?.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;