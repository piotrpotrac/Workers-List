import styles from "../styles/Section.module.css";

const Section = (props) => {
  return (
    <section
      className={props.className ? `${props.className}` : `${styles.section}`}
    >
      {props.children}
    </section>
  );
};

export default Section;
