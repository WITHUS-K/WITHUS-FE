export function getOriginalFileName(fileUrl: string): string {
  // URL 에서 마지막 세그먼트만 추출
  const lastSegment = decodeURIComponent(
    fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
  );
  // 마지막 언더스코어 위치
  const idx = lastSegment.lastIndexOf('_');
  // 언더스코어가 있으면 그 뒤만, 없으면 원본 세그먼트 전체
  return idx !== -1 ? lastSegment.substring(idx + 1) : lastSegment;
}
