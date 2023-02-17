import styles from "../styles/WorkersList.module.css";
import Card from "./Card";
import Worker from "./Worker";

const WorkersList = ({
  employeeList,
  searchName,
  searchDepartment,
  searchSalaryRange,
  searchCurrency,
  setEmployeeList,
}) => {
  const content = employeeList
    .filter((item) => {
      const name = `${item.name.toLowerCase()} ${item.surname.toLowerCase()}`;
      if (searchName.trim().toLowerCase() !== "") {
        return name.includes(searchName.trim().toLowerCase());
      }
      return item;
    })
    .filter((item) => {
      if (searchDepartment !== "") {
        return searchDepartment.includes(item.department.toLowerCase());
      }
      return item;
    })
    .filter((item) => {
      if (searchSalaryRange !== "") {
        return item.salary <= searchSalaryRange;
      }
      return item;
    })
    .filter((item) => {
      if (searchCurrency !== "") {
        return item.currency === searchCurrency;
      }
      return item;
    });

  const result = content.map((person) => {
    return (
      <Worker
        key={person.id}
        setEmployeeList={setEmployeeList}
        person={person}
        content={content}
      />
    );
  });

  const sumCurrency = (objects, curr) => {
    const sum = objects
      .filter((obj) => obj.currency === curr)
      .reduce((acc, obj) => acc + obj.salary, 0);

    return sum;
  };
  const numbEmployees = (department) => {
    const userArr = content.filter((item) => item.department === department);
    const numb = userArr.length;

    return numb;
  };

  const sumUsd = sumCurrency(content, "USD");
  const sumEur = sumCurrency(content, "EUR");
  const sumPln = sumCurrency(content, "PLN");

  const numbIt = numbEmployees("IT");
  const numbSales = numbEmployees("Sales");
  const numbAdmin = numbEmployees("Administration");
  const numbHr = numbEmployees("HR");

  const summary = (
    <tfoot className={styles.footer}>
      <tr>
        <th>Summary:</th>
      </tr>
      <tr>
        <td>Salary</td>
        <td>{`${sumUsd} $`}</td>
        <td>{`${sumEur} €`}</td>
        <td>{`${sumPln} PLN`}</td>
      </tr>
      <tr className={styles.numbEmpl}>
        <td>Employees</td>
        <td>{`IT: ${numbIt}`}</td>
        <td>{`Sales: ${numbSales}`}</td>
        <td>{`Admin: ${numbAdmin}`}</td>
        <td>{`HR: ${numbHr}`}</td>
      </tr>
    </tfoot>
  );

  return (
    <Card>
      <table>
        <thead>
          <tr>
            <th>List of employee</th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {content.length !== 0 ? (
            result
          ) : (
            <tr style={{ justifyContent: "center", fontWeight: "600" }}>
              <td style={{ flexBasis: "20rem", textAlign: "center" }}>
                No search results found...
              </td>
            </tr>
          )}
        </tbody>
        {content.length !== 0 ? summary : ""}
      </table>
    </Card>
  );
};

export default WorkersList;
