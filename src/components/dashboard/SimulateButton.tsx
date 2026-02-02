import * as React from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardMode } from './ModeSelector';
import { cn } from '@/lib/utils';

interface SimulateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  mode?: DashboardMode;
}

const modeStyles: Record<DashboardMode, {
  className: string;
  defaultShadow: string;
  hoverShadow: string;
  activeShadow: string;
}> = {
  agriculture: {
    className: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    defaultShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 0 20px 0 rgba(16,185,129,0.3)',
    hoverShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.3), 0 0 30px 0 rgba(16,185,129,0.5)',
    activeShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.3), 0 0 20px 0 rgba(16,185,129,0.3)',
  },
  coastal: {
    className: 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600',
    defaultShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 0 20px 0 rgba(20,184,166,0.3)',
    hoverShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.3), 0 0 30px 0 rgba(20,184,166,0.5)',
    activeShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.3), 0 0 20px 0 rgba(20,184,166,0.3)',
  },
  flood: {
    className: 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500',
    defaultShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 0 20px 0 rgba(59,130,246,0.3)',
    hoverShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.3), 0 0 30px 0 rgba(59,130,246,0.5)',
    activeShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.3), 0 0 20px 0 rgba(59,130,246,0.3)',
  },
};

export const SimulateButton = ({
  onClick,
  isLoading,
  disabled,
  label = 'Simulate Resilience',
  mode = 'agriculture'
}: SimulateButtonProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const currentStyle = modeStyles[mode];
  const currentShadow = isPressed ? currentStyle.activeShadow : (isHovered ? currentStyle.hoverShadow : currentStyle.defaultShadow);

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="ghost"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{ boxShadow: currentShadow }}
      className={cn(
        "w-full h-12 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:text-white",
        currentStyle.className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Simulating...
        </>
      ) : (
        <>
          <Zap className="w-4 h-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
};
