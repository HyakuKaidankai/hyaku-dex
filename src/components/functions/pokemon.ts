import BasicData from '../../assets/data/basic_data.json';
import AltNames from '../../assets/data/alt_names.json';
import PkmnAbility from '../../assets/data/pkmn_ability.json';
import DexFileInfo from '../../assets/data/dex_info_compressed.json';
import HelpLists from '../../assets/data/basic_dexinfo_match_help.json';

// Returns the pokemon data of the Google sheets
export function listPkmn() {  
    return BasicData
}

// Returns a single pokemon data
export function getPkmn(name: string) {
    return BasicData.find(p => p["Species Name"].toLowerCase() === name.toLowerCase());
}

// Returns its alternative name, if there is one
export function getAltName(name: string) {
    let n = name.toLowerCase();
    let res = AltNames.find(data => data["Canonical Name"]?.toLowerCase() === n);
    if(res) {
        return res["Readable name"]
    } else {
        return name
    }
}

// Returns the pokemon abilities
export function getPkmnAbilities(name: string) {
     return PkmnAbility.find((item: any) => item.name.toLowerCase() === name.toLowerCase()) ?? {};
}

// Returns the dex data of a pokemon, searching with the google sheets names
export function getPkmnDexInfo(name: string) {

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
    let data = DexFileInfo.find((p:any) => p.name.toLowerCase() === name.toLowerCase()) ?? {};

    return data;
}

// Returns the sheets data of a pokemon, searching with the dex names
export function getPkmnBasicInfo(name: string) {
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
