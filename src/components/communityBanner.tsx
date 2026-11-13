import { Link } from 'react-router-dom'
import type { CommunityProps } from '../data/communities'
import { bannerStyle } from '../utils/bannerStyle'
import './communityBanner.css'

export default function CommunityBanner({ community }: { community: CommunityProps }) {
    const style = bannerStyle(community.bannerUrl)

    return (
        <Link to={`/communities/${community.id}`} className="CommunityBanner" style={style}>
            <h2>{community.name}</h2>
        </Link>
    )
}
