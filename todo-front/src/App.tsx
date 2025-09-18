import { Route, Routes } from "react-router"
import { ROUTES } from "./lib/consts/routes"
import type RouteType from "./types/routes"

const App = () => {
  return (
    <>
      <Routes>
        {
          ROUTES.map(({id, name, path, element: Component}: RouteType) => (
            <Route key={`${id}-${name}`} path={path} element={<Component />} />
          ))
        }
      </Routes>
    </>
  )
}

export default App;
