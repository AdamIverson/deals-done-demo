import styles from "./page.module.css";
import Demo from "./components/Demo"
import TwoDemo from "./components/TwoDemo"

export default function Home() {
  return (
   <div className={styles.main}>
    {/* <Demo /> */}
    <TwoDemo />
   </div>
  )
}
