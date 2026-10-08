import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CategoryPage from "./pages/CategoryPage";
import BoardPage from "./pages/BoardPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CategoryPage />} />
        <Route path="categories/:categoryId" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
