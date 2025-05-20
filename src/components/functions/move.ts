import MovesData from '../../assets/data/moves.json';

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
        Effects:"Unknown"
    };
    return md
}
