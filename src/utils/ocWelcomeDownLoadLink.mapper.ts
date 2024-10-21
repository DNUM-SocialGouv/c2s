import { DownloadLinkProps } from '@/components/common/dowloadLink/DowloadLink';
import { OcDownLoadLinksFromAPI } from '@/domain/OcAccueil';

export function ocWelcomeDownLoadLinkMapper(
  downloadLinkListFromAPI: OcDownLoadLinksFromAPI[]
): DownloadLinkProps[] {
  const mappedLinkList = downloadLinkListFromAPI.map((link) => {
    return {
      fileName: link.nom,
      fileWeight: (link.taille / 10000).toFixed(2).toString(),
      fileType: link.extension.toUpperCase(),
      fileUrl: '/api/partenaire/ressources/fichier/' + link.id,
    };
  });
  return mappedLinkList;
}
