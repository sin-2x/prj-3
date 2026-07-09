import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { bookStories } from '../data/bookText.js';
import { trackTelegramEvent } from '../utils/tracking.js';

const linesPerPage = 6;
const shortLineLimit = 42;
const dayHeadingPattern = /^((I|V|X)+\s+тарау\..*|\d{1,2}\s+[А-Яа-яӘәІіҢңҒғҮүҰұҚқӨөҺһ]+|5–6–7\s+мамыр)$/;

function normalizeLines(lines) {
  const normalized = [];

  lines.forEach((line) => {
    const previous = normalized[normalized.length - 1];
    const isDivider = line.includes('________________________________________');
    const isHeading = !line.endsWith('.') && line.length < 28;
    const canJoin =
      previous &&
      !isDivider &&
      !isHeading &&
      !previous.includes('________________________________________') &&
      previous.length < shortLineLimit;

    if (canJoin) {
      normalized[normalized.length - 1] = `${previous} ${line}`;
      return;
    }

    normalized.push(line);
  });

  return normalized;
}

function buildPages() {
  return bookStories.flatMap((story) => {
    const lines = story.rawText.split('\n').filter((line) => line.trim().length > 0);
    const title = lines[0];
    const content = normalizeLines(lines.slice(1));
    const textPages = [];
    let currentPage = [];

    content.forEach((line) => {
      const startsNewDay = dayHeadingPattern.test(line);

      if ((startsNewDay && currentPage.length > 0) || currentPage.length >= linesPerPage) {
        textPages.push({
          id: `${story.id}-text-${textPages.length}`,
          type: 'text',
          chapter: story.chapter,
          date: story.date,
          lines: currentPage,
        });
        currentPage = [];
      }

      currentPage.push(line);
    });

    if (currentPage.length > 0) {
      textPages.push({
        id: `${story.id}-text-${textPages.length}`,
        type: 'text',
        chapter: story.chapter,
        date: story.date,
        lines: currentPage,
      });
    }

    return [
      {
        id: `${story.id}-cover`,
        type: 'chapter',
        chapter: story.chapter,
        date: story.date,
        title,
      },
      ...textPages,
    ];
  });
}

function PageContent({ page }) {
  if (!page) return <div className="book-blank" />;

  if (page.type === 'chapter') {
    return (
      <div className="book-chapter-page">
        <span>{page.chapter}</span>
        <h2>{page.title}</h2>
        <p>{page.date}</p>
      </div>
    );
  }

  return (
    <div className="book-reading-page">
      <span>{page.date}</span>
      {page.lines.map((line, index) => {
        if (line.includes('________________________________________')) {
          return <hr key={`${line}-${index}`} />;
        }

        const isSubheading = index === 0 && !line.endsWith('.') && line.length < 28;
        return isSubheading ? <h3 key={`${line}-${index}`}>{line}</h3> : <p key={`${line}-${index}`}>{line}</p>;
      })}
    </div>
  );
}

export default function InteractiveBook() {
  const pages = useMemo(() => buildPages(), []);
  const hasTrackedSiteOpen = useRef(false);
  const openingTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const canGoBack = pageIndex > 0;
  const canGoNext = pageIndex < pages.length - 1;

  useEffect(() => {
    if (hasTrackedSiteOpen.current) return undefined;

    hasTrackedSiteOpen.current = true;
    trackTelegramEvent('site_open', {
      page: `1 / ${pages.length}`,
    });

    return () => {
      window.clearTimeout(openingTimerRef.current);
    };
  }, [pages.length]);

  const openBook = () => {
    setIsOpening(true);
    trackTelegramEvent('book_open', {
      page: `${pageIndex + 1} / ${pages.length}`,
    });
    openingTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 900);
  };

  const goToPage = (nextIndex, source = 'page') => {
    if (nextIndex < 0 || nextIndex >= pages.length || nextIndex === pageIndex) return;
    const isNext = nextIndex > pageIndex;
    setDirection(isNext ? 1 : -1);
    setPageIndex(nextIndex);
    trackTelegramEvent(isNext ? 'page_next' : 'page_previous', {
      action: isNext ? 'next' : 'previous',
      source,
      page: `${nextIndex + 1} / ${pages.length}`,
      fromPage: pageIndex + 1,
      toPage: nextIndex + 1,
    });
  };

  const visiblePages = [-1, 0, 1].map((offset) => {
    const index = pageIndex + offset;
    return {
      offset,
      index,
      page: index >= 0 && index < pages.length ? pages[index] : null,
    };
  });

  return (
    <main className="book-room" aria-live="polite">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.section
            key="closed-book"
            className={`closed-book-stage ${isOpening ? 'is-opening' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="closed-book"
              initial={{ rotateX: 12, y: 28 }}
              animate={{ rotateX: 0, y: 0 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="book-cover-lines" />
              <div className="cover-butterfly cover-butterfly-a" />
              <div className="cover-butterfly cover-butterfly-b" />
              <span>естелік кітабы</span>
              <h1>Тәтті мұң</h1>
            </motion.div>
            <button type="button" className="open-book-button" onClick={openBook} disabled={isOpening}>
              {isOpening ? 'Ашылып жатыр...' : 'Кітапты ашу'}
            </button>
          </motion.section>
        ) : (
          <motion.section
            key="book-carousel"
            className="book-carousel-stage"
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="book-carousel" data-direction={direction}>
              {visiblePages.map(({ page, index, offset }) =>
                page ? (
                  <motion.article
                    key={page.id}
                    className={`carousel-page carousel-page-${offset === 0 ? 'active' : offset < 0 ? 'prev' : 'next'}`}
                    initial={{
                      x: `${offset * 82}%`,
                      scale: offset === 0 ? 1 : 0.86,
                      opacity: offset === 0 ? 1 : 0.48,
                      rotate: offset * -2,
                    }}
                    animate={{
                      x: `${offset * 82}%`,
                      scale: offset === 0 ? 1 : 0.86,
                      opacity: offset === 0 ? 1 : 0.48,
                      rotate: offset * -2,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.82,
                      x: `${(offset - direction) * 92}%`,
                    }}
                    transition={{ duration: 0.62, ease: [0.19, 1, 0.22, 1] }}
                    onClick={() => offset !== 0 && goToPage(index, 'carousel_page')}
                  >
                    <div className="page-butterfly page-butterfly-a" />
                    <PageContent page={page} />
                    <small>{String(index + 1).padStart(2, '0')}</small>
                  </motion.article>
                ) : null,
              )}
            </div>

            <nav className="book-nav carousel-nav" aria-label="Book pages">
              <button type="button" onClick={() => goToPage(pageIndex - 1, 'previous_button')} disabled={!canGoBack}>
                <FiChevronLeft />
                <span>Алдыңғы бет</span>
              </button>
              <strong>
                {String(pageIndex + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
              </strong>
              <button type="button" onClick={() => goToPage(pageIndex + 1, 'next_button')} disabled={!canGoNext}>
                <span>Келесі бет</span>
                <FiChevronRight />
              </button>
            </nav>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
