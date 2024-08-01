import React, { useState } from 'react'
import Modal from 'react-responsive-modal'

const LoginModal = () => {
  let [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <Modal open={isOpen} onClose={closeModal}>
      Modal Content
    </Modal>
  )
}

export default LoginModal
