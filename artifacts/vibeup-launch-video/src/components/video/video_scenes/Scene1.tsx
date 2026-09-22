import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Wordmark, Kicker, Orb, baseEase } from './shared';

export function Scene1() {
  return (
    <SceneCanvas>
      <Wordmark />
      <Orb className="right-[-18%] top-[-4%] h-[54vmin] w-[54vmin] bg-[#c7b9ff]/70" />
      <Orb className="bottom-[-18%] left-[-22%] h-[65vmin] w-[65vmin] bg-[#ffb09f]/50" style={{ animationDelay: '-2s' }} />
      <motion.div
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 0.82, scale: 1 }}
        transition={{ duration: 1.4, ease: baseEase }}
        className="absolute inset-[13%_7%_10%] overflow-hidden rounded-[9vmin]"
      >
        <img
          src={`${import.meta.env.BASE_URL}dawn-window.png`}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center center', filter: 'saturate(.9) contrast(.94)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241b46]/75 via-transparent to-[#241b46]/5" />
      </motion.div>
      <div className="absolute left-[11%] top-[31%] z-[2] w-[76%]">
        <Kicker>the everyday edge</Kicker>
        <motion.h1
          initial={{ opacity: 0, y: 35, letterSpacing: '-0.01em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.055em' }}
          transition={{ duration: 0.9, delay: 0.28, ease: baseEase }}
          className="vibe-display max-w-[92%] text-[12.6vmin] font-semibold leading-[.88] text-[#fff6e9]"
        >
          Your next move<br />
          <span className="text-[#ffad96]">starts small.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.82, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: baseEase }}
          className="mt-[4.5vmin] max-w-[74%] text-[3.6vmin] leading-[1.28] text-[#fff6e9]"
        >
          A little more courage, clarity, and momentum — built into your day.
        </motion.p>
      </div>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '160%' }}
        transition={{ duration: 1.5, delay: 1.1, ease: baseEase }}
        className="absolute top-0 z-[3] h-full w-[34%] skew-x-[-14deg] bg-[#fff6e9]/15"
      />
      <ProgressRail current={0} light />
    </SceneCanvas>
  );
}
