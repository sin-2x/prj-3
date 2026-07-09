import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[0];

export default function FirstMeeting() {
  return (
    <SceneFrame id={chapter.id} className="first-meeting">
      <div className="april-haze" data-haze />
      <div className="scene-inner split-layout">
        <SectionHeading {...chapter} />
        <div className="story-copy">
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} data-reveal-line>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}
