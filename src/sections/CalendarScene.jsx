import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters, seasons } from '../data/story.js';

const chapter = chapters[5];

export default function CalendarScene() {
  return (
    <SceneFrame id={chapter.id} className="calendar-scene">
      <div className="season-weather" aria-hidden="true" />
      <div className="scene-inner calendar-layout">
        <SectionHeading {...chapter} />
        <div className="calendar-wheel glass-panel" data-reveal-line>
          <div className="clock-face">
            <span />
            <b />
          </div>
          <div className="months">
            {seasons.map((season) => (
              <span key={season}>{season}</span>
            ))}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
