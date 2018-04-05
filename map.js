
function getPersonAge(person) {
  return person.age
}
const personnes1 = [
  { name: 'Pierre', age: 31 },
  { name: 'Rose', age: 49 },
  { name: 'Lucie', age: 37 }
]
const ages = personnes1.map(getPersonAge)

function getPersonDescription(person) {
  return `${person.name} a ${person.age} ans`
}
const personnes2 = [
  { name: 'Marie-Claire', age: 40 },
  { name: 'Jacques', age: 23 },
  { name: 'Henri-Charles', age: 45 }
]
const descriptions = personnes2.map(getPersonDescription)

function getPersonHobbies(person) {
  return `${person.name} a ${person.hobbies.length} hobbies : ${person.hobbies.join(', ')}`
}
const personnes3 = [
  { name: 'Rémy', hobbies: ['Cuisine', 'Footing'] },
  { name: 'Julie', hobbies: ['Randonnée', 'Musique'] },
  { name: 'Gérard', hobbies: ['Chasse', 'Pêche', 'Bricolage'] }
]
const hobbies = personnes3.map(getPersonHobbies)
