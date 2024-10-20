"use client";
import MainButton from "@/components/dashboard/MainButton";
import useModal from "@/store/useModal";

const SupplierButtonClient = ({ title }: { title: string }) => {
  const { toggleModal } = useModal();

  return <MainButton title={title} toggle={() => toggleModal('supplier')} />;
};

export default SupplierButtonClient;
