import React, { useEffect } from 'react'
import Modal from 'react-modal'

const ActionModal = props => {
  const { text, action, isOpen, toggleModal } = props

  /* backdrop-filter: blur(2px); */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#272B2F',
      border: 'none',
      maxWidth: '1200px',
      width: '90%',
    },
  }
  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])

  const handleCancel = () => {
    toggleModal()
  }

  const handleAction = () => {
    action()
    toggleModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName="Overlay action-modal"
    >
      <div className="action-modal__content">
        <h3 className="action-modal__header">{text}</h3>
        <div className="action-modal__buttons">
          <button className="cancel-button" onClick={handleCancel}>
            Stay
          </button>
          <button className="delete-post-btn" onClick={handleAction}>
            Leave
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ActionModal
