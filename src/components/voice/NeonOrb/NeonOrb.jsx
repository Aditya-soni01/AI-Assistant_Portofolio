import "./NeonOrb.css";

export default function NeonOrb({ size = "large", state = "idle" }) {
  return (
    <div className={`neon-orb neon-orb--${size} neon-orb--${state}`}>
      <div className="neon-orb__aura" />
      <div className="neon-orb__outer-ring" />
      <div className="neon-orb__orbit neon-orb__orbit--one" />
      <div className="neon-orb__orbit neon-orb__orbit--two" />
      <div className="neon-orb__core">
        <div className="neon-orb__swirl neon-orb__swirl--one" />
        <div className="neon-orb__swirl neon-orb__swirl--two" />
        <div className="neon-orb__swirl neon-orb__swirl--three" />
      </div>

      <span className="neon-orb__particle p1" />
      <span className="neon-orb__particle p2" />
      <span className="neon-orb__particle p3" />
      <span className="neon-orb__particle p4" />
      <span className="neon-orb__particle p5" />
    </div>
  );
}
