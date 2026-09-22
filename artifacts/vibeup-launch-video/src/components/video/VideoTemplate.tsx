import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS = {
  opening: 6100,
  focus: 6400,
  prompt: 7100,
  coach: 7600,
  challenges: 7100,
  progress: 7600,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

const SCENE_COMPONENTS = {
  opening: Scene1,
  focus: Scene2,
  prompt: Scene3,
  coach: Scene4,
  challenges: Scene5,
  progress: Scene6,
};

const SCENE_START_SEC = (() => {
  const offsets: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    offsets[key] = cumulativeMs / 1000;
    cumulativeMs += duration;
  }
  return offsets;
})();

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => onSceneChange?.(currentSceneKey), [currentSceneKey, onSceneChange]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    if (paused) {
      audio.pause();
      return;
    }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > 0.18) {
        audio.currentTime = targetTime;
      }
    }
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
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
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
          preload="auto"
          autoPlay
          muted={muted}
        />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
