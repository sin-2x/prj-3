import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import HeartSvg from '../components/HeartSvg.jsx';

function SceneVisual({ type }) {
  return (
    <div className={`diary-visual immersive-visual visual-${type}`} aria-hidden="true">
      <div className="visual-sky" />
      <div className="visual-sun" />
      <div className="visual-moon" />
      <div className="visual-rain" />
      <div className="visual-cloud visual-cloud-a" />
      <div className="visual-cloud visual-cloud-b" />
      <div className="visual-road">
        <span />
      </div>
      <div className="visual-bus">
        <i />
        <i />
        <i />
      </div>
      <div className="visual-person visual-person-left" />
      <div className="visual-person visual-person-right" />
      <div className="visual-phone">
        <span />
        <b />
      </div>
      <div className="visual-redcoat" />
      <div className="visual-calendar">
        <span>7:40</span>
        <strong>№10</strong>
      </div>
      <HeartSvg className="visual-heart" />
    </div>
  );
}

export default function DiaryStory({ story, index, total }) {
  const bookLines = story.rawText
    ? story.rawText.split('\n').filter((line) => line.trim().length > 0)
    : [];
  const headingLines = new Set([
    '21 сәуір',
    '22 сәуір',
    '26 сәуір',
    '28 сәуір',
    '30 сәуір',
    '1 мамыр',
    '5 мамыр',
    '5–6–7 мамыр',
    '28 мамыр',
    '15 маусым',
  ]);

  const contentLines = bookLines.slice(1);
  const pages = [
    { type: 'cover', lines: [bookLines[0]] },
    ...Array.from({ length: Math.ceil(contentLines.length / 6) }, (_, pageIndex) => ({
      type: 'text',
      lines: contentLines.slice(pageIndex * 6, pageIndex * 6 + 6),
    })),
  ];

  const scrollToPage = (pageIndex) => {
    const isLastStoryPage = pageIndex >= pages.length - 1;
    const targetId = isLastStoryPage
      ? index + 1 < total
        ? `story-${index + 1}`
        : 'final-letter'
      : `story-${index}-page-${pageIndex + 1}`;

    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Fragment>
      {pages.map((page, pageIndex) => {
        const sectionId = pageIndex === 0 ? `story-${index}` : `story-${index}-page-${pageIndex}`;

        return (
          <section
            id={sectionId}
            key={sectionId}
            data-cinema-section
            className={`book-screen weather-${story.weather}`}
            aria-labelledby={`${story.id}-${pageIndex}`}
          >
            <SceneVisual type={story.visual} />
            <div className="book-weather" />
            <motion.article
              className={`paper-page ${page.type === 'cover' ? 'paper-cover' : ''}`}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="page-count">
                {String(pageIndex + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
              </span>

              {page.type === 'cover' ? (
                <>
                  <span className="book-kicker">{story.chapter}</span>
                  <h2 id={`${story.id}-${pageIndex}`}>{page.lines[0]}</h2>
                  <p>{story.date}</p>
                </>
              ) : (
                <div className="paper-text" id={`${story.id}-${pageIndex}`}>
                  {page.lines.map((line, lineIndex) => {
                    const isDivider = line.includes('________________________________________');
                    const isHeading = headingLines.has(line) || line.includes('тарау.');

                    if (isDivider) {
                      return <hr key={`${line}-${lineIndex}`} />;
                    }

                    if (isHeading) {
                      return <h3 key={`${line}-${lineIndex}`}>{line}</h3>;
                    }

                    return <p key={`${line}-${lineIndex}`}>{line}</p>;
                  })}
                </div>
              )}

              <button type="button" className="page-next" onClick={() => scrollToPage(pageIndex)}>
                <span>{pageIndex >= pages.length - 1 ? story.nextLabel : 'Келесі бет'}</span>
                <FiArrowRight />
              </button>
            </motion.article>
          </section>
        );
      })}
    </Fragment>
  );
}
