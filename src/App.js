import { useState } from "react";
import Section from "./components/Section";
import WorkersList from "./components/WorkersList";
import SearchForm from "./components/SearchForm";
import Modal from "./components/Modal";
import { DUMMY_WORKERS } from "./data/DUMMY_WORKERS.js";
import styles from "./App.module.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchSalaryRange, setSearchSalaryRange] = useState("");
  const [searchCurrency, setSearchCurrency] = useState("");
  const [employeeList, setEmployeeList] = useState(DUMMY_WORKERS);
  const [openModal, setOpenModal] = useState(false);

  if (employee !== "") {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };

    setEmployee("");
    setEmployeeList((prev) => prev.concat([newEmployee]));
  }

  return (
    <div className={styles.app}>
      <Modal
        addEmployee={setEmployee}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Section className={styles.forms}>
        <SearchForm
          searchName={setSearchName}
          searchDepartment={setSearchDepartment}
          searchSalaryRange={setSearchSalaryRange}
          searchCurrency={setSearchCurrency}
        />
      </Section>
      <Section className={styles.table}>
        <button className={styles.btn} onClick={() => setOpenModal(true)}>
          Add Employee
        </button>
        <WorkersList
          searchName={searchName}
          searchDepartment={searchDepartment}
          searchSalaryRange={searchSalaryRange}
          searchCurrency={searchCurrency}
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
        />
      </Section>
    </div>
  );
}

export default App;
