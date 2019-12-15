var data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

var recipes = data.map(e => {
    var split = e.split(' => ');
    return {
        type: split[1].split(' ')[1],
        amount: Number(split[1].split(' ')[0]),
        requirements: split[0].split(', ').map(e => {
            return {
                type: e.split(' ')[1],
                amount: Number(e.split(' ')[0]),
            }
        }),
        spare: 0,
    }
});

var queue = [{type: 'FUEL', amount: 1}];
var ores = 0;

while(queue.length){
    var item = queue.shift();
    var recipe = recipes.find(e => e.type === item.type);

    recipe.requirements.forEach(e => {
        if(e.type === 'ORE'){
            ores += e.amount * (item.amount / recipe.amount);
            return;
        }
        var reqRecipe = recipes.find(a => a.type === e.type);
        reqRecipe.spare -= e.amount * (item.amount / recipe.amount);
        if(reqRecipe.spare < 0){
            var amount = Math.ceil(-reqRecipe.spare / reqRecipe.amount) * reqRecipe.amount;
            queue.push({type: reqRecipe.type, amount: amount});
            reqRecipe.spare += amount;
        }
    })
}

console.log(ores);