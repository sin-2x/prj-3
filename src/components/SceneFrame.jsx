import { motion } from 'framer-motion';

export default function SceneFrame({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      data-cinema-section
      className={`scene ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="scene-vignette" />
      {children}
    </motion.section>
  );
}
