import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default function CreateModal({createModal, setCreateModal, status, mintToken}){
  return(
    <Modal isOpen={createModal} className="create-modal">
    {status === 'Asking to Mint' && (
        <>
            <ModalHeader style={{display: (status === 'Asking to Mint') ? 'flex' : 'none'}} toggle={() => setCreateModal(!createModal)}>Mint NFT</ModalHeader>
            <ModalBody>
                {status === 'Asking to Mint' ? (
                    'Do you want to mint your NFT'
                ) : (
                    <>
                        <div className="create-loader"></div>
                        <h4>Status: {status}</h4>
                        <p>Dont close the window until the project is created!</p>                        
                    </>
                )}
            </ModalBody>
            <ModalFooter style={{display: (status === 'Asking to Mint') ? 'flex' : 'none'}}>
                <Button type="button" className="btn btn-primary" onClick={() => mintToken()}>Mint Now</Button>
                <Button onClick={() => setCreateModal(false)} type="button" className="btn btn-secondary">Close</Button>
            </ModalFooter>
        </>
    )}
  </Modal>
  );
}