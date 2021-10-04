package data;

import domain.Pokemon;
import domain.Tipo;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Eugenia Chareun <eugenia.chareun@gmail.com>
 */

@Stateless
public class PokemonDaoImpl implements PokemonDao{

  @PersistenceContext (unitName = "PokedexPU")
  EntityManager em;
  
  @Override
  public List<Pokemon> getAllPokemons() {
    return em.createNamedQuery("Pokemon.findAll").getResultList();
  }

  @Override
  public List<Pokemon> getAllPokemonsByTipo(Tipo tipo) {
    return em.createQuery( "SELECT p from Pokemon p WHERE p.tipo1 = :tipo OR p.tipo2 = :tipo", Pokemon.class).setParameter("tipo", tipo).getResultList();
  }

  @Override
  public Pokemon getPokemonById(Integer idPkmn) {
    return em.find(Pokemon.class, idPkmn);
  }

  @Override
  public Pokemon getPokemonByNro(String nroPkmn) {
    return (Pokemon) em.createNamedQuery("Pokemon.findByNroPkmn").setParameter("nroPkmn", nroPkmn).getSingleResult();
  }

  @Override
  public Pokemon getPokemonByNombre(String nombre) {
    return (Pokemon) em.createNamedQuery("Pokemon.findByNombre").setParameter("nombre", nombre).getSingleResult();
  }

  @Override
  public Pokemon getRandomPokemon() {
    int min = 1;
    int max = 151;
    int random = (int) Math.floor(Math.random()*(max-min+1)+min);
    String zeroFilled = this.zeroFill(random);
    
    return (Pokemon) em.createNamedQuery("Pokemon.findByNroPkmn").setParameter("nroPkmn", zeroFilled).getSingleResult();
  }

  @Override
  public void insertPokemon(Pokemon pkmn) {
    em.persist(pkmn);
    em.flush();
  }

  @Override
  public void updatePokemon(Pokemon pkmn) {
    em.merge(pkmn);
  }

  @Override
  public void hidePokemon(Pokemon pkmn) {
    pkmn.setMostrar(Short.parseShort("0"));
    em.merge(pkmn);
  }
  
  @Override
  public void showPokemon(Pokemon pkmn){
    pkmn.setMostrar(Short.parseShort("1"));
    em.merge(pkmn);
  }
  
  @Override
  public void deletePokemon(Pokemon pkmn) {
    em.remove(em.merge(pkmn));
  }
  
  private String zeroFill(int n){
    String str = null;
    if(n <= 9 ){
      str = "00" + n;
    } else if(n >= 10 && n <= 99){
      str = "0" + n;
    } else{
      str = Integer.toString(n);
    }
    return str;
  }
}


