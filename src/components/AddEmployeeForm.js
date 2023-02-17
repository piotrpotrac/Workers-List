import Card from "./Card";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import MultiSelect from "./MultiSelect";
import { SELECT_SEARCH_OPTIONS } from "../data/SELECT_SEARCH_OPTIONS";
import styles from "../styles/AddEmployeeForm.module.css";
import close from "../assets/close.png";

const AddEmployeeForm = ({ addEmployee, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      department: "",
      salary: "",
      currency: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .matches(
          /^[A-Za-z\u0104-\u017C\s-]+$/,
          "Name can only contain letters and spaces"
        )
        .min(2, "Name must be at least 2 characters long")
        .max(30, "Name can be at most 30 characters long"),
      surname: Yup.string()
        .required("Surname is required")
        .matches(
          /^[A-Za-z\u0104-\u017C\s-]+$/,
          "Surname can only contain letters, spaces, and hyphens"
        )
        .min(2, "Surname must be at least 2 characters long")
        .max(40, "Surname can be at most 40 characters long"),
      department: Yup.string().required("Add department"),
      salary: Yup.number()
        .typeError("Salary must be a number")
        .required("Salary is required")
        .min(0, "Salary must be at least 0")
        .max(30000, "Salary must be at most 30,000"),
      currency: Yup.string().required("Choose currency"),
    }),
    onSubmit: (values, { resetForm }) => {
      const updatedValues = {
        ...values,
        name:
          values.name.charAt(0).toUpperCase() +
          values.name.slice(1).toLowerCase(),
        surname:
          values.surname.charAt(0).toUpperCase() +
          values.surname.slice(1).toLowerCase(),
      };

      addEmployee(updatedValues);
      resetForm();
      onClose();
    },
  });
  return (
    <FormikProvider value={formik}>
      <Card>
        <div className={styles.close}>
          <img onClick={onClose} src={close} alt="Close" />
        </div>
        <form className={styles.add_emplyee} onSubmit={formik.handleSubmit}>
          <div className={styles.header}>Add a new employee</div>
          <label>
            Name
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className={styles.errorMsg}>{formik.errors.name}</p>
            ) : null}
          </label>
          <label>
            Surname
            <input
              name="surname"
              type="text"
              placeholder="Enter surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.surname && formik.errors.surname ? (
              <p className={styles.errorMsg}>{formik.errors.surname}</p>
            ) : null}
          </label>
          <label className={styles.multi_select}>
            Department
            <MultiSelect
              options={SELECT_SEARCH_OPTIONS}
              className={styles.multi_select}
              name="department"
              onBlur={() => formik.setFieldTouched("department", true)}
            />
            {formik.touched.department && formik.errors.department ? (
              <p className={styles.errorMsg}>{formik.errors.department}</p>
            ) : null}
          </label>
          <label>
            Salary Amount
            <div className={styles.input_salary}>
              <input
                name="salary"
                type="number"
                className={styles.salary}
                placeholder="Enter Amount"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <span className={styles.separator}></span>
              <select
                name="currency"
                className={styles.currency}
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PLN">PLN</option>
              </select>
            </div>
            <div className={styles.error_container}>
              {formik.touched.salary && formik.errors.salary ? (
                <p className={styles.errorMsg}>{formik.errors.salary}</p>
              ) : null}
              {formik.touched.currency && formik.errors.currency ? (
                <p className={styles.errorMsg_inline}>
                  {formik.errors.currency}
                </p>
              ) : null}
            </div>
          </label>
          <button type="submit" className={styles.btn}>
            Add
          </button>
        </form>
      </Card>
    </FormikProvider>
  );
};

export default AddEmployeeForm;
