import { useEffect, useState } from "react";
import { Spinner } from "src/components/ui/spinner";

type LoadingIndicatorProps = {
  delay?: number;
};

export function LoadingIndicator({ delay = 300 }: LoadingIndicatorProps) {
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayElapsed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex justify-center">
      {delayElapsed && <Spinner className="size-10" />}
    </div>
  );
}
