import React from 'react';
import { motion } from 'framer-motion';

const dotVariants = {
  start: { y: 0 },
  bounce: {
    y: [-6, 6, -6],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const LoadingScreen = ({ isError = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white"
    >
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        {!isError && (
          <>
            <div className="absolute inset-4 bg-blue-500 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-6 bg-blue-500 rounded-full" />
          </>
        )}
      </div>

      {/* Dots only when loading */}
      {!isError && (
        <div className="flex space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              variants={dotVariants}
              initial="start"
              animate="bounce"
              transition={{
                delay: i * 0.2,
                repeatDelay: 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Message */}
      <p
        className={`mt-6 text-lg font-medium tracking-wide animate-pulse ${
          isError ? 'text-red-600' : 'text-blue-600'
        }`}
      >
        {isError
          ? "Couldn't find User Details. Redirecting to login..."
          : 'Loading user data...'}
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
