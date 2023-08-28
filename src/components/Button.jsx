import styles from "./Button.module.css";

function Button({ children, onClick, type, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
