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
import { useCallback } from "react";
import { logout } from "../../Auth/actions";

const HeaderNav = () => {
  const user = useSelector((state: IAppState) => state.user);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    push("/login");
  }, [push, dispatch]);

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
            <Nav.Link className="nav-item" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="nav-item" href="#link">
              Politics
            </Nav.Link>
            <Nav.Link className="nav-item" href="#home1">
              Sport
            </Nav.Link>
            <Nav.Link className="nav-item" href="#link1">
              World
            </Nav.Link>
            <Nav.Link className="nav-item" href="#link1">
              Business
            </Nav.Link>
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
