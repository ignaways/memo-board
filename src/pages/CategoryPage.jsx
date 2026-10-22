import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import CategoryList from "../components/category/CategoryList";
import CategoryModal from "../components/category/CategoryModal";
import Button from "../components/ui/Button";
import { PlusIcon } from "../components/ui/Icons";
import useMemoStore from "../hooks/useMemoStore";

export default function CategoryPage() {
  const { categories, taskCountByCategory, addCategory } = useMemoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Category"
        subtitle="Create or select category"
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusIcon />
            Add Category
          </Button>
        }
      />

      <div className="mt-6">
        <CategoryList categories={categories} taskCountByCategory={taskCountByCategory} />
      </div>

      <CategoryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addCategory} />
    </>
  );
}
