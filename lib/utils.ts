// import { interviewCovers, mappings } from "@/constants";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// const normalizeTechName = (tech: string) => {
//   const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
//   return mappings[key as keyof typeof mappings];
// };

// const checkIconExists = async (url: string) => {
//   try {
//     const response = await fetch(url, { method: "HEAD" });
//     return response.ok; // Returns true if the icon exists
//   } catch {
//     return false;
//   }
// };

// // export const getTechLogos = async (techArray: string[]) => {
// //   const logoURLs = techArray.map((tech) => {
// //     const normalized = normalizeTechName(tech);
// //     return {
// //       tech,
// //       url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
// //     };
// //   });



// // import { mappings } from "@/constants"; // adjust import path as needed

// export const normalizeTechName = (tech: string) => {
//   return mappings[tech.toLowerCase()] || tech.toLowerCase();
// };

// export const getTechLogos = async (techArray?: string[]) => {
//   if (!Array.isArray(techArray)) {
//     return []; // return empty array if input is undefined or not an array
//   }

//   const logoURLs = techArray.map((tech) => {
//     const normalized = normalizeTechName(tech);
//     return {
//       tech,
//       logoUrl: `/logos/${normalized}.svg`, // assuming logos are stored here
//     };
//   });

//   return logoURLs;
// };


// export const getRandomInterviewCover = () => {
//   const randomIndex = Math.floor(Math.random() * interviewCovers.length);
//   return `/covers${interviewCovers[randomIndex]}`;
// };


//   const results = await Promise.all(
//     logoURLs.map(async ({ tech, url }) => ({
//       tech,
//       url: (await checkIconExists(url)) ? url : "/tech.svg",
//     }))
//     return results;
//   );



import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// Normalize tech names using mappings
export const normalizeTechName = (tech: string) => {
  return mappings[tech.toLowerCase()] || tech.toLowerCase();
};

// Check if the icon URL exists
const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

// Generate logo URLs for an array of technologies
export const getTechLogos = async (techArray?: string[]) => {
  if (!Array.isArray(techArray)) return [];

  const results = await Promise.all(
    techArray.map(async (tech) => {
      const normalized = normalizeTechName(tech);
      const url = `${techIconBaseURL}/${normalized}/${normalized}-original.svg`;

      const finalUrl = (await checkIconExists(url)) ? url : "/tech.svg";

      return {
        tech,
        logoUrl: finalUrl,
      };
    })
  );

  return results;
};

// Return a random interview cover path
export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
