import MovesData from '../../assets/data/moves.json';
import DBData from '../../assets/data/db.json';
import FrequencyData from '../../assets/data/frequencies.json';

export function listMoves() {
    return MovesData
}

export function getMove(move: string) {

    let m = move.trim();

    let parsed_move_name = m.replace("*", "");
    let md = MovesData.find( movedata => movedata.Name.toLowerCase() === parsed_move_name.toLowerCase() ) ?? {
        Type__1:"Unknown",
        Category__1:"Unknown",
        DB:"Unknown",
        AC:"Unknown",
        Range:"Unknown",
        Effects:"Unknown",
        Frequency:"Unknown",
        Name: "Unknown",
        "Contest Stats": "Unknown",
    };
    return md
}

export function getDBData(db: number | string) {
    let md = DBData.find( data => data.db === db ) ?? {
        db:"Unknown",
        roll:"Unknown",
    };
    return md
}

export function getFrequencyDescription(frequency: string) {
    if (frequency.toLowerCase().includes("daily")) {
        frequency = "Daily";
    }
    if (frequency.toLowerCase().includes("scene")) {
        frequency = "Scene";
    }
    let fd = FrequencyData.find( data => data.name.toLowerCase() === frequency.toLowerCase() ) ?? {
        name: "Unknown",
        description: "Unknown",
    };
    return fd.description;
}

export function sanitizeMoveName(move: string) {
    const special_cases = [
        ["baby-doll-eyes", "baby-doll eyes"],
        ["power-up-punch", "power-up punch"],
        ["wake-up-slap", "wake-up slap"],
        ["shell-side-arm", "shell side arm"],
        ["vice-grip", "vise grip"],
        ["high-jump-kick", "high jump kick"],
        ["conversion-2", "conversion2"],
        ["roar-of-time", "roar of time"],
        ["kings-shield", "king's shield"],
        ["forests-curse", "forest's curse"],
        ["lands-wrath", "land's wrath"],
        ["natures-madness", "nature's madness"],
        ["double-iron-bash", "double iron bash"],
        ["make-it-rain", "make it rain"]
    ]

    const foundCase = special_cases.find(subArray => subArray[0] === move);
    if(foundCase) {
        move = foundCase[1];
    }

    if (getMove(move).Name === "Unknown") {
        move = move.replace("-", " ")
    }    
    if (getMove(move).Name === "Unknown") {
        throw new Error(`Move "${move}" not found in the database.`);
    } else {
        return move;
    }
}