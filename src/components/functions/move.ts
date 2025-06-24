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