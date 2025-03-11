import React from "react";
import { MdPushPin } from "react-icons/md";

const EditPinModal = ({ handleUpdate, handlePinUpdate }) => {
  return (
    <MdPushPin
      size={20}
      cursor="pointer"
      onClick={() => {
        handleUpdate(); // Ensure functions are called
        handlePinUpdate();
      }}
    />
  );
};

export default EditPinModal;
