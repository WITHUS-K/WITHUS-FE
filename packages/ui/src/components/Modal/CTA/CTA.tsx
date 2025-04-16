import { Button, ButtonProps } from '../..';

interface CTAProps extends Omit<ButtonProps, 'children'> {
  text: string;
}

export function CTA({ text, ...props }: CTAProps) {
  return (
    <Button variant="main" size="48" {...props}>
      {text}
    </Button>
  );
}
