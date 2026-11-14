import rockClimbingBanner from "../assets/rockClimbing.jpg";
import hikingBanner from "../assets/hiking.jpg";
import cookingBanner from "../assets/cooking.jpg";
import surfingBanner from "../assets/surfing.jpg";

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
    },

    {
        id : "cooking",
        name : "Cooking",
        description : "Swap recipes, cook together, and share a meal with fellow home chefs.",
        isModerated : false,
        questRequirements : [
            "List every major allergen in the dishes being made.",
            "Kitchens must be a public venue or a host who has agreed to the quest.",
            "Say up front if participants should bring ingredients or equipment.",
            "Split ingredient costs evenly unless the host says otherwise."
        ],
        bannerUrl : cookingBanner,
        communityQuestIds : ["pasta-night", "farmers-market-cookoff", "sourdough-workshop"]
    },

    {
        id : "surfing",
        name : "Surfing",
        description : "Catch waves along the Central Coast with surfers of every level.",
        isModerated : false,
        questRequirements : [
            "Check the surf forecast and include wave height in the description.",
            "Beginner quests must stay at beaches with a lifeguard on duty.",
            "Never paddle out alone; surf with at least one other participant.",
            "Wetsuits are required when water is below 60°F."
        ],
        bannerUrl : surfingBanner,
        communityQuestIds : ["dawn-patrol-pismo", "beginner-surf-lesson", "morro-rock-session"]
    }

];


export function getCommunity(id : string | undefined) : CommunityProps | undefined {
    return communityData.find((community) => community.id === id)
}
