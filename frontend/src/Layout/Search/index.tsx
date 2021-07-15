import "./index.scss";
import { Form, FormControl } from "react-bootstrap";
import { useCallback, useState } from "react";
import { newsService } from "../../News/service";
import { INews } from "../../News/interface";
import { Base_Url } from "../../httpClient/consts";
import { Link } from "react-router-dom";

const Search = () => {
  const [findedNews, setFindedNews] = useState<INews[]>();

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt.target.value.length >= 3) {
        newsService
          .getNews(evt.target.value)
          .then((res) => setFindedNews(res.data));
      } else {
        setFindedNews(undefined);
      }
    },
    []
  );

  return (
    <div className="search-form">
      <Form inline>
        <FormControl
          type="text"
          onChange={handleChange}
          placeholder="Search"
          className="mr-sm-2"
        />
      </Form>
      {findedNews !== undefined && (
        <div className="finded-news">
          {findedNews.map((news) => (
            <Link
              onClick={() => setFindedNews(undefined)}
              key={news._id}
              to={`/news/${news._id}`}
            >
              <div className="news-item py-3 px-2 d-flex">
                <div className="image">
                  <img src={news.photo} alt="news" className=" mr-2" />
                </div>
                <div className="news-item-title">
                  <h6>{news.title}</h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
