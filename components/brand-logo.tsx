

export function BrandLogo({fr=false}:{fr?:boolean}) {
  return (
    <a className="logo" href={fr?"/fr":"/"} aria-label={fr?"Accueil Turfy":"Turfy home"}>
      {/* Frame the approved artwork without altering its lettering or turf. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/turfy-turf-logo.png" alt="Turfy" width={1536} height={1024} />
    </a>
  );
}
