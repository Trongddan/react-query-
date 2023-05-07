import { Spinner } from "@chakra-ui/react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Student from "./pages/student";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <BrowserRouter>
      {isFetching + isMutating !== 0 && (
        <Spinner
          color="red.600"
          size={"xl"}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Home />}
          children={[
            <Route path="student" element={<Student />} />,
            <Route path="dashboard" element={<Dashboard />} />,
          ]}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
