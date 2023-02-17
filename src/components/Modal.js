import AddEmployeeForm from "./AddEmployeeForm";
import styles from "../styles/Modal.module.css";

const Modal = ({ addEmployee, open, onClose }) => {
  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <AddEmployeeForm
          addEmployee={addEmployee}
          onClose={onClose}
          className={styles.card}
        />
      </div>
    </div>
  );
};

export default Modal;
