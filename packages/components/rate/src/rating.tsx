'use client';
import * as React from 'react';
import { useMemo } from 'react';
import { useControlled } from '@zc-ui/use-controlled';
import { useDefaultProps } from '@zc-ui/use-default-props';

import { Star } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, useControllableValue } from '@zc-ui/utils';

export interface RateProps {
  value?: number;
  defaultValue?: RateProps['value'];
  count?: number;
  icon?: React.ReactNode;
}

export const Rating = React.forwardRef((_props: RateProps, ref) => {
  const defaultProps = {
    defaultValue: 0,
    count: 5,
    icon: <Star />,
  } satisfies RateProps;
  const props = useDefaultProps(_props, defaultProps);
  const { count, icon } = props;
  const [value, setValue] = useControllableValue<RateProps['value']>(props);
  function render() {
    if (!value) return null;
    const full = Math.floor(value);
    const half = value - full;
    // TODO should use useMemo?
    const commonIconProps = {
      className: 'text-green-500',
    };

    return [...Array(count)].map((_, i) => (
      <div key={i}>
        {i < full ? React.cloneElement(icon, { ...commonIconProps }) : null}
        {i === full && half
          ? React.cloneElement(icon, { ...commonIconProps })
          : null}
        {i > full ? React.cloneElement(icon) : null}
      </div>
    ));
  }
  return <div className="flex">{render()}</div>;
});

Rating.displayName = 'Rating';

export function useRate() {}
