import {
  LoaderOverlay,
  SpinnerRing,
  LoaderText,
  SkeletonLine,
  SkeletonRow,
} from './Loader.styles';

interface LoaderProps {
  text?: string;
}

const Loader = ({ text = 'Loading...' }: LoaderProps) => {
  return (
    <LoaderOverlay>
      <SpinnerRing />
      <LoaderText>{text}</LoaderText>
    </LoaderOverlay>
  );
};

export default Loader;

// ========================
// Table Skeleton
// ========================

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i}>
          <SkeletonLine $width="15%" $height="14px" />
          <SkeletonLine $width="15%" $height="14px" />
          <SkeletonLine $width="25%" $height="14px" />
          <SkeletonLine $width="12%" $height="14px" />
          <SkeletonLine $width="20%" $height="14px" />
          <SkeletonLine $width="13%" $height="14px" />
        </SkeletonRow>
      ))}
    </>
  );
};
