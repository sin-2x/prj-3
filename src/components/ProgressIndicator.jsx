export default function ProgressIndicator({ progress }) {
  return (
    <div className="progress-shell" aria-label={`Page progress ${Math.round(progress * 100)} percent`}>
      <div className="progress-track">
        <div className="progress-fill" />
      </div>
    </div>
  );
}
