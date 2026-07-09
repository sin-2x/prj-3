import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText.jsx';
import HeartSvg from '../components/HeartSvg.jsx';
import ScrollCue from '../components/ScrollCue.jsx';

export default function Hero() {
  const startStory = () => {
    document.getElementById('story-0')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero scene" aria-labelledby="hero-title">
      <div className="hero-stars" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <HeartSvg />
      </div>
      <div className="hero-content">
        <h1 id="hero-title">
          <AnimatedText text="Бұл жай ғана хат емес..." />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.4, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        >
          Бұл — менің саған айта алмаған әңгімем.
        </motion.p>
        <motion.button
          type="button"
          className="story-button"
          onClick={startStory}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.1, duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          Бірінші күннен бастау
        </motion.button>
      </div>
      <ScrollCue />
    </section>
  );
}
