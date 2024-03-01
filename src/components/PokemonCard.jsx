import { useEffect, useState } from "react"
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native"
import { useQuery } from "@tanstack/react-query";
import { FetchFunction } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, Image, Text, Hstack, Stack, Skeleton, Pressable, Center, AspectRatio, HStack } from "native-base";
import { formatNumber, getTypeColor } from "../utils/helper";

export const PokemonCard = ({ url, name }) => {

    const navigation = useNavigation();

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

    /* console.log(data) */

    if( isLoading ) return (
        <Stack flex={1} space={2} borderRadius={10} m="1.5" p="4">
            <Skeleton h={32}/>
            <Skeleton.Text px={4}/>
        </Stack>
    )
    if( !data || error ) return null; //cambiamos y dejamos de usar los 'pokemon' por 'data'

    return (
        <Pressable flex={1} m="1.5" p="4" backgroundColor={getTypeColor(data.types[0].type.name) + '.500'} borderRadius={10} onPress={() => navigation.navigate('Detail', {name})}>
            <Center>
                <AspectRatio ratio={1} width="80%">
                    <Image 
                    source={{
                        uri: data.sprites.other['official-artwork'].front_default
                    }}
                    alt="pokemon-image"
                    />
                </AspectRatio>
            </Center>
            <HStack justifyContent="space-between" mb={2}>
                <Heading size="sm" color="white" textTransform="capitalize">{data.name}</Heading>
                <Text color="white">#{formatNumber(data.id)}</Text>
            </HStack>
            <HStack>
                {data.types.map((type) => (
                    <Box 
                        key={type.type.name} 
                        backgroundColor={getTypeColor(type.type.name) + '.400'} 
                        borderRadius={10} 
                        px={2} 
                        mr={1}
                        _text={{
                            color:"white",
                            fontSize: 'xs'
                        }}
                    >
                        {type.type.name}
                    </Box>
                ))}
            </HStack>
        </Pressable>
    )
};




//SIN NATIVE BASE
/* 
if( !data || error ) return null; //cambiamos y dejamos de usar los 'pokemon' por 'data'
if( isLoading ) return <ActivityIndicator />;

return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', {name})}>
        <Image 
            source={{
                uri: data.sprites.other['official-artwork'].front_default
            }}
            style={styles.image}
        />
        <Text style={styles.name}>{data.name}</Text>
    </TouchableOpacity>
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
 */