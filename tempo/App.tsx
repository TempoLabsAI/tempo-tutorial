import { Card } from "./components/Card";
import { Button } from "./components/Button";

const features = [
  {
    label: "Design",
    title: "Visual-first editing",
    description:
      "Select any element on the canvas and tweak styles, layout, and content without touching code.",
  },
  {
    label: "Code",
    title: "Real code, always",
    description:
      "Every change you make writes clean React code. No lock-in, no generated spaghetti.",
  },
  {
    label: "Ship",
    title: "From idea to production",
    description:
      "Preview, iterate, and push—all from the same workspace. No context-switching.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#111] via-[#0E0E0E] to-[#141418] text-gray-100 relative overflow-hidden border border-white/5 rounded-xl">
      {/* Bottom glow */}
      <div className="fixed -bottom-30 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <main className="max-w-[960px] mx-auto px-10 pt-30 pb-20 relative">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-4">
            Welcome to Tempo
          </p>
          <h1 className="text-[40px] font-bold leading-tight tracking-tight mb-4">
            Design. Code. Ship.
            <br />
            All in one place.
          </h1>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[480px]">
            Build your next project on a live codebase. Edit visually,
            see changes instantly, and ship with confidence.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {features.map((feature) => (
            <Card key={feature.label} label={feature.label} title={feature.title}>
              {feature.description}
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button>Get started</Button>
          <Button variant="outline">Learn more</Button>
        </div>
      </main>
    </div>
  );
}
