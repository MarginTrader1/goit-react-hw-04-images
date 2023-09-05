// импорт библиотеки для модального окна
import Modal from 'react-modal';

// копмонент для модалки
export const ModalWindow = ({
  largeImageURL,
  modalStyle,
  closeModal,
  isOpen,
  user,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>
      <img src={largeImageURL} alt={user} />
    </Modal>
  );
};
