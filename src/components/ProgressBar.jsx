export default function ProgressBar({ value, max, label }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="progress-wrapper">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="progress-text">{value}/{max}</span>
    </div>
  );
}
