import type { InternalNode, XYPosition } from "@xyflow/react";

const ARROW_LENGTH = 9;
const ARROW_HALF_WIDTH = 4.5;

const distance = (a: XYPosition, b: XYPosition) =>
    Math.hypot(a.x - b.x, a.y - b.y);

const getBox = (node: InternalNode) => {
    const { x, y } = node.internals.positionAbsolute;
    const halfWidth = (node.measured.width ?? 0) / 2;
    const halfHeight = (node.measured.height ?? 0) / 2;

    return { cx: x + halfWidth, cy: y + halfHeight, halfWidth, halfHeight };
};

const getCenter = (node: InternalNode): XYPosition => {
    const { cx, cy } = getBox(node);
    return { x: cx, y: cy };
};

/**
 * The point where the line from the block's center towards `point` crosses
 * the block's border, so an arrow end slides along the border as the blocks
 * move instead of sticking to a handle.
 */
export const getBorderPoint = (
    node: InternalNode,
    point: XYPosition,
): XYPosition => {
    const { cx, cy, halfWidth, halfHeight } = getBox(node);
    const dx = point.x - cx;
    const dy = point.y - cy;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };

    const scale = Math.min(
        dx === 0 ? Infinity : halfWidth / Math.abs(dx),
        dy === 0 ? Infinity : halfHeight / Math.abs(dy),
    );

    return { x: cx + dx * scale, y: cy + dy * scale };
};

/** The ends of an arrow between two blocks, on the line between their centers. */
export const getConnectionPoints = (
    source: InternalNode,
    target: InternalNode,
) => ({
    from: getBorderPoint(source, getCenter(target)),
    to: getBorderPoint(target, getCenter(source)),
});

/**
 * SVG paths of a straight arrow: the line stops at the base of the head, so
 * its end does not stick out of the tip.
 */
export const getArrowPaths = (from: XYPosition, to: XYPosition) => {
    const length = distance(from, to) || 1;
    const ux = (to.x - from.x) / length;
    const uy = (to.y - from.y) / length;
    const baseX = to.x - ux * Math.min(ARROW_LENGTH, length);
    const baseY = to.y - uy * Math.min(ARROW_LENGTH, length);

    return {
        line: `M ${from.x},${from.y} L ${baseX},${baseY}`,
        head:
            `M ${to.x},${to.y} ` +
            `L ${baseX - uy * ARROW_HALF_WIDTH},${baseY + ux * ARROW_HALF_WIDTH} ` +
            `L ${baseX + uy * ARROW_HALF_WIDTH},${baseY - ux * ARROW_HALF_WIDTH} Z`,
        // The whole length, so hovering or clicking near the tip hits the edge too.
        hitArea: `M ${from.x},${from.y} L ${to.x},${to.y}`,
    };
};
