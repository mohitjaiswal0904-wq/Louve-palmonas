export default function RootLoading() {
  // Visually neutral — preserves the pre-existing blank/suspense treatment
  // of the Vite entry while the client bundle hydrates.
  return <div className="page" aria-busy="true" />;
}
