type EditorialLine = {
  text: string;
  italic?: boolean;
};

type EditorialTitleProps = {
  lines: EditorialLine[];
  as?: "h1" | "h2";
  className?: string;
};

/** Editorial New stack: upright / italic / upright (see brand type sample). */
export function EditorialTitle({
  lines,
  as: Tag = "h1",
  className = "editorial-title",
}: EditorialTitleProps) {
  return (
    <Tag className={className}>
      {lines.map((line) =>
        line.italic ? (
          <em key={line.text}>{line.text}</em>
        ) : (
          <span key={line.text}>{line.text}</span>
        ),
      )}
    </Tag>
  );
}
