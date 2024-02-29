export const FetchFunction = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch {
        throw new Error(error.message);
    }
};

/* export async function fetchFunction(url) {
    const response = await fetch(url)
  
    return response.json()
};
 */


export const FetchAllPokemons = async (pageParam) => {
    try {
        const response = await fetch(pageParam || 'https://pokeapi.co/api/v2/pokemon/')
        return await response.json()
    }  catch {
        throw new Error(error.message);
    }
}
