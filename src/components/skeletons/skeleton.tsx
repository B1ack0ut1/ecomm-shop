const Skeleton = ({ className }: { className: string }) => {
  return <div className={`skeleton animate-pulse ${className}`}></div>;
};
export default Skeleton;
