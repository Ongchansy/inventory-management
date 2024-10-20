"use client";
import MainButton from "@/components/dashboard/MainButton";
import useModal from "@/store/useModal";

const CategoryButtonClient = ({ title }: { title: string }) => {
  const { toggleModal } = useModal();

  return <MainButton title={title} toggle={() => toggleModal("category")} />;
};

export default CategoryButtonClient;
