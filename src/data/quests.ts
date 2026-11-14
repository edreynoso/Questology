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
    },

    {
        id : "pasta-night",
        status : "active",
        approval : "approved",
        name : "Fresh Pasta Night",
        date : "2026-11-13",
        time : "6:00 PM PST",
        location : "SLO Community Kitchen",
        description : "Make fettuccine and ravioli from scratch, then sit down and eat what we made.",
        requirements : [
            "Contains wheat and eggs.",
            "Bring an apron and a container for leftovers."
        ],
        participantCount : 9
    },

    {
        id : "farmers-market-cookoff",
        status : "upcoming",
        approval : "approved",
        name : "Farmers Market Cook-Off",
        date : "2026-11-19",
        time : "5:00 PM PST",
        location : "Downtown SLO Farmers Market",
        description : "Teams get $15 to shop the market, then cook a dish judged by the group.",
        requirements : [
            "Bring $15 cash for ingredients.",
            "Teams of two; solo sign-ups get paired on site."
        ]
    },

    {
        id : "sourdough-workshop",
        status : "upcoming",
        approval : "approved",
        name : "Sourdough Starter Workshop",
        date : "2026-12-06",
        time : "10:00 AM PST",
        location : "Host's home in Arroyo Grande",
        description : "Learn to feed and maintain a starter and take a jar of it home.",
        requirements : [
            "Contains wheat.",
            "Bring a clean glass jar with a lid."
        ]
    },

    {
        id : "dawn-patrol-pismo",
        status : "active",
        approval : "approved",
        name : "Dawn Patrol at Pismo",
        date : "2026-11-13",
        time : "6:30 AM PST",
        location : "Pismo Beach Pier",
        description : "Early session before the wind picks up. Forecast is 3-4 ft and clean.",
        requirements : [
            "Wetsuit required (water is around 57�F).",
            "Intermediate surfers and up."
        ],
        participantCount : 5
    },

    {
        id : "beginner-surf-lesson",
        status : "upcoming",
        approval : "approved",
        name : "Beginner Surf Lesson",
        date : "2026-11-22",
        time : "9:00 AM PST",
        location : "Avila Beach",
        description : "Learn to pop up and catch whitewater waves on soft-top boards. Lifeguard on duty.",
        requirements : [
            "Must be a confident swimmer.",
            "Soft-top boards and wetsuits are provided."
        ]
    },

    {
        id : "morro-rock-session",
        status : "upcoming",
        approval : "approved",
        name : "Morro Rock Session",
        date : "2026-12-13",
        time : "7:30 AM PST",
        location : "Morro Rock Beach",
        description : "Surf the north side of the rock, then grab breakfast on the Embarcadero.",
        requirements : [
            "Wetsuit required.",
            "Bring your own board."
        ]
    }

];

type SavedQuestState = {
    created : { quest : QuestProps; communityId : string }[];
    approved : string[];
    denied : string[];
    rsvps : string[];
}

const STORAGE_KEY = "questology:questState"

const savedState : SavedQuestState = loadState()
applySavedState(savedState)

function loadState() : SavedQuestState {
    const empty : SavedQuestState = { created : [], approved : [], denied : [], rsvps : [] }
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? { ...empty, ...JSON.parse(raw) } : empty
    } catch {
        return empty
    }
}

function saveState() : void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState))
    } catch {
        //
    }
}

function addQuestToCommunity(quest : QuestProps, communityId : string) : void {
    questData.push(quest)
    const community = getCommunity(communityId)
    if (community) {
        community.communityQuestIds = [...(community.communityQuestIds ?? []), quest.id]
    }
}

function applySavedState(state : SavedQuestState) : void {
    state.created.forEach(({ quest, communityId }) => addQuestToCommunity(quest, communityId))
    state.approved.forEach((id) => setApproved(id))
    state.denied.forEach((id) => removeQuest(id))
}

function setApproved(id : string) : void {
    const index = questData.findIndex((quest) => quest.id === id)
    if (index !== -1) {
        questData[index] = { ...questData[index], approval : "approved", status : "upcoming" }
    }
}

function removeQuest(id : string) : void {
    const index = questData.findIndex((quest) => quest.id === id)
    if (index !== -1) questData.splice(index, 1)
}

export function submitQuest(quest : QuestProps, communityId : string) : void {
    const approval : QuestApproval = getCommunity(communityId)?.isModerated ? "pending" : "approved"
    const newQuest = { ...quest, approval }
    addQuestToCommunity(newQuest, communityId)
    savedState.created.push({ quest : newQuest, communityId })
    saveState()
}

/** Approve marks the quest approved; deny removes it from the data. */
export function reviewQuest(id : string, action : "approve" | "deny") : void {
    if (action === "approve") {
        setApproved(id)
        savedState.approved.push(id)
    } else {
        removeQuest(id)
        savedState.denied.push(id)
    }
    saveState()
}

export function hasRsvped(id : string) : boolean {
    return savedState.rsvps.includes(id)
}

export function rsvpToQuest(id : string) : void {
    if (hasRsvped(id)) return
    savedState.rsvps.push(id)
    saveState()
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
