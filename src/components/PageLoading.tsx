import styles from "./styles/loading.module.css";

export default function PageLoading() {
  return (
    <div className="flex justify-center items-center grow w-full">
      <div>
        <svg
          viewBox="0 0 240 240"
          height="240"
          width="240"
          className={styles.pl}
        >
          <circle
            strokeLinecap="round"
            strokeDashoffset="-330"
            strokeDasharray="0 660"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="105"
            cy="120"
            cx="120"
            className={`${styles.pl__ring} ${styles.pl__ring__a}`}
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDashoffset="-110"
            strokeDasharray="0 220"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="35"
            cy="120"
            cx="120"
            className={`${styles.pl__ring} ${styles.pl__ring__b}`}
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDasharray="0 440"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="85"
            className={`${styles.pl__ring} ${styles.pl__ring__c}`}
          ></circle>
          <circle
            strokeLinecap="round"
            strokeDasharray="0 440"
            strokeWidth="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="155"
            className={`${styles.pl__ring} ${styles.pl__ring__d}`}
          ></circle>
        </svg>
      </div>
    </div>
  );
}
