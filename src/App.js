import { withRouter } from "react-router-dom";
import SessionProvider from "./components/session/SessionProvider";
import Routes from "./components/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <SessionProvider>
        <Routes />
      </SessionProvider>
      <ToastContainer />
    </>
  );
}

export default withRouter(App);
