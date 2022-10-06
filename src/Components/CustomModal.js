import { Modal } from "@mui/material";
import React from "react";

function CustomModal({
  isModal,
  setIsModal,
  name,
  setName,
  phone,
  setPhone,
  timeSlot,
  save,
  startTime,
  endTime,
  selectedIndex,
}) {
  return (
    <Modal
      open={isModal}
      onClose={() => {
        setIsModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modal__design">
        <div className="modal__input-parent">
          <p className="modal__input-heading">Name</p>
          <input
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="modal__input-parent">
          <p className="modal__input-heading">Phone Number</p>
          <input
            placeholder="Phone Number"
            className="modal__input"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div>
          <p className="modal__input-heading"> Time Slot</p>
          <div className="mr__details-slot">
            <p className="mr__details-slotText">{timeSlot}</p>
          </div>
        </div>

        <div
          onClick={() => {
            let obj;
            if (selectedIndex !== null) {
              obj = {
                name: name,
                phone: phone,
                startTime: startTime,
                endTime: endTime,
                timeSlot: timeSlot,
                selectedIndex: selectedIndex,
              };
            } else {
              obj = {
                name: name,
                phone: phone,
                startTime: startTime,
                endTime: endTime,
                timeSlot: timeSlot,
              };
            }

            save(obj);
          }}
          className="modal__save-btn"
        >
          <p className="modal__save-text"> Save</p>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
