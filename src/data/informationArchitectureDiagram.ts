/* Full IA tree for Basilar diagram — primary positions fixed; subtree rendered as HTML tree. */

export type IATreeNode = {
  id: string;
  label: string;
  /** Mobile IA carousel only — short tile label; desktop SVG keeps `label` */
  labelMobile?: string;
  children?: IATreeNode[];
  /** Shuttle: Choose + Scan row; map tiles as leaf row */
  layout?: "shuttle-choose-scan" | "leaf-row";
};

export type IADiagramBranch = {
  id: string;
  label: string;
  centerX: number;
  primaryRect: { x: number; y: number; width: number; height: number };
  /** Subtree under this primary (full hierarchy for progressive disclosure) */
  tree: IATreeNode;
};

/** Horizontal gap between primaries = vertical gap between all stacked rows (Home → primaries → panel, HTML rows) */
export const IA_PRIMARY_GAP = 20;

export const IA_PRIMARY_WIDTH = 144;
export const IA_PRIMARY_HEIGHT = 40;

/** One Shuttle column width: Choose (primary) + gap + Scan — gap center aligns under Arrival / Departure */
export const IA_SHUTTLE_COLUMN_WIDTH =
  2 * IA_PRIMARY_WIDTH + IA_PRIMARY_GAP;

export const IA_HUB_Y = 12;
export const IA_HUB_HEIGHT = 40;

/** Primary row starts one step below Home bottom */
export const IA_PRIMARY_ROW_Y = IA_HUB_Y + IA_HUB_HEIGHT + IA_PRIMARY_GAP;

/** Bottom edge of primary row (y + height) */
export const IA_PRIMARY_BOTTOM_Y = IA_PRIMARY_ROW_Y + IA_PRIMARY_HEIGHT;

export const IA_DIAGRAM_HUB = {
  rect: { x: 410, y: IA_HUB_Y, width: 160, height: IA_HUB_HEIGHT, rx: 8 },
  label: "Home",
  centerX: 490,
};

/** First primary starts after small inset; gap between primaries = IA_PRIMARY_GAP */
const PRIMARY_START_X = 8;

function primaryRectForIndex(index: number): { x: number; width: number; centerX: number } {
  const x = PRIMARY_START_X + index * (IA_PRIMARY_WIDTH + IA_PRIMARY_GAP);
  return {
    x,
    width: IA_PRIMARY_WIDTH,
    centerX: x + IA_PRIMARY_WIDTH / 2,
  };
}

function branchGeometry(index: number) {
  const p = primaryRectForIndex(index);
  return {
    centerX: p.centerX,
    primaryRect: {
      x: p.x,
      y: IA_PRIMARY_ROW_Y,
      width: p.width,
      height: IA_PRIMARY_HEIGHT,
    },
  };
}

/** Total SVG width: inset + 6 primaries + 5 gaps + right inset */
const IA_VIEWBOX_WIDTH =
  PRIMARY_START_X + 6 * IA_PRIMARY_WIDTH + 5 * IA_PRIMARY_GAP + PRIMARY_START_X;

/** Full-width subtree panel (foreignObject) — matches diagram content width */
export const IA_SUBTREE_PANEL = {
  x: PRIMARY_START_X,
  y: IA_PRIMARY_BOTTOM_Y + IA_PRIMARY_GAP,
  width: IA_VIEWBOX_WIDTH - 2 * PRIMARY_START_X,
  height: 432,
};

/** Small inset below subtree panel inside SVG — trims dead space vs a fixed tall viewBox */
const IA_VIEWBOX_BOTTOM_INSET = 8;

/** ViewBox height derived from layout so the SVG ends just under content (diagram look unchanged) */
export const IA_VIEWBOX = {
  width: IA_VIEWBOX_WIDTH,
  height: IA_SUBTREE_PANEL.y + IA_SUBTREE_PANEL.height + IA_VIEWBOX_BOTTOM_INSET,
};

/** Line Up subtree: three primary columns + gaps — Listen / Share / Remind aligned under Artist bio */
export const IA_LINEUP_SUBTREE_WIDTH =
  3 * IA_PRIMARY_WIDTH + 2 * IA_PRIMARY_GAP;

/** Tokens: Current Balance | Load a Package — gap center under Tokens primary */
export const IA_TOKENS_SUBTREE_WIDTH =
  2 * IA_PRIMARY_WIDTH + IA_PRIMARY_GAP;

/** Map: four tiles in one row */
export const IA_MAP_SUBTREE_WIDTH =
  4 * IA_PRIMARY_WIDTH + 3 * IA_PRIMARY_GAP;

function clampSubtreePanelX(x: number, width: number): number {
  const maxX = IA_VIEWBOX.width - PRIMARY_START_X - width;
  return Math.max(PRIMARY_START_X, Math.min(x, maxX));
}

/** True when subtree is a single screen (no nested children) — panel matches primary width */
export function isSubtreeSingleLeafOnly(branch: IADiagramBranch): boolean {
  const { tree } = branch;
  return Boolean(tree.label.trim()) && !tree.children?.length;
}

