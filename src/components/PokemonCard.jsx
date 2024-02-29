import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native"
import { useQuery } from "@tanstack/react-query";
import { FetchFunction, fetchFunction } from "../utils/api";

export const PokemonCard = ({ url, name }) => {

    //React Query necesita un array de identificadores, lo utiliza para saber si no hizo ya un Request al endpoint. Si ya se hizo un pedido de 'data' en cualquier componente, lo coteja
    // con los datos que tiene en cache y no hace la llamada nueva.
    const { isLoading, error, data } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => FetchFunction(url) // dela unica forma en la que pude hacer funcionar el queryFn fue inicializando la función () => 'funcion(parametro)'
        /* queryFn: () => 
            fetch(url).then((res) => res.json()) */
        /* queryFn: () => fetchFunction(url) */
    });
    
     
    /* const [ pokemon, setPokemon ] = useState();  */  //cambiamos y dejamos de usar los 'pokemon' por 'data'   

    //Al hacer uso de useQuery este useEffect queda en desuso, y la función de llamada a la API la hacemos directamente como parámetro del hook
    /* useEffect(() => {
        fetch(url)
        .then(result => result.json())
        .then(data => {
            setPokemon(data)
        })
    }, [url]) */

    console.log(data)

    if( !data || error ) return null; //cambiamos y dejamos de usar los 'pokemon' por 'data'
    if( isLoading ) return <ActivityIndicator />;

    return (
        <View style={styles.container}>
            <Image 
                source={{
                    uri: data.sprites.other['official-artwork'].front_default
                }}
                style={styles.image}
            />
            <Text style={styles.name}>{data.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 32
    },
    name: {
        fontWeight: 'bold',
        fontSize: 32
    }
})

