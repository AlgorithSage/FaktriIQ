import { motion } from 'motion/react';

/*
 * ScrollReveal — reusable scroll-triggered animation wrapper.
 *
 * Uses motion/react's `whileInView` for GPU-accelerated, buttery-smooth
 * reveal animations fired once as elements enter the viewport.
 *
 * Presets
 * ───────
 *   fadeUp     translateY(30px) → 0     (default)
 *   fadeDown   translateY(-30px) → 0
 *   fadeLeft   translateX(-40px) → 0
 *   fadeRight  translateX(40px) → 0
 *   scaleUp    scale(0.96) → 1
 *   none       opacity 0 → 1 only
 *
 * Props
 * ─────
 *   preset     one of the preset keys above          'fadeUp'
 *   delay      seconds before this element starts     0
 *   duration   animation length in seconds            0.7
 *   distance   px for translate presets               30
 *   once       fire only on first entry               true
 *   amount     viewport fraction to trigger           0.15
 *   as         underlying HTML element                'div'
 *   className  forwarded
 *   style      forwarded
 *   children   forwarded
 */

const PRESETS = {
  fadeUp: (d) => ({ y: d, opacity: 0 }),
  fadeDown: (d) => ({ y: -d, opacity: 0 }),
  fadeLeft: (d) => ({ x: -d, opacity: 0 }),
  fadeRight: (d) => ({ x: d, opacity: 0 }),
  scaleUp: () => ({ scale: 0.96, opacity: 0 }),
  none: () => ({ opacity: 0 }),
};

const VISIBLE = { x: 0, y: 0, scale: 1, opacity: 1 };

// Professional easing — smooth cubic-bezier curve
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1];

export default function ScrollReveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.7,
  distance = 30,
  once = true,
  amount = 0.15,
  as = 'div',
  className,
  style,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  const getInitial = PRESETS[preset] || PRESETS.fadeUp;

  return (
    <Component
      initial={getInitial(distance)}
      whileInView={VISIBLE}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: SMOOTH_EASE,
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}
