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
    var hasDouble = false;
    var doublingCount = 0;

    while(number > 0){
        number = (number - lastDigit) / 10;
        var digit = number % 10;

        if(digit > lastDigit){
            return false;
        }
        if(digit == lastDigit){
            doublingCount++;
        }
        else {
            if(doublingCount == 1){
                hasDouble = true;
            }

            doublingCount = 0;
        } 
        
        prevLastDigit =
        lastDigit = digit;
    }

    return hasDouble;
}

console.log(count);