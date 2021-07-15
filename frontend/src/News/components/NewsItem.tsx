import React, { useContext, useCallback } from "react";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { INews } from "../interface";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import UpdateNewsForm from "./UpdateNewsForm";
import { NewsFormContext } from "../context/NewsFormContext";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions";
import { IAppState } from "../../redux/interface";

const NewsItem: React.FC<{
  news: INews;
  isReadList: boolean;
  removeNewsFromReadList: (id: string) => void;
  addNewsfromReadList: (id: string) => void;
}> = ({ news, isReadList, removeNewsFromReadList, addNewsfromReadList }) => {
  const { handleDelete } = useContext(NewsFormContext);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.user);

  const handleDeleteAlert = useCallback(() => {
    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this subscription!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(news._id, push)?.then(() => {
          dispatch(getNews());
        });
        swal({
          icon: "success",
          title: "Thank you!",
          text: "Your subscription has been deleted!",
        });
      }
    });
  }, [dispatch, push, news._id, handleDelete]);

  const removeNewsFromReadListAlert = useCallback(() => {
    swal({
      title: "Are you sure to remove from read list?",
      icon: "warning",
      buttons: ["Cancel", "Remove"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeNewsFromReadList(news._id);
        swal({
          icon: "success",
          title: "Thank you!",
        });
      }
    });
  }, [removeNewsFromReadList, news._id]);

  const addNewsfromReadListAlert = useCallback(() => {
    addNewsfromReadList(news._id);
    return swal({
      title: "Congratulations!",
      text: "You have successfully added news your read list!",
      icon: "success",
    });
  }, [news._id, addNewsfromReadList]);

  return (
    <Card className="new-item">
      <Card.Img variant="top" src={news.photo} />
      <Card.Body>
        <Card.Title className="title">
          <Link to={`/news/${news._id}`}>{news.title}</Link>
        </Card.Title>
        <Card.Text className="time">
          <i className="far fa-calendar-alt"></i>{" "}
          {moment(news.createdAt).format("MMMM Do YYYY, h:mm")}
        </Card.Text>
        <Card.Footer
          className="text-muted p-0"
          style={user.status === "SUCCESS" ? { height: "40px" } : {}}
        >
          {user.data?.role === "Admin" && (
            <>
              <UpdateNewsForm newsId={news._id} />
              <Button
                variant="danger"
                onClick={handleDeleteAlert}
                className="ml-3"
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </>
          )}
          {user.status === "SUCCESS" &&
            (isReadList ? (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={`tooltip`}>Add Read List</Tooltip>}
              >
                <Button
                  variant="primary"
                  className="ml-3"
                  onClick={addNewsfromReadListAlert}
                >
                  <i className="far fa-bookmark"></i>{" "}
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={`tooltip`}>Remove Read List</Tooltip>}
              >
                <Button
                  variant="danger"
                  className="ml-3"
                  onClick={removeNewsFromReadListAlert}
                >
                  <i className="fas fa-bookmark"></i>{" "}
                </Button>
              </OverlayTrigger>
            ))}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
