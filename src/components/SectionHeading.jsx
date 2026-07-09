export default function SectionHeading({ eyebrow, title, icon: Icon, date }) {
  return (
    <header className="section-heading">
      <div className="chapter-mark">
        {Icon ? <Icon aria-hidden="true" /> : null}
        <span>{eyebrow}</span>
      </div>
      {date ? <p className="chapter-date">{date}</p> : null}
      <h2 data-reveal-line>{title}</h2>
    </header>
  );
}
