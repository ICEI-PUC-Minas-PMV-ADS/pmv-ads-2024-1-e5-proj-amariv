// Importe as bibliotecas necessárias
import React from 'react';
import * as TablerIcons from '@tabler/icons-react';

interface IconProps {
  iconName: keyof typeof TablerIcons
  className?: string,
  size?: number
}

const DynamicIcon: React.FC<IconProps> = ({ iconName, className, size }) => {
  const TablerIcon = (TablerIcons as any)[iconName] as any;

  if (TablerIcon) {
    return <TablerIcon className={className} size={size} />;
  } else {
    return <div>Ícone não encontrado</div>;
  }
};

export default DynamicIcon;
