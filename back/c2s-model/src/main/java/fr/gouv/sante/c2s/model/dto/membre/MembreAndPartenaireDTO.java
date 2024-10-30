package fr.gouv.sante.c2s.model.dto.membre;

import fr.gouv.sante.c2s.model.GroupeEnum;
import fr.gouv.sante.c2s.model.dto.OrganismeComplementaireDTO;
import fr.gouv.sante.c2s.model.entity.MembreEntity;

public class MembreAndPartenaireDTO extends OrganismeComplementaireDTO {

    private String prenom;
    private String nom;
    private String societe;
    private String fonction;
    private String email;
    private String telephone;
    private String adresseOrganisation;
    private String codePostalOrganisation;
    private String villeOrganisation;
    private String sirenOrganisation;
    private String emailOrganisation;
    private String siteWebOrganisation;
    private GroupeEnum typeOrganisation;
    private String telephoneOrganisation;
    private Boolean isPointAccueil;

    public MembreAndPartenaireDTO(MembreEntity membre) {
        this.nom = membre.getNom();
        this.prenom = membre.getPrenom();
        this.societe = membre.getSociete();
        this.fonction = membre.getFonction();
        this.email = membre.getEmail();
        this.telephone = membre.getTelephone();
        this.setGroupe(membre.getGroupe());
        if (membre.getEntreprise()!=null) {
            this.adresseOrganisation = membre.getEntreprise().getAdresse();
            this.codePostalOrganisation = membre.getEntreprise().getCodePostal();
            this.villeOrganisation = membre.getEntreprise().getVille();
            this.sirenOrganisation = membre.getEntreprise().getSiren();
            this.emailOrganisation = membre.getEntreprise().getEmail();
            this.telephoneOrganisation = membre.getEntreprise().getTelephone();
            this.siteWebOrganisation = membre.getEntreprise().getSiteWeb();
        } else {
            this.adresseOrganisation = membre.getAdresse();
            this.codePostalOrganisation = membre.getCodePostal();
            this.villeOrganisation = null;// dans l adresse ?
            if (membre.getSocieteSiret() != null && membre.getSocieteSiret().length()>8) {
                this.sirenOrganisation = membre.getSocieteSiret().substring(0, 9);
            }
            this.emailOrganisation = membre.getEmail();
            this.telephoneOrganisation = membre.getTelephone();
            this.siteWebOrganisation = null;
        }

        this.typeOrganisation = membre.getGroupe();
        this.isPointAccueil = false;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    @Override
    public String getNom() {
        return nom;
    }

    @Override
    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getTelephone() {
        return telephone;
    }

    @Override
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmailOrganisation() {
        return emailOrganisation;
    }

    public void setEmailOrganisation(String emailOrganisation) {
        this.emailOrganisation = emailOrganisation;
    }

    public GroupeEnum getTypeOrganisation() {
        return typeOrganisation;
    }

    public void setTypeOrganisation(GroupeEnum typeOrganisation) {
        this.typeOrganisation = typeOrganisation;
    }

    public String getTelephoneOrganisation() {
        return telephoneOrganisation;
    }

    public void setTelephoneOrganisation(String telephoneOrganisation) {
        this.telephoneOrganisation = telephoneOrganisation;
    }

    public Boolean getPointAccueil() {
        return isPointAccueil;
    }

    public void setPointAccueil(Boolean pointAccueil) {
        isPointAccueil = pointAccueil;
    }

    public String getAdresseOrganisation() {
        return adresseOrganisation;
    }

    public void setAdresseOrganisation(String adresseOrganisation) {
        this.adresseOrganisation = adresseOrganisation;
    }

    public String getCodePostalOrganisation() {
        return codePostalOrganisation;
    }

    public void setCodePostalOrganisation(String codePostalOrganisation) {
        this.codePostalOrganisation = codePostalOrganisation;
    }

    public String getVilleOrganisation() {
        return villeOrganisation;
    }

    public void setVilleOrganisation(String villeOrganisation) {
        this.villeOrganisation = villeOrganisation;
    }

    public String getSirenOrganisation() {
        return sirenOrganisation;
    }

    public void setSirenOrganisation(String sirenOrganisation) {
        this.sirenOrganisation = sirenOrganisation;
    }

    public String getSiteWebOrganisation() {
        return siteWebOrganisation;
    }

    public void setSiteWebOrganisation(String siteWebOrganisation) {
        this.siteWebOrganisation = siteWebOrganisation;
    }
}
