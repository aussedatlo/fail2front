import React, { useState } from 'react';
import {
  LoadingButton as MuiLoadingButton,
  LoadingButtonProps as MuiLoadingButtonProps,
} from '@mui/lab';
import { styled } from '@mui/material';

export const StyledLoadingButton = styled(MuiLoadingButton)`
  margin: ${({ theme }) => theme.spacing(0.5)};
  width: 7em;
`;

type LoadingButtonProps<T> = {
  /**
   * Event handler for the button click.
   *
   * @param event - The click event.
   * @returns The result of the click handler.
   */
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<T>;
  /**
   * Event handler for when the click handler is done.
   *
   * @param arg - The result of the click handler.
   */
  onComplete?: (arg: T) => void;
} & Omit<MuiLoadingButtonProps, 'onClick' | 'loading'>;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const LoadingButton = <T extends unknown>({
  children,
  onClick,
  onComplete,
  ...props
}: LoadingButtonProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setLoading(true);
    console.log(onClick);
    const result = await onClick(event);

    // add a delay to simulate a network request
    setTimeout(() => {
      setLoading(false);
      onComplete && onComplete(result);
    }, 1000);
  };

  return (
    <StyledLoadingButton onClick={onButtonClick} loading={loading} {...props}>
      {children}
    </StyledLoadingButton>
  );
};
