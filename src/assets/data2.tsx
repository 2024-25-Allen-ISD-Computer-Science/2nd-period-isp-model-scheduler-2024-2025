// Term: [1] = Fall
// Term: [2] = Spring
// Term: [1, 2] = Year

export const data : {[id: number]: {
    name: string,
    department: string,
    periods: Array<number>,
    term: Array<number>,
    total_enrollment: number,
    max_positions: number,
}} = {
    0: {
        name: "AP Environmental Science",
        department: "STEAM",
        periods: [1, 2, 3, 4],
        term: [1],
        total_enrollment: 30,
        max_positions: 100,
    },
    1: {
        name: "Class 2",
        department: "AHS",
        periods: [1, 2, 3, 4, 5, 6, 7, 8],
        term: [2],
        total_enrollment: 70,
        max_positions: 90,
    },
    2: {
        name: "Class 3",
        department: "CTE",
        periods: [5, 6, 7, 8],
        term: [1, 2],
        total_enrollment: 125,
        max_positions: 300,
    },
    3: {
        name: "AP Environmental Science1",
        department: "STEAM",
        periods: [1, 2, 3, 4],
        term: [1],
        total_enrollment: 30,
        max_positions: 100,
    },
    4: {
        name: "Class 21",
        department: "AHS",
        periods: [1, 2, 3, 4],
        term: [2],
        total_enrollment: 70,
        max_positions: 90,
    },
    5: {
        name: "AP Physics I",
        department: "CTE",
        periods: [5, 6, 7, 8],
        term: [1, 2],
        total_enrollment: 125,
        max_positions: 300,
    },
};