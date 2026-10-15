"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";

import { useMotionMode } from "@/hooks/use-motion-mode";
import { SignalCoreFallback } from "@/components/three/signal-core-fallback";

const DynamicSignalCoreScene = dynamic(
  () => import("@/components/three/signal-core-scene"),
  {
    ssr: false,
    loading: () => <SignalCoreFallback />,
  },
);

interface SignalCoreBoundaryProps {
  children: ReactNode;
}

interface SignalCoreBoundaryState {
  failed: boolean;
}

export class SignalCoreBoundary extends Component<
  SignalCoreBoundaryProps,
  SignalCoreBoundaryState
> {
  state: SignalCoreBoundaryState = { failed: false };

  static getDerivedStateFromError(): SignalCoreBoundaryState {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The visible fallback is intentional; no user action is required.
  }

  render() {
    if (this.state.failed) return <SignalCoreFallback />;
    return this.props.children;
  }
}

export function SignalCoreLoader() {
  const mode = useMotionMode();

  if (mode === "fallback" || mode === "reduced") {
    return <SignalCoreFallback />;
  }

  return (
    <SignalCoreBoundary>
      <DynamicSignalCoreScene mode={mode} />
    </SignalCoreBoundary>
  );
}
