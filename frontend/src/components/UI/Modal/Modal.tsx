import Backdrop from '../Backdrop/Backdrop.tsx';

interface Props extends React.PropsWithChildren{
  show: boolean;
  closeModal: () => void;
  defaultModalBtn?: boolean;
}

const Modal: React.FC<Props> = ({show, children, closeModal}) => {

  return (
    <>
      <Backdrop show={show} onClick={closeModal}/>
      <div className="modal show" style={{display: show ? 'block' : 'none', width: "90%", height: "90%", position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >
        <div className="modal-dialog " style={{maxWidth: "auto", height: "90%"}}>
          <div className="modal-content w-100 m-0 p-1"  style={{maxWidth: "100%", height: "100%"}} >
              {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
