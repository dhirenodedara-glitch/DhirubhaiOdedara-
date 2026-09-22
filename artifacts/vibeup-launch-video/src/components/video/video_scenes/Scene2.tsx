import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Wordmark, Kicker, Orb, Phone, SoftCard, TinyMark, baseEase } from './shared';

const focusOptions = [
  { label: 'Confidence', tint: '#ffb09f', ink: '#7f3e43', active: true },
  { label: 'Wellbeing', tint: '#b9e6cf', ink: '#30634d', active: false },
  { label: 'Focus', tint: '#c9c0ff', ink: '#51429e', active: false },
];

export function Scene2() {
  return (
    <SceneCanvas tone="lilac">
      <Wordmark />
      <Orb className="left-[-26%] top-[11%] h-[64vmin] w-[64vmin] bg-[#ffb09f]/50" />
      <Orb className="right-[-24%] bottom-[-13%] h-[72vmin] w-[72vmin] bg-[#b9e6cf]/65" style={{ animationDelay: '-4s' }} />
      <div className="absolute left-[9%] top-[22%] w-[82%]">
        <Kicker>01 / choose your focus</Kicker>
        <motion.h2
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: baseEase }}
          className="vibe-display max-w-[94%] text-[11vmin] font-semibold leading-[.9] text-[#2d2548]"
        >
          Start where<br /><span className="text-[#6650c9]">you are.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: baseEase }}
          className="mt-[3.8vmin] max-w-[79%] text-[3.6vmin] leading-[1.3] text-[#746d89]"
        >
          Pick the thing you want to feel a little more of today.
        </motion.p>
      </div>
      <Phone className="absolute bottom-[10%] right-[6%] h-[49vmin] w-[35vmin]">
        <div className="flex h-full flex-col p-[3vmin] text-[#2d2548]">
          <div className="flex items-center justify-between">
            <span className="vibe-label text-[1.8vmin] font-bold text-[#746d89]">today</span>
            <TinyMark>V</TinyMark>
          </div>
          <div className="mt-[7vmin] text-[4.2vmin] font-semibold">What needs<br />your energy?</div>
          <div className="mt-[4vmin] space-y-[1.7vmin]">
            {focusOptions.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + index * 0.12, duration: 0.45, ease: baseEase }}
                className="flex items-center justify-between rounded-[2.8vmin] px-[2.7vmin] py-[2.2vmin] text-[2.7vmin] font-semibold"
                style={{ background: item.tint, color: item.ink, outline: item.active ? `0.5vmin solid ${item.ink}` : 'none', outlineOffset: '0.5vmin' }}
              >
                {item.label}
                <span className="grid h-[3.8vmin] w-[3.8vmin] place-items-center rounded-full bg-white/70 text-[1.35vmin] font-bold">{item.active ? 'on' : '>'}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-[1.5vmin] text-[2.2vmin] text-[#746d89]">
            <span className="h-[1vmin] w-[1vmin] rounded-full bg-[#6650c9]" /> your choice, your pace
          </div>
        </div>
      </Phone>
      <motion.div
        initial={{ scale: 0, rotate: -22 }}
        animate={{ scale: 1, rotate: -10 }}
        transition={{ type: 'spring', stiffness: 340, damping: 18, delay: 0.95 }}
        className="absolute bottom-[18%] left-[8%] rounded-[3vmin] bg-[#fff6e9] px-[3.5vmin] py-[2.3vmin] text-[2.6vmin] font-semibold text-[#6650c9] shadow-[0_1.6vmin_3vmin_rgba(36,27,70,.12)]"
      >
        no perfect plan required
      </motion.div>
      <ProgressRail current={1} />
    </SceneCanvas>
  );
}
