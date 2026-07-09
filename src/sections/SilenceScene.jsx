import { FiRefreshCw } from 'react-icons/fi';
import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[4];

export default function SilenceScene() {
  return (
    <SceneFrame id={chapter.id} className="silence-scene">
      <div className="rain-layer" aria-hidden="true" />
      <div className="scene-inner phone-layout">
        <div className="profile-card glass-panel" data-reveal-line>
          <div className="profile-header">
            <div className="avatar-ring" />
            <div>
              <strong>online кеше</strong>
              <span>жаңа хабарлама жоқ</span>
            </div>
          </div>
          <div className="profile-grid">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="refresh-line">
            <FiRefreshCw />
            <span>refreshing...</span>
          </div>
        </div>
        <div>
          <SectionHeading {...chapter} />
          <p data-reveal-line>
            Кейде ең ауыр жауап — ешқандай жауаптың келмеуі. Экран жарық болады, бірақ ішіңдегі қала қараңғыланады.
          </p>
        </div>
      </div>
    </SceneFrame>
  );
}
