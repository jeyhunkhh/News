import "./index.scss";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";

const HeaderNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="mr-5" href="#home">
          <h2>Web_News</h2>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNav;
