import AnimatedText from '../components/AnimatedText.jsx';
import SceneFrame from '../components/SceneFrame.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { chapters } from '../data/story.js';

const chapter = chapters[7];

export default function ApologyScene() {
  return (
    <SceneFrame id={chapter.id} className="apology-scene">
      <div className="scene-inner apology-copy">
        <SectionHeading {...chapter} />
        <p data-reveal-line>
          Мен кей сәтте үндемей қалдым. Кей сәтте кеш түсіндім. Бірақ сезімнің шынайылығы уақыт өткен сайын жоғалмады.
        </p>
        <h3>
          <AnimatedText text="Кешірші." />
        </h3>
      </div>
    </SceneFrame>
  );
}
