import "./index.scss";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { IAppState } from "../../redux/interface";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { logout } from "../../Auth/actions";
import { categoriesService } from "../../NewsCategory/service";
import { ICatogory } from "./interface";

const HeaderNav = () => {
  const user = useSelector((state: IAppState) => state.user);
  const [linkPath, setLinkPath] = useState<ICatogory[]>();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    push("/login");
  }, [push, dispatch]);

  useEffect(() => {
    categoriesService.getCategories().then(({ data }) => setLinkPath(data));
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="mr-5" href="#home">
          <Link to="/" className="nav-item">
            <h2>Web_News</h2>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-item nav-link" to="/">
              Home
            </Link>
            {linkPath?.length !== undefined &&
              linkPath.map((item) => (
                <Link
                  className="nav-item nav-link"
                  key={item._id}
                  to={`/news-catagory/${item._id}`}
                >
                  {item.name}
                </Link>
              ))}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          {user.data !== null ? (
            <>
              <h5 className="nav-item mx-3 mb-0">{user.data.fullname}</h5>
              <Button
                onClick={handleLogout}
                className="nav-item"
                variant="secondary"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link className="nav-item btn btn-secondary" to="/login">
              Login
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
