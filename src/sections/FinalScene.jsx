import HeartSvg from '../components/HeartSvg.jsx';
import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[8];

export default function FinalScene() {
  return (
    <SceneFrame id="final-letter" className="final-scene">
      <div className="falling-stars" aria-hidden="true" />
      <div className="final-moon" aria-hidden="true" />
      <div className="scene-inner centered-story final-copy">
        <SectionHeading {...chapter} />
        <HeartSvg className="final-heart" />
        <p data-reveal-line>
          Егер бір күні жүрегіңде кішкентай ғана орын қалса, мен сол жерге асықпай, шуламай, шын ниетіммен келер едім.
        </p>
        <button type="button" className="story-button">
          Егер мүмкіндік берсең...
        </button>
      </div>
    </SceneFrame>
  );
}
