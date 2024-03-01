export const typesColors = {
    normal: 'light',
    fighting: 'danger',
    flying: 'indigo',
    poison: 'violet',
    ground: 'amber',
    rock: 'amber',
    bug: 'lime',
    ghost: 'violet',
    steel: 'trueGray',
    fire: 'red',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    psychic: 'pink',
    ice: 'lightBlue',
    dragon: 'purple',
    dark: 'dark',
    fairy: 'pink',
    unknown: 'gray',
    shadow: 'dark',
  };
  
  export const getTypeColor = (type) => {
    return typesColors[type] || 'light';
  };
  
  // Funcion para formatear el numero a 3 dígitos
  export const formatNumber = (num) => {
    return num.toString().padStart(3, '0');
  };