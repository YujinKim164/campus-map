import React from 'react';
import Modal from 'react-modal';

const YOLO_Modal = ({ show, handleClose }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="YOLO Detection Modal"
      style={{
        content: {
          top: '60%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '90vw',
          height: '80vh',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <button onClick={handleClose}>Close</button>
      <iframe
        src="/yolov5n_detection.html"
        style={{ width: '80%', height: '80%', border: 'none' }}
        title="Building Detection"
      />
    </Modal>
  );
};

export default YOLO_Modal;
