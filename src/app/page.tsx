import styles from "./page.module.css";
import Demo from "./components/Demo"
import TwoDemo from "./components/TwoDemo"
import ThreeDemo from "./components/ThreeDemo"

export default function Home() {
  return (
   <div className={styles.main}>
    {/* <Demo /> */}
    {/* <TwoDemo /> */}
    <ThreeDemo />
   </div>
  )
}
