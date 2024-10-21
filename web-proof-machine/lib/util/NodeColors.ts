function getBackgroundColorFromAbbreviation(abbreviation: string) {
    switch (abbreviation) {
        case "r": return "bg-red";
        case "y": return "bg-yellow";
        case "g": return "bg-green";
        case "b": return "bg-blue";
        case "w": return "bg-white";
        case "bl": return "bg-black";
        case "o": return "bg-orange";
        case "p": return "bg-purple";
        case "c": return "bg-cyan";
    }
}

export function getNodeClassNameFromAbbreviation(abbreviation: string) {
    if (abbreviation.substring(0, 8) === "striped_") {
        const color = abbreviation.substring(8)
        return 'bg-striped ' + getBackgroundColorFromAbbreviation(color)
    } else {
        return getBackgroundColorFromAbbreviation(abbreviation)
    }
}
