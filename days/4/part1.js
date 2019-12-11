var start = 125730;
var end = 579381;
var count = 0;

for(var i = start; i < end; i++){
    if(meetsRequirements(i)){
        count++;
    }
}

function meetsRequirements(number){
    var lastDigit = number % 10;
    var double = false;

    while(number > 0){
        number = (number - lastDigit) / 10;
        var digit = number % 10;

        if(digit > lastDigit){
            return false;
        }
        if(digit == lastDigit){
            double = true;
        }
        
        lastDigit = digit;
    }

    return double;
}

console.log(count);