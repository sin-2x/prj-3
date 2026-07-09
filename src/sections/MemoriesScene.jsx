import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters, memories } from '../data/story.js';

const chapter = chapters[3];

export default function MemoriesScene() {
  return (
    <SceneFrame id={chapter.id} className="memories-scene">
      <div className="gold-haze" data-haze />
      <div className="floating-photos" aria-hidden="true">
        <div className="memory-photo photo-one" />
        <div className="memory-photo photo-two" />
        <div className="memory-photo photo-three" />
      </div>
      <div className="scene-inner">
        <SectionHeading {...chapter} />
        <div className="timeline">
          {memories.map((memory) => (
            <article className="timeline-card glass-panel" key={memory.time} data-reveal-line>
              <span>{memory.time}</span>
              <p>{memory.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
