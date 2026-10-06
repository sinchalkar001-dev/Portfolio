import BarProof from "./BarProof";
import RaceProof from "./RaceProof";

const PROOFS = { query: BarProof, bars: BarProof, race: RaceProof };

// The animated evidence behind a project's result line. Rendered from the `proof` entry in portfolio.js.
export default function Proof({ proof }) {
  const Component = PROOFS[proof?.type];
  return Component ? <Component proof={proof} /> : null;
}
