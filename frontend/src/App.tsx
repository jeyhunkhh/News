import "./App.scss";
import Home from "./Home";
import HeaderNav from "./Layout/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./Layout/Footer";
import NewsDetail from "./NewsDetails";
import NewsCatagory from "./NewsCategory";
import { Login } from "./Auth/components/Login";
import { Register } from "./Auth/components/Register";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { logout, verifyUserInfo } from "./Auth/actions";
import ReadList from "./ReadList/components";
import Covid from "./Covid/components";
import { NotFound } from "./not-found";

function App() {
  const dispatch = useDispatch();

  if (localStorage.token) {
    try {
      jwt.verify(localStorage.token, "verysecretkey");
      dispatch(verifyUserInfo());
    } catch (err) {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }

  const ProtectedRoute = ({ children, ...rest }: any) => {
    return localStorage.getItem("token") !== null ? (
      <Route {...rest}>{children}</Route>
    ) : (
      <Redirect to="/login" />
    );
  };
  return (
    <Router>
      <HeaderNav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/news/:id">
          <NewsDetail />
        </Route>
        <Route path="/news-catagory/:id">
          <NewsCatagory />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/covid">
          <Covid />
        </Route>
        <ProtectedRoute path="/read-list">
          <ReadList />
        </ProtectedRoute>
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
