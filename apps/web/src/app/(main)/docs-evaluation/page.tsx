import { redirect } from 'next/navigation';

export default function DocsEvaluationPage() {
  // 기본 탭을 all 로 리디렉트
  redirect('/docs-evaluation/all');
}
