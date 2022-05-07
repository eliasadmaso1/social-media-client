import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/Routing/Routing";
import {

  AuthContextProvider,
} from "../src/Components/Context/Auth-context";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
