function getBackgroundColorFromLabel(label: string) {
    switch (label) {
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

export function getCellClassNameFromLabel(label: string) {
    if (label.substring(0, 8) === "striped_") {
        const color = label.substring(8)
        return 'bg-striped ' + getBackgroundColorFromLabel(color)
    } else {
        return getBackgroundColorFromLabel(label)
    }
}
