import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Wordmark, Kicker, Orb, Bars, TinyMark, baseEase } from './shared';

export function Scene4() {
  return (
    <SceneCanvas tone="plum">
      <Wordmark light />
      <Orb className="right-[-19%] top-[9%] h-[64vmin] w-[64vmin] bg-[#6650c9]/65" />
      <Orb className="bottom-[-18%] left-[-21%] h-[62vmin] w-[62vmin] bg-[#ff816d]/40" style={{ animationDelay: '-4s' }} />
      <motion.div
        initial={{ width: '0%', opacity: 0 }}
        animate={{ width: '80%', opacity: 0.5 }}
        transition={{ duration: 1.1, delay: 0.2, ease: baseEase }}
        className="absolute left-[10%] top-[20%] h-px bg-[#b9e6cf]"
      />
      <div className="absolute left-[9%] top-[24%] w-[84%]">
        <Kicker light>03 / practise with your coach</Kicker>
        <motion.h2
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: baseEase }}
          className="vibe-display max-w-[96%] text-[10.8vmin] font-semibold leading-[.88] text-[#fff6e9]"
        >
          Rehearse the<br /><span className="text-[#ffad96]">moment.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: baseEase }}
          className="mt-[3.5vmin] max-w-[74%] text-[3.5vmin] leading-[1.3] text-[#d8d1f1]"
        >
          Try the words before you need them. VibeUp helps you find your voice — without the pressure.
        </motion.p>
      </div>
      <div className="absolute bottom-[13%] left-[9%] w-[82%]">
        <motion.div
          initial={{ opacity: 0, x: -36, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 0.7, delay: 0.9, ease: baseEase }}
          className="mb-[2.4vmin] flex max-w-[79%] items-end gap-[2vmin]"
        >
          <TinyMark color="#ff816d">V</TinyMark>
          <div className="rounded-[4vmin] rounded-bl-[1vmin] bg-[#fff6e9] px-[3.7vmin] py-[3vmin] text-[3.2vmin] leading-[1.12] text-[#2d2548]">
            Keep it simple.<br />Ask about them.
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 38, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 0.65, delay: 1.16, ease: baseEase }}
          className="ml-auto max-w-[70%] rounded-[4vmin] rounded-br-[1vmin] bg-[#ff816d] px-[3.7vmin] py-[3vmin] text-[3.2vmin] leading-[1.12] text-[#241b46]"
        >
          What should I say?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.42, ease: baseEase }}
          className="mt-[4.5vmin] flex items-center justify-between rounded-[3.5vmin] border border-[#d8d1f1]/30 bg-[#fff6e9]/8 px-[3.5vmin] py-[2.4vmin]"
        >
          <Bars color="#b9e6cf" count={12} />
          <span className="vibe-label text-[2vmin] font-bold text-[#b9e6cf]">practice mode</span>
        </motion.div>
      </div>
      <ProgressRail current={3} light />
    </SceneCanvas>
  );
}
