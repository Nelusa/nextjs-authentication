import styles from "./StartingPage.module.css";

const StartingPageContent = () => {
  // Show Link to Login page if NOT auth

  return (
    <section className={styles.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default StartingPageContent;
