
import { IRover } from '../interfaces/rover';
import { IRoverCamera } from '../interfaces/rover-camera';

export const rovers: IRover[] = [
    <IRover>{
        title: "Curiosity",
        cameras: [
            <IRoverCamera>{
                abbr: "FHAZ",
                title: "Front Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "RHAZ",
                title: "Rear Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "MAST",
                title: "Mast Camera",
            },
            <IRoverCamera>{
                abbr: "CHEMCAM",
                title: "Chemistry and Camera Complex",
            },
            <IRoverCamera>{
                abbr: "MAHLI",
                title: "Mars Hand Lens Imager",
            },
            <IRoverCamera>{
                abbr: "MARDI",
                title: "Mars Descent Imager",
            },
            <IRoverCamera>{
                abbr: "NAVCAM",
                title: "Navigation Camera",
            },
        ]
    },
    <IRover>{
        title: "Opportunity",
        cameras: [
            <IRoverCamera>{
                abbr: "FHAZ",
                title: "Front Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "RHAZ",
                title: "Rear Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "NAVCAM",
                title: "Navigation Camera",
            },
            <IRoverCamera>{
                abbr: "PANCAM",
                title: "Panoramic Camera",
            },
            <IRoverCamera>{
                abbr: "MINITES",
                title: "Miniature Thermal Emission Spectrometer (Mini-TES)",
            },
        ]
    },
    <IRover>{
        title: "Spirit",
        cameras: [
            <IRoverCamera>{
                abbr: "FHAZ",
                title: "Front Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "RHAZ",
                title: "Rear Hazard Avoidance Camera",
            },
            <IRoverCamera>{
                abbr: "NAVCAM",
                title: "Navigation Camera",
            },
            <IRoverCamera>{
                abbr: "PANCAM",
                title: "Panoramic Camera",
            },
            <IRoverCamera>{
                abbr: "MINITES",
                title: "Miniature Thermal Emission Spectrometer (Mini-TES)",
            },
        ]
    },
];