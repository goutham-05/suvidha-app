export interface ServiceModalObject {
    title: string;
    modalType: "form" | "list";
    operator: "checkbox" | "button";
    parameters: string[]
}

export const serviceModalObjects: ServiceModalObject[] = [
    {
        title: "test",
        modalType: "list",
        operator: "button",
        parameters: ["Call Red Ambulance"]
    },
    {
        title: "Contact Support",
        modalType: "list",
        operator: "button",
        parameters: [
            "Floor Manager",
            "Nursing in charge",
            "Financial Counsellor"
        ]
    },
    {
        title: "House Keeping",
        modalType: "form",
        operator: "checkbox",
        parameters: [
            "Bedsheet Change",
            "Bathroom Cleaning",
            "Dustbin Change",
            "Room Cleaning",
            "Newspaper"
        ]
    },
    {
        title: "Facilities",
        modalType: "form",
        operator: "checkbox",
        parameters: [
            "TV not Working",
            "Fan not Working",
            "Phone not Working",
            "Lights not working",
            "AC not Working",
            "Nurse call bell not Working",
            "Bed features not Working"
        ]
    },
]