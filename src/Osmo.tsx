// Osmo, the LaunchDarkly mark. Path from the official brand asset
// (launchdarkly-osmo-logomark.svg). Per brand guidelines, render it only in
// white or LaunchDarkly Black; it inherits the surrounding text color here.
function Osmo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      role="img"
      aria-label="LaunchDarkly Osmo"
      data-testid="osmo"
    >
      <path d="M32.62 60.61c-.445 0-.892-.254-1.147-.7-.191-.444-.191-.889.128-1.27l13.582-18.62-23.785 9.66c-.191.063-.319.126-.51.126-.574 0-1.084-.38-1.212-.89-.191-.508.064-1.08.51-1.397l20.916-12.266-36.794-2.097c-.765-.063-1.211-.635-1.211-1.27 0-.573.382-1.208 1.211-1.272l36.794-2.097-20.916-12.265c-.446-.318-.701-.89-.51-1.398.192-.509.638-.89 1.212-.89.191 0 .319.063.51.127l23.785 9.66L31.601 5.067c-.255-.381-.32-.89-.128-1.271.191-.445.638-.7 1.148-.7.319 0 .638.128.893.382L60.55 30.36c.383.381.574.953.574 1.462 0 .508-.191 1.016-.574 1.461L33.514 60.23a1.261 1.261 0 0 1-.893.38Z" />
    </svg>
  );
}

export default Osmo;
