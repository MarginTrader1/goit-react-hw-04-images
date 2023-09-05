import { ModalWindow } from 'components/Modal/Modal';
import { useState } from 'react';

// импорт библиотеки для модального окна
import Modal from 'react-modal';

const customStyles = {
  // стили для оверлея
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  // стили для контента внутри модального окна
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

// функция для хука --> в аргумент передаем двойную деструктуризацию - объекта в объекте
export const ImageGalleryItem = ({
  oneImage: { webformatURL, user, largeImageURL },
}) => {
  // создаем хук
  const [isModalOpen, setIsMOdalOpen] = useState(false);

  // функции для хуков
  const openModal = () => setIsMOdalOpen(true);
  const closeModal = () => setIsMOdalOpen(false);

  return (
    <li>
      <img
        width={400}
        height={300}
        src={webformatURL}
        alt={user}
        onClick={openModal}
      />

      <ModalWindow
        largeImageURL={largeImageURL}
        modalStyle={customStyles}
        closeModal={closeModal}
        isOpen={isModalOpen}
        user={user}
      />
    </li>
  );
};
