import images from "./images";

export const onBoardingData = [
    {
        id: "1",
        image: images.slide1,
        title: "",
        text: "Actionable insights",
    },
    {
        id: "2",
        image: images.slide2,
        title: "Gesture Control Integration",
        text: "Automatic device control",
    },
    {
        id: "3",
        image: images.slide3,
        title: "Plug labeling and Rules",
        text: "Simple hand movement",
    },
] as const;

export type OnBoardingType = (typeof onBoardingData)[number];
