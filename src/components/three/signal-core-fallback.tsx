export function SignalCoreFallback() {
  return (
    <div
      role="img"
      aria-label="Abstrakter KI-Agent mit vier verbundenen Kanälen"
      className="signal-fallback relative isolate grid aspect-square w-full max-w-[42rem] place-items-center overflow-hidden rounded-full"
    >
      <div className="signal-grid absolute inset-[8%] rounded-full" />
      <div className="signal-orbit signal-orbit-a absolute size-[68%] rounded-full border border-black/20" />
      <div className="signal-orbit signal-orbit-b absolute size-[48%] rounded-full border border-black/30" />
      <div className="signal-core relative grid size-[24%] place-items-center rounded-full border border-white/80 bg-black shadow-[0_25px_90px_rgba(0,0,0,0.3)]">
        <span className="size-[36%] rounded-full border border-white/65 bg-white/10" />
      </div>
      {[
        "left-[7%] top-1/2",
        "right-[7%] top-1/2",
        "left-1/2 top-[7%]",
        "bottom-[7%] left-1/2",
      ].map((position) => (
        <span
          key={position}
          className={`absolute ${position} size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black shadow-[0_0_0_6px_rgba(0,0,0,0.08)]`}
        />
      ))}
      <span className="absolute bottom-[16%] right-[16%] rounded-full border border-black/15 bg-white/70 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] backdrop-blur-md">
        System online
      </span>
    </div>
  );
}
