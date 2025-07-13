import { SpinnerCircular } from 'spinners-react';

export function LoadingSpinner() {
  return (
    <SpinnerCircular size={40} thickness={100} speed={180} color="white" secondaryColor="black" />
  );
}
