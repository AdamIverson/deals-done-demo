import styles from "./page.module.css";
import Demo from "./components/Demo"
export default function Home() {
  return (
   <div className={styles.main}>
    <Demo />
   </div>
  )
}
