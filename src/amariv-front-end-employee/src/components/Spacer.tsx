
/**
 * SpacerProps
 */

export type SpacerProps = {
  width?: string,
  height?: string,
};

/**
 * Spacer
 */

export const Spacer = ({ width = '0', height = '0' }: SpacerProps) => {
  return <div style={{ width, height }} />
};