import {
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

const SCENE_DURATIONS = {
  opening: 6100,
  focus: 6400,
  prompt: 7100,
  coach: 7600,
  challenges: 7100,
  progress: 7600,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      className="vibe-video"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,.65),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(185,230,207,.28),transparent_30%)]" />
        <img
          src={`${import.meta.env.BASE_URL}paper-texture.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[.1] mix-blend-multiply"
        />
        <div className="absolute left-[-10%] top-[38%] h-px w-[120%] rotate-[-13deg] bg-[#6650c9]/10" />
        <div className="absolute left-[-10%] top-[68%] h-px w-[120%] rotate-[9deg] bg-[#ff816d]/10" />
      </div>
      <AnimatePresence mode="sync" initial={false}>
        {currentScene === 0 && <Scene1 key="opening" />}
        {currentScene === 1 && <Scene2 key="focus" />}
        {currentScene === 2 && <Scene3 key="prompt" />}
        {currentScene === 3 && <Scene4 key="coach" />}
        {currentScene === 4 && <Scene5 key="challenges" />}
        {currentScene === 5 && <Scene6 key="progress" />}
      </AnimatePresence>
    </VideoCanvas>
  );
}
