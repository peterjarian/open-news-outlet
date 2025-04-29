// src/components/global/icon-wrapper.tsx
import { Icon } from '@phosphor-icons/react';
import React, { JSX } from 'react';

interface IconWrapperProps {
    icon: Icon;
    size?: string;
    className?: string;
}

export default function IconWrapper({ icon, size = '28', className }: IconWrapperProps): JSX.Element {
    const Icon = icon;
    return <Icon className={className} size={size} weight="thin" />;
}
