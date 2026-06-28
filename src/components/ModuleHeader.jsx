export default function ModuleHeader({ title, subtitle, onBack }) {
  return (
    <div className="module-header">
      {onBack && (
        <button className="btn-back" onClick={onBack}>
          ← Retour
        </button>
      )}
      <div className="module-title-area">
        <h2>{title}</h2>
        {subtitle && <span className="module-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
}
