import { DownloadLinkProps } from '../components/common/dowloadLink/DowloadLink.tsx';
import { OcDownLoadLinksFromAPI } from '../domain/OcAccueil.ts';
import { convertOctetsToKo } from './convertOctetsToKo.ts';

export function ocWelcomeDownLoadLinkMapper(
  downloadLinkListFromAPI: OcDownLoadLinksFromAPI[]
): DownloadLinkProps[] {
  const mappedLinkList = downloadLinkListFromAPI.map((link) => {
    return {
      fileName: link.nom,
      fileWeight: convertOctetsToKo(link.taille),
      fileType: link.extension.toUpperCase(),
      fileUrl: '/api/partenaire/ressources/fichiers/' + link.id,
    };
  });
  return mappedLinkList;
}
