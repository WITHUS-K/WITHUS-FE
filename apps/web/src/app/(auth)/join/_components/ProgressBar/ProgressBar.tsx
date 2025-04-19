import {
  progressBarContainer,
  progressVisuals,
  progressLabels,
  visualItem,
  labelItem,
  circleBase,
  circleVariants,
  connectorLineBase,
  connectorLineVariants,
  labelVariants,
} from './ProgressBar.css';

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = ['가입 유형 선택', '약관 동의', '회원 정보', '가입 완료'];

  return (
    <div className={progressBarContainer}>
      {/* 원 + 라인만 */}
      <div className={progressVisuals}>
        {steps.map((_, idx) => {
          const stepNumber = idx + 1;
          const circleStyle =
            stepNumber < currentStep
              ? circleVariants.completed
              : stepNumber === currentStep
                ? circleVariants.active
                : circleVariants.upcoming;
          const lineStyle =
            stepNumber < currentStep
              ? connectorLineVariants.completed
              : connectorLineVariants.upcoming;

          return (
            <div key={idx} className={visualItem}>
              <div className={`${circleBase} ${circleStyle}`}>{stepNumber}</div>
              {idx < steps.length - 1 && (
                <div className={`${connectorLineBase} ${lineStyle}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* 단계 텍스트 */}
      <div className={progressLabels}>
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const variantClass =
            stepNumber < currentStep
              ? labelVariants.completed
              : stepNumber === currentStep
                ? labelVariants.active
                : labelVariants.upcoming;
          return (
            <div key={idx} className={`${labelItem} ${variantClass}`}>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
