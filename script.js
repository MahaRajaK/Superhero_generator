const newherobtn = document.getElementById("newhero");
const heroimgdiv = document.getElementById("heroimg");
const searchdiv = document.getElementById("searchhero");
const searchinput = document.getElementById("searchinput");
const heronamediv = document.getElementById("heroname");
const clearbtn = document.getElementById("cleardata");
const statsdiv = document.getElementById("stats");

const base = "https://superheroapi.com/api.php/769214588220547";

const getsuperhero = (id) => {
  fetch(`${base}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      getstatshtml(json);
    });
};

const stattoemoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️",
  power: "📊",
  combat: "⚔️",
};

const getstatshtml = (character) => {
  const name = `<h2>${character.name}</h2>`;

  const image = `<img src =  "${character.image.url}" height = 200px width = 200px/>`;

  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<h3>${stattoemoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</h3>`;
    })
    .join(" ");

  heroimgdiv.innerHTML = `${name}${image}${stats}`;
};

const searchhero = (name) => {
  fetch(`${base}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      getstatshtml(hero);
    });
};

const clearherodata = () => {
  heroimgdiv.innerHTML = " ";
  searchinput.innerText = " ";
};

const randomhero = () => {
  let totalnumber = 731;
  return Math.floor(Math.random() * totalnumber) + 1;
};
searchdiv;
newherobtn.onclick = () => getsuperhero(randomhero());
searchdiv.onclick = () => searchhero(searchinput.value);
clearbtn.onclick = () => clearherodata();
