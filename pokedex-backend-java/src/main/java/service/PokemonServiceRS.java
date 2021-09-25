package service;

import data.PokemonDao;
import domain.Pokemon;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 *
 * @author Eugenia Chareun <eugenia.chareun@gmail.com>
 */

import javax.ws.rs.core.Response.Status;
@Stateless
@Path("/pokemons")
public class PokemonServiceRS {
  
  @Inject
  private PokemonDao pokemonDao;
  
  @GET
  @Produces(value= MediaType.APPLICATION_JSON)
  public List<Pokemon> listarPokemons(){
    List<Pokemon> pokemons = pokemonDao.getAllPokemons();
    System.out.println("Lista recuperada de pokemons: " + pokemons);
    return pokemons;
  }
  
  @GET
  @Produces(value= MediaType.APPLICATION_JSON)
  @Path("tipo/{idTipo}")
  public List<Pokemon> buscarPokemonsPorTipo(@PathParam("idTipo") int idTipo){
    System.out.println("ID tipo seleccionado: " + idTipo);
    List<Pokemon> pokemons = pokemonDao.getAllPokemonsByTipo(idTipo);
    System.out.println("Lista recuperada de pokemons por tipo " + pokemons);
    return pokemons;
  }
  
  @GET
  @Produces(value= MediaType.APPLICATION_JSON)
  @Path("id/{idPkmn}")
  public Pokemon buscarPokemonPorId(@PathParam("idPkmn") int idPkmn){
    Pokemon pkmn = pokemonDao.getPokemonById(idPkmn);
    System.out.println("Pokemon recuperado por id: " + pkmn);
    return pkmn;
  }

  @GET
  @Produces(value = MediaType.APPLICATION_JSON)
  @Path("nro/{nroPkmn}")
  public Pokemon buscarPokemonPorNro(@PathParam("nroPkmn") int nroPkmn){
    Pokemon pkmn = pokemonDao.getPokemonByNro(nroPkmn);
    System.out.println("Pokemon recuperado por número: " + pkmn);
    return pkmn;
  }
  
  @GET
  @Produces(value = MediaType.APPLICATION_JSON)
  @Path("nombre/{nombre}")
  public Pokemon buscarPokemonPorNombre(@PathParam("nombre") String nombre){
    Pokemon pkmn = pokemonDao.getPokemonByNombre(nombre);
    System.out.println("Pokemon recuperado por nombre: " + pkmn);
    return pkmn;
  }
  
  @GET
  @Produces(value = MediaType.APPLICATION_JSON)
  @Path("/random")
  public Pokemon obtenerPokemonRandom(){
    Pokemon pkmn = pokemonDao.getRandomPokemon();
    return pkmn;
  }
  
  
  @POST
  @Consumes(value= MediaType.APPLICATION_JSON)
  @Produces(value= MediaType.APPLICATION_JSON)
  public Pokemon agregarPokemon(Pokemon pkmn){
    pokemonDao.insertPokemon(pkmn);
    System.out.println("Pokemon agregado: " + pkmn);
    return pkmn;
  }
  
  @PUT
  @Consumes(value= MediaType.APPLICATION_JSON)
  @Produces(value= MediaType.APPLICATION_JSON)
  @Path("{idPkmn}")
  public Response modificarPokemon(@PathParam("idPkmn") int idPkmn, Pokemon pkmnModificado){
    Pokemon pkmn = pokemonDao.getPokemonById(idPkmn);
    if(pkmn != null){
      pokemonDao.updatePokemon(pkmnModificado);
      System.out.println("Pokemon modificado: " + pkmnModificado);
      return Response.ok().entity(pkmnModificado).build();
    } else{
      return Response.status(Status.NOT_FOUND).build();
    }
  }
  
  @PUT
  @Consumes(value= MediaType.APPLICATION_JSON)
  @Produces(value= MediaType.APPLICATION_JSON)
  @Path("visibility/{idPkmn}")
  public Response cambiarVisibilidadPokemon(@PathParam("idPkmn") int idPkmn){
    Pokemon pkmn = pokemonDao.getPokemonById(idPkmn);
    if(pkmn != null){
      if(pkmn.getMostrar() == 0){
        pokemonDao.showPokemon(pkmn);
        System.out.println("Pokemon a mostrar: " + pkmn);
      } else{
        pokemonDao.hidePokemon(pkmn);
        System.out.println("Pokemon a ocultar: " + pkmn);
      }
      return Response.ok().entity(pkmn).build();
    } else{
      return Response.status(Status.NOT_FOUND).build();
    }
  }
  
  @DELETE
  @Produces(value= MediaType.APPLICATION_JSON)
  @Path("{idPkmn}")
  public Response eliminarPokemon(@PathParam("idPkmn") int idPkmn){
    Pokemon pkmn = pokemonDao.getPokemonById(idPkmn);
    if(pkmn != null){
      System.out.println("Pokemon a eliminar: " + pkmn);
      pokemonDao.deletePokemon(pkmn);
      return Response.ok().build();
    } else{
      return Response.status(Status.NOT_FOUND).build();
    }
  }
}
