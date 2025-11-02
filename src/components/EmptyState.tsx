import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  variant?: "coming-soon" | "no-data" | "empty";
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title = "Coming Soon",
  description = "This section is currently being crafted. Check back soon for updates.",
  variant = "coming-soon",
  className = "",
}: EmptyStateProps) {
  const variants = {
    "coming-soon": {
      bgColor: "bg-neutral-50",
      borderColor: "border-neutral-200",
      textColor: "text-neutral-900",
      subTextColor: "text-neutral-600",
    },
    "no-data": {
      bgColor: "bg-white",
      borderColor: "border-neutral-200",
      textColor: "text-neutral-800",
      subTextColor: "text-neutral-500",
    },
    empty: {
      bgColor: "bg-neutral-100",
      borderColor: "border-neutral-300",
      textColor: "text-neutral-900",
      subTextColor: "text-neutral-600",
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 md:p-12 rounded-3xl border-2 ${style.bgColor} ${style.borderColor} ${className}`}
    >
      {Icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-neutral-300 rounded-full blur-xl"
            />
            <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
              <Icon className={`w-12 h-12 ${style.textColor}`} strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      )}

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={`text-2xl md:text-3xl ${style.textColor} mb-3 tracking-tight`}
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className={`${style.subTextColor} max-w-md text-center leading-relaxed`}
      >
        {description}
      </motion.p>

      {variant === "coming-soon" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 flex items-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-neutral-400"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-2 h-2 rounded-full bg-neutral-400"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-2 h-2 rounded-full bg-neutral-400"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Grid variant for bento-style layouts
export function EmptyStateGrid({
  icon: Icon,
  title = "Coming Soon",
  description = "New content is on the way",
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[250px]">
        {Icon && (
          <div className="mb-4 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full blur-md opacity-50"
            />
            <Icon className="w-10 h-10 text-neutral-400 relative" strokeWidth={1.5} />
          </div>
        )}
        <h4 className="text-xl text-neutral-700 mb-2">{title}</h4>
        <p className="text-neutral-500">{description}</p>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-neutral-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
    </motion.div>
  );
}

// Inline variant for smaller spaces
export function EmptyStateInline({
  icon: Icon,
  title = "No items yet",
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center gap-3 py-12 px-6 rounded-xl bg-neutral-50 border border-neutral-200 ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />}
      <div>
        <p className="text-neutral-700">{title}</p>
        {description && <p className="text-neutral-500 mt-1">{description}</p>}
      </div>
    </motion.div>
  );
}
