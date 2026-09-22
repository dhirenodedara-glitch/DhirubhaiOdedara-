import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Orb, baseEase } from './shared';

export function Scene6() {
  return (
    <SceneCanvas tone="cream">
      <Orb className="right-[-21%] top-[-15%] h-[76vmin] w-[76vmin] bg-[#c9c0ff]/75" />
      <Orb className="left-[-18%] bottom-[-11%] h-[67vmin] w-[67vmin] bg-[#ffb09f]/55" style={{ animationDelay: '-3s' }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.2, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 190, damping: 18, delay: 0.1 }}
        className="absolute left-1/2 top-[21%] grid h-[48vmin] w-[48vmin] -translate-x-1/2 place-items-center rounded-full border-[1.3vmin] border-[#6650c9] bg-[#fff6e9]/60 shadow-[0_2vmin_7vmin_rgba(102,80,201,.14)]"
      >
        <div className="absolute inset-[2.3vmin] rounded-full border border-[#6650c9]/20" />
        <div className="text-center">
          <div className="vibe-label text-[2.1vmin] font-bold text-[#746d89]">your momentum</div>
          <div className="vibe-display mt-[1vmin] text-[15vmin] font-semibold leading-none text-[#2d2548]">18<span className="text-[6vmin] text-[#ff816d]">%</span></div>
          <div className="mt-[1.5vmin] text-[2.7vmin] font-semibold text-[#6650c9]">more consistent this week</div>
        </div>
      </motion.div>
      <div className="absolute left-[9%] top-[12%]">
        <div className="vibe-label text-[2.3vmin] font-bold text-[#6650c9]">05 / see it build</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: baseEase }}
        className="absolute bottom-[22%] left-[9%] w-[82%]"
      >
        <div className="mb-[2.6vmin] flex items-end justify-between">
          <div>
            <div className="vibe-label text-[2vmin] font-bold text-[#746d89]">five days in</div>
            <div className="vibe-display mt-[1vmin] text-[8.2vmin] font-semibold leading-[.9] text-[#2d2548]">You showed up.</div>
          </div>
          <div className="rounded-[2.6vmin] bg-[#b9e6cf] px-[2.5vmin] py-[1.7vmin] text-[2.7vmin] font-bold text-[#30634d]">+220 XP</div>
        </div>
        <div className="flex items-end gap-[2vmin] border-b border-[#2d2548]/20 pb-[2vmin]">
          {[0.38, 0.58, 0.46, 0.72, 0.9, 0.6, 0.82].map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-[1.2vmin]">
              <div className="flex h-[13vmin] w-full items-end rounded-full bg-[#eee9ff]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${value * 100}%` }}
                  transition={{ duration: 0.55, delay: 0.9 + index * 0.08, ease: baseEase }}
                  className="w-full rounded-full"
                  style={{ background: index === 4 ? '#6650c9' : '#b9a8ff' }}
                />
              </div>
              <span className="text-[2vmin] font-bold text-[#746d89]">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 1.35, ease: baseEase }}
        className="absolute bottom-[9%] left-[9%] flex items-center gap-[2vmin] text-[2.3vmin] font-semibold text-[#746d89]"
      >
        <span className="grid h-[5vmin] w-[5vmin] place-items-center rounded-[1.7vmin] bg-[#6650c9] font-bold text-[#fff6e9]">V</span>
        Progress, not perfection.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 3.85, ease: baseEase }}
        className="absolute bottom-[9%] left-[8%] z-[5] w-[84%] rounded-[5vmin] border border-[#fff6e9]/70 bg-[#fff6e9]/95 px-[4.5vmin] py-[3.3vmin] text-center shadow-[0_1.8vmin_5vmin_rgba(36,27,70,.14)]"
      >
        <div className="vibe-label text-[2.2vmin] font-bold text-[#6650c9]">VibeUp</div>
        <div className="vibe-display mt-[1vmin] text-[6.1vmin] font-semibold leading-[.98] text-[#2d2548]">
          Level up your life,<br />one day at a time.
        </div>
      </motion.div>
      <ProgressRail current={5} />
    </SceneCanvas>
  );
}
