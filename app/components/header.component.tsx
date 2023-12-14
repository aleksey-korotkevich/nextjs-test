import styles from "./header.component.module.css";
import Image from "next/image";

import { signOut } from "@/auth";

export default async function Header() {
  return (
    <header className={`flex justify-between p-3 ${styles.header}`}>
      <div>
        <Image
          src="/next.svg"
          width={394}
          height={80}
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </header>
  );
}
