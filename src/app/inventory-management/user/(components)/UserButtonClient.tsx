"use client";
import MainButton from "@/components/dashboard/MainButton";
import useModal from "@/store/useModal";

const UserButtonClient = ({ title }: { title: string }) => {
  const { toggleModal } = useModal();

  return <MainButton title={title} toggle={() => toggleModal('user')} />;
};

export default UserButtonClient;
