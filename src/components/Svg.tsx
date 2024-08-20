import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  title?: string;
};

export default function Svg({
  src,
  alt,
  width = 18,
  height = 18,
  title = ""
}: Props) {
  return (
    <Image width={width} height={height} src={src} alt={alt} title={title} />
  );
}