/** Single leaf only (e.g. My Ticket, Menu): foreignObject matches primary rect — aligns under the node */
export function getSubtreeForeignObjectBounds(branch: IADiagramBranch): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const { primaryRect } = branch;
  if (isSubtreeSingleLeafOnly(branch)) {
    return {
      x: primaryRect.x,
      y: IA_SUBTREE_PANEL.y,
      width: primaryRect.width,
      height: IA_SUBTREE_PANEL.height,
    };
  }

  /* Narrow, centered panels so content sits under the branch primary (Line Up, Tokens, Map) */
  if (branch.id === "lineup") {
    const w = IA_LINEUP_SUBTREE_WIDTH;
    const x = clampSubtreePanelX(branch.centerX - w / 2, w);
    return {
      x,
      y: IA_SUBTREE_PANEL.y,
      width: w,
      height: IA_SUBTREE_PANEL.height,
    };
  }

  if (branch.id === "tokens") {
    const w = IA_TOKENS_SUBTREE_WIDTH;
    const x = clampSubtreePanelX(branch.centerX - w / 2, w);
    return {
      x,
      y: IA_SUBTREE_PANEL.y,
      width: w,
      height: IA_SUBTREE_PANEL.height,
    };
  }

  if (branch.id === "map") {
    const w = IA_MAP_SUBTREE_WIDTH;
    const x = clampSubtreePanelX(branch.centerX - w / 2, w);
    return {
      x,
      y: IA_SUBTREE_PANEL.y,
      width: w,
      height: IA_SUBTREE_PANEL.height,
    };
  }

  return { ...IA_SUBTREE_PANEL };
}

/**
 * Padding (SVG units) before the first Shuttle column so the **center of the gap between**
 * Arrival column and Departure column sits on branch.centerX (same units as SVG).
 * Each column is IA_SHUTTLE_COLUMN_WIDTH (Choose + gap + Scan).
 */
export function getShuttlePairRowPaddingStart(branch: IADiagramBranch): number | null {
  if (branch.id !== "shuttle") return null;
  const fo = IA_SUBTREE_PANEL;
  const gapCenterOffset = IA_SHUTTLE_COLUMN_WIDTH + IA_PRIMARY_GAP / 2;
  return branch.centerX - fo.x - gapCenterOffset;
}

/* Left → right: Ticket, Food Area, Tokens, Shuttle, Line Up, Map */
export const IA_DIAGRAM_BRANCHES: IADiagramBranch[] = [
  {
    id: "ticket",
    label: "Ticket",
    ...branchGeometry(0),
    tree: { id: "ticket-my", label: "My Ticket" },
  },
  {
    id: "food",
    label: "Food Area",
    ...branchGeometry(1),
    tree: { id: "food-menu", label: "Menu" },
  },
  {
    id: "tokens",
    label: "Tokens",
    ...branchGeometry(2),
    tree: {
      id: "tokens-root",
      label: "",
      children: [
        { id: "tokens-balance", label: "Current Balance" },
        {
          id: "tokens-load",
          label: "Load a Package",
          children: [
            {
              id: "tokens-payment",
              label: "Payment",
              children: [{ id: "tokens-add-wallet", label: "Add to Wallet" }],
            },
          ],
        },
      ],
    },
  },
  {
    id: "shuttle",
    label: "Shuttle",
    ...branchGeometry(3),
    tree: {
      id: "shuttle-root",
      label: "",
      children: [
        {
          id: "shuttle-arrival",
          label: "Arrival",
          children: [
            {
              id: "shuttle-arrival-actions",
              label: "",
              layout: "shuttle-choose-scan",
              children: [
                {
                  id: "shuttle-arrival-choose",
                  label: "Choose a Shuttle",
                  children: [{ id: "shuttle-arrival-pay", label: "Payment" }],
                },
                { id: "shuttle-arrival-scan", label: "Scan Ticket" },
              ],
            },
          ],
        },
        {
          id: "shuttle-departure",
          label: "Departure",
          children: [
            {
              id: "shuttle-departure-actions",
              label: "",
              layout: "shuttle-choose-scan",
              children: [
                {
                  id: "shuttle-dep-choose",
                  label: "Choose a Shuttle",
                  children: [{ id: "shuttle-dep-pay", label: "Payment" }],
                },
                { id: "shuttle-dep-scan", label: "Scan Ticket" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "lineup",
    label: "Line Up",
    ...branchGeometry(4),
    tree: {
      id: "lineup-root",
      label: "",
      children: [
        {
          id: "lineup-daily",
          label: "Daily Line ups",
          children: [
            {
              id: "lineup-bio",
              label: "Artist bio",
              children: [
                { id: "lineup-listen", label: "Listen link" },
                { id: "lineup-share", label: "Share" },
                { id: "lineup-remind", label: "Remind me" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "map",
    label: "Map",
    ...branchGeometry(5),
    tree: {
      id: "map-root",
      label: "",
      layout: "leaf-row",
      children: [
        { id: "map-festival", label: "Festival Map", labelMobile: "Map" },
        { id: "map-pins", label: "Dropped Pins", labelMobile: "Pins" },
        { id: "map-wave", label: "Wave a Friend", labelMobile: "Wave a friend" },
        { id: "map-sos", label: "SOS", labelMobile: "SOS" },
      ],
    },
  },
];
