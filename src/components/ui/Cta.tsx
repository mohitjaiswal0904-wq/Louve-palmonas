type CtaProps = {
  onClick: () => void;
  className?: string;
};

export function Cta({ onClick, className = "cta" }: CtaProps) {
  return (
    <a
      className={className}
      href="#collection"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      Explore More
    </a>
  );
}
