export function ChangGharSVG() {
  // Oblique view from the front-left: D is the depth vector (front to back) for the house.
  const D = [-16, -22];
  // Ground lines running north-south (parallel to the house's side walls) shift right by K px per px down
  const K = -D[0] / -D[1];
  const ns = (x0, y0, y) => x0 + (y - y0) * K;
  const at = ([x, y], t) => [x + D[0] * t, y + D[1] * t];
  const pts = (...ps) => ps.map(([x, y]) => `${x},${y}`).join(" ");
  // A small flowering plant: a clump of stems with leaves and blooms, standing at (bx, by)
  const FLOWERS = ['#e86a8a', '#f2c14e', '#d94a4a', '#c86ad4', '#f5f0e8'];
  const flowerPlant = (bx, by, k, sc, id = k) => {
    const out = [];
    [[-6, 12, -2], [-3, 16, -1], [0, 18, 0], [3, 15, 1.5], [6, 11, 2.5]].forEach(([dx, h, lean], i) => {
      dx *= sc; h *= sc; lean *= sc;
      const sx = bx + dx, tx = sx + lean, ty = by - h, lx = sx + lean * 0.5 + (i % 2 ? 1.8 : -1.8) * sc;
      out.push(<line key={`st${id}-${i}`} x1={sx} y1={by} x2={tx} y2={ty} stroke="#3f6b3a" strokeWidth={Math.max(0.6, 0.9 * sc)}/>);
      out.push(<ellipse key={`lf${id}-${i}`} cx={lx} cy={by - h * 0.5} rx={2.2 * sc} ry={0.9 * sc} fill="#4a8a44" transform={`rotate(${i % 2 ? 30 : -30} ${lx} ${by - h * 0.5})`}/>);
      [0, 72, 144, 216, 288].forEach((deg) => {
        const r = (deg * Math.PI) / 180;
        out.push(<circle key={`pt${id}-${i}-${deg}`} cx={tx + Math.cos(r) * 1.5 * sc} cy={ty + Math.sin(r) * 1.5 * sc} r={1.2 * sc} fill={FLOWERS[(i + k * 2) % FLOWERS.length]}/>);
      });
      out.push(<circle key={`ce${id}-${i}`} cx={tx} cy={ty} r={0.8 * sc} fill="#f2c14e"/>);
    });
    out.push(<ellipse key={`soil${id}`} cx={bx} cy={by + 0.5} rx={7 * sc} ry={1.8 * sc} fill="#6a4a2a"/>);
    return <g key={`plant${id}`}>{out}</g>;
  };
  // Iron grill on a wall top: round pipe pickets with spear tips between two rails
  const grill = (p, q, key, step = 4.5, h = 13, skip) => {
    const iron = "#2f3035", len = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.max(2, Math.round(len / step));
    const at2 = (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    // Rails run along the wall top, broken where the gate is
    const tAt = (x) => (x - p[0]) / (q[0] - p[0]);
    const spans = skip ? [[0, tAt(skip[0])], [tAt(skip[1]), 1]] : [[0, 1]];
    const out = [];
    spans.forEach(([t0, t1], j) => {
      if (t1 <= t0) return;
      const a = at2(Math.max(0, t0)), b = at2(Math.min(1, t1));
      out.push(<line key={`${key}b${j}`} x1={a[0]} y1={a[1] - 1.5} x2={b[0]} y2={b[1] - 1.5} stroke={iron} strokeWidth="1"/>);
      out.push(<line key={`${key}t${j}`} x1={a[0]} y1={a[1] - h + 2} x2={b[0]} y2={b[1] - h + 2} stroke={iron} strokeWidth="0.9"/>);
    });
    for (let i = 0; i <= n; i++) {
      const [x, y] = at2(i / n);
      if (skip && x > skip[0] && x < skip[1]) continue;
      out.push(<line key={`${key}p${i}`} x1={x} y1={y} x2={x} y2={y - h} stroke={iron} strokeWidth="0.8"/>);
      out.push(<path key={`${key}s${i}`} d={`M${x},${y - h - 3} L${x + 1.3},${y - h} L${x},${y - h + 0.8} L${x - 1.3},${y - h} Z`} fill={iron}/>);
    }
    return <g key={key}>{out}</g>;
  };
  // Plants along the edges of a flat area, drawn back to front
  const plantEdges = (points, sc) => points
    .map(([x, y], i) => ({ x, y, i }))
    .sort((p, q) => p.y - q.y)
    .map(({ x, y, i }) => flowerPlant(x, y, i, sc));
  return (
    <svg viewBox="-266 -20 1120 840" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two-storey chang ghar in a walled compound, with a lane, gate, fish pond, balconies on both floors, and an outside staircase">
      <defs>
        <linearGradient id="cg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9cfe0"/>
          <stop offset="100%" stopColor="#e8e2d2"/>
        </linearGradient>
        <linearGradient id="cg-sky-fade" gradientUnits="userSpaceOnUse" x1="0" y1="-20" x2="0" y2="860">
          <stop offset="0%" stopColor="#a9cfe0"/>
          <stop offset="100%" stopColor="#e8e2d2"/>
        </linearGradient>
        <pattern id="cg-bamboo" width="6" height="30" patternUnits="userSpaceOnUse">
          <line x1="2" y1="0" x2="2" y2="30" stroke="#5a4028" strokeWidth="0.5" opacity="0.35"/>
          <line x1="4.5" y1="0" x2="4.5" y2="30" stroke="#8a6a44" strokeWidth="0.4" opacity="0.3"/>
        </pattern>
        <linearGradient id="cg-awning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(120,170,200)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="rgb(190,228,245)" stopOpacity="0.4"/>
        </linearGradient>
        {/* Paver blocks; skewed so the joints run along the roads (parallel to the house) */}
        <pattern id="cg-pavers" width="8" height="5" patternUnits="userSpaceOnUse" patternTransform="skewX(36)">
          <rect width="8" height="5" fill="#c4bdb1"/>
          <path d="M0,0 H8 M0,2.5 H8 M2,0 V2.5 M6,2.5 V5" stroke="#aaa395" strokeWidth="0.45"/>
        </pattern>
        <pattern id="cg-mesh" width="3" height="3" patternUnits="userSpaceOnUse">
          {/* Fine light-blue nylon netting (as in the photo), mostly see-through */}
          <rect width="3" height="3" fill="rgba(90,170,220,0.14)"/>
          <path d="M0,0 L3,3 M3,0 L0,3" stroke="rgba(120,195,235,0.6)" strokeWidth="0.3"/>
        </pattern>
        <linearGradient id="cg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a8a9a"/>
          <stop offset="100%" stopColor="#2a5a6a"/>
        </linearGradient>
      </defs>
      <rect x="-290" y="-20" width="1180" height="880" fill="url(#cg-sky)"/>
      {/* Whole scene lifted so the foreground clears the caption */}
      <g transform="translate(0, -52)">
      {/* 26 ft paved road behind the north wall, joining the west and east roads */}
      {(() => {
        const RW = 26 * 4.4, lean = 42 * K, yA = 200 - RW, yB = 200;
        const wx = (y) => ns(-116, 200, y) - RW, ex = (y) => ns(400, 200, y) + lean + RW;
        return (
          <g>
            <polygon points={pts([wx(yA), yA], [ex(yA), yA], [ex(yB), yB], [wx(yB), yB])} fill="url(#cg-pavers)"/>
            <line x1={wx(yA)} y1={yA} x2={ex(yA)} y2={yA} stroke="#a49d90" strokeWidth="1.6"/>
          </g>
        );
      })()}
      {/* Compound wall to the north */}
      <rect x="-116" y="158" width="516" height="42" fill="#ece6da"/>
      <rect x="-116" y="155" width="516" height="4" fill="#cfc6b6"/>
      {[-116, -12, 140, 204, 268, 332, 394].map(x => <rect key={x} x={x} y="152" width="8" height="48" fill="#ddd5c6"/>)}
      {grill([-116, 155], [400, 155], "gn", 4.5, 13, [30, 86])}
      {/* 8 ft gate where the lane meets the wall */}
      <rect x="32" y="148" width="8" height="52" fill="#ddd5c6"/>
      <rect x="76" y="148" width="8" height="52" fill="#ddd5c6"/>
      <rect x="40" y="162" width="36" height="38" fill="#f7f4ee" stroke="#b8b0a2" strokeWidth="1"/>
      <line x1="58" y1="162" x2="58" y2="200" stroke="#b8b0a2" strokeWidth="1"/>
      {[168, 175, 182, 189].map(y => <line key={y} x1="40" y1={y} x2="76" y2={y} stroke="#cfc6b6" strokeWidth="1.2"/>)}
      {/* Garden ground */}
      <rect x="-290" y="198" width="1180" height="720" fill="#7aaa6e"/>
      {/* Main road from the gate, parallel to the house's side walls */}
      <polygon points={pts([47, 200], [69, 200], [ns(69, 200, 380), 380], [ns(47, 200, 380), 380])} fill="#d3cfc6" stroke="#b3aea4" strokeWidth="1"/>
      {/* Garden lights: short white bollards with black bands, along both edges of the main road */}
      {[222, 262, 302, 342].flatMap(y => [[ns(47, 200, y) - 4, y], [ns(69, 200, y) + 4, y]]).map(([x, y], i) => (
        <g key={`gl${i}`}>
          <rect x={x - 1.6} y={y - 11} width="3.2" height="11" rx="0.6" fill="#f4f3ef" stroke="#b9b6ae" strokeWidth="0.4"/>
          <rect x={x - 1.6} y={y - 6.5} width="3.2" height="2" fill="#26272b"/>
          <rect x={x - 1.9} y={y - 12} width="3.8" height="1.6" rx="0.5" fill="#26272b"/>
        </g>
      ))}
      {/* 14 ft internal road running west to east across the south of the compound,
          lined with photinia and syzygium hedges (1 ft is about 4.4 px) */}
      {(() => {
        const yN = 376, yS = 438;                          // north and south edges of the road
        const W = (y) => ns(-116, 200, y + 42), E = (y) => ns(400, 200, y);
        // Roads that cross the north hedges: the main road and the road from the stairs
        const crossings = (y) => [[ns(47, 200, y), ns(69, 200, y)], [ns(378, 308, y + 58), ns(394, 308, y + 58)]];
        const inGap = (x, y) => crossings(y).some(([g0, g1]) => x > g0 - 7 && x < g1 + 7);
        const G = 22;                                      // 5 ft of carpet grass between paired hedges
        // South of the road, a 5 ft path runs along each side wall, just inside the palms (about 3 ft from the wall)
        const sidePaths = (y) => [[W(y) + 20, W(y) + 42], [E(y) - 42, E(y) - 20]];
        const onSidePath = (x, y) => sidePaths(y).some(([p0, p1]) => x > p0 - 6 && x < p1 + 6);
        const bush = (x, yb, i, key) => i % 2 === 0 ? (
          <g key={key}>
            {/* Photinia: green with red new growth on top */}
            <ellipse cx={x} cy={yb - 5} rx="6.5" ry="5.5" fill="#3f6b3a"/>
            <ellipse cx={x - 2} cy={yb - 9} rx="3" ry="2" fill="#c0392b"/>
            <ellipse cx={x + 2.5} cy={yb - 8.5} rx="2.6" ry="1.8" fill="#d9503f"/>
            <ellipse cx={x} cy={yb - 10} rx="2" ry="1.4" fill="#e0614f"/>
          </g>
        ) : (
          <g key={key}>
            {/* Syzygium: dense glossy green */}
            <ellipse cx={x} cy={yb - 5} rx="6.5" ry="5.8" fill="#2f5d2e"/>
            <ellipse cx={x - 2} cy={yb - 7.5} rx="2.6" ry="1.8" fill="#4f8a43"/>
            <ellipse cx={x + 2.5} cy={yb - 5} rx="2.2" ry="1.5" fill="#4f8a43"/>
          </g>
        );
        const hedge = (yb, key) => {
          const out = [];
          for (let x = W(yb) + 5, i = 0; x < E(yb) - 4; x += 10, i++) {
            if (key.startsWith("n") && inGap(x, yb)) continue;
            if (key.startsWith("s") && onSidePath(x, yb)) continue;
            out.push(bush(x, yb, i, `${key}${i}`));
            out.push(
              <g key={`${key}f${i}`} stroke="#c9a96b">
                <line x1={x - 5} y1={yb - 1.5} x2={x + 5} y2={yb - 1.5} strokeWidth="0.9"/>
                <line x1={x - 5} y1={yb - 5} x2={x + 5} y2={yb - 5} strokeWidth="0.9"/>
                <line x1={x - 5} y1={yb + 1} x2={x - 5} y2={yb - 7} strokeWidth="1.1" stroke="#b8975a"/>
              </g>
            );
          }
          return out;
        };
        return (
          <g>
            <polygon points={pts([W(yN), yN], [E(yN), yN], [E(yS), yS], [W(yS), yS])} fill="#cfc8bb"/>
            <line x1={W(yN)} y1={yN} x2={E(yN)} y2={yN} stroke="#a8a193" strokeWidth="1"/>
            <line x1={W(yS)} y1={yS} x2={E(yS)} y2={yS} stroke="#a8a193" strokeWidth="1"/>
            {/* Carpet grass between each pair of hedges, with the crossing roads drawn over it */}
            {[[yN - G, yN - 1], [yS + 9, yS + 9 + G]].map(([y0, y1], i) => (
              <polygon key={`cg${i}`} points={pts([W(y0), y0], [E(y0), y0], [E(y1), y1], [W(y1), y1])} fill="#8fca72"/>
            ))}
            {crossings(0).map((_, i) => {
              const c0 = crossings(yN - G)[i], c1 = crossings(yN)[i];
              return <polygon key={`cr${i}`} points={pts([c0[0], yN - G], [c0[1], yN - G], [c1[1], yN], [c1[0], yN])} fill="#d3cfc6"/>;
            })}
            {/* 5 ft side paths south of the road, through the south hedges */}
            {[0, 1].map(i => {
              const y0 = yS, y1 = 900, a0 = sidePaths(y0)[i], a1 = sidePaths(y1)[i];
              return <polygon key={`sp${i}`} points={pts([a0[0], y0], [a0[1], y0], [a1[1], y1], [a1[0], y1])} fill="#d3cfc6" stroke="#b3aea4" strokeWidth="1"/>;
            })}
            {hedge(yN - G, "n2")}
            {hedge(yN - 1, "n")}
            {hedge(yS + 9, "s")}
            {hedge(yS + 9 + G, "s2")}
            {/* White iron canopy swings beside the side paths, drawn in the same 3D view as the house.
                Each swings east-west: A-frames at the north and south ends, a long iron bench hanging
                from a north-south beam, and a pitched white canopy. They face each other across the lawn. */}
            {[[sidePaths(508)[0][1] + 24, 508, 1], [sidePaths(508)[1][0] - 30, 508, -1]].map(([cx, yb, face], i) => {
              const white = "#f4f3ef", shade = "#dddbd4", edge = "#9d9a92";
              const L = 0.86, Z = 32, sp = 12;                       // bench length (north-south), beam height, leg spread
              const P = (x, t, z) => [cx + x + D[0] * t, yb + D[1] * t - z];
              const seg = (p, q, w, c = white, k) => <line key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={c} strokeWidth={w} strokeLinecap="round"/>;
              const frame = (t, k) => (
                <g key={k}>
                  {seg(P(-sp, t, 0), P(0, t, Z), 2.6, edge, "a")}{seg(P(sp, t, 0), P(0, t, Z), 2.6, edge, "b")}
                  {seg(P(-sp, t, 0), P(0, t, Z), 1.7, white, "c")}{seg(P(sp, t, 0), P(0, t, Z), 1.7, white, "d")}
                  {seg(P(-sp * 0.3, t, Z * 0.72), P(sp * 0.3, t, Z * 0.72), 1.2, white, "e")}
                </g>
              );
              const t0 = 0.06, t1 = L - 0.06, bw = 6, zs = 10, zb = 20;
              const backX = -face * bw;                              // backrest on the side facing away from the other swing
              // Armrests at both ends and between the three seats
              const armrests = (ta, tb, z) => [0, 1 / 3, 2 / 3, 1].map(u => {
                const t = ta + (tb - ta) * u;
                return <polyline key={`ar${u}`} points={pts(P(backX, t, z + 6), P(-backX * 0.6, t, z + 6), P(-backX * 0.6, t, z))} fill="none" stroke={edge} strokeWidth="0.9"/>;
              });
              const bench = (
                <g>
                  {[t0, t1].map(t => [seg(P(0, t, Z), P(-bw, t, zs), 0.8, edge, `h1${t}`), seg(P(0, t, Z), P(bw, t, zs), 0.8, edge, `h2${t}`)])}
                  <polygon points={pts(P(backX, t0, zs), P(backX, t1, zs), P(backX, t1, zb), P(backX, t0, zb))} fill={white} stroke={edge} strokeWidth="0.7"/>
                  {[0.33, 0.66].map(u => seg(P(backX, t0, zs + (zb - zs) * u), P(backX, t1, zs + (zb - zs) * u), 0.5, edge, `bs${u}`))}
                  <polygon points={pts(P(-bw, t0, zs), P(bw, t0, zs), P(bw, t1, zs), P(-bw, t1, zs))} fill={shade} stroke={edge} strokeWidth="0.7"/>
                  {[-2, 2].map(x => seg(P(x, t0, zs), P(x, t1, zs), 0.5, edge, `ss${x}`))}
                  <polygon points={pts(P(-bw, t0, zs), P(bw, t0, zs), P(bw, t0, zs - 2), P(-bw, t0, zs - 2))} fill={white} stroke={edge} strokeWidth="0.5"/>
                  {armrests(t0, t1, zs)}
                </g>
              );
              const r0 = -0.06, r1 = L + 0.06, zr = Z + 7, ew = 15;
              // Separate tiled concrete plinths: one under the swing, one under its bench
              const plinth = (t0, t1, w, k) => {
                const nx = Math.max(2, Math.round(w / 6)), ny = Math.max(2, Math.round((t1 - t0) / 0.1));
                return (
                  <g key={k}>
                    <polygon points={pts(P(-w, t0, 0), P(w, t0, 0), P(w, t0, -2), P(-w, t0, -2))} fill="#b5afa2"/>
                    <polygon points={pts(P(-w, t0, 0), P(w, t0, 0), P(w, t1, 0), P(-w, t1, 0))} fill="#d2cdc3" stroke="#aaa497" strokeWidth="0.8"/>
                    {Array.from({ length: nx - 1 }, (_, j) => -w + (2 * w * (j + 1)) / nx).map(x => seg(P(x, t0, 0), P(x, t1, 0), 0.4, "#b5afa2", `tx${x}`))}
                    {Array.from({ length: ny - 1 }, (_, j) => t0 + ((t1 - t0) * (j + 1)) / ny).map(t => seg(P(-w, t, 0), P(w, t, 0), 0.4, "#b5afa2", `ty${t}`))}
                  </g>
                );
              };
              const pad = (
                <g>
                  {plinth(-0.08, L + 0.08, 19, "ps")}
                  {plinth(-1.9, -1.1, 10, "pb1")}
                </g>
              );
              // Benches like the swing's (same size, slats and backrest), standing on legs under a white canopy
              const gardenBench = (ta, tb, k) => {
                const zs2 = 7, zb2 = zs2 + (zb - zs), bx = -face * bw;
                return (
                  <g key={k}>
                    {[ta, tb].flatMap(t => [seg(P(-bw, t, 0), P(-bw, t, zs2), 1.1, edge, `l1${t}`), seg(P(bw, t, 0), P(bw, t, zs2), 1.1, edge, `l2${t}`)])}
                    <polygon points={pts(P(bx, ta, zs2), P(bx, tb, zs2), P(bx, tb, zb2), P(bx, ta, zb2))} fill={white} stroke={edge} strokeWidth="0.7"/>
                    {[0.33, 0.66].map(u => seg(P(bx, ta, zs2 + (zb2 - zs2) * u), P(bx, tb, zs2 + (zb2 - zs2) * u), 0.5, edge, `bk${u}`))}
                    <polygon points={pts(P(-bw, ta, zs2), P(bw, ta, zs2), P(bw, tb, zs2), P(-bw, tb, zs2))} fill={shade} stroke={edge} strokeWidth="0.7"/>
                    {[-2, 2].map(x => seg(P(x, ta, zs2), P(x, tb, zs2), 0.5, edge, `bs${x}`))}
                    <polygon points={pts(P(-bw, ta, zs2), P(bw, ta, zs2), P(bw, ta, zs2 - 2), P(-bw, ta, zs2 - 2))} fill={white} stroke={edge} strokeWidth="0.5"/>
                    {armrests(ta, tb, zs2)}
                    {/* White canopy on four slim posts, like the swing's */}
                    {(() => {
                      const zt = 28, zr2 = zt + 7, w3 = 9, ra = ta + 0.05, rb = tb - 0.05;
                      const corners = [[-w3, tb], [w3, tb], [-w3, ta], [w3, ta]];
                      return (
                        <g>
                          {corners.map(([x, t], j) => seg(P(x, t, 0), P(x, t, zt), 1.4, white, `cp${j}`))}
                          <polygon points={pts(P(-14, ra, zt), P(-14, rb, zt), P(0, rb, zr2), P(0, ra, zr2))} fill={shade} stroke={edge} strokeWidth="0.8"/>
                          <polygon points={pts(P(14, ra, zt), P(14, rb, zt), P(0, rb, zr2), P(0, ra, zr2))} fill={white} stroke={edge} strokeWidth="0.8"/>
                        </g>
                      );
                    })()}
                  </g>
                );
              };
              return (
                <g key={`swing${i}`}>
                  {pad}
                  {frame(L, "back")}
                  {seg(P(0, 0, Z), P(0, L, Z), 2, edge, "beam")}
                  {bench}
                  {frame(0, "front")}
                  {/* Pitched white canopy, ridge running north-south */}
                  <polygon points={pts(P(-ew, r0, Z), P(-ew, r1, Z), P(0, r1, zr), P(0, r0, zr))} fill={shade} stroke={edge} strokeWidth="0.8"/>
                  <polygon points={pts(P(ew, r0, Z), P(ew, r1, Z), P(0, r1, zr), P(0, r0, zr))} fill={white} stroke={edge} strokeWidth="0.8"/>
                  {gardenBench(-1.16, -1.84, "gb1")}
                </g>
              );
            })}
          </g>
        );
      })()}
      {/* Block-paved roads outside the west and east walls, with a drain along each wall */}
      {(() => {
        const west = (y) => ns(-116, 200, y), east = (y) => ns(400, 200, y), y0 = 196, y1 = 900;
        const wallLean = 42 * K;      // the east wall's top edge sits this far right of its base
        const RW = 26 * 4.4;          // road width, 26 ft
        const drain = (xa, xb) => (
          <g>
            <polygon points={pts([xa(y0), y0], [xb(y0), y0], [xb(y1), y1], [xa(y1), y1])} fill="#56636a"/>
            <polyline points={pts([xa(y0), y0], [xa(y1), y1])} fill="none" stroke="#8a8f90" strokeWidth="1"/>
            <polyline points={pts([xb(y0), y0], [xb(y1), y1])} fill="none" stroke="#8a8f90" strokeWidth="1"/>
          </g>
        );
        return (
          <g>
            {/* Beyond the roads: nothing drawn; it blends into the sky so the compound stands on its own */}
            <polygon points={pts([-290, y0], [west(y0) - RW, y0], [west(y1) - RW, y1], [-290, y1])} fill="url(#cg-sky-fade)"/>
            <polygon points={pts([east(y0) + wallLean + RW, y0], [890, y0], [890, y1], [east(y1) + wallLean + RW, y1])} fill="url(#cg-sky-fade)"/>
            {/* 26 ft roads, with a kerb on the outer edge */}
            <polygon points={pts([west(y0) - RW, y0], [west(y0), y0], [west(y1), y1], [west(y1) - RW, y1])} fill="url(#cg-pavers)"/>
            <polygon points={pts([east(y0), y0], [east(y0) + wallLean + RW, y0], [east(y1) + wallLean + RW, y1], [east(y1), y1])} fill="url(#cg-pavers)"/>
            <polyline points={pts([west(y0) - RW, y0], [west(y1) - RW, y1])} fill="none" stroke="#a49d90" strokeWidth="1.6"/>
            <polyline points={pts([east(y0) + wallLean + RW, y0], [east(y1) + wallLean + RW, y1])} fill="none" stroke="#a49d90" strokeWidth="1.6"/>
            {drain((y) => west(y) - 7, west)}
            {/* East drain: drawn just clear of the wall so it isn't hidden behind it */}
            {drain((y) => east(y) + wallLean, (y) => east(y) + wallLean + 7)}
          </g>
        );
      })()}
      {/* Compound wall on the west, to the left of the tank, pond and small courtyard */}
      {(() => {
        const H = 42, x = (y) => ns(-116, 200, y), y0 = 200, y1 = 900;
        const pillars = [236, 290, 350, 420];
        return (
          <g>
            <polygon points={pts([x(y0), y0 - H], [x(y1), y1 - H], [x(y1), y1], [x(y0), y0])} fill="#e3dccd"/>
            <polygon points={pts([x(y0), y0 - H - 3], [x(y1), y1 - H - 3], [x(y1), y1 - H], [x(y0), y0 - H])} fill="#cfc6b6"/>
            {grill([x(y0), y0 - H - 3], [x(y1), y1 - H - 3], `g${x(0)}`, 3.6, 13, x(0) < 0 ? [x(414), x(484)] : [x(372), x(442)])}
            {/* Wide gate where the 14 ft internal road meets this wall */}
            {(() => {
              // The road meets the west wall along its top edge in this view, so that gate sits 42 px further along
              const g0 = x(0) < 0 ? 418 : 376, g1 = g0 + 62, gh = H - 4;
              const slats = [0.2, 0.4, 0.6, 0.8];
              return (
                <g>
                  <polygon points={pts([x(g0), g0], [x(g1), g1], [x(g1), g1 - gh], [x(g0), g0 - gh])} fill="#f7f4ee" stroke="#b8b0a2" strokeWidth="1"/>
                  {slats.map(t => <line key={t} x1={x(g0)} y1={g0 - gh * t} x2={x(g1)} y2={g1 - gh * t} stroke="#cfc6b6" strokeWidth="1.2"/>)}
                  <line x1={x((g0 + g1) / 2)} y1={(g0 + g1) / 2} x2={x((g0 + g1) / 2)} y2={(g0 + g1) / 2 - gh} stroke="#b8b0a2" strokeWidth="1"/>
                  {[g0 - 4, g1].map(y => (
                    <polygon key={y} points={pts([x(y), y], [x(y + 5), y + 5], [x(y + 5), y + 5 - H - 6], [x(y), y - H - 6])} fill="#ddd5c6" stroke="#cfc6b6" strokeWidth="0.6"/>
                  ))}
                </g>
              );
            })()}
            {pillars.map(y => (
              <polygon key={y} points={pts([x(y) - 3, y - H - 4], [x(y + 6) + 3, y + 6 - H - 4], [x(y + 6) + 3, y + 6], [x(y) - 3, y])} fill="#d6cebf"/>
            ))}
          </g>
        );
      })()}
      {/* Tall white iron tower with two stacked blue tanks (unfiltered and filtered), between the wall and the pond */}
      {(() => {
        const white = "#f4f3ef", shade = "#d9d7d0", edge = "#a9a69e";
        const cx = 6, base = 205, top = 118;                 // stand footing and top of the legs
        const legs = [[-14, 0], [14, 0], [-10, -6], [10, -6]];  // front pair, then the rear pair
        const xs = (dx) => cx + dx;
        return (
          <g>
            {/* Rear legs, then front legs */}
            {[legs[2], legs[3], legs[0], legs[1]].map(([dx, dy], i) => (
              <line key={`lg${i}`} x1={xs(dx)} y1={base + dy} x2={xs(dx * 0.7)} y2={top + dy * 0.5} stroke={i < 2 ? shade : white} strokeWidth={i < 2 ? 2 : 2.6}/>
            ))}
            {/* Cross-bracing on the front face */}
            {[[base, base - 36], [base - 36, base - 72], [base - 72, top]].map(([y0, y1], i) => {
              const w0 = 14 - (base - y0) * 0.042, w1 = 14 - (base - y1) * 0.042;
              return (
                <g key={`br${i}`}>
                  <line x1={xs(-w0)} y1={y0} x2={xs(w1)} y2={y1} stroke={white} strokeWidth="1.1"/>
                  <line x1={xs(w0)} y1={y0} x2={xs(-w1)} y2={y1} stroke={white} strokeWidth="1.1"/>
                  <line x1={xs(-w1)} y1={y1} x2={xs(w1)} y2={y1} stroke={white} strokeWidth="1.4"/>
                </g>
              );
            })}
            {/* Ladder up the right leg */}
            <line x1={xs(17)} y1={base} x2={xs(13)} y2={top - 4} stroke={edge} strokeWidth="0.8"/>
            {Array.from({ length: 12 }, (_, i) => base - 8 - i * 9).map(y => (
              <line key={y} x1={xs(14 - (base - y) * 0.042)} y1={y} x2={xs(17 - (base - y) * 0.037)} y2={y} stroke={edge} strokeWidth="0.6"/>
            ))}
            {/* Two blue tanks stacked in the iron frame: unfiltered below, filtered above */}
            {(() => {
              const blue = "#2f6db5", blueShade = "#24589a", rib = "#5b8fd0";
              const w = 30, h = 26, gap = 6, plat = (y) => (
                <rect x={xs(-20)} y={y} width="40" height="3.5" fill={shade} stroke={edge} strokeWidth="0.6"/>
              );
              const tank = (yBase, k) => (
                <g key={k}>
                  <rect x={xs(-w / 2)} y={yBase - h} width={w} height={h} rx="2" fill={blue}/>
                  <rect x={xs(w / 2 - 8)} y={yBase - h} width="8" height={h} rx="2" fill={blueShade}/>
                  {[yBase - h * 0.68, yBase - h * 0.36].map(y => <line key={y} x1={xs(-w / 2)} y1={y} x2={xs(w / 2)} y2={y} stroke={rib} strokeWidth="0.8"/>)}
                  <path d={`M${xs(-w / 2)},${yBase - h} Q${cx},${yBase - h - 7} ${xs(w / 2)},${yBase - h}`} fill={blue}/>
                  <rect x={xs(-3)} y={yBase - h - 7} width="6" height="3" rx="1" fill={blueShade}/>
                </g>
              );
              const y1 = top, y2 = top - h - gap - 6;               // lower and upper platforms
              return (
                <g>
                  {plat(y1)}
                  {tank(y1, "lower")}
                  {/* Frame posts and braces holding the upper platform */}
                  {[-19, 19].map(dx => <line key={`up${dx}`} x1={xs(dx)} y1={y1} x2={xs(dx)} y2={y2} stroke={white} strokeWidth="2"/>)}
                  <line x1={xs(-19)} y1={y1} x2={xs(19)} y2={y2 + 4} stroke={white} strokeWidth="0.9"/>
                  {plat(y2)}
                  {tank(y2, "upper")}
                  {/* Pipe between the tanks, through a filter */}
                  <line x1={xs(22)} y1={y2 - 6} x2={xs(22)} y2={y1 - 8} stroke={edge} strokeWidth="1.6"/>
                  <rect x={xs(19.5)} y={(y1 + y2) / 2 - 8} width="5" height="8" rx="1" fill="#7f9aa8" stroke={edge} strokeWidth="0.5"/>
                </g>
              );
            })()}
            {/* Footings */}
            {[legs[0], legs[1]].map(([dx], i) => <rect key={`ft${i}`} x={xs(dx) - 3} y={base - 1} width="6" height="3" fill={shade}/>)}
          </g>
        );
      })()}
      {/* Fish pond: long side parallel to the main road, on its left, inside a raised wall
          about 3 ft high and 1 ft thick (the 5 ft lane is 22 px, so 1 ft is about 4.4 px) */}
      {(() => {
        const r = (y) => ns(26, 200, y), l = (y) => r(y) - 40;
        const H = 13, T = 4.4, up = ([x, y], h) => [x, y - h];
        // Outer corners at ground level (back-left, back-right, front-right, front-left)
        const oBL = [l(208) - T, 208], oBR = [r(208) + T, 208], oFR = [r(296) + T, 296], oFL = [l(296) - T, 296];
        const iBL = [l(212), 212], iBR = [r(212), 212], iFR = [r(292), 292], iFL = [l(292), 292];
        const wd = 3;   // water sits a little below the top of the wall
        const fy = (y) => y - (H - wd);
        return (
          <g>
            {/* Outer faces you can see: the left side and the front */}
            <polygon points={pts(oBL, oFL, up(oFL, H), up(oBL, H))} fill="#8f8270"/>
            <polygon points={pts(oFL, oFR, up(oFR, H), up(oFL, H))} fill="#a3957f"/>
            {/* Top of the wall */}
            <polygon points={pts(up(oBL, H), up(oBR, H), up(oFR, H), up(oFL, H))} fill="#c2b49e"/>
            {/* Inner faces you can see above the water: the back and the right side */}
            <polygon points={pts(up(iBL, H), up(iBR, H), up(iBR, H - wd), up(iBL, H - wd))} fill="#8f8270"/>
            <polygon points={pts(up(iBR, H), up(iFR, H), up(iFR, H - wd), up(iBR, H - wd))} fill="#7f7362"/>
            {/* Water */}
            <polygon points={pts(up(iBL, H - wd), up(iBR, H - wd), up(iFR, H - wd), up(iFL, H - wd))} fill="url(#cg-water)"/>
            <ellipse cx={l(225) + 10} cy={fy(225)} rx="5" ry="3" fill="#5a8a4a"/>
            <ellipse cx={l(255) + 28} cy={fy(255)} rx="4.5" ry="2.8" fill="#5a8a4a"/>
            <ellipse cx={l(280) + 12} cy={fy(280)} rx="4" ry="2.5" fill="#5a8a4a"/>
            {[[238, 18, 1], [266, 24, -1], [258, 10, 1]].map(([y, dx, d], i) => (
              <g key={`f${i}`} transform={`translate(${l(y) + dx},${fy(y)}) rotate(${d > 0 ? 54 : 234})`}>
                <ellipse cx="0" cy="0" rx="4" ry="1.6" fill={i === 1 ? "#f5f0e8" : "#d4743a"}/>
                <path d="M-3.5,0 L-6.5,-2 L-6.5,2 Z" fill={i === 1 ? "#f5f0e8" : "#d4743a"}/>
              </g>
            ))}
          </g>
        );
      })()}
      {/* Smaller courtyard left of the main road, continuing on from where the pond ends */}
      {(() => {
        const r = (y) => ns(42, 200, y), l = (y) => ns(-20, 200, y), y0 = 304, y1 = 342;
        const bl = [l(y0), y0], br = [r(y0), y0], fr = [r(y1), y1], fl = [l(y1), y1];
        const edge = (p, q, n) => Array.from({ length: n + 1 }, (_, i) => [p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]);
        const dots = [...edge(bl, br, 8), ...edge(br, fr, 5).slice(1), ...edge(fr, fl, 8).slice(1), ...edge(fl, bl, 5).slice(1, -1)];
        return (
          <g>
            <polygon points={pts(bl, br, fr, fl)} fill="#c8c4bc" stroke="#a8a49c" strokeWidth="1"/>
            {plantEdges(dots, 0.5)}
          </g>
        );
      })()}
      {/* Compound wall on the east, to the right of the stairs, running front to back */}
      {(() => {
        const H = 42, x = (y) => ns(400, 200, y), y0 = 200, y1 = 900;
        const pillars = [236, 290, 350, 420];
        return (
          <g>
            <polygon points={pts([x(y0), y0 - H], [x(y1), y1 - H], [x(y1), y1], [x(y0), y0])} fill="#e3dccd"/>
            <polygon points={pts([x(y0), y0 - H - 3], [x(y1), y1 - H - 3], [x(y1), y1 - H], [x(y0), y0 - H])} fill="#cfc6b6"/>
            {grill([x(y0), y0 - H - 3], [x(y1), y1 - H - 3], `g${x(0)}`, 3.6, 13, x(0) < 0 ? [x(414), x(484)] : [x(372), x(442)])}
            {/* Wide gate where the 14 ft internal road meets this wall */}
            {(() => {
              // The road meets the west wall along its top edge in this view, so that gate sits 42 px further along
              const g0 = x(0) < 0 ? 418 : 376, g1 = g0 + 62, gh = H - 4;
              const slats = [0.2, 0.4, 0.6, 0.8];
              return (
                <g>
                  <polygon points={pts([x(g0), g0], [x(g1), g1], [x(g1), g1 - gh], [x(g0), g0 - gh])} fill="#f7f4ee" stroke="#b8b0a2" strokeWidth="1"/>
                  {slats.map(t => <line key={t} x1={x(g0)} y1={g0 - gh * t} x2={x(g1)} y2={g1 - gh * t} stroke="#cfc6b6" strokeWidth="1.2"/>)}
                  <line x1={x((g0 + g1) / 2)} y1={(g0 + g1) / 2} x2={x((g0 + g1) / 2)} y2={(g0 + g1) / 2 - gh} stroke="#b8b0a2" strokeWidth="1"/>
                  {[g0 - 4, g1].map(y => (
                    <polygon key={y} points={pts([x(y), y], [x(y + 5), y + 5], [x(y + 5), y + 5 - H - 6], [x(y), y - H - 6])} fill="#ddd5c6" stroke="#cfc6b6" strokeWidth="0.6"/>
                  ))}
                </g>
              );
            })()}
            {pillars.map(y => (
              <polygon key={y} points={pts([x(y) - 3, y - H - 4], [x(y + 6) + 3, y + 6 - H - 4], [x(y + 6) + 3, y + 6], [x(y) - 3, y])} fill="#d6cebf"/>
            ))}
          </g>
        );
      })()}
      {/* 10 ft foxtail palms along the inside of the west and east walls, about 3 ft from each wall
          (1 ft is about 4.4 px). On the west, the ground meets the wall along the top of its face. */}
      {(() => {
        const palm = (x, y, key) => {
          const h = 44, trunkTop = y - h + 10;
          const fronds = [-70, -40, -15, 10, 35, 60, 85, 115, 140, 170, 200, 230];
          return (
            <g key={key}>
              <path d={`M${x - 1.6},${y} L${x - 1},${trunkTop} L${x + 1},${trunkTop} L${x + 1.6},${y} Z`} fill="#9b9182"/>
              {[0.2, 0.4, 0.6, 0.8].map(t => <line key={t} x1={x - 1.5} y1={y - (y - trunkTop) * t} x2={x + 1.5} y2={y - (y - trunkTop) * t} stroke="#7e7466" strokeWidth="0.5"/>)}
              <rect x={x - 1.4} y={trunkTop - 3} width="2.8" height="4" fill="#6f9a52"/>
              {fronds.map((deg, i) => {
                const r = (deg * Math.PI) / 180, len = 11 + (i % 3);
                const ex = x + Math.cos(r) * len, ey = trunkTop - 3 + Math.sin(r) * len * 0.6 + 3;
                const mx = x + Math.cos(r) * len * 0.5, my = trunkTop - 3 - 5 + Math.sin(r) * len * 0.3;
                return <path key={i} d={`M${x},${trunkTop - 3} Q${mx},${my} ${ex},${ey}`} fill="none" stroke={i % 2 ? "#3f7a3a" : "#4f8f44"} strokeWidth="3.2" strokeLinecap="round"/>;
              })}
            </g>
          );
        };
        const westX = (y) => ns(-116, 200, y + 42) + 13;
        const eastX = (y) => ns(400, 200, y) - 10;
        const trees = [
          ...[222, 262, 302, 342, 498, 538, 578, 618, 658, 698, 738, 778, 818].map(y => [westX(y), y]),
          ...[272, 312, 352, 498, 538, 578, 618, 658, 698, 738, 778, 818].map(y => [eastX(y), y]),
        ].sort((p, q) => p[1] - q[1]);
        return <g>{trees.map(([x, y], i) => palm(x, y, `palm${i}`))}</g>;
      })()}
      {/* Volleyball court, 40 ft east-west by 20 ft north-south (1 ft is about 4.4 px), south of the
                east bench, its east end 3 ft from the east path. Enclosed by ball-stop netting with a centre net. */}
            {(() => {
              const ftPx = 4.4, lenPx = 40 * ftPx, depPx = 20 * ftPx;
              const yN = 704, yS2 = yN + depPx;
              const E2 = (y) => ns(400, 200, y), xE = (y) => (E2(y) - 42) - 3 * ftPx;   // 3 ft west of the east path
              const xW = (y) => xE(y) - lenPx;
              const NE = [xE(yN), yN], NW = [xW(yN), yN], SE = [xE(yS2), yS2], SW = [xW(yS2), yS2];
              const up = ([x, y], z) => [x, y - z];
              const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
              const Hn = 78, Hv = 34, pole = "#f4f3ef";   // white iron posts   // ball-stop nets about 18 ft, just under the 20 ft lights
              const mesh = (p, q, k) => (
                <g key={k}>
                  <polygon points={pts(p, q, up(q, Hn), up(p, Hn))} fill="url(#cg-mesh)"/>
                  <line x1={p[0]} y1={p[1] - Hn} x2={q[0]} y2={q[1] - Hn} stroke={pole} strokeWidth="0.9"/>
                </g>
              );
              const poles = (p, q, n, k) => Array.from({ length: n + 1 }, (_, j) => lerp(p, q, j / n)).map((c, j) => (
                <g key={`${k}${j}`}>
                  {/* Poles striped in black and white bands, with a hook at the top */}
                  <line x1={c[0]} y1={c[1]} x2={c[0]} y2={c[1] - Hn} stroke="#f4f3ef" strokeWidth="1.8"/>
                  <line x1={c[0]} y1={c[1]} x2={c[0]} y2={c[1] - Hn} stroke="#26272b" strokeWidth="1.8" strokeDasharray="4 4"/>
                  <path d={`M${c[0]},${c[1] - Hn} q2,-2 0,-4`} fill="none" stroke="#26272b" strokeWidth="0.8"/>
                </g>
              ));
              const inset = (t, u) => lerp(lerp(NW, NE, t), lerp(SW, SE, t), u);
              // 20 ft (about 88 px) floodlight on each corner, lamp angled toward the court
              const light = ([x, y], dir, k) => {
                const top = y - 20 * ftPx, c = inset(0.5, 0.5);
                const ang = Math.atan2(c[1] - top, c[0] - x);            // aim at the middle of the court
                const ca = Math.cos(ang), sa = Math.sin(ang);
                const R = (u, v) => [x + ca * u - sa * v, top + sa * u + ca * v];
                return (
                  <g key={k}>
                    <line x1={x} y1={y} x2={x} y2={top} stroke="#6a6c72" strokeWidth="2.2"/>
                    {/* Lamp head on the pole top, flaring toward its lens, tilted to face the court */}
                    <polygon points={pts(R(-1, -2), R(10, -6.5), R(10, 6.5), R(-1, 2))} fill="#3d3f45"/>
                    <polygon points={pts(R(9, -6), R(11, -6), R(11, 6), R(9, 6))} fill="#fff6c8"/>
                  </g>
                );
              };
              const nN = inset(0.5, 0.04), nS = inset(0.5, 0.96);
              return (
                <g>
                  {/* Court surface and lines */}
                  <polygon points={pts(NW, NE, SE, SW)} fill="#d9b98a" stroke="#c3a272" strokeWidth="1"/>
                  <polygon points={pts(inset(0.03, 0.06), inset(0.97, 0.06), inset(0.97, 0.94), inset(0.03, 0.94))} fill="none" stroke="#ffffff" strokeWidth="1.2"/>
                  <line x1={nN[0]} y1={nN[1]} x2={nS[0]} y2={nS[1]} stroke="#ffffff" strokeWidth="1.2"/>
                  {[0.33, 0.67].map(t => { const a1 = inset(t, 0.06), b1 = inset(t, 0.94); return <line key={t} x1={a1[0]} y1={a1[1]} x2={b1[0]} y2={b1[1]} stroke="#ffffff" strokeWidth="0.7" strokeDasharray="2 2"/>; })}
                  {/* Ball-stop netting: back and sides first */}
                  {mesh(NW, NE, "mn")}
                  {mesh(NW, SW, "mw")}
                  {mesh(NE, SE, "me")}
                  {poles(NW, NE, 4, "pn")}
                  {/* Centre net across the middle of the court */}
                  {[nN, nS].map((c, j) => <line key={`vp${j}`} x1={c[0]} y1={c[1]} x2={c[0]} y2={c[1] - Hv} stroke={pole} strokeWidth="1.6"/>)}
                  <polygon points={pts(up(nN, Hv), up(nS, Hv), up(nS, Hv - 9), up(nN, Hv - 9))} fill="url(#cg-mesh)" stroke="#f4f3ef" strokeWidth="0.9"/>
                  {/* Front netting and poles */}
                  {mesh(SW, SE, "ms")}
                  {poles(SW, SE, 4, "ps")}
                  {poles(NW, SW, 1, "pw")}
                  {poles(NE, SE, 1, "pe")}
                </g>
              );
            })()}
      {/* Four 20 ft light poles, striped black and white, at the corners of the south field, aimed at its centre */}
      {(() => {
        const W = (y) => ns(-116, 200, y + 42), E = (y) => ns(400, 200, y);
        const yA = 478, yB = 800, H = 20 * 4.4;
        const corners = [[W(yA) + 48, yA], [E(yA) - 48, yA], [W(yB) + 48, yB], [E(yB) - 48, yB]];
        const cx = (corners[0][0] + corners[1][0] + corners[2][0] + corners[3][0]) / 4, cy = (yA + yB) / 2;
        return (
          <g>
            {corners.map(([x, y], i) => {
              const top = y - H, ang = Math.atan2(cy - top, cx - x), ca = Math.cos(ang), sa = Math.sin(ang);
              const R = (u, v) => [x + ca * u - sa * v, top + sa * u + ca * v];
              return (
                <g key={`fl${i}`}>
                  <line x1={x} y1={y} x2={x} y2={top} stroke="#f4f3ef" strokeWidth="2.4"/>
                  <line x1={x} y1={y} x2={x} y2={top} stroke="#26272b" strokeWidth="2.4" strokeDasharray="6 6"/>
                  <polygon points={pts(R(-1, -2), R(10, -6.5), R(10, 6.5), R(-1, 2))} fill="#3d3f45"/>
                  <polygon points={pts(R(9, -6), R(11, -6), R(11, 6), R(9, 6))} fill="#fff6c8"/>
                </g>
              );
            })}
          </g>
        );
      })()}
      {/* The house and everything attached to it sit back near the north wall (under 5 ft away) */}
      <g transform="translate(0, -58)">
      {/* Concrete forecourt in front of the house, edged with flowers */}
      {(() => {
        const bl = [ns(150, 293, 303), 303], br = [ns(350, 293, 303), 303], fr = [ns(350, 293, 380), 380], fl = [ns(150, 293, 380), 380];
        const edge = (p, q, n) => Array.from({ length: n + 1 }, (_, i) => [p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]);
        const dots = [...edge(bl, br, 17), ...edge(br, fr, 5).slice(1), ...edge(fr, fl, 17).slice(1), ...edge(fl, bl, 5).slice(1, -1)];
        return (
          <g>
            <polygon points={pts(bl, br, fr, fl)} fill="#c8c4bc" stroke="#a8a49c" strokeWidth="1"/>
            {plantEdges(dots, 0.55)}
          </g>
        );
      })()}

      {/* Outside staircase on the right: a long, gentle flight running front to back
          beside the house, a landing, then a gate turning left onto the upper floor */}
      {(() => {
        // P(t, z, dx): t = depth (0 = house front, + = further back), z = height above ground,
        // dx = offset east of the stair's west edge
        const P = (t, z, dx = 0) => [362 + dx + D[0] * t, 286 + D[1] * t - z];
        const n = 22, rise = 74, h = rise / n;            // ~6.5 in per step
        const tF = -1.0, t1 = 0.45, t2 = 0.75, ds = (t1 - tF) / n, W = 16, toHouse = -28;
        const wood = "#8a6a44", post = "#6a4a2a";
        const zAt = (t) => rise * (t - tF) / (t1 - tF);
        const out = [];
        // Posts under the flight and the landing
        [-0.55, -0.1, t1].forEach((t, i) => {
          out.push(<line key={`pw${i}`} x1={P(t, zAt(t))[0]} y1={P(t, zAt(t))[1]} x2={P(t, 0)[0]} y2={P(t, 0)[1]} stroke={post} strokeWidth="2"/>);
          out.push(<line key={`pe${i}`} x1={P(t, zAt(t), W)[0]} y1={P(t, zAt(t), W)[1]} x2={P(t, 0, W)[0]} y2={P(t, 0, W)[1]} stroke={post} strokeWidth="2"/>);
        });
        out.push(<line key="pl" x1={P(t2, rise, W)[0]} y1={P(t2, rise, W)[1]} x2={P(t2, 0, W)[0]} y2={P(t2, 0, W)[1]} stroke={post} strokeWidth="2"/>);
        // Landing (with its front face), then the gate into the upper floor
        out.push(<polygon key="land" points={pts(P(t1, rise, toHouse), P(t1, rise, W), P(t2, rise, W), P(t2, rise, toHouse))} fill="#a07c50"/>);
        out.push(<polygon key="landf" points={pts(P(t1, rise, toHouse), P(t1, rise, W), P(t1, rise - 4, W), P(t1, rise - 4, toHouse))} fill={wood}/>);
        const g1 = t1 + 0.06, g2 = t2 - 0.06;
        out.push(<polygon key="gate" points={pts(P(g1, rise + 2, toHouse), P(g2, rise + 2, toHouse), P(g2, rise + 13, toHouse), P(g1, rise + 13, toHouse))} fill="#f7f4ee" stroke="#b8b0a2" strokeWidth="0.8"/>);
        [g1, g2].forEach((t, i) => out.push(<line key={`gp${i}`} x1={P(t, rise, toHouse)[0]} y1={P(t, rise, toHouse)[1]} x2={P(t, rise + 16, toHouse)[0]} y2={P(t, rise + 16, toHouse)[1]} stroke={post} strokeWidth="2"/>));
        // Landing railing: east and back edges
        out.push(<polyline key="lr" points={pts(P(t1, rise + 12, W), P(t2, rise + 12, W), P(t2, rise + 12, toHouse))} fill="none" stroke={post} strokeWidth="1.5"/>);
        // Treads and risers, far to near
        for (let i = n - 1; i >= 0; i--) {
          const a = tF + i * ds, z = (i + 1) * h;
          out.push(<polygon key={`r${i}`} points={pts(P(a, z - h), P(a, z - h, W), P(a, z, W), P(a, z))} fill={post}/>);
          out.push(<polygon key={`t${i}`} points={pts(P(a, z), P(a, z, W), P(a + ds, z, W), P(a + ds, z))} fill={wood}/>);
        }
        // West stringer and east handrail
        out.push(<polygon key="str" points={pts(P(tF, 0), P(t1, rise), P(t1, rise - 6), P(tF + 0.08, 0))} fill="#7a5a34"/>);
        out.push(<line key="hr" x1={P(tF, 12, W)[0]} y1={P(tF, 12, W)[1]} x2={P(t1, rise + 12, W)[0]} y2={P(t1, rise + 12, W)[1]} stroke={post} strokeWidth="1.5"/>);
        [0.15, 0.4, 0.65, 0.9].forEach((u, i) => {
          const t = tF + (t1 - tF) * u;
          out.push(<line key={`b${i}`} x1={P(t, zAt(t) + 12, W)[0]} y1={P(t, zAt(t) + 12, W)[1]} x2={P(t, zAt(t), W)[0]} y2={P(t, zAt(t), W)[1]} stroke={post} strokeWidth="1"/>);
        });
        return out;
      })()}

      {/* === The chang ghar === */}
      {(() => {
        const G = 262;                       // ground-floor deck level (front)
        const deck = [156, 334];             // balcony deck, front edge
        const gw = [172, 318];               // ground-floor walls
        const uw = [182, 308];               // upper-floor walls
        const U = 212;                       // upper-floor level
        const T = 166;                       // top of upper walls / eaves
        const wood = "#8a6a44", post = "#6a4a2a";
        const grillWhite = "#f4f3ef";   // balcony grills are white
        const railing = (a, b, y0, h, n, skip, covered) => {
          // Upper-floor grills are covered with light-blue polycarbonate
          const lerp = (t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
          const panel = (t0, t1) => {
            const p = lerp(t0), q = lerp(t1);
            return <polygon key={`pc${t0}`} points={pts([p[0], p[1] - h], [q[0], q[1] - h], q, p)} fill="rgba(160,210,235,0.5)"/>;
          };
          const out = !covered ? [] : skip ? [panel(0, skip[0]), panel(skip[1], 1)] : [panel(0, 1)];
          out.push(<line key="r" x1={a[0]} y1={a[1] - h} x2={b[0]} y2={b[1] - h} stroke={grillWhite} strokeWidth="1.5"/>);
          for (let i = 1; i < n; i++) {
            const t = i / n; if (skip && t > skip[0] && t < skip[1]) continue;
            const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
            out.push(<line key={i} x1={x} y1={y - h} x2={x} y2={y} stroke={grillWhite} strokeWidth="1"/>);
          }
          return out;
        };
        const fl = [deck[0], G], fr = [deck[1], G];
        const ufl = [deck[0], U], ufr = [deck[1], U];
        // Roof corners (eaves) and ridge
        const eFL = [144, T + 2], eFR = [346, T + 2], eBL = at(eFL, 1), eBR = at(eFR, 1);
        // Pyramid roof: all four slopes meet at a single point above the centre of the eaves
        const apex = [(eFL[0] + eFR[0] + eBL[0] + eBR[0]) / 4, 102];
        const rL = apex, rR = apex;
        const doorBot = (t) => at([gw[0], G], t);
        return (
          <g>
            {(() => {
              // Three steps running corner to corner along the front and left sides
              const slab = 6, R = 3, S = [2, 3], W = [-5, 0], bl0 = at(fl, 1);
              const down = ([x, y], d) => [x, y + d];
              const o = (k) => {
                const dy = slab + k * R;
                return {
                  b: [bl0[0] + k * W[0], bl0[1] + dy],
                  f: [fl[0] + k * (W[0] + S[0]), fl[1] + k * S[1] + dy],
                  r: [fr[0] + k * S[0], fr[1] + k * S[1] + dy],
                };
              };
              const outline = (q, d = 0) => [down(q.b, d), down(q.f, d), down(q.r, d)];
              const band = (p, q) => pts(...p, ...q.reverse());
              const foot = outline(o(3), R);
              // Branch road meets the outer step at the entrance door
              const along = (t) => [foot[1][0] + (foot[0][0] - foot[1][0]) * t, foot[1][1] + (foot[0][1] - foot[1][1]) * t];
              const q1 = along(0.3), q2 = along(0.62);   // lined up with the door in the left wall
              const out = [
                <polygon key="branch" points={pts([ns(69, 258, q2[1]), q2[1]], q2, q1, [ns(69, 258, q1[1]), q1[1]])} fill="#d3cfc6" stroke="#b3aea4" strokeWidth="1"/>,
              ];
              for (let k = 3; k >= 1; k--) {
                out.push(<polygon key={`r${k}`} points={band(outline(o(k)), outline(o(k), R))} fill="#e6d3d1"/>);
                out.push(<polygon key={`t${k}`} points={band(outline(o(k - 1), R), outline(o(k)))} fill="#f8f0ef"/>);
              }
              out.push(<polygon key="r0" points={band(outline(o(0)), outline(o(0), R))} fill="#e6d3d1"/>);
              // Walkway carried up the steps from the branch road to the door
              const edgeAt = (k, t, d = 0) => {
                const e = outline(o(k), d);
                return [e[1][0] + (e[0][0] - e[1][0]) * t, e[1][1] + (e[0][1] - e[1][1]) * t];
              };
              for (let k = 3; k >= 0; k--) {
                out.push(<polygon key={`wk${k}`} points={pts(edgeAt(k, 0.3, R), edgeAt(k, 0.62, R), edgeAt(k, 0.62), edgeAt(k, 0.3))} fill="#e6d3d1"/>);
                if (k > 0) out.push(<polygon key={`wt${k}`} points={pts(edgeAt(k, 0.3), edgeAt(k, 0.62), edgeAt(k - 1, 0.62, R), edgeAt(k - 1, 0.3, R))} fill="#f8f0ef"/>);
              }
              // Flowering plants all along both sides of the path to the entrance
              const plant = (bx, by, k, sc) => out.push(flowerPlant(bx, by, k, sc, `e${k}`));
              const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
              const upperA = [ns(69, 258, q2[1]) + 4, q2[1]], upperB = q2;    // far side of the path
              const lowerA = [ns(69, 258, q1[1]) + 4, q1[1]], lowerB = q1;    // near side
              const steps = [0.08, 0.32, 0.56, 0.8, 1.0];
              steps.forEach((t, i) => { const [x, y] = lerp(upperA, upperB, t); plant(x - 3, y - 2, i, 0.6); });
              steps.forEach((t, i) => { const [x, y] = lerp(lowerA, lowerB, t); plant(x - 1, y + 9, i + 5, 0.55); });
              return out;
            })()}
            {/* Ground deck: top, then front and left faces */}
            <polygon points={pts(fl, fr, at(fr, 1), at(fl, 1))} fill="#a07c50"/>
            <rect x={deck[0]} y={G} width={deck[1] - deck[0]} height="6" fill={wood}/>
            <polygon points={pts(at(fl, 1), fl, [fl[0], G + 6], [at(fl, 1)[0], at(fl, 1)[1] + 6])} fill="#7a5a34"/>
            {/* Ground-floor left wall (with entrance) and front wall */}
            <polygon points={pts([gw[0], U], [gw[0], G], at([gw[0], G], 1), at([gw[0], U], 1))} fill="#b08c5a"/>
            <polygon points={pts([gw[0], U], [gw[0], G], at([gw[0], G], 1), at([gw[0], U], 1))} fill="url(#cg-bamboo)"/>
            <polygon points={pts(doorBot(0.3), doorBot(0.62), [doorBot(0.62)[0], doorBot(0.62)[1] - 36], [doorBot(0.3)[0], doorBot(0.3)[1] - 36])} fill="#5a4028"/>
            <rect x={gw[0]} y={U} width={gw[1] - gw[0]} height={G - U} fill="#c9a46a"/>
            <rect x={gw[0]} y={U} width={gw[1] - gw[0]} height={G - U} fill="url(#cg-bamboo)"/>
            {[188, 234, 280].map(x => <rect key={x} x={x} y={U + 14} width="22" height="20" fill="#3f5f6a" opacity="0.75" rx="1"/>)}
            {/* Ground-floor balcony railings: front, and left side (open at the entrance) */}
            {railing(at(fl, 1), fl, 0, 13, 6, [0.25, 0.7])}
            {railing(fl, fr, 0, 13, 24)}
            {/* Posts at the deck corners, up to the upper floor */}
            {[fl, fr, at(fl, 1)].map(([x, y], i) => <rect key={i} x={x - 2} y={y - (G - U)} width="4" height={G - U} fill={post}/>)}

            {/* Upper deck */}
            <polygon points={pts(ufl, ufr, at(ufr, 1), at(ufl, 1))} fill="#a07c50"/>
            <rect x={deck[0]} y={U} width={deck[1] - deck[0]} height="6" fill={wood}/>
            {/* Upper-floor left and front walls */}
            <polygon points={pts([uw[0], T], [uw[0], U], at([uw[0], U], 1), at([uw[0], T], 1))} fill="#b8966a"/>
            <polygon points={pts([uw[0], T], [uw[0], U], at([uw[0], U], 1), at([uw[0], T], 1))} fill="url(#cg-bamboo)"/>
            <rect x={uw[0]} y={T} width={uw[1] - uw[0]} height={U - T} fill="#d4b37a"/>
            <rect x={uw[0]} y={T} width={uw[1] - uw[0]} height={U - T} fill="url(#cg-bamboo)"/>
            {[196, 235, 274].map(x => <rect key={x} x={x} y={T + 10} width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>)}
            {/* Upper balcony railings: front and left side */}
            {railing(at(ufl, 1), ufl, 0, 12, 6, null, true)}
            {railing(ufl, ufr, 0, 12, 24, null, true)}
            {[ufl, ufr, at(ufl, 1)].map(([x, y], i) => <rect key={i} x={x - 2} y={T} width="4" height={y - T} fill={post}/>)}

            {/* Polycarbonate rain awning: fixed to the house just below the roof, sloping down and out
                over the upper balcony on an iron frame */}
            {(() => {
              const pc = "url(#cg-awning)", iron = "#3e3f46";
              const ya = T + 8;                                     // fixed a little below the eaves
              const iFL = [deck[0], ya], iFR = [deck[1], ya], iBL = at(iFL, 1);
              const south = [-D[0] * 0.22, -D[1] * 0.22], west = [-15, 0], east = [7, 0], drop = 8;
              const oFL = [iFL[0] + south[0] + west[0], iFL[1] + south[1] + drop];
              const oFR = [iFR[0] + south[0] + east[0], iFR[1] + south[1] + drop];
              const oBL = [iBL[0] + west[0], iBL[1] + drop];
              const mid = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
              // Height of the roof edge directly above a point (front eave is level; left eave recedes)
              const eaveY = (x) => x >= eFL[0] ? eFL[1] : eBL[1] + (x - eBL[0]) * (eFL[1] - eBL[1]) / (eFL[0] - eBL[0]);
              const hangers = [
                ...[0, 0.2, 0.4, 0.6, 0.8, 1].map(t => mid(oFL, oFR, t)),
                mid(oFL, oBL, 0.5),
              ];
              return (
                <g>
                  <polygon points={pts(iBL, iFL, oFL, oBL)} fill={pc}/>
                  <polygon points={pts(iFL, iFR, oFR, oFL)} fill={pc}/>
                  {/* Rafters, from the house to the outer rail */}
                  {[0, 0.2, 0.4, 0.6, 0.8, 1].map(t => {
                    const p = mid(iFL, iFR, t), q = mid(oFL, oFR, t);
                    return <line key={`rf${t}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={iron} strokeWidth="0.9"/>;
                  })}
                  {[0.5, 1].map(t => {
                    const p = mid(iFL, iBL, t), q = mid(oFL, oBL, t);
                    return <line key={`rl${t}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={iron} strokeWidth="0.9"/>;
                  })}
                  <polyline points={pts(iBL, iFL, iFR)} fill="none" stroke={iron} strokeWidth="1.2"/>
                  <polyline points={pts(oBL, oFL, oFR)} fill="none" stroke={iron} strokeWidth="1.6"/>
                  {/* Vertical iron hangers from the roof's edge down to the outer rail */}
                  {hangers.map(([x, y], i) => (
                    <line key={`h${i}`} x1={x} y1={eaveY(x)} x2={x} y2={y} stroke={iron} strokeWidth="1.1"/>
                  ))}
                </g>
              );
            })()}
            {/* Pyramid roof: right and front faces, then the left face */}
            <polygon points={pts(eFR, eBR, rR)} fill="#e2e0d9"/>
            <polygon points={pts(eFL, eFR, rR, rL)} fill="#f4f3ef"/>
            <polygon points={pts(eBL, eFL, rL)} fill="#d3d1c9"/>
            <path d={`M${pts(eBL, eFL, eFR)} M${pts(eFL, rL, rR, eFR)}`} fill="none" stroke="#a9a69e" strokeWidth="1.2"/>
            {[0.2, 0.4, 0.6, 0.8].map(t => {
              const a = [eFL[0] + (eFR[0] - eFL[0]) * t, eFL[1]];
              const b = [rL[0] + (rR[0] - rL[0]) * t, rL[1]];
              return <line key={t} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#c4c1b8" strokeWidth="0.6"/>;
            })}

          </g>
        );
      })()}
      {/* Corner sit-out: a small extension of the upper balcony toward the stairs,
          iron frame with clear polycarbonate */}
      {(() => {
        const iron = "#3e3f46", glass = "rgba(200,228,240,0.35)";
        const U = 212, x0 = 334, x1 = 350, ta = -0.02, tb = 0.32;   // east of the balcony corner, near the front
        const Q = (x, t, z = 0) => [x + D[0] * t, U + D[1] * t - z];
        const H = 22;
        return (
          <g>
            <polygon points={pts(Q(x0, ta), Q(x1, ta), Q(x1, tb), Q(x0, tb))} fill="#5a5b62"/>
            <polygon points={pts(Q(x0, ta), Q(x1, ta), Q(x1, ta, -3), Q(x0, ta, -3))} fill={iron}/>
            <polygon points={pts(Q(x0, ta, H), Q(x1, ta, H), Q(x1, ta), Q(x0, ta))} fill={glass} stroke={iron} strokeWidth="0.6"/>
            <polyline points={pts(Q(x0, ta, 10), Q(x1, ta, 10), Q(x1, tb, 10))} fill="none" stroke={iron} strokeWidth="1.3"/>
            {[0.25, 0.5, 0.75].map(u => {
              const x = x0 + (x1 - x0) * u;
              return <line key={u} x1={Q(x, ta)[0]} y1={Q(x, ta)[1]} x2={Q(x, ta, 10)[0]} y2={Q(x, ta, 10)[1]} stroke={iron} strokeWidth="0.8"/>;
            })}
            {[[x1, ta], [x1, tb], [x0, ta]].map(([x, t], i) => (
              <line key={i} x1={Q(x, t)[0]} y1={Q(x, t)[1]} x2={Q(x, t, H)[0]} y2={Q(x, t, H)[1]} stroke={iron} strokeWidth="1.4"/>
            ))}
            <polygon points={pts(Q(x0, ta, H), Q(x1, ta, H - 2), Q(x1, tb, H - 2), Q(x0, tb, H))} fill="rgba(210,235,245,0.6)" stroke={iron} strokeWidth="1"/>
          </g>
        );
      })()}
      {/* Road on the right to the foot of the staircase, parallel to the house */}
      <polygon points={pts([378, 308], [394, 308], [ns(394, 308, 438), 438], [ns(378, 308, 438), 438])} fill="#d3cfc6" stroke="#b3aea4" strokeWidth="1"/>
      </g>
      </g>
    </svg>
  );
}

export function RestaurantSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="60%" stopColor="#2a3a4a"/>
          <stop offset="100%" stopColor="#1a2a2a"/>
        </linearGradient>
        <radialGradient id="rs-warm" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#d4b85e" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#rs-sky)"/>
      {[[60,20,0.8],[140,30,1],[250,15,0.7],[340,28,0.9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.4"/>
      )}
      <g transform="translate(0, 60)">
        {[40,120,200,280,360].map(x =>
          <rect key={x} x={x-2} y="40" width="4" height="140" fill="#6a5a4a" opacity="0.6" rx="1"/>
        )}
        <rect x="30" y="35" width="340" height="8" fill="#3a5a4a" opacity="0.7" rx="2"/>
        <rect x="35" y="30" width="330" height="6" fill="#4a6741" opacity="0.5" rx="1"/>
        {[60,100,140,180,220,260,300,340].map(x =>
          <rect key={x} x={x} y="36" width="2" height="6" fill="#5a7a5a" opacity="0.3"/>
        )}
        <path d="M50,42 Q70,48 90,42 Q110,48 130,42 Q150,48 170,42 Q190,48 210,42 Q230,48 250,42 Q270,48 290,42 Q310,48 330,42 Q350,48 370,42" fill="none" stroke="#d4b85e" strokeWidth="0.5" opacity="0.4"/>
        {[70,110,150,190,230,270,310,350].map((cx,i) =>
          <circle key={cx} cx={cx} cy="46" r="2" fill="#d4b85e" opacity={0.5 + (i%3)*0.15}/>
        )}
        <rect x="40" y="80" width="320" height="90" fill="#d4b85e" opacity="0.04"/>
        {[[90,120,22,12],[160,115,26,14],[240,118,24,12],[310,122,22,10]].map(([x,y,w,h],i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="2" fill="#4a3a2a" opacity="0.4"/>
            <rect x={x+2} y={y+2} width={w-4} height={h-4} rx="1" fill="#d4b85e" opacity="0.03"/>
          </g>
        ))}
        {/* Bar counter */}
        <rect x="44" y="140" width="70" height="30" fill="#5a4a3a" opacity="0.6" rx="1"/>
        <rect x="42" y="137" width="74" height="4" fill="#8a6a44" opacity="0.6" rx="1"/>
        {[52,62,70,80,90,100].map((x,i) =>
          <rect key={x} x={x} y={i%2 ? 127 : 124} width="4" height={i%2 ? 10 : 13} rx="1" fill="#d4b85e" opacity="0.25"/>
        )}
      </g>
      <path d="M0,240 L400,240 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.5"/>
      <rect width="400" height="300" fill="url(#rs-warm)"/>
    </svg>
  );
}

export function YogaDeckSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="yd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3a5a"/>
          <stop offset="40%" stopColor="#4a6a7a"/>
          <stop offset="70%" stopColor="#d4956e"/>
          <stop offset="100%" stopColor="#b8943e"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#yd-sky)"/>
      <path d="M0,160 Q100,140 200,155 Q300,135 400,150 L400,180 L0,180Z" fill="#2a4a3a" opacity="0.4"/>
      <g opacity="0.15" stroke="#6b8f5e" strokeWidth="0.5" fill="none">
        <path d="M0,175 Q100,170 200,174 Q300,168 400,173"/>
        <path d="M0,182 Q100,178 200,181 Q300,176 400,180"/>
      </g>
      <g transform="translate(60, 170)">
        <rect x="0" y="0" width="280" height="80" fill="#5a4a3a" opacity="0.3" rx="2"/>
        {[0,8,16,24,32,40,48,56,64,72].map(y =>
          <line key={y} x1="5" y1={y+3} x2="275" y2={y+3} stroke="#6a5a4a" strokeWidth="0.5" opacity="0.3"/>
        )}
        {[10,140,270].map(x =>
          <rect key={x} x={x-2} y="-5" width="4" height="90" fill="#5a4a3a" opacity="0.4" rx="1"/>
        )}
        <g transform="translate(140, 20)" opacity="0.5" fill="#1a1a12">
          <ellipse cx="0" cy="-18" rx="4" ry="5"/>
          <path d="M-6,-12 Q-8,-4 -12,0 L12,0 Q8,-4 6,-12Z"/>
          <ellipse cx="0" cy="2" rx="14" ry="4" opacity="0.3"/>
          <line x1="-6" y1="-10" x2="-16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="-10" x2="16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      </g>
      <circle cx="200" cy="130" r="25" fill="#d4b85e" opacity="0.15"/>
      <circle cx="200" cy="130" r="12" fill="#f5f0e8" opacity="0.3"/>
      <rect x="0" y="260" width="400" height="40" fill="#1a2a1a" opacity="0.6"/>
    </svg>
  );
}

