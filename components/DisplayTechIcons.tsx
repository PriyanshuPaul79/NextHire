// import Image from "next/image";

// import { cn, getTechLogos } from "@/lib/utils";

// const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
//   const techIcons = await getTechLogos(techStack);

//   return (
//     <div className="flex flex-row">
//       {techIcons.slice(0, 3).map(({ tech, url }, index) => (
//         <div
//           key={tech}
//           className={cn(
//             "relative group bg-dark-300 rounded-full p-2 flex flex-center",
//             index >= 1 && "-ml-3"
//           )}
//         >
//           <span className="tech-tooltip">{tech}</span>

//           <Image
//             src={url}
//             alt={tech}
//             width={100}
//             height={100}
//             className="size-5"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DisplayTechIcons;



"use client";

import { useEffect, useState } from "react";
import { getTechLogos } from "@/lib/utils";

type Props = {
  tech?: string[];
};

export const DisplayTechIcons = ({ tech }: Props) => {
  const [logos, setLogos] = useState<{ tech: string; logoUrl: string }[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const result = await getTechLogos(tech); // tech might be undefined
      setLogos(result);
    };
    fetchLogos();
  }, [tech]);

  return (
    <div className="flex gap-2 flex-wrap">
      {logos.map(({ tech, logoUrl }) => (
        <img key={tech} src={logoUrl} alt={tech} className="h-6 w-6" />
      ))}
    </div>
  );
};
