import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.google.com/search?vsrid=CKWByYzO3vHU7QEQAhgBIiQzNDJiMzA0Yi1kMzk2LTQyZDEtODE5MS05MjQ2MWM1ODc0ZDQyBiICc2Qodji07_bj6OeSAw&vsint=CAIqDAoCCAcSAggKGAEgATojChYNAAAAPxUAAAA_HQAAgD8lAACAPzABEJMCGLgBJQAAgD8&udm=26&lns_mode=un&source=lns.web.gisivli&vsdim=275,184&gsessionid=ZHaa6OosUMZOYyzocJQnPEkqilegVmay3di_nMIipNxExhm5yt2Mwg&lsessionid=6g4ItQDpexuSSu0UZ_8CLgSk3cGkWWe0maTvY-2-NIuOECMlilbdmQ&lns_surface=19&authuser=0&lns_vfs=e&qsubts=1771581874524&biw=1243&bih=568&ved=0CBgQh6cGahcKEwiw8u7c6OeSAxUAAAAAHQAAAAAQCA&tbnid=JS8Zq41A3ZhtXM&ictx=2"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
