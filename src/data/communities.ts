import rockClimbingBanner from "../assets/rockClimbing.jpg";
import hikingBanner from "../assets/hiking.jpg";

export interface CommunityProps {
    id : string;
    name : string;
    description : string;
    bannerUrl : string | undefined;
    communityQuestIds : string[] | undefined;
}

export const communityData : CommunityProps[] = [
    {
        id : "rock-climbing",
        name : "Rock Climbing",
        description : "A very great description about rock climbing...",
        bannerUrl : rockClimbingBanner,
        communityQuestIds : ["rock-climbing-quest"]
    },

    {
        id : "hiking",
        name : "Hiking",
        description : "A very great description about hiking...",
        bannerUrl : hikingBanner,
        communityQuestIds : ["hiking-quest"]
    }

];


export function getCommunity(id : string | undefined) : CommunityProps | undefined {
    return communityData.find((community) => community.id === id)
}
