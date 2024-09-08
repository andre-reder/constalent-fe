import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionsInterface {
  children: ReactNode;
}

const animationConfiguration = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Transitions({ children }: TransitionsInterface) {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

export default Transitions;
