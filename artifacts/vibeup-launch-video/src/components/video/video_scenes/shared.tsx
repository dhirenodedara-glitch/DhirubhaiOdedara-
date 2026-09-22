import { motion, type MotionProps } from 'framer-motion';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export const baseEase = [0.16, 1, 0.3, 1] as const;

export function SceneCanvas({
  children,
  tone = 'cream',
}: PropsWithChildren<{ tone?: 'cream' | 'lilac' | 'plum' }>) {
  const background =
    tone === 'plum'
      ? 'linear-gradient(145deg, #241b46 0%, #3a2b77 52%, #6d54bf 100%)'
      : tone === 'lilac'
        ? 'linear-gradient(145deg, #eee9ff 0%, #f7efff 48%, #ffd7cf 100%)'
        : 'linear-gradient(145deg, #fff6e9 0%, #f9edff 52%, #dcd4ff 100%)';

  return (
    <motion.section
      initial={{ clipPath: 'circle(8% at 84% 18%)', opacity: 0.4, scale: 1.04 }}
      animate={{ clipPath: 'circle(150% at 84% 18%)', opacity: 1, scale: 1 }}
      exit={{ clipPath: 'circle(8% at 12% 84%)', opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.9, ease: baseEase }}
      style={{ background }}
      className="absolute inset-0 overflow-hidden"
    >
      {children}
    </motion.section>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div
      className="vibe-label absolute left-[7.5%] top-[6.2%] z-10 flex items-center gap-[1.8vmin] text-[2.35vmin] font-bold"
      style={{ color: light ? '#fff6e9' : '#2d2548' }}
    >
      <span
        className="grid h-[5.2vmin] w-[5.2vmin] place-items-center rounded-[1.8vmin]"
        style={{ background: light ? '#ff816d' : '#6650c9', color: light ? '#241b46' : '#fff6e9' }}
      >
        <span className="text-[2.8vmin] font-bold tracking-[-0.1em]">V</span>
      </span>
      VibeUp
    </div>
  );
}

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className="vibe-label mb-[3.2vmin] text-[2.2vmin] font-bold"
      style={{ color: light ? '#b9e6cf' : '#6650c9' }}
    >
      {children}
    </div>
  );
}

export function ProgressRail({ current, light = false }: { current: number; light?: boolean }) {
  return (
    <div
      className="absolute bottom-[5.6%] left-[7.5%] z-10 flex items-center gap-[1.2vmin]"
      style={{ color: light ? '#fff6e9' : '#2d2548' }}
    >
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <span
          key={item}
          className="h-[0.7vmin] rounded-full"
          style={{
            width: item === current ? '6.5vmin' : '1.3vmin',
            background: item === current ? '#ff816d' : light ? 'rgba(255,246,233,.35)' : 'rgba(45,37,72,.22)',
          }}
        />
      ))}
    </div>
  );
}

export function Orb({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      className={`vibe-drift absolute rounded-full blur-[0.2vmin] ${className}`}
      style={style}
      animate={{ rotate: [0, 8, -3, 0], scale: [1, 1.07, 0.98, 1] }}
      transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Phone({
  children,
  dark = false,
  className = '',
}: PropsWithChildren<{ dark?: boolean; className?: string }>) {
  return (
    <motion.div
      initial={{ y: 42, rotate: 3, opacity: 0 }}
      animate={{ y: 0, rotate: -3, opacity: 1 }}
      transition={{ duration: 1, delay: 0.24, ease: baseEase }}
      className={`vibe-phone-shadow relative overflow-hidden rounded-[7vmin] border-[0.75vmin] p-[1.4vmin] ${className}`}
      style={{
        background: dark ? '#241b46' : '#fffaf2',
        borderColor: dark ? '#51457f' : '#fffaf2',
      }}
    >
      <div className="absolute left-1/2 top-[1.1vmin] h-[0.7vmin] w-[16%] -translate-x-1/2 rounded-full bg-current opacity-20" />
      <div className="h-full overflow-hidden rounded-[5.8vmin]" style={{ background: dark ? '#2f2554' : '#eee9ff' }}>
        {children}
      </div>
    </motion.div>
  );
}

export function TinyMark({ children, color = '#6650c9' }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="grid h-[6.2vmin] w-[6.2vmin] place-items-center rounded-[2.2vmin] text-[2.7vmin] font-bold"
      style={{ background: color, color: '#fff6e9' }}
    >
      {children}
    </span>
  );
}

export function SoftCard({
  children,
  color = '#fffaf2',
  className = '',
  motionProps,
}: PropsWithChildren<{ color?: string; className?: string; motionProps?: MotionProps }>) {
  return (
    <motion.div
      {...motionProps}
      className={`rounded-[4.2vmin] border border-white/50 p-[4.2vmin] ${className}`}
      style={{ background: color, boxShadow: '0 1.7vmin 4vmin rgba(36,27,70,.11)' }}
    >
      {children}
    </motion.div>
  );
}

export function Bars({ color = '#ff816d', count = 14 }: { color?: string; count?: number }) {
  return (
    <div className="flex h-[9vmin] items-center gap-[0.9vmin]">
      {Array.from({ length: count }).map((_, index) => (
        <motion.span
          key={index}
          className="w-[0.9vmin] rounded-full"
          style={{ background: color }}
          animate={{ height: [`${22 + ((index * 17) % 55)}%`, `${40 + ((index * 23) % 52)}%`, `${22 + ((index * 17) % 55)}%`] }}
          transition={{ duration: 1.25 + index * 0.04, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
