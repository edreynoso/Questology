import CommunityBanner from '../components/communityBanner'
import { communityData } from '../data/communities'
import './communities.css'

export default function Communities() {
    return (
        <main className="CommunitiesPage">
            {communityData.map((community) => (
                <CommunityBanner key={community.id} community={community} />
            ))}
        </main>
    )
}
