fs = require('fs')

fs.readFile('input', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let calories=[]
  const sections = data.split(/(\h*\n){2,}/)
  for (const section of sections) {
    const eats = section.split(/\n/)
    const sum = eats.reduce((acc, a) => acc + (+a), 0)
    calories.push(sum)
  }
  calories.sort((a,b)=>b-a)
  console.log(calories.slice(0,3).reduce((acc,a)=>acc+a , 0));
});