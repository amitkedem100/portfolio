"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useCursorContext } from "@/app/portfolio/context/CursorContext";
import type { IATreeNode } from "@/data/informationArchitectureDiagram";
import {
  IA_DIAGRAM_BRANCHES,
  IA_DIAGRAM_HUB,
  IA_SUBTREE_PANEL,
  IA_VIEWBOX,
  getShuttlePairRowPaddingStart,
  getSubtreeForeignObjectBounds,
  isSubtreeSingleLeafOnly,
} from "@/data/informationArchitectureDiagram";

const IA_AUTO_ADVANCE_MS = 3500;
const IA_BRANCH_LEAVE_DEBOUNCE_MS = 150;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/* Interactive IA: collapsed by default; hover (desktop) or tap (mobile) reveals one subtree at a time. */

function usePrefersHoverInteraction() {
  const [prefersHover, setPrefersHover] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

function primaryLabelY(rect: { y: number; height: number }) {
  return rect.y + rect.height / 2 + 6;
}

/* Siblings at the same depth share one row (columns); nested levels stack under each branch */

export function IATreeBlock({
  node,
  depth = 0,
  branchId,
  shuttleRootRowStyle,
}: {
  node: IATreeNode;
  depth?: number;
  branchId?: string;
  shuttleRootRowStyle?: CSSProperties;
}) {
  const hasChildren = Boolean(node.children?.length);
  const showLabel = node.label.trim().length > 0;

  if (!hasChildren) {
    if (!showLabel) return null;
    const isTopScreen = depth === 0;
    return (
      <div
        className={
          isTopScreen
            ? "ia-diagram__node ia-diagram__node--html ia-diagram__node--primary"
            : "ia-diagram__node ia-diagram__node--html ia-diagram__node--leaf"
        }
      >
        {node.label}
      </div>
    );
  }

  if (!showLabel && node.children) {
    if (
      node.layout === "shuttle-choose-scan" &&
      node.children.length === 2
    ) {
      const [chooseNode, scanNode] = node.children;
      const pay = chooseNode.children?.[0];
      const chooseOk =
        pay &&
        chooseNode.children?.length === 1 &&
        !pay.children?.length &&
        !scanNode.children?.length;
      if (chooseOk) {
        return (
          <div className="ia-shuttle-choose-scan-row">
            <div className="ia-shuttle-choose-scan-col ia-shuttle-choose-scan-col--choose">
              <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--primary">
                {chooseNode.label}
              </div>
              <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--leaf">
                {pay.label}
              </div>
            </div>
            <div className="ia-shuttle-choose-scan-col ia-shuttle-choose-scan-col--scan">
              <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--primary">
                {scanNode.label}
              </div>
            </div>
          </div>
        );
      }
    }

    if (node.layout === "leaf-row" && node.children) {
      return (
        <div className="ia-tree-block ia-tree-block--root">
          <div className="ia-tree-row ia-tree-row--leaf-row">
            {node.children.map((child) => (
              <div key={child.id} className="ia-tree-col ia-tree-col--leaf-row">
                <IATreeBlock node={child} depth={depth + 1} branchId={branchId} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    const isShuttlePairRoot =
      branchId === "shuttle" &&
      node.children.length === 2 &&
      node.id === "shuttle-root";

    return (
      <div
        className={`ia-tree-block ia-tree-block--root${isShuttlePairRoot ? " ia-tree-block--shuttle-two-col" : ""}`}
      >
        <div
          className={`ia-tree-row${isShuttlePairRoot ? " ia-tree-row--shuttle-pair" : ""}`}
          style={isShuttlePairRoot ? shuttleRootRowStyle : undefined}
        >
          {node.children.map((child) => (
            <div key={child.id} className="ia-tree-col">
              <IATreeBlock node={child} depth={depth} branchId={branchId} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ia-tree-block ia-tree-block--labeled">
      <div className="ia-diagram__node ia-diagram__node--html ia-diagram__node--primary">
        {node.label}
      </div>
      <div
        className={`ia-tree-row${node.children!.length === 1 ? " ia-tree-row--single" : ""}`}
      >
        {node.children!.map((child) => (
          <div key={child.id} className="ia-tree-col">
            <IATreeBlock node={child} depth={depth + 1} branchId={branchId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InformationArchitectureDiagram() {
  const { setVariant: setCursorVariant } = useCursorContext();
  const prefersHover = usePrefersHoverInteraction();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  /* Desktop: pause automatic cycling while pointer is over a primary branch */
  const [autoPaused, setAutoPaused] = useState(false);
  const leaveTimerRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (prefersHover === true) {
      setActiveBranchId((prev) => prev ?? IA_DIAGRAM_BRANCHES[0].id);
    } else if (prefersHover === false) {
      setActiveBranchId(null);
      setAutoPaused(false);
    }
  }, [prefersHover]);

  useEffect(() => {
    if (prefersHover !== true) return;
    if (autoPaused) return;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveBranchId((prev) => {
        const cur = prev ?? IA_DIAGRAM_BRANCHES[0].id;
        const idx = IA_DIAGRAM_BRANCHES.findIndex((b) => b.id === cur);
        const i = idx >= 0 ? idx : 0;
        const next = (i + 1) % IA_DIAGRAM_BRANCHES.length;
        return IA_DIAGRAM_BRANCHES[next].id;
      });
    }, IA_AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [prefersHover, autoPaused, prefersReducedMotion]);

  const handleBranchEnter = useCallback(
    (id: string) => {
      if (prefersHover !== true) return;
      clearLeaveTimer();
      setAutoPaused(true);
      setActiveBranchId(id);
    },
    [prefersHover, clearLeaveTimer],
  );

  const handleBranchLeave = useCallback(() => {
    if (prefersHover !== true) return;
    clearLeaveTimer();
    leaveTimerRef.current = window.setTimeout(() => {
      setAutoPaused(false);
      leaveTimerRef.current = null;
    }, IA_BRANCH_LEAVE_DEBOUNCE_MS);
  }, [prefersHover, clearLeaveTimer]);

  const handleBranchTap = useCallback(
    (id: string) => {
      if (prefersHover === true) return;
      setActiveBranchId((prev) => (prev === id ? null : id));
    },
    [prefersHover],
  );

  useEffect(() => {
    if (activeBranchId === null || prefersHover === true) return;

    const onPointerDown = (e: PointerEvent) => {
      const root = svgRef.current;
      if (!root || root.contains(e.target as Node)) return;
      setActiveBranchId(null);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [activeBranchId, prefersHover]);

  const hub = IA_DIAGRAM_HUB;
  const showCoarsePointer = prefersHover === false;
  const vb = IA_VIEWBOX;

  const resolvedActiveId =
    prefersHover === false
      ? activeBranchId
      : (activeBranchId ?? IA_DIAGRAM_BRANCHES[0].id);

  return (
    <svg
      ref={svgRef}
      className={`ia-diagram${showCoarsePointer ? " ia-diagram--coarse-pointer" : ""}`}
      viewBox={`0 0 ${vb.width} ${vb.height}`}
      role="img"
      aria-label="App information architecture: Home connects to six primary areas. On desktop, areas cycle automatically; hover an area to pause and inspect. On touch, tap an area to show its screens."
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>
        Six primary areas branch from Home. Details for each area appear on hover (desktop) or tap
        (touch).
      </desc>

      <g className="ia-diagram__nodes-primary ia-diagram__nodes-primary--hub">
        <rect
          className="ia-diagram__node ia-diagram__node--hub"
          x={hub.rect.x}
          y={hub.rect.y}
          width={hub.rect.width}
          height={hub.rect.height}
          rx={hub.rect.rx}
        />
        <text
          className="ia-diagram__label ia-diagram__label--hub"
          x={hub.centerX}
          y={primaryLabelY(hub.rect)}
          textAnchor="middle"
        >
          {hub.label}
        </text>
      </g>

      {IA_DIAGRAM_BRANCHES.map((branch) => {
        const isActive = resolvedActiveId === branch.id;
        const cx = branch.centerX;
        const pr = branch.primaryRect;
        const subtreeId = `ia-subtree-${branch.id}`;
        const fo = getSubtreeForeignObjectBounds(branch);
        const foreignRootClassName = isSubtreeSingleLeafOnly(branch)
          ? "ia-diagram__foreign-root ia-diagram__foreign-root--under-primary"
          : "ia-diagram__foreign-root";

        const shuttlePad = getShuttlePairRowPaddingStart(branch);
        const shuttleRootRowStyle: CSSProperties | undefined =
          shuttlePad != null
            ? {
                paddingLeft: `${(shuttlePad / IA_SUBTREE_PANEL.width) * 100}%`,
              }
            : undefined;

        const branchClass =
          `ia-diagram__branch${isActive ? " ia-diagram__branch--active" : ""}` +
          (prefersHover === true && !isActive ? " ia-diagram__branch--inactive" : "");

        /* Scale from rect center in SVG space — avoids asymmetric fill-box on g+text */
        const primaryScaleOrigin = `${cx}px ${pr.y + pr.height / 2}px`;

        return (
          <g
            key={branch.id}
            className={branchClass}
            onMouseEnter={() => handleBranchEnter(branch.id)}
            onMouseLeave={handleBranchLeave}
          >
            <g
              className="ia-diagram__primary-slot"
              style={{ transformOrigin: primaryScaleOrigin }}
            >
              <rect
                className="ia-diagram__node ia-diagram__node--primary"
                x={pr.x}
                y={pr.y}
                width={pr.width}
                height={pr.height}
                rx={8}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-controls={subtreeId}
                aria-label={branch.label}
                onMouseEnter={() => setCursorVariant("hidden")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={(e) => {
                  if (prefersHover === true) return;
                  e.stopPropagation();
                  handleBranchTap(branch.id);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" && e.key !== " ") return;
                  e.preventDefault();
                  if (prefersHover === true) {
                    setAutoPaused(true);
                    setActiveBranchId(branch.id);
                    return;
                  }
                  setActiveBranchId((prev) => (prev === branch.id ? null : branch.id));
                }}
              />
              <text
                className="ia-diagram__label ia-diagram__label--primary"
                x={cx}
                y={primaryLabelY(pr)}
                textAnchor="middle"
                pointerEvents="none"
              >
                {branch.label}
              </text>
            </g>

            <g id={subtreeId} className="ia-diagram__subtree" aria-hidden={!isActive}>
              <foreignObject x={fo.x} y={fo.y} width={fo.width} height={fo.height}>
                {/* XHTML namespace required for foreignObject in some browsers */}
                <div
                  className={foreignRootClassName}
                  data-ia-branch={branch.id}
                  {...({ xmlns: "http://www.w3.org/1999/xhtml" } as Record<string, string>)}
                >
                  <IATreeBlock
                    node={branch.tree}
                    branchId={branch.id}
                    shuttleRootRowStyle={shuttleRootRowStyle}
                  />
                </div>
              </foreignObject>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
