import Image from "next/image";

export default function WorkThumb({
  src,
  alt,
  sizes,
  cover,
}: {
  src: string;
  alt: string;
  sizes: string;
  cover?: boolean;
}) {
  return (
    <div className="work-thumb-frame">
      <div className="work-thumb-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={`work-thumb${cover ? " work-thumb-cover" : ""}`}>
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
    </div>
  );
}
