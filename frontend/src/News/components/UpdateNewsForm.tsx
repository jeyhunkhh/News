import React, { useCallback, useContext, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ICatogory } from "../../Layout/Navbar/interface";
import { categoriesService } from "../../NewsCategory/service";
import { NewsFormContext } from "../context/NewsFormContext";
import { INewsForm } from "../interface";
import { newsService } from "../service";

const UpdateNewsForm: React.FC<{ newsId: string }> = ({ newsId }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<ICatogory[]>();
  const [photoPrew, setPhotoPrew] = useState(null);
  const [formState, setFormState] = useState<INewsForm>({
    title: "",
    content: "",
    categoryId: "",
    photo: "",
    isSlider: false,
  });
  const { push } = useHistory();

  const { handleUpdateSubmit } = useContext(NewsFormContext);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleShow = useCallback(() => {
    setShow(true);
    categoriesService.getCategories().then(({ data }) => setCategory(data));
    newsService.getNewsById(newsId).then(({ data }) => {
      setFormState({
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        photo: data.photo,
        isSlider: data.isSlider,
      });
    });
  }, [newsId]);

  const handleFormChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = evt.target;
      setFormState((data) => ({
        ...data,
        [name]: value,
      }));
    },
    [setFormState]
  );

  const onPhotoChange = useCallback(
    (e) => {
      setFormState({ ...formState, photo: e.target.files[0] });
      setPhotoPrew(e.target.files[0]);
    },
    [formState]
  );

  const addedFormData = useMemo(() => {
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("content", formState.content);
    formData.append("categoryId", formState.categoryId);
    formData.append("isSlider", formState.isSlider.toString());
    formData.append("photo", formState.photo);
    return formData;
  }, [formState]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      handleUpdateSubmit(e, addedFormData, push, newsId);
      handleClose();
    },
    [handleClose, handleUpdateSubmit, addedFormData, push, newsId]
  );

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <i className="far fa-edit"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formState.title}
                required
                onChange={handleFormChange}
                placeholder="Enter news title"
              />
            </Form.Group>
            <Form.Group controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                required
                value={formState.content}
                onChange={handleFormChange}
                placeholder="Enter news content"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={formState.categoryId}
                required
                onChange={handleFormChange}
              >
                {category?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.File
                id="custom-file"
                name="mediaUrl"
                onChange={onPhotoChange}
                label="Custom file input"
                custom
              />
            </Form.Group>
            <div className="w-50 mb-3">
              {photoPrew !== null && (
                <img
                  src={URL.createObjectURL(photoPrew)}
                  alt="Preview"
                  className="img-fluid mt-4"
                />
              )}
            </div>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                onClick={() =>
                  setFormState({ ...formState, isSlider: !formState.isSlider })
                }
                checked={formState.isSlider}
                type="checkbox"
                label="Is Slider"
              />
            </Form.Group>
            <Button
              type="button"
              variant="secondary"
              className="mr-3"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateNewsForm;
