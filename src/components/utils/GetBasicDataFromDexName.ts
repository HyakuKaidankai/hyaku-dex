import BasicData from '../../data/basic_data.json';
import HelpLists from '../../data/basic_dexinfo_match_help.json';

export function getBasicDataFromDexName(name: string) {
    let one_to_one_replaces = HelpLists.one_to_one;
    let form_redirect_replaces = HelpLists.form_redirects;
    let remove_dash_words = HelpLists.dash_removed;
    let replaced_words = HelpLists.replaced;

    let is_oto = false    
    for(let replacement_tuple of one_to_one_replaces) {
        if (name.toLowerCase() == replacement_tuple[1].toLowerCase()) {
            name = name.replace(name, replacement_tuple[0]);
            is_oto = true
        }
    }

    let is_fr = false    
    for(let replacement_tuple of form_redirect_replaces) {
        if (name.toLowerCase() == replacement_tuple[0].toLowerCase()) {
            name = name.replace(name, replacement_tuple[1]);
            is_oto = true
        }
    }


    if(!is_oto && !is_fr) {
        for(let word of remove_dash_words) {
            let target = word.replace("-", " ");
            if (name.toLowerCase().includes(target.toLowerCase())) {
                name = name.replace(" ", "-");
            }
        }

        for(let [oldWord, newWord] of replaced_words) {
            if (name.toLowerCase().includes(newWord.toLowerCase())) {
                name = name.toLowerCase().replace(newWord.toLowerCase(), oldWord.toLowerCase());
            }
        }
    }
    let data = BasicData.find( (p: any) => p["Species Name"].toLowerCase() == name.toLowerCase());
    return data
}