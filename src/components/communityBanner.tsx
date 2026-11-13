import { Link } from 'react-router-dom'
import type { CommunityProps } from '../data/communities'
import './communityBanner.css'

export default function CommunityBanner({ community }: { community: CommunityProps }) {
    const style = community.bannerUrl
        ? { backgroundImage: `url("${community.bannerUrl}")` }
        : undefined

    return (
        <Link to={`/communities/${community.id}`} className="CommunityBanner" style={style}>
            <h2>{community.name}</h2>
        </Link>
    )
}
