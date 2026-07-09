import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[1];

export default function WalkingScene() {
  return (
    <SceneFrame id={chapter.id} className="walking-scene">
      <div className="clouds clouds-back" data-depth />
      <div className="clouds clouds-front" data-depth />
      <div className="road-world" data-road>
        <div className="road-line" />
        <div className="walker">
          <span />
        </div>
      </div>
      <div className="scene-inner centered-story">
        <SectionHeading {...chapter} />
        <p className="large-quote" data-reveal-line>
          {chapter.quote}
        </p>
      </div>
    </SceneFrame>
  );
}
