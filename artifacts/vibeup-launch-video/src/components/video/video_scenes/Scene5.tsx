import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Wordmark, Kicker, Orb, baseEase } from './shared';

const challenges = [
  ['START ONE CONVERSATION', 'Ask a genuine question.', '#ffb09f', '#7f3e43'],
  ['TAKE A RESET', 'Step outside for ten minutes.', '#b9e6cf', '#30634d'],
  ['MOVE ONE THING FORWARD', 'Twenty-five focused minutes.', '#c9c0ff', '#51429e'],
];

export function Scene5() {
  return (
    <SceneCanvas tone="lilac">
      <Wordmark />
      <Orb className="right-[-22%] top-[-6%] h-[61vmin] w-[61vmin] bg-[#ffb09f]/55" />
      <Orb className="left-[-24%] bottom-[-18%] h-[68vmin] w-[68vmin] bg-[#b9e6cf]/60" style={{ animationDelay: '-2s' }} />
      <div className="absolute left-[9%] top-[21%] w-[84%]">
        <Kicker>04 / make it real</Kicker>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: baseEase }}
          className="vibe-display max-w-[95%] text-[10.6vmin] font-semibold leading-[.9] text-[#2d2548]"
        >
          Small moves.<br /><span className="text-[#6650c9]">Real momentum.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.48, ease: baseEase }}
          className="mt-[3.2vmin] max-w-[78%] text-[3.5vmin] leading-[1.3] text-[#746d89]"
        >
          Optional challenges turn good intentions into something you can actually do.
        </motion.p>
      </div>
      <div className="absolute bottom-[8%] left-[9%] w-[82%] space-y-[2vmin]">
        {challenges.map(([label, detail, color, ink], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 60, rotate: index === 1 ? 1 : -2 }}
            animate={{ opacity: 1, x: 0, rotate: index === 1 ? 1 : -2 }}
            transition={{ duration: 0.65, delay: 0.78 + index * 0.16, ease: baseEase }}
            className="flex items-center gap-[3vmin] rounded-[3.6vmin] px-[3.2vmin] py-[2.6vmin]"
            style={{ background: color, color: ink, boxShadow: '0 1.2vmin 3vmin rgba(36,27,70,.08)' }}
          >
            <span className="grid h-[7vmin] w-[7vmin] shrink-0 place-items-center rounded-[2.3vmin] bg-[#fff6e9]/70 text-[1.45vmin] font-bold uppercase">done</span>
            <div>
              <div className="vibe-label text-[1.8vmin] font-bold">{label}</div>
              <div className="mt-[.8vmin] text-[2.9vmin] font-semibold">{detail}</div>
            </div>
            <span className="ml-auto text-[2.3vmin] font-bold">+40 XP</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 1.34 }}
        className="absolute right-[8%] top-[12%] rounded-full bg-[#ff816d] px-[3vmin] py-[2vmin] text-[2.1vmin] font-bold text-[#241b46] shadow-[0_1.2vmin_2.5vmin_rgba(36,27,70,.16)]"
      >
        optional, never overwhelming
      </motion.div>
      <ProgressRail current={4} />
    </SceneCanvas>
  );
}
