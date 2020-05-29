
function isNumber(char: string): boolean{
    return !!char.match(/\d/);
}


export function formatDateStringIfValid(value: string): string | undefined{
    const valueLength = value.length;
    const lastChar = value[valueLength - 1];

    if (valueLength === 0){
        return value;
    }

    else if(valueLength === 3 || valueLength === 6) {
        //automatically add . in value in this location if not already there

        if(lastChar === '.'){
            return value
        }
        else if (isNumber(lastChar)){
            //add . in value
            return value.slice(0, valueLength - 1) + '.' + lastChar;
        }
    }

    else if (isNumber(lastChar)){
        return value
    }

}