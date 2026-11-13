export type QuestStatus = "active" | "upcoming";

export interface QuestProps {
    id : string;
    status : QuestStatus;
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

export function getQuest(id : string | undefined) : QuestProps | undefined {
    return questData.find((quest) => quest.id === id)
}

export function formatQuestDate(date : string) : string {
    const [year, month, day] = date.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year : "numeric", month : "long", day : "numeric"
    })
}
