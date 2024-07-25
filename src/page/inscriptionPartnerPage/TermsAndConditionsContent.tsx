import { Link } from '@/components/common/link/Link.tsx';

export const TermsAndConditionsContent = () => {
  return (
    <>
      <h1>Conditions générales d'utilisation</h1>
      <p>
        L'espace Partenaires C2S est mis à votre disposition par la Direction de
        la sécurité sociale (DSS). Il est exclusivement destiné aux agents des
        caisses d'assurance maladie et des organismes complémentaires
        gestionnaires de la complémentaire santé solidaire (C2S).
      </p>
      <p>Il a pour objectifs :</p>
      <ul>
        <li>
          La consultation de ressources mises en ligne par la DSS en lien avec
          le cadre juridique et la mise en œuvre opérationnelle de la C2S ;
        </li>
        <li>
          Pour les organismes complémentaires, la gestion des points d'accueil
          référencés et des contacts référents de l'organisme.
        </li>
      </ul>
      <p>
        La{' '}
        <Link
          target="_blank"
          href="https://www.complementaire-sante-solidaire.gouv.fr/donnees-personnelles"
        >
          Politique de protection des données à caractère personnel
        </Link>{' '}
        traitées dans l'espace Partenaires du Site
        (complementaire-sante-solidaire.gouv.fr) fait partie intégrante des
        présentes conditions générales d'utilisation de l'espace Partenaires.
        Pour utiliser votre compte, vous devez également prendre connaissance
        des conditions d'utilisation suivantes et les accepter :
      </p>
      <ol>
        <li>
          Votre compte au sein de l'espace Partenaires est personnel. Les
          identifiants de connexion à l'espace Partenaires ainsi que
          l'intégralité des ressources et des contacts mis à disposition par la
          DSS sont confidentiels.{' '}
          <b>
            En acceptant les présentes conditions d'utilisation, vous vous
            engagez à ne pas les communiquer à une personne ou une organisation
            tierce.
          </b>
        </li>
        <li>
          L'espace Partenaires doit être utilisé conformément à sa destination.{' '}
          <b>
            En acceptant les présentes conditions d'utilisation, vous vous
            engagez à ne pas utiliser le site à d'autres fins que celles
            évoquées ci-dessus et à ne pas nuire au bon fonctionnement du Site.
          </b>
        </li>
        <li>
          La création de votre compte personnel au sein de l'espace partenaires
          fait l'objet d'une modération de la part des agents habilités de
          l'équipe C2S de la DSS.{' '}
          <b>
            En acceptant les présentes conditions d'utilisation, vous confirmez
            appartenir à une caisse d'assurance maladie ou à un organisme
            complémentaire gestionnaires de la C2S. Dans le cas contraire et
            dans l'éventualité où votre demande de création de compte serait
            acceptée, vous vous engagez à supprimer votre compte ou à en faire
            la demande auprès de la DSS.
          </b>
        </li>
      </ol>
      <p>
        Pour toute question relatives à l'utilisation de l'espace Partenaire ou
        à la création, la gestion ou la suppression de votre compte personnel,
        vous êtes invité à contacter la DSS.
      </p>
      <p>
        <b>
          En cochant la case, vous confirmez avoir pris connaissance des
          présentes conditions générales d'utilisation et vous engagez à les
          respecter.
        </b>
      </p>
    </>
  );
};
