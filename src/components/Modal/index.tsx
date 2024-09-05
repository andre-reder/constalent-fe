import { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalStyles } from './styles';

interface MyModalInterface {
  title: string;
  closeButtonLabel?: string;
  actionButtonLabel?: string;
  isActionButtonDisabled?: boolean;
  modalBody: ReactNode;
  onClose: () => void;
  onAction?: () => void;
  show: boolean;
  type?: 'info' | 'action' | 'deleteAction' | 'suspendAction' | 'activateAction' | 'decision';
  size?: 'sm' | 'lg' | 'xl';
  grid?: boolean;
  centeredBody?: boolean;
  minHeight?: string;
  overflow?: string;
  oneNegateAction?: () => void;
  isNegateActionDisabled?: boolean;
  negateActionLabel?: string;
}

export default function MyModal({
  title,
  closeButtonLabel,
  actionButtonLabel,
  isActionButtonDisabled,
  modalBody,
  onClose,
  onAction,
  show,
  type,
  size = 'lg',
  grid,
  centeredBody,
  minHeight,
  overflow,
  oneNegateAction,
  isNegateActionDisabled,
  negateActionLabel,
}: MyModalInterface) {
  return (
    <Modal
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalStyles centeredBody={centeredBody} minHeight={minHeight} overflow={overflow}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={grid ? 'show-grid' : ''}>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>{closeButtonLabel}</Button>
          {type === 'action' && (
            <Button onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'decision' && (
            <>
              <Button variant="danger" onClick={oneNegateAction} disabled={isNegateActionDisabled}>
                {negateActionLabel}
              </Button>
              <Button onClick={onAction} disabled={isActionButtonDisabled}>
                {actionButtonLabel}
              </Button>
            </>
          )}
          {type === 'deleteAction' && (
            <Button variant="danger" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'suspendAction' && (
            <Button variant="warning" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'activateAction' && (
            <Button variant="success" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
        </Modal.Footer>
      </ModalStyles>
    </Modal>
  );
}
