import React, { FC, PropsWithChildren } from 'react';

type BadgeTypeProps = {
  neutral?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  critical?: boolean;
};

type IBadgeProps = BadgeTypeProps & PropsWithChildren<{ className?: string }>;

function getColor(props: BadgeTypeProps): string {
  if (props.neutral) return 'bg-gray-200';
  if (props.info) return 'bg-blue-200';
  if (props.success) return 'bg-green-200';
  if (props.warning) return 'bg-yellow-200';
  if (props.critical) return 'bg-red-200';
  return 'bg-gray-200'; // default color
}

export const Badge: FC<IBadgeProps> = (props) => {
  const colorClass = getColor(props);
  const paddingClasses = 'px-2 py-1'; // Equivalent to Padding.xxxs and Padding.xs
  const badgeClasses = `flex items-center rounded-lg whitespace-nowrap ${paddingClasses} ${colorClass} ${props.className}`;

  return (
    <div className={badgeClasses}>
      {props.children}
    </div>
  );
};