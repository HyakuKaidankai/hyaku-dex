import AbilityData from '../../assets/data/ability_data.json';

export function listAbilities() {
    return AbilityData
}
 
export function getAbility(name: string) {
    return AbilityData.find((item:any) => item.Name.toLowerCase() === name.toLowerCase());
}

export function getAbilityEffect(data: any) {
    if(data && data["Effect 2"]) {
        return data["Effect 2"];
    } else if(data && data["Effect"]) {
        return data["Effect"]
    } else {
        return "Not found"
    }
}