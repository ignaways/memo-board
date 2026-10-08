export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
