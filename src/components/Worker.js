import close from "../assets/close.png";
import styles from "../styles/WorkersList.module.css";
const Worker = ({ person, content, setEmployeeList }) => {
  const deleteHandle = () => {
    setEmployeeList((prev) => prev.filter((item) => item.id !== person.id));
  };

  return (
    <tr>
      <td>{content.indexOf(person) + 1}</td>
      <td>{`${person.name} ${person.surname}`}</td>
      <td>{person.department}</td>
      <td>{`${person.salary} ${person.currency}`}</td>
      <td>
        <button className={styles.btn} onClick={deleteHandle}>
          <img src={close} alt="Close" />
        </button>
      </td>
    </tr>
  );
};

export default Worker;
