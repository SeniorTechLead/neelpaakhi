export function ChangGharSVG() {
  // Oblique view from the front-left: D is the depth vector (front to back) for the house.
  const D = [-16, -22];
  // Ground lines running north-south (parallel to the house's side walls) shift right by K px per px down
  const K = -D[0] / -D[1];
  const ns = (x0, y0, y) => x0 + (y - y0) * K;
  const at = ([x, y], t) => [x + D[0] * t, y + D[1] * t];
  const pts = (...ps) => ps.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg viewBox="-50 -15 500 375" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two-storey chang ghar in a walled compound, with a lane, gate, fish pond, balconies on both floors, and an outside staircase">
      <defs>
        <linearGradient id="cg-sky" x1="0" y1="0" x2="0" y2="1">
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
        <linearGradient id="cg-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a8a9a"/>
          <stop offset="100%" stopColor="#2a5a6a"/>
        </linearGradient>
      </defs>
      <rect x="-50" y="-15" width="500" height="375" fill="url(#cg-sky)"/>
      {/* Whole scene lifted so the foreground clears the caption */}
      <g transform="translate(0, -52)">
      {/* Treetops beyond the compound */}
      {[[-30,148,20],[20,150,22],[150,146,24],[250,150,20],[370,148,24],[430,150,20]].map(([cx,cy,r],i) => (
        <ellipse key={`b${i}`} cx={cx} cy={cy} rx={r} ry={r * 0.8} fill="#6f9a66" opacity="0.7"/>
      ))}
      {/* Compound wall to the north */}
      <rect x="-50" y="158" width="500" height="42" fill="#ece6da"/>
      <rect x="-50" y="155" width="500" height="4" fill="#cfc6b6"/>
      {[-12, 140, 204, 268, 332, 396].map(x => <rect key={x} x={x} y="152" width="8" height="48" fill="#ddd5c6"/>)}
      {/* 8 ft gate where the lane meets the wall */}
      <rect x="32" y="148" width="8" height="52" fill="#ddd5c6"/>
      <rect x="76" y="148" width="8" height="52" fill="#ddd5c6"/>
      <rect x="40" y="162" width="36" height="38" fill="#f7f4ee" stroke="#b8b0a2" strokeWidth="1"/>
      <line x1="58" y1="162" x2="58" y2="200" stroke="#b8b0a2" strokeWidth="1"/>
      {[168, 175, 182, 189].map(y => <line key={y} x1="40" y1={y} x2="76" y2={y} stroke="#cfc6b6" strokeWidth="1.2"/>)}
      {/* Garden ground */}
      <rect x="-50" y="198" width="500" height="216" fill="#7aaa6e"/>
      {/* Main road from the gate, parallel to the house's side walls */}
      <polygon points={pts([47, 200], [69, 200], [ns(69, 200, 414), 414], [ns(47, 200, 414), 414])} fill="#d9c9a8" stroke="#b8a888" strokeWidth="1"/>
      {/* Trees along the main road */}
      {[214, 268].map((by, i) => {
        const x = ns(69, 200, by) + 12;
        return (
          <g key={`t${i}`}>
            <line x1={x} y1={by - 18} x2={x} y2={by} stroke="#6a4a2a" strokeWidth="2"/>
            <ellipse cx={x} cy={by - 20} rx="9" ry="11" fill={i % 2 ? "#4a7a44" : "#3f6b3a"}/>
          </g>
        );
      })}
      {/* Fish pond: long side parallel to the main road, on its left */}
      {(() => {
        const r = (y) => ns(-5, 200, y), l = (y) => r(y) - 40;
        return (
          <g>
            <polygon points={pts([l(208) - 4, 208], [r(208) + 4, 208], [r(296) + 4, 296], [l(296) - 4, 296])} fill="#a89a88"/>
            <polygon points={pts([l(212), 212], [r(212), 212], [r(292), 292], [l(292), 292])} fill="url(#cg-water)"/>
            <ellipse cx={l(225) + 10} cy="225" rx="5" ry="3" fill="#5a8a4a"/>
            <ellipse cx={l(255) + 28} cy="255" rx="4.5" ry="2.8" fill="#5a8a4a"/>
            <ellipse cx={l(280) + 12} cy="280" rx="4" ry="2.5" fill="#5a8a4a"/>
            {[[238, 18, 1], [266, 24, -1], [258, 10, 1]].map(([y, dx, d], i) => (
              <g key={`f${i}`} transform={`translate(${l(y) + dx},${y}) rotate(${d > 0 ? 54 : 234})`}>
                <ellipse cx="0" cy="0" rx="4" ry="1.6" fill={i === 1 ? "#f5f0e8" : "#d4743a"}/>
                <path d="M-3.5,0 L-6.5,-2 L-6.5,2 Z" fill={i === 1 ? "#f5f0e8" : "#d4743a"}/>
              </g>
            ))}
          </g>
        );
      })()}
      {/* Smaller courtyard left of the main road, continuing on from where the pond ends */}
      {(() => {
        const r = (y) => ns(-5, 200, y), l = (y) => r(y) - 40, y0 = 304, y1 = 360;
        const bl = [l(y0), y0], br = [r(y0), y0], fr = [r(y1), y1], fl = [l(y1), y1];
        const colors = ['#e86a8a', '#f2c14e', '#d94a4a', '#f5f0e8'];
        const edge = (p, q, n) => Array.from({ length: n + 1 }, (_, i) => [p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]);
        const dots = [...edge(bl, br, 7), ...edge(br, fr, 10), ...edge(fr, fl, 7), ...edge(fl, bl, 10)];
        return (
          <g>
            <polygon points={pts(bl, br, fr, fl)} fill="#c8c4bc" stroke="#a8a49c" strokeWidth="1"/>
            {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill={colors[(i + 1) % colors.length]}/>)}
          </g>
        );
      })()}
      {/* The house and everything attached to it sit back near the north wall (under 5 ft away) */}
      <g transform="translate(0, -58)">
      {/* Concrete forecourt in front of the house, edged with flowers */}
      {(() => {
        const bl = [150, 293], br = [350, 293], fr = [ns(350, 293, 380), 380], fl = [ns(150, 293, 380), 380];
        const colors = ['#e86a8a', '#f2c14e', '#d94a4a', '#f5f0e8'];
        const edge = (p, q, n) => Array.from({ length: n + 1 }, (_, i) => [p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n]);
        const dots = [...edge(bl, br, 34), ...edge(br, fr, 9), ...edge(fr, fl, 34), ...edge(fl, bl, 9)];
        return (
          <g>
            <polygon points={pts(bl, br, fr, fl)} fill="#c8c4bc" stroke="#a8a49c" strokeWidth="1"/>
            {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill={colors[i % colors.length]}/>)}
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
        const railing = (a, b, y0, h, n, skip, covered) => {
          // Upper-floor grills are covered with light-blue polycarbonate
          const lerp = (t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
          const panel = (t0, t1) => {
            const p = lerp(t0), q = lerp(t1);
            return <polygon key={`pc${t0}`} points={pts([p[0], p[1] - h], [q[0], q[1] - h], q, p)} fill="rgba(160,210,235,0.5)"/>;
          };
          const out = !covered ? [] : skip ? [panel(0, skip[0]), panel(skip[1], 1)] : [panel(0, 1)];
          out.push(<line key="r" x1={a[0]} y1={a[1] - h} x2={b[0]} y2={b[1] - h} stroke={post} strokeWidth="1.5"/>);
          for (let i = 1; i < n; i++) {
            const t = i / n; if (skip && t > skip[0] && t < skip[1]) continue;
            const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
            out.push(<line key={i} x1={x} y1={y - h} x2={x} y2={y} stroke={post} strokeWidth="1"/>);
          }
          return out;
        };
        const fl = [deck[0], G], fr = [deck[1], G];
        const ufl = [deck[0], U], ufr = [deck[1], U];
        // Roof corners (eaves) and ridge
        const eFL = [144, T + 2], eFR = [346, T + 2], eBL = at(eFL, 1), eBR = at(eFR, 1);
        const rL = [192, 110], rR = [272, 110];
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
              const q1 = along(0.08), q2 = along(0.42);
              const out = [
                <polygon key="branch" points={pts([ns(69, 258, q2[1]), q2[1]], q2, q1, [ns(69, 258, q1[1]), q1[1]])} fill="#d9c9a8" stroke="#b8a888" strokeWidth="1"/>,
              ];
              for (let k = 3; k >= 1; k--) {
                out.push(<polygon key={`r${k}`} points={band(outline(o(k)), outline(o(k), R))} fill="#7a5a34"/>);
                out.push(<polygon key={`t${k}`} points={band(outline(o(k - 1), R), outline(o(k)))} fill="#b89a70"/>);
              }
              out.push(<polygon key="r0" points={band(outline(o(0)), outline(o(0), R))} fill="#7a5a34"/>);
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
            {/* Hip roof: right and front faces, then the left face */}
            <polygon points={pts(eFR, eBR, rR)} fill="#8a6a36"/>
            <polygon points={pts(eFL, eFR, rR, rL)} fill="#9a7a42"/>
            <polygon points={pts(eBL, eFL, rL)} fill="#7a5a2e"/>
            <path d={`M${pts(eBL, eFL, eFR)} M${pts(eFL, rL, rR, eFR)}`} fill="none" stroke={post} strokeWidth="1.5"/>
            {[0.2, 0.4, 0.6, 0.8].map(t => {
              const a = [eFL[0] + (eFR[0] - eFL[0]) * t, eFL[1]];
              const b = [rL[0] + (rR[0] - rL[0]) * t, rL[1]];
              return <line key={t} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#7a5a2a" strokeWidth="0.6" opacity="0.6"/>;
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
      <polygon points={pts([378, 308], [394, 308], [ns(394, 308, 472), 472], [ns(378, 308, 472), 472])} fill="#d9c9a8" stroke="#b8a888" strokeWidth="1"/>
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
