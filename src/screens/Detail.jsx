import { useQuery } from "@tanstack/react-query";
import { FetchFunction } from "../utils/api";
import { AspectRatio, Image, Text, Heading, Stack, Center, HStack, Skeleton } from "native-base";
import { formatNumber, getTypeColor, removeEscapeCharacters } from "../utils/helper";

export function Detail({ route }) {
    const { name, url } = route.params;
    const { isLoading, error, data } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => FetchFunction(url)
    });
    const { isLoading: isLoadingSpecies, data: species } = useQuery({
        queryKey: ['species', name],
        queryFn: () => FetchFunction(data.species.url),
        if(species) {
            this.enabled
        }
    });

    if(!data) return null;

    //console.log(name)

    return(
        <Stack>
            <Center
                backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}
                safeArea
            >
                <AspectRatio ratio={1} width="80%" marginTop={6}>
                    <Image
                        source={{ 
                            uri: data.sprites.other['official-artwork'].front_default
                        }}
                        alt="pokémon_image"
                    />
                </AspectRatio> 
                <HStack justifyContent='space-between' width="100%" p={3} alignItems="center" >
                    <Heading color="white" textTransform="capitalize" fontSize="2xl">{name}</Heading>
                    <Heading color="white">#{formatNumber(data.id)}</Heading>
                </HStack>
            </Center>
            <Stack p="3" mt="2">
                <HStack justifyContent="center">
                        {data.types.map((type) => (
                            <Center 
                                key={type.type.name} 
                                backgroundColor={getTypeColor(type.type.name) + '.400'}
                                rounded='full'
                                p="1"
                                mx={2}
                                minW={32}
                                _text={{
                                    color: 'white',
                                    textTransform:'capitalize',
                                    fontSize:'lg',
                                    fontWeight: 'bold'
                                }}
                            >
                                {type.type.name}
                            </Center>
                        ))}
                </HStack>
                <Center mt="4">
                    {isLoadingSpecies && <Skeleton.Text/>}
                    {species && (
                        <Text fontSize="xl" mt="4" fontWeight="semibold">"{removeEscapeCharacters(species.flavor_text_entries[0].flavor_text)}"</Text>
                    )}
                </Center>
            </Stack>
        </Stack>
    )
};



//Sin Native Base   

/* import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { FetchFunction } from "../utils/api";
import { AspectRatio, Image, Text, Heading, Stack, Hstack } from "native-base";

export function Detail({ route }) {
    const { name, url } = route.params;
    const { isLoading, error, data } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => FetchFunction(url)
    });

    if(!data) return null;

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{data.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40
    }
}); */