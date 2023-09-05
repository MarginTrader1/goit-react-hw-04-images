import { Component } from 'react';
import { ModalWindow } from 'components/Modal/Modal';

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

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, user, largeImageURL } = this.props.oneImage;

    return (
      <li>
        <img
          width={400}
          height={300}
          src={webformatURL}
          alt={user}
          onClick={this.openModal}
        />

        <ModalWindow
          largeImageURL={largeImageURL}
          modalStyle={customStyles}
          closeModal={this.closeModal}
          isOpen={this.state.isModalOpen}
          user={user}
        />
      </li>
    );
  }
}
