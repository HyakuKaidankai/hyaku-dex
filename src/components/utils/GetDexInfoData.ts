import DexFileInfo from '../../data/dex_info_compressed.json';
import HelpLists from '../../data/basic_dexinfo_match_help.json';

export function getDexInfoData(name: string) {

    let one_to_one_replaces = HelpLists.one_to_one;
    let remove_dash_words = HelpLists.dash_removed;
    let filtered_words = HelpLists.filtered;
    let replaced_words = HelpLists.replaced;

    let is_oto = false    
    for(let replacement_tuple of one_to_one_replaces) {
        if (name.toLowerCase() == replacement_tuple[0].toLowerCase()) {
            name = name.replace(name, replacement_tuple[1]);
            is_oto = true
        }
    }

    if(!is_oto) {    
        for(let word of remove_dash_words) {
            if (name.includes(word)) {
                name = name.replace("-", " ");
            }
        }

        for(let word of filtered_words) {
            if (name.includes(word)) {
                name = name.replace(word, "");
            }
        }
    
        for(let [oldWord, newWord] of replaced_words) {
            if (name.includes(oldWord)) {
                name = name.replace(oldWord, newWord);
            }
        }
    }
    let data = DexFileInfo.find((p:any) => p.name.toLowerCase() === name.toLowerCase());

    return data
}