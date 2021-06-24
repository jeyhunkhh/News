import "./App.scss";
import Home from "./Home";
import HeaderNav from "./Layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Layout/Footer";
import NewsDetail from "./NewsDetails";
import NewsCatagory from "./NewsCategory";

function App() {
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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
