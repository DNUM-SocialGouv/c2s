import { DownloadLinkProps } from '@/components/common/dowloadLink/DowloadLink';

export interface OcDownLoadLinksFromAPI {
  ressourceFichierId: number;
  thematique: {
    ressourceThematiqueId: number;
    titre: string;
    description: string;
    cible: string;
    ordre: number;
    publique: boolean;
  };
  repertoire: string;
  nom: string;
  taille: number;
  extension: string;
  dateCrea: string;
  dateMaj: string;
  type: string;
}

export function ocWelcomeDownLoadLinkMapper(
  downloadLinkListFromAPI: OcDownLoadLinksFromAPI[]
): DownloadLinkProps[] {
  const mappedLinkList = downloadLinkListFromAPI.map((link) => {
    return {
      fileName: link.nom,
      fileWeigth: Math.round(link.taille / 10000)
        .toFixed(0)
        .toString(),
      fileType: link.type,
      fileUrl: link.repertoire + '/' + link.nom + '.' + link.extension,
    };
  });
  return mappedLinkList;
}
