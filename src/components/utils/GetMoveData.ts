import MovesData from '../../data/moves_data.json';
import MatchReplaces from '../../data/move_matcher_help.json';

export function getMoveData(move: string) {

    let m = move.trim();

    let replacement_tuples = MatchReplaces;

    for(let tuple of replacement_tuples){
        if(m === tuple[0]) {
            m = tuple[1];
        }
    }

    let parsed_move_name = m.replace("*", "");
    let md = MovesData.find( movedata => movedata.Name.toLowerCase() === parsed_move_name.toLowerCase() );
    return md
}