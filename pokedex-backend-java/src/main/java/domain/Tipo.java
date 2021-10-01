package domain;

/**
 *
 * @author Eugenia Chareun <eugenia.chareun@gmail.com>
 */
public enum Tipo {
  ACERO("Acero"), 
  AGUA("Agua"),
  BICHO("Bicho"),
  DRAGON("Dragón"),
  ELECTRICO("Eléctrico"),
  FANTASMA("Fantasma"),
  FUEGO("Fuego"), 
  HADA("Hada"), 
  HIELO("Hielo"), 
  LUCHA("Lucha"), 
  NORMAL("Normal"), 
  PLANTA("Planta"), 
  PSIQUICO("Psíquico"), 
  ROCA("Roca"), 
  SINIESTRO("Siniestro"), 
  TIERRA("Tierra"), 
  VENENO("Veneno"), 
  VOLADOR("Volador"),
  NO_TIENE("No tiene segundo tipo");

  private final String nombre;
   
  private Tipo(String nombre){
    this.nombre = nombre;
  }
  
  public String getNombre(){
    return this.nombre;
  }
}
