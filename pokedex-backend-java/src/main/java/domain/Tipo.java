/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

/**
 *
 * @author euge
 */
@Entity
@NamedQueries({
  @NamedQuery(name = "Tipo.findAll", query = "SELECT t FROM Tipo t"),
  @NamedQuery(name = "Tipo.findByIdTipo", query = "SELECT t FROM Tipo t WHERE t.idTipo = :idTipo"),
  @NamedQuery(name = "Tipo.findByTipo", query = "SELECT t FROM Tipo t WHERE t.tipo = :tipo")})
public class Tipo implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic(optional = false)
  @Column(name = "id_tipo")
  private Integer idTipo;
  @Size(max = 45)
  private String tipo;
  @OneToMany(mappedBy = "tipo1")
  private List<Pokemon> pokemonList1;
  @OneToMany(mappedBy = "tipo2")
  private List<Pokemon> pokemonList2;

  public Tipo() {
  }

  public Tipo(Integer idTipo) {
    this.idTipo = idTipo;
  }

  public Integer getIdTipo() {
    return idTipo;
  }

  public void setIdTipo(Integer idTipo) {
    this.idTipo = idTipo;
  }

  public String getTipo() {
    return tipo;
  }

  public void setTipo(String tipo) {
    this.tipo = tipo;
  }

  public List<Pokemon> getPokemonList1() {
    return pokemonList1;
  }

  public void setPokemonList1(List<Pokemon> pokemonList1) {
    this.pokemonList1 = pokemonList1;
  }

  public List<Pokemon> getPokemonList2() {
    return pokemonList2;
  }

  public void setPokemonList2(List<Pokemon> pokemonList2) {
    this.pokemonList2 = pokemonList2;
  }

  @Override
  public int hashCode() {
    int hash = 0;
    hash += (idTipo != null ? idTipo.hashCode() : 0);
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Tipo)) {
      return false;
    }
    Tipo other = (Tipo) object;
    if ((this.idTipo == null && other.idTipo != null) || (this.idTipo != null && !this.idTipo.equals(other.idTipo))) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Tipo{" + "idTipo=" + idTipo + ", tipo=" + tipo + '}';
  }


  
}
