package domain;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.eclipse.persistence.annotations.ConversionValue;
import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.ObjectTypeConverter;

/**
 *
 * @author Eugenia Chareun <eugenia.chareun@gmail.com>
 */
@Entity
@NamedQueries({
  @NamedQuery(name = "Pokemon.findAll", query = "SELECT p FROM Pokemon p"),
  @NamedQuery(name = "Pokemon.findByIdPkmn", query = "SELECT p FROM Pokemon p WHERE p.idPkmn = :idPkmn"),
  @NamedQuery(name = "Pokemon.findByNroPkmn", query = "SELECT p FROM Pokemon p WHERE p.nroPkmn = :nroPkmn"),
  @NamedQuery(name = "Pokemon.findByNombre", query = "SELECT p FROM Pokemon p WHERE p.nombre = :nombre"),
  @NamedQuery(name = "Pokemon.findByTipo1", query = "SELECT p FROM Pokemon p WHERE p.tipo1 = :tipo1"),
  @NamedQuery(name = "Pokemon.findByTipo2", query = "SELECT p FROM Pokemon p WHERE p.tipo2 = :tipo2"),
  @NamedQuery(name = "Pokemon.findByDescripcion", query = "SELECT p FROM Pokemon p WHERE p.descripcion = :descripcion"),
  @NamedQuery(name = "Pokemon.findByMostrar", query = "SELECT p FROM Pokemon p WHERE p.mostrar = :mostrar")})
public class Pokemon implements Serializable {

  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic(optional = false)
  @Column(name = "id_pkmn")
  private Integer idPkmn;
  
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 3)
  @Column(name = "nro_pkmn")
  private String nroPkmn;
  
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  private String nombre;
  
  @Enumerated(value = EnumType.STRING)
  @Basic(optional = false)
  @NotNull
  private Tipo tipo1;
  
  @Enumerated(value = EnumType.STRING)
  @Basic(optional = false)
  @NotNull
  private Tipo tipo2;
  
  
  @Size(max = 255)
  private String descripcion;
  
  private Short mostrar;

  public Pokemon() {
  }

  public Pokemon(Integer idPkmn) {
    this.idPkmn = idPkmn;
  }

  public Pokemon(Integer idPkmn, String nroPkmn, String nombre, Tipo tipo1, Tipo tipo2, String descripcion, Short mostrar) {
    this.idPkmn = idPkmn;
    this.nroPkmn = nroPkmn;
    this.nombre = nombre;
    this.tipo1 = tipo1;
    this.tipo2 = tipo2;
    this.descripcion = descripcion;
    this.mostrar = mostrar;
  }

  
  
  public Pokemon(Integer idPkmn, String nroPkmn, String nombre, Tipo tipo1, Tipo tipo2) {
    this.idPkmn = idPkmn;
    this.nroPkmn = nroPkmn;
    this.nombre = nombre;
    this.tipo1 = tipo1;
    this.tipo2 = tipo2;
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

  public Tipo getTipo1() {
    return tipo1;
  }

  public void setTipo1(Tipo tipo1) {
    this.tipo1 = tipo1;
  }

  public Tipo getTipo2() {
    return tipo2;
  }

  public void setTipo2(Tipo tipo2) {
    this.tipo2 = tipo2;
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
    return "Pokemon{" + "idPkmn=" + idPkmn + ", nroPkmn=" + nroPkmn + ", nombre=" + nombre + ", tipo1=" + tipo1 + ", tipo2=" + tipo2 + ", descripcion=" + descripcion + ", mostrar=" + mostrar + '}';
  }


  
}
