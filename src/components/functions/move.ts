import MovesData from '../../assets/data/moves_data.json';
import MatchReplaces from '../../assets/data/move_matcher_help.json';

export function listMoves() {
    return MovesData
}

export function getMove(move: string) {

    let m = move.trim();

    let replacement_tuples = MatchReplaces;

    for(let tuple of replacement_tuples){
        if(m === tuple[0]) {
            m = tuple[1];
        }
    }

    let parsed_move_name = m.replace("*", "");
    let md = MovesData.find( movedata => movedata.Name.toLowerCase() === parsed_move_name.toLowerCase() ) ?? {
        Type__1:"Unknown",
        Category__1:"Unknown",
        DB:"Unknown",
        AC:"Unknown",
        Range:"Unknown"
    };
    return md
}