export function FishPondSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="70%" stopColor="#2a4a5a"/>
          <stop offset="100%" stopColor="#2a3a3a"/>
        </linearGradient>
        <radialGradient id="fp-water" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3a7a8a" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#1a3a4a" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#fp-sky)"/>
      {/* Garden behind */}
      {[[60,100,25,18],[120,90,30,22],[300,95,28,20],[350,105,22,16]].map(([cx,cy,rx,ry],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#3a5a3a" opacity="0.45"/>
      )}
      <rect x="0" y="130" width="400" height="170" fill="#22331f" opacity="0.7"/>
      {/* Stone coping around a rectangular pond */}
      <rect x="62" y="148" width="276" height="118" rx="3" fill="#8a7a6a" opacity="0.6"/>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={62 + i * 23} y1="148" x2={62 + i * 23} y2="160" stroke="#5a4a3a" strokeWidth="1" opacity="0.5"/>
      ))}
      {/* Water */}
      <rect x="76" y="160" width="248" height="94" rx="2" fill="url(#fp-water)"/>
      <rect x="76" y="160" width="248" height="94" rx="2" fill="none" stroke="#1a3a4a" strokeWidth="2" opacity="0.6"/>
      <path d="M95,185 Q150,180 205,185 Q260,180 305,185" fill="none" stroke="#f5f0e8" strokeWidth="0.6" opacity="0.18"/>
      <path d="M105,230 Q160,225 215,230 Q265,226 300,230" fill="none" stroke="#f5f0e8" strokeWidth="0.5" opacity="0.12"/>
      {/* Lily pads */}
      {[[105,180,15],[120,236,12],[292,226,16],[270,178,11]].map(([cx,cy,r],i) => (
        <path key={i} d={`M${cx},${cy} L${cx+r},${cy-2} A${r},${r*0.55} 0 1,1 ${cx+r*0.9},${cy+3} Z`} fill="#5a8a4a" opacity="0.85"/>
      ))}
      <circle cx="292" cy="221" r="4.5" fill="#e8b4c8" opacity="0.9"/>
      {/* Fish */}
      {[[185,196,1],[232,214,-1],[165,226,1]].map(([x,y,d],i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${d * 1.3},1.3)`}>
          <ellipse cx="0" cy="0" rx="9" ry="3.5" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          <path d="M-8,0 L-14,-4 L-14,4 Z" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          {i === 1 && <ellipse cx="2" cy="-0.5" rx="3" ry="1.6" fill="#d4743a"/>}
        </g>
      ))}
      {/* Reeds */}
      {[[50,170],[56,166],[346,172],[352,168]].map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y+30} x2={x+(i%2?3:-3)} y2={y-18} stroke="#6a8a4a" strokeWidth="1.5" opacity="0.7"/>
          <ellipse cx={x+(i%2?3:-3)} cy={y-20} rx="2" ry="5" fill="#7a5a3a" opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

export function CampfireCircleSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1520"/>
          <stop offset="100%" stopColor="#1a2a2a"/>
        </linearGradient>
        <radialGradient id="cc-glow" cx="50%" cy="65%" r="35%">
          <stop offset="0%" stopColor="#d4956e" stopOpacity="0.15"/>
          <stop offset="60%" stopColor="#c4714a" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#c4714a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cc-sky)"/>
      {[[20,15,1.2],[65,30,0.6],[110,10,0.9],[155,25,0.7],[200,8,1.4],[245,20,0.8],[290,12,1],[335,28,0.6],[380,18,0.9],[50,45,0.5],[170,38,0.7],[320,40,0.8]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.6"/>
      )}
      <path d="M0,170 Q100,165 200,168 Q300,163 400,170 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.6"/>
      {/* Trees around the garden */}
      {[[70,150,16],[110,158,11],[300,152,14],[340,160,10]].map(([cx,cy,r],i) => (
        <g key={i} opacity="0.35">
          <line x1={cx} y1={cy} x2={cx} y2={cy+20} stroke="#2a2a1a" strokeWidth="2"/>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*1.2} fill="#2a3a2a"/>
        </g>
      ))}
      <g transform="translate(200, 200)">
        {[[-16,5],[-12,8],[-4,10],[4,10],[12,8],[16,5],[12,1],[4,-1],[-4,-1],[-12,1]].map(([cx,cy],i) =>
          <circle key={i} cx={cx} cy={cy} r={3.5} fill="#6a5a4a" opacity="0.5"/>
        )}
        <ellipse cx="0" cy="2" rx="40" ry="20" fill="#d4b85e" opacity="0.04"/>
        <ellipse cx="0" cy="0" rx="20" ry="12" fill="#c4714a" opacity="0.1"/>
        <path d="M-6,3 Q-9,-12 -4,-22 Q-1,-15 3,-22 Q8,-12 6,3Z" fill="#d4956e" opacity="0.6"/>
        <path d="M-4,2 Q-5,-8 0,-16 Q5,-8 4,2Z" fill="#d4b85e" opacity="0.5"/>
        <path d="M-2,1 Q0,-8 2,1Z" fill="#f5f0e8" opacity="0.4"/>
        {[[-45,-10],[-30,-18],[30,-18],[45,-10],[-40,10],[40,10]].map(([px,py],i) => (
          <g key={i} transform={`translate(${px}, ${py})`} opacity={0.3 + (i%2)*0.1}>
            <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
            <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
          </g>
        ))}
      </g>
      <rect width="400" height="300" fill="url(#cc-glow)"/>
    </svg>
  );
}
