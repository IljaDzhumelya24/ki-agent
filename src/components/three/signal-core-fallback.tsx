export function SignalCoreFallback() {
  return (
    <div
      role="img"
      aria-label="Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe"
      className="relative isolate h-full w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/black-hole-hero.png')" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(2,3,4,.42)_76%)]" />
    </div>
  );
}
