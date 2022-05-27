import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [request, setRequest] = useState({
    payload: {},
    time: 0,
  });

  return (
    <div className="App">
      <Outlet context={[request, setRequest]} />
    </div>
  );
}

export default App;
