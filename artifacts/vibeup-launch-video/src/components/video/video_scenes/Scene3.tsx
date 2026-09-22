import { motion } from 'framer-motion';
import { SceneCanvas, ProgressRail, Wordmark, Kicker, Orb, Phone, SoftCard, TinyMark, baseEase } from './shared';

export function Scene3() {
  return (
    <SceneCanvas tone="cream">
      <Wordmark />
      <Orb className="right-[-16%] top-[-8%] h-[56vmin] w-[56vmin] bg-[#b9e6cf]/70" />
      <Orb className="bottom-[-20%] left-[-17%] h-[60vmin] w-[60vmin] bg-[#c9c0ff]/65" style={{ animationDelay: '-3s' }} />
      <div className="absolute left-[8%] top-[22%] w-[84%]">
        <Kicker>02 / get a daily prompt</Kicker>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: baseEase }}
          className="vibe-display max-w-[96%] text-[10.5vmin] font-semibold leading-[.9] text-[#2d2548]"
        >
          One nudge.<br /><span className="text-[#ff816d]">Then another.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: baseEase }}
          className="mt-[3.2vmin] max-w-[79%] text-[3.5vmin] leading-[1.3] text-[#746d89]"
        >
          Personalised to your focus, your rhythm, and the real life you are living.
        </motion.p>
      </div>
      <Phone className="absolute bottom-[8%] left-[8%] h-[49vmin] w-[35vmin]" dark>
        <div className="flex h-full flex-col p-[3vmin] text-[#fff6e9]">
          <div className="flex items-center justify-between">
            <span className="vibe-label text-[1.8vmin] font-bold text-[#b9e6cf]">your prompt</span>
            <TinyMark color="#ff816d">V</TinyMark>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: baseEase }}
            className="mt-[8vmin] rounded-[4vmin] bg-[#fff6e9] p-[3.2vmin] text-[#2d2548]"
          >
            <div className="mb-[5vmin] text-[3vmin] font-bold text-[#6650c9]">CONFIDENCE</div>
            <div className="vibe-display text-[6vmin] font-semibold leading-[.98]">Ask one honest question today.</div>
            <div className="mt-[5vmin] flex items-center justify-between text-[2.2vmin] text-[#746d89]">
              <span>2 min experiment</span>
              <span className="rounded-full bg-[#b9e6cf] px-[2vmin] py-[1.2vmin] font-bold text-[#30634d]">+20 XP</span>
            </div>
          </motion.div>
          <div className="mt-auto flex items-center gap-[2vmin] text-[2.5vmin] text-[#b9e6cf]">
            <span className="grid h-[5.7vmin] w-[5.7vmin] place-items-center rounded-[2vmin] bg-[#6650c9] text-[1.5vmin] font-bold uppercase text-[#fff6e9]">done</span>
            tiny action, real shift
          </div>
        </div>
      </Phone>
      <motion.div
        initial={{ opacity: 0, x: 42, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 0.7, delay: 1.15, ease: baseEase }}
        className="absolute bottom-[15%] right-[7%] w-[43%]"
      >
        <SoftCard color="#ffb09f">
          <div className="text-[2.2vmin] font-bold uppercase tracking-[.1em] text-[#7f3e43]">today’s shift</div>
          <div className="vibe-display mt-[2vmin] text-[5.3vmin] leading-[.95] text-[#2d2548]">Make it easy to say hello.</div>
          <div className="mt-[3.8vmin] h-[1vmin] overflow-hidden rounded-full bg-[#fff6e9]/60"><motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ delay: 1.45, duration: 0.8, ease: baseEase }} className="h-full rounded-full bg-[#6650c9]" /></div>
        </SoftCard>
      </motion.div>
      <ProgressRail current={2} />
    </SceneCanvas>
  );
}
