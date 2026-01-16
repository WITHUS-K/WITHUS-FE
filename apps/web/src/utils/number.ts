export const toFixed1 = (v: unknown): number | undefined => {
    const n = Number(v);
    if (!Number.isFinite(n)) return undefined;
    return Math.round(n * 10) / 10;
  };