import React from 'react';
import { Modal, Button } from 'antd';

interface ModalProps {
    visible: boolean;
    title: string;
    content: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ visible, title, content, onClose, onConfirm }) => {
    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                onConfirm && (
                    <Button key="confirm" type="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                ),
            ]}
        >
            {content}
        </Modal>
    );
};

export default CustomModal;</Modal>
