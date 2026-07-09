import { FiPause, FiPlay, FiVolume2 } from 'react-icons/fi';

export default function MusicControl({ isPlaying, onToggle, volume, onVolume }) {
  return (
    <div className="music-control glass-panel">
      <button type="button" className="icon-button music-button" onClick={onToggle} aria-label={isPlaying ? 'Pause Music' : 'Play Music'}>
        {isPlaying ? <FiPause /> : <FiPlay />}
        <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
      </button>
      <label className="volume-control">
        <FiVolume2 aria-hidden="true" />
        <span className="sr-only">Volume Control</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => onVolume(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
