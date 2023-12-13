import styles from "./page.module.css";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full h-48 flex-col items-center justify-between p-24">
      <div className="grid-cols-2 grid gap-8 h-full w-full">
        <div className="w-full">first</div>
        <div className={`w-full ${styles.brandImage}`} />
      </div>
    </div>
  );
}
