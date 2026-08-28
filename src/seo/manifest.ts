import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Det muslimske trosregisteret",
    short_name: "Trosregisteret",
    description:
      "Sjekk hvilke tros- og livssynssamfunn du er registrert i.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf7",
    theme_color: "#214d3c",
    lang: "nb",
    icons: [
      {
        src: "/brand/trosregisteret-icon.webp",
        sizes: "989x857",
        type: "image/webp",
      },
    ],
  };
}
