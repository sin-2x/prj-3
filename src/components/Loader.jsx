import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ progress, isDone }) {
  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="loader-stars" />
          <motion.div
            className="loader-heart"
            animate={{ scale: [1, 1.16, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="loader-copy">
            <span>естелік оянып жатыр</span>
            <strong>{progress}%</strong>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
