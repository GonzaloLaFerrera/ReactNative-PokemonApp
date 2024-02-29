import { StatusBar } from 'expo-status-bar';
/* import { useEffect, useState } from 'react'; */
import { StyleSheet, SafeAreaView, FlatList, View, ActivityIndicator } from 'react-native';
import { PokemonCard } from '../components/PokemonCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchAllPokemons } from '../utils/api';

export default function Home() {

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({ //cambiamos el isLoading por isFetching
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => FetchAllPokemons(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (lastPage) => lastPage.previous ? lastPage.previous : null,
    //keepPreviousData: false

    //Segun Documentación React Query
    /* queryFn: (pageParam) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor, */
    
  });

  const loadMore = () => {
    if(hasNextPage) {
      fetchNextPage(); //condicional recientemente agregado (antes solo fetchNextPage()) --> !isFetching && fetchNextPage()
    }
  };

  /* if(isFetching) return <ActivityIndicator />; */ //me daba problemas al cargar el spinner en el margen superior de la pantalla, me posicionaba hasta alla

  if(!data) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <FlatList
        data={data.pages.flatMap((page) => page.results)}
        renderItem={({item}) => (<PokemonCard url={item.url} name={item.name}/>)}
        keyExtractor={item => item.url}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => isFetchingNextPage ? <ActivityIndicator /> : null} //muestra un pequeño 'spinner' de ReactNative al pie de la lista si esta cargando
        scrollsToTop={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /* marginTop: 60  */ // por alguna razon no funciona el SafeAreaView como debería y queda sobre la barra de estado de arriba en el display toda la data (COMENTADO POST NAVIGATION)
  }
});

  //VERSION SIN IMPLEMENTAR REACT QUERY

  /* const [ pokemon, setPokemon ] = useState([]);
  const [ next, setNext ] = useState(); // 'next' es una prop de la API con un endpoint que nos da los siguientes 20 pokemones
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
 
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(res => res.json())
    .then(data => {
      setPokemon(data.results);
      setNext(data.next);
    })
  }, []); */

  /* const loadMore = () => {
    if(isLoadingMore) return; //Si está cargando, retorna. No hace nada 
    if (next) {
      setIsLoadingMore(true)
      fetch(next)
      .then(res => res.json())
      .then(data => {
        setPokemon(prevPokemon => ([...prevPokemon, ...data.results]));
        setNext(data.next);
        setIsLoadingMore(false)
      })
    }
  } */

  /* console.log(pokemon); */

  /* return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <FlatList
        data={pokemon}
        renderItem={({item}) => (<PokemonCard url={item.url} name={item.name}/>)}
        keyExtractor={item => item.name}
        onEndReached={loadMore}
        ListFooterComponent={() => isLoadingMore ? <ActivityIndicator /> : null} //muestra un pequeño 'spinner' de ReactNative al pie de la lista si esta cargando
      />
    </SafeAreaView>
  );
}; */

