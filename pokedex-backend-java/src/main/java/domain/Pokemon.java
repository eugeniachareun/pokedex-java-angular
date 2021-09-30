package domain;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author euge
 */
@Entity
@NamedQueries({
  @NamedQuery(name = "Pokemon.findAll", query = "SELECT p FROM Pokemon p ORDER BY p.idPkmn"),
  @NamedQuery(name = "Pokemon.findByNroPkmn", query = "SELECT p FROM Pokemon p WHERE p.nroPkmn = :nroPkmn"),
  @NamedQuery(name = "Pokemon.findByNombre", query = "SELECT p FROM Pokemon p WHERE p.nombre = :nombre")})
public class Pokemon implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic(optional = false)
  @Column(name = "id_pkmn")
  private Integer idPkmn;
  
  @Basic(optional = false)
  @NotNull
  @Column(name = "nro_pkmn")
  private String nroPkmn;
  
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  private String nombre;
  
  @Size(max = 255)
  private String descripcion;
  
  private Short mostrar;
  
  @JoinColumn(name = "tipo1", referencedColumnName = "id_tipo")
  @ManyToOne
  private Tipo tipo1;
  
  @JoinColumn(name = "tipo2", referencedColumnName = "id_tipo")
  @ManyToOne
  private Tipo tipo2;

  public Pokemon() {
  }

  public Pokemon(Integer idPkmn) {
    this.idPkmn = idPkmn;
  }

  public Pokemon(String nroPkmn, String nombre) {
    this.nroPkmn = nroPkmn;
    this.nombre = nombre;
  }
  
  public Pokemon(String nroPkmn){
    this.nroPkmn = nroPkmn;
  }

  public Integer getIdPkmn() {
    return idPkmn;
  }

  public void setIdPkmn(Integer idPkmn) {
    this.idPkmn = idPkmn;
  }

  public String getNroPkmn() {
    return nroPkmn;
  }

  public void setNroPkmn(String nroPkmn) {
    this.nroPkmn = nroPkmn;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public Short getMostrar() {
    return mostrar;
  }

  public void setMostrar(Short mostrar) {
    this.mostrar = mostrar;
  }

  public Tipo getTipo1() {
    return tipo1;
  }

  public void setTipo1(Tipo tipo) {
    this.tipo1 = tipo;
  }

  public Tipo getTipo2() {
    return tipo2;
  }

  public void setTipo2(Tipo tipo) {
    this.tipo1 = tipo2;
  }

  @Override
  public int hashCode() {
    int hash = 0;
    hash += (idPkmn != null ? idPkmn.hashCode() : 0);
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Pokemon)) {
      return false;
    }
    Pokemon other = (Pokemon) object;
    if ((this.idPkmn == null && other.idPkmn != null) || (this.idPkmn != null && !this.idPkmn.equals(other.idPkmn))) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Pokemon{" + "idPkmn=" + idPkmn + ", nroPkmn=" + nroPkmn + ", nombre=" + nombre + ", descripcion=" + descripcion + ", mostrar=" + mostrar + ", tipo1=" + tipo1 + ", tipo2=" + tipo2 + '}';
  }


  
}
