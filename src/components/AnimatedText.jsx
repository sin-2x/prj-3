import { motion } from 'framer-motion';

const sentence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: '0.65em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
  },
};

export default function AnimatedText({ text, className = '', delay = 0 }) {
  return (
    <motion.span
      className={`letter-wrap ${className}`}
      variants={sentence}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
      transition={{ delay }}
      aria-label={text}
    >
      {Array.from(text).map((char, index) => (
        <motion.span key={`${char}-${index}`} aria-hidden="true" variants={letter}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
