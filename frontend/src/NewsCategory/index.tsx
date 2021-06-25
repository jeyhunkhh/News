import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewsItem from "../News/components/NewsItem";
import { IAppState, IParam } from "../redux/interface";
import "./index.scss";
import { ICategoryByIdRes } from "./interface";
import { categoriesService } from "./service";

const NewsCatagory = () => {
  const { id } = useParams<IParam>();
  const [category, setCategory] = useState<ICategoryByIdRes>();
  const [newsCount, setNewsCount] = useState(6);

  useEffect(() => {
    setCategory(undefined);
    categoriesService.getCategoryById(id).then((res) => setCategory(res.data));
  }, [id]);

  const computedNews = useMemo(() => {
    let computed = category?.news;

    if (computed !== undefined) {
      computed = computed!.slice(0, newsCount);
    }

    return [computed];
  }, [category?.news, newsCount]);

  const handleAddShow = useCallback(() => {
    setNewsCount(newsCount + 6);
  }, [newsCount]);

  return (
    <div className="container">
      <h1 className="category-title my-3">{category?.categories.name}</h1>
      <div className="row my-5">
        {category?.news.length !== undefined ? (
          <>
            {computedNews[0]?.map((item) => (
              <div className="col-lg-4 mb-3" key={item._id}>
                <NewsItem news={item} />
              </div>
            ))}
            <div className="text-center" style={{ width: "100%" }}>
              {category?.news !== null && newsCount < category?.news.length && (
                <Button onClick={handleAddShow} variant="success">
                  Show More
                </Button>
              )}
            </div>
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh", width: "100%" }}
          >
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCatagory;
