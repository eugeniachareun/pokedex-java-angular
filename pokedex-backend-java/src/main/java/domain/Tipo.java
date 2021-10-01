package domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
 * @author Eugenia Chareun <eugenia.chareun@gmail.com>
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
    return "domain.Tipo[ idTipo=" + idTipo + " ]";
  }
  
}
