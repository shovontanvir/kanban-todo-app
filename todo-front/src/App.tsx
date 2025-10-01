import { Route, Routes } from "react-router";
import { ROUTES } from "./lib/consts/routes.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {ROUTES.filter((route) => !route.isProtected).map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
      {ROUTES.filter((route) => !!route.isProtected).map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
};

export default App;
