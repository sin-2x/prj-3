export default function Ambience() {
  return (
    <div className="ambience" aria-hidden="true">
      <div className="mouse-glow" />
      <div className="particle-field particle-field-a">
        {Array.from({ length: 34 }).map((_, index) => (
          <i key={`a-${index}`} />
        ))}
      </div>
      <div className="particle-field particle-field-b">
        {Array.from({ length: 20 }).map((_, index) => (
          <i key={`b-${index}`} />
        ))}
      </div>
      <div className="floating-light floating-light-one" />
      <div className="floating-light floating-light-two" />
    </div>
  );
}
