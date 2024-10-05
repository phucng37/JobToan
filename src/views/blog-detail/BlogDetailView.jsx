import { useParams } from "react-router-dom";
import { data } from "../../data";

const BlogDetailView = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="col-md-8 mx-auto mt-4 mb-4 card shadow p-3">
      <div
        dangerouslySetInnerHTML={{
          __html: data.blogList[Number(id) - 1].description,
        }}
      />
    </div>
  );
};
export default BlogDetailView;
