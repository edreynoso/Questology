export interface QuestProps {
    id : string;
    name : string;
    // YYYY-MM-DD 
    date : string;
    time : string;
    location : string;
    description : string;
    requirements : string[];
}

export const questData : QuestProps[] = [
    {
        id : "rock-climbing-quest",
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
        name : "Hiking Quest",
        date : "2027-01-15",
        time : "9:00 AM PST",
        location : "Somewhere in SLO",
        description : "A very descriptive description for this very interesting random hiking quest. Wow it is very interesting.",
        requirements : [
            "A very important requirement probably goes here."
        ]
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
