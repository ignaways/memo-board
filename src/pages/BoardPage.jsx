import { useParams } from "react-router-dom";
import CategoryBoard from "../components/board/CategoryBoard";
import NotFoundPage from "./NotFoundPage";
import useMemoStore from "../hooks/useMemoStore";

export default function BoardPage() {
  const { categoryId } = useParams();
  const { getCategory } = useMemoStore();
  const category = getCategory(categoryId);

  if (!category) return <NotFoundPage message="Kategori yang kamu cari tidak ditemukan." />;

  return <CategoryBoard key={category.id} category={category} />;
}
