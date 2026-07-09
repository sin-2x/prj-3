import HeartSvg from '../components/HeartSvg.jsx';
import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { achievements, chapters } from '../data/story.js';

const chapter = chapters[6];

export default function RealizationScene() {
  return (
    <SceneFrame id={chapter.id} className="realization-scene">
      <div className="scene-inner centered-story">
        <SectionHeading {...chapter} />
        <div className="achievement-cloud" aria-hidden="true">
          {achievements.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <HeartSvg className="realization-heart" />
        <p className="large-quote" data-reveal-line>
          Сезім ақылға бағынбайды екен.
        </p>
      </div>
    </SceneFrame>
  );
}
