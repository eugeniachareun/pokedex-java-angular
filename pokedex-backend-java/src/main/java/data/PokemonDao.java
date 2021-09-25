package data;

import domain.Pokemon;
import domain.Tipo;
import java.util.List;

/**
 *
 * @author Eugenia Chareun
 */
public interface PokemonDao {
  public List<Pokemon> getAllPokemons();
  public List<Pokemon> getAllPokemonsByTipo(Tipo tipo);
  public Pokemon getPokemonById(Integer idPkmn);
  public Pokemon getPokemonByNro(Integer nroPkmn);
  public Pokemon getPokemonByNombre(String nombre);
  public Pokemon getRandomPokemon();
  public void insertPokemon(Pokemon pkmn);
  public void updatePokemon(Pokemon pkmn);
  public void deletePokemon(Pokemon pkmn);
  public void hidePokemon(Pokemon pkmn);
  public void showPokemon(Pokemon pkmn);
}
