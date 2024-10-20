"use client";
import MainButton from "@/components/dashboard/MainButton";
import useModal from "@/store/useModal";

const ProductButtonClient = ({ title }: { title: string }) => {
  const { toggleModal } = useModal();

  return <MainButton title={title} toggle={() => toggleModal('product')} />;
};

export default ProductButtonClient;
