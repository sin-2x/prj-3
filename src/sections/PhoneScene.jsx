import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import HeartSvg from '../components/HeartSvg.jsx';
import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[2];

export default function PhoneScene() {
  return (
    <SceneFrame id={chapter.id} className="phone-scene">
      <div className="scene-inner phone-layout">
        <div>
          <SectionHeading {...chapter} />
          <p data-reveal-line>
            Жазып, өшіріп, қайта жазған сөздердің ішінде ең шынайысы бір ғана еді: мен сені ойладым.
          </p>
        </div>
        <motion.div
          className="phone-mockup glass-panel"
          initial={{ rotate: -3, y: 80, opacity: 0 }}
          whileInView={{ rotate: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="phone-notch" />
          <div className="chat-window">
            <span className="message received">Сәлем...</span>
            <span className="typing-line">Мен саған бір нәрсе айтқым келеді</span>
            <span className="typing-line deleting">қалай бастарымды білмеймін</span>
            <span className="message sent">Сені сағындым</span>
          </div>
          <button type="button" className="send-button" aria-label="Message sent">
            <FiSend />
          </button>
          <HeartSvg className="phone-heart" />
        </motion.div>
      </div>
    </SceneFrame>
  );
}
