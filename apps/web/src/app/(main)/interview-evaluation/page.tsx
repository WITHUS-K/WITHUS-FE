import { redirect } from 'next/navigation';

export default function EvaluationIndex() {
  // /evaluation 로 들어오면 바로 schedule 단계로
  redirect('/interview-evaluation/schedule');
}
