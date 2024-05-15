import Modal from "react-modal";

const PdfPreview = ({ setIsOpen, modalIsOpen, url }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={setIsOpen}
      contentLabel='Example Modal'
      style={{
        overlay: {
          backgroundColor: "rgba(3, 3, 3, 0.644)",
          zIndex: 80,
        },
        content: {
          position: "absolute",
          width: "80vw",
          maxWidth: "900px",
          height: "80vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 3, 3, 0)",
          border: "none",
        },
      }}>
      <div className='p-2 h-full w-full bg-black rounded-md'>
        <div className='flex justify-between text-sm item-center w-full'>
          <p className='p-1 text-end'>Document</p>
          <button onClick={setIsOpen} className='text-blue-700'>
            Close
          </button>
        </div>
        <object
          data={url}
          type='application/pdf'
          width='100%'
          height='90%'
          className='rounded'>
          <p className='p-1 rounded bg-gray-900 text-gray-600'>
            Unable to display PDF file. <a className="text-blue-700" href={url}>Download</a>{" "}
            instead.
          </p>
        </object>
      </div>
    </Modal>
  );
};

export default PdfPreview;
