import rockClimbingBanner from "../assets/rockClimbing.jpg";
import hikingBanner from "../assets/hiking.jpg";

export interface CommunityProps {
    id : string;
    name : string;
    description : string;
    /** Moderated communities require quests to be approved before they are listed */
    isModerated : boolean;
    /** Rules every quest in this community must follow */
    questRequirements : string[];
    bannerUrl : string | undefined;
    communityQuestIds : string[] | undefined;
}

export const communityData : CommunityProps[] = [
    {
        id : "rock-climbing",
        name : "Rock Climbing",
        description : "A very great description about rock climbing...",
        isModerated : true,
        questRequirements : [
            "Quests must take place at a gym or an established climbing area.",
            "At least one participant must hold a current belay certification.",
            "Helmets are required for all outdoor climbing.",
            "List the difficulty range so climbers can judge if it fits them."
        ],
        bannerUrl : rockClimbingBanner,
        communityQuestIds : ["rock-climbing-quest", "bouldering-meetup", "sunset-crag-session"]
    },

    {
        id : "hiking",
        name : "Hiking",
        description : "A very great description about hiking...",
        isModerated : false,
        questRequirements : [
            "Routes must stay on established, public trails.",
            "Include the trail distance and elevation gain in the description.",
            "Quests must end before sunset unless marked as a night hike.",
            "Follow Leave No Trace principles."
        ],
        bannerUrl : hikingBanner,
        communityQuestIds : ["hiking-quest", "morning-trail-hike"]
    }

];


export function getCommunity(id : string | undefined) : CommunityProps | undefined {
    return communityData.find((community) => community.id === id)
}
