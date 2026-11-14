import CommunityBanner from '../components/communityBanner'
import { communityData } from '../data/communities'
import './communities.css'

export default function Communities() {
    return (
        <main className="CommunitiesPage">
            <header className="CommunitiesHeader">
                <h2 className="page-title">Your Communities</h2>
                <p>Pick a community to see its active and upcoming quests.</p>
            </header>

            {communityData.map((community) => (
                <CommunityBanner key={community.id} community={community} />
            ))}
        </main>
    )
}
