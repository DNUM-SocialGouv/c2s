import { IFooterLink } from "@/utils/constants/constants"
import { Link } from "react-router-dom"

type props = {
    linkItem: IFooterLink
}

const FooterContentLink = ({linkItem}: props) => {
    return (
        <li className="fr-footer__content-item">
            <a className="fr-footer__content-link" target={linkItem.target ?? "_blank"} href={linkItem.link}>{linkItem.label}</a>
        </li>
    )
}

const FooterBottomLink = ({linkItem}: props) => {
    return (
        <li className="fr-footer__bottom-item">
            <Link className="fr-footer__bottom-link"  to={linkItem.link}>{linkItem.label}</Link>
        </li>
    )
}
const FrFooterLink = {FooterContentLink, FooterBottomLink}
export default FrFooterLink; 