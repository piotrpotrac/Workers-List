import React, { useState } from "react";
import Card from "./Card";
import Slider from "rc-slider";
import Select from "react-select";
import { SELECT_SEARCH_OPTIONS } from "../data/SELECT_SEARCH_OPTIONS";
import styles from "../styles/SearchForm.module.css";
import "rc-slider/assets/index.css";

const SearchForm = ({
  searchName,
  searchDepartment,
  searchSalaryRange,
  searchCurrency,
}) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState([]);
  const [salary, setSalary] = useState(15000);
  const [currency, setCurrency] = useState("");

  const handleReset = () => {
    setName("");
    setDepartment([]);
    setSalary(15000);
    setCurrency("");
    searchName("");
    searchDepartment("");
    searchSalaryRange(15000);
    searchCurrency("");
  };

  return (
    <Card>
      <form className={styles.search_form}>
        <div className={styles.header}>Search a employee</div>
        <div className={styles.search_form_inputs}>
          <label>
            Employee Name
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                searchName(e.target.value);
                setName(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Department
            <Select
              isMulti
              isSearchable
              name="department"
              options={SELECT_SEARCH_OPTIONS}
              className={styles.multi_select}
              classNamePrefix={styles.select}
              placeholder="Choose department"
              value={department}
              onChange={(e) => {
                setDepartment(e);
                const searchDepartmentArr = Array.isArray(e)
                  ? e.map((item) => item.value)
                  : "";
                const searchDepartmentStr = searchDepartmentArr.join("");
                searchDepartment(searchDepartmentStr.toLowerCase());
              }}
            />
          </label>
          <label htmlFor="currency">
            Currency
            <div>
              <select
                name="currency"
                id="currency"
                className={styles.currency}
                value={currency}
                onChange={(event) => {
                  setCurrency(event.target.value);
                  searchCurrency(event.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PLN">PLN</option>
              </select>
            </div>
          </label>
        </div>
        <label className={styles.range}>
          Salary Amount
          <Slider
            defaultValue={15000}
            min={0}
            max={15000}
            step={50}
            value={salary}
            onChange={(value) => {
              setSalary(value);
              searchSalaryRange(value);
            }}
          />
        </label>

        <button type="button" className={styles.btn} onClick={handleReset}>
          Reset
        </button>
      </form>
    </Card>
  );
};

export default SearchForm;
