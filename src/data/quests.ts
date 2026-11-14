import { getCommunity } from "./communities";

export type QuestStatus = "active" | "upcoming";

/** Moderator review state. Only approved quests show on the community page. */
export type QuestApproval = "pending" | "approved";

export interface QuestProps {
    id : string;
    status : QuestStatus;
    approval : QuestApproval;
    name : string;
    // YYYY-MM-DD 
    date : string;
    time : string;
    location : string;
    description : string;
    requirements : string[];
    /** Shown for active quests */
    participantCount? : number;
}

export const questData : QuestProps[] = [
    {
        id : "rock-climbing-quest",
        status : "upcoming",
        approval : "approved",
        name : "Rock Climbing Quest",
        date : "2027-01-01",
        time : "12:00 PM PST",
        location : "Somewhere in SLO",
        description : "A very descriptive description for this very interesting random rock climbing quest. Wow it is very interesting.",
        requirements : [
            "A very important requirement probably goes here.",
            "Another very important requirement probably goes here."
        ]
    },

    {
        id : "hiking-quest",
        status : "upcoming",
        approval : "approved",
        name : "Hiking Quest",
        date : "2027-01-15",
        time : "9:00 AM PST",
        location : "Somewhere in SLO",
        description : "A very descriptive description for this very interesting random hiking quest. Wow it is very interesting.",
        requirements : [
            "A very important requirement probably goes here."
        ]
    },

    {
        id : "bouldering-meetup",
        status : "active",
        approval : "approved",
        name : "Bouldering Meetup",
        date : "2026-11-12",
        time : "4:00 PM PST",
        location : "SLO Bouldering Gym",
        description : "Drop in and work on problems with the group. All skill levels welcome.",
        requirements : [
            "Bring climbing shoes and chalk."
        ],
        participantCount : 12
    },

    {
        id : "sunset-crag-session",
        status : "active",
        approval : "approved",
        name : "Sunset Crag Session",
        date : "2026-11-12",
        time : "5:30 PM PST",
        location : "Bishop Peak",
        description : "Top-rope a few routes on the west face before sunset.",
        requirements : [
            "Harness and helmet required.",
            "Belay certification required."
        ],
        participantCount : 7
    },

    {
        id : "morning-trail-hike",
        status : "active",
        approval : "approved",
        name : "Morning Trail Hike",
        date : "2026-11-12",
        time : "8:00 AM PST",
        location : "Cerro San Luis Trail",
        description : "A steady four-mile loop with views of the city.",
        requirements : [
            "Bring water and sturdy shoes."
        ],
        participantCount : 18
    }

];

/** Adds a newly created quest to a community, awaiting moderator review. */
export function submitQuest(quest : QuestProps, communityId : string) : void {
    questData.push({ ...quest, approval : "pending" })
    const community = getCommunity(communityId)
    if (community) {
        community.communityQuestIds = [...(community.communityQuestIds ?? []), quest.id]
    }
}

/** Approve marks the quest approved; deny removes it from the data. */
export function reviewQuest(id : string, action : "approve" | "deny") : void {
    const index = questData.findIndex((quest) => quest.id === id)
    if (index === -1) return
    if (action === "approve") {
        questData[index] = { ...questData[index], approval : "approved", status : "upcoming" }
    } else {
        questData.splice(index, 1)
    }
}

export function getCommunityQuests(communityId : string | undefined, approval : QuestApproval) : QuestProps[] {
    return (getCommunity(communityId)?.communityQuestIds ?? [])
        .map(getQuest)
        .filter((quest) : quest is QuestProps => quest !== undefined && quest.approval === approval)
        .sort((a, b) => a.date.localeCompare(b.date))
}

export function getQuest(id : string | undefined) : QuestProps | undefined {
    return questData.find((quest) => quest.id === id)
}

export function formatQuestDate(date : string) : string {
    const [year, month, day] = date.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year : "numeric", month : "long", day : "numeric"
    })
}
