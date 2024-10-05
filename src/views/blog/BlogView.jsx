import { Link } from "react-router-dom";
import { data } from "../../data";

const BlogView = () => {
  return (
    <div className="container">
      <div
        className="row col-md-12"
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontFamily: "monospace",
          fontSize: "30px",
        }}
      >
        Blog
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h3
            style={{
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            bài viết mới nhất
          </h3>
          <div
            className="left"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.blogList.slice(0, 5).map((item, index) => (
              <>
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "100px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                  <Link
                    style={{
                      width: "85%",
                      textDecoration: "none",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                    to={`http://localhost:3000/blog/detail/${item.id}`}
                  >
                    {item.title}
                  </Link>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
        <div className="col-md-1" style={{ height: "100vh" }}>
          <div
            style={{ width: "2px", height: "100%", backgroundColor: "white" }}
          />
        </div>
        <div
          className="col-md-7"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data.blogList.slice(0, 6).map((item, index) => (
            <Link
              key={index}
              to={`http://localhost:3000/blog/detail/${item.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "#333",
                width: "30%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f1f1f1",
                  boxShadow: "10px 10px 20px 5px rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                  padding: "5px",
                }}
              >
                <img src={item.img} alt="" style={{ width: "100%" }} />
                <h5 style={{ textAlign: "justify", fontSize: "15px" }}>
                  {item.title}
                </h5>
                <p
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogView;
