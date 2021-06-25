import News from "../News/components";
import "./index.scss";

const NewsCatagory = () => {
  return (
    <div className="container">
      <h1 className="category-title my-3">Tech</h1>
      <div className="row my-5">
        <div className="col-lg-4">
          <News />
        </div>
        <div className="col-lg-4">
          <News />
        </div>
        <div className="col-lg-4">
          <News />
        </div>
      </div>
    </div>
  );
};

export default NewsCatagory;
