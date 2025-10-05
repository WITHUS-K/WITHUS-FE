/** 공백 → 하이픈 */
export function toShareSegment(name: string) {
  return name.replace(/\s+/g, '-');
}

/** 하이픈 → 공백 (서버/클라에서 복원용) */
export function fromShareSegment(segment: string) {
  return segment.replace(/-/g, ' ');
}

export function buildRecruitUrl(
  origin: string,
  organization: string,
  slug: string
) {
  const orgSeg = toShareSegment(organization); // "ㄷ ㄷ3" → "ㄷ-ㄷ3"
  return `${origin}/${orgSeg}/${slug}`;
}

export function safeDecodeURIComponent(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
