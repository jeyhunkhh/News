import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Layout/Loading";
import News from "../News/components";
import { IParam } from "../redux/interface";
import "./index.scss";
import { ICategoryByIdRes } from "./interface";
import { categoriesService } from "./service";

const NewsCatagory = () => {
  const { id } = useParams<IParam>();
  const [category, setCategory] = useState<ICategoryByIdRes>();

  useEffect(() => {
    setCategory(undefined);
    categoriesService.getCategoryById(id).then((res) => setCategory(res.data));
  }, [id]);

  return (
    <div className="container">
      <h1 className="category-title my-3">{category?.categories.name}</h1>
      <div className="row my-5">
        {category?.news.length !== undefined ? (
          <News news={category.news} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default NewsCatagory;
