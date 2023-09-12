import sheepAvatar from "../public/assets/avatars/sheep.svg"
import monkeyAvatar from "../public/assets/avatars/monkey.svg"
import rabbitAvatar from "../public/assets/avatars/rabbit.svg"
import frogAvatar from "../public/assets/avatars/frog.svg"
import snakeAvatar from "../public/assets/avatars/snake.svg"
import chickenAvatar from "../public/assets/avatars/chicken.svg"
import giraffeAvatar from "../public/assets/avatars/giraffe.svg"
import pandaAvatar from "../public/assets/avatars/panda.svg"
import penguinAvatar from "../public/assets/avatars/penguin.svg"
import dogAvatar from "../public/assets/avatars/dog.svg"
import cheetahAvatar from "../public/assets/avatars/cheetah.svg"
import lionAvatar from "../public/assets/avatars/lion.svg"
import otterAvatar from "../public/assets/avatars/otter.svg"

const demoStudentData = [
    {
        name: "Conrad",
        dob: "2023-01-01",
        points: 0,
        avatar: sheepAvatar,
        selected: false,
        tableData: {tableName: "Apples", tablePoints: 5, isOnTable: true, selected: false},
        uuid: "d70891e5-78ba-4e3e-9aeb-436506637c26"   
    },
    {
        name: "Ayah",
        dob: "2023-01-01",
        points: 0,
        avatar: cheetahAvatar,
        selected: false,
        tableData: {tableName: "Apples", tablePoints: 5, isOnTable: true, selected: false},
        uuid: "78090eda-0a51-4a08-9542-283b51ec32b0"   
    },
    {
        name: "Nikita",
        dob: "2023-01-01",
        points: 0,
        avatar: frogAvatar,
        selected: false,
        tableData: {tableName: "Apples", tablePoints: 5, isOnTable: true, selected: false},
        uuid: "5b12cf2d-d5d3-44b2-bb37-54ae7ce09604"   
    },
    {
        name: "Ryan",
        dob: "2023-01-01",
        points: 0,
        avatar: rabbitAvatar,
        selected: false,
        tableData: {tableName: "Apples", tablePoints: 5, isOnTable: true, selected: false},
        uuid: "86434f59-a73f-4014-9ac6-b435c7225162"   
    },
    {
        name: "Eva",
        dob: "2023-01-01",
        points: 0,
        avatar: dogAvatar,
        selected: false,
        tableData: {tableName: "Pears", tablePoints: 2, isOnTable: true, selected: false},
        uuid: "ad225aee-26e3-438e-a38e-e1afb9fe8189"   
    },
    {
        name: "Reece",
        dob: "2023-01-01",
        points: 0,
        avatar: pandaAvatar,
        selected: false,
        tableData: {tableName: "Pears", tablePoints: 2, isOnTable: true, selected: false},
        uuid: "162b43c5-f332-4538-88a7-15b606f287a6"   
    },
    {
        name: "Bernice",
        dob: "2023-01-01",
        points: 0,
        avatar: snakeAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "e5640d6f-4a1e-4dae-9c79-4b8ec81867da"   
    },
    {
        name: "Alana",
        dob: "2023-01-01",
        points: 0,
        avatar: lionAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "f747da68-e0c2-42f4-b026-2a05de959026"   
    },
    {
        name: "Olivia",
        dob: "2023-01-01",
        points: 0,
        avatar: penguinAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "42d4d2cf-1246-42a3-b0dc-1906624b99c2"   
    },
    {
        name: "Violet",
        dob: "2023-01-01",
        points: 0,
        avatar: otterAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "0706b26c-b73e-43a1-b724-df2b783239b6"   
    },
    {
        name: "Alfie",
        dob: "2023-01-01",
        points: 0,
        avatar: chickenAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "8be73d43-39d4-4c6a-a4dd-8a1356de7c2b"   
    },
    {
        name: "Archie",
        dob: "2023-01-01",
        points: 0,
        avatar: giraffeAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "db80213b-0353-461e-a34a-0de0cc7f136b"   
    },
    {
        name: "Bruno",
        dob: "2023-01-01",
        points: 0,
        avatar: frogAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "1481d3fe-c55b-4409-ad72-3855489b2627"   
    },
    {
        name: "John",
        dob: "2023-01-01",
        points: 0,
        avatar: dogAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "d1af170d0-61de-40df-8bb6-56803558843f"   
    },
    {
        name: "Martina",
        dob: "2023-01-01",
        points: 0,
        avatar: cheetahAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "a6c68ba2-79db-4158-bda5-1fde2cc17a1a"   
    },
    {
        name: "Serah",
        dob: "2023-01-01",
        points: 0,
        avatar: pandaAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "9822e032-d622-40ce-8a78-b8856e5de6f0"   
    },
    {
        name: "Amy",
        dob: "2023-01-01",
        points: 0,
        avatar: monkeyAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "0e21605f-7ce4-4002-a2c4-e0428ef369b0"   
    },
    {
        name: "Conor",
        dob: "2023-01-01",
        points: 0,
        avatar: sheepAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "b3507177-8ba2-46d3-ab15-fe26b18778d3"   
    },
    {
        name: "Samira",
        dob: "2023-01-01",
        points: 0,
        avatar: rabbitAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "19a3f4e5-e2c9-4a4c-b738-5fbf40aff6d2"   
    },
    {
        name: "Elsie",
        dob: "2023-01-01",
        points: 0,
        avatar: snakeAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "a1f64e04-20c6-4809-8478-14661d6207a0"   
    },
    {
        name: "Daniel",
        dob: "2023-01-01",
        points: 0,
        avatar: penguinAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "41b9a867-221c-4a5e-8a39-5951b41ad96a"   
    },
    {
        name: "Kylie",
        dob: "2023-01-01",
        points: 0,
        avatar: chickenAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "304c3f8d-899a-42e6-a009-22127858a97f"   
    },
    {
        name: "Farrah",
        dob: "2023-01-01",
        className: "6J",
        points: 0,
        avatar: lionAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "c6986908-fa32-4df9-aa3b-1cef16edc125"   
    },
    {
        name: "Tamara",
        dob: "2023-01-01",
        points: 0,
        avatar: otterAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "16bd0b3a-8831-4dd3-86b5-a4ff6ee9d26a"   
    },
    {
        name: "Max",
        dob: "2023-01-01",
        points: 0,
        avatar: frogAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "95473e5e-0997-4c1c-a850-b4cb3bc976b8"   
    },
    {
        name: "Niamh",
        dob: "2023-01-01",
        points: 0,
        avatar: pandaAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "9752445d-48dd-4144-8fcd-ce0f6db72bdb"   
    },
    {
        name: "David",
        dob: "2023-01-01",
        points: 0,
        avatar: monkeyAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "d344bbbc-053f-4e97-aa0c-6edef6689d24"   
    },
    {
        name: "Michael",
        dob: "2023-01-01",
        points: 0,
        avatar: rabbitAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "2a32531b-a8f5-4887-bc60-b22693c4c874"   
    },
    {
        name: "Elizabeth",
        dob: "2023-01-01",
        points: 0,
        avatar: snakeAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "4f220e22-e2b8-4613-8cf5-8b9540e9d2a5"   
    },
    {
        name: "Abby",
        dob: "2023-01-01",
        points: 0,
        avatar: cheetahAvatar,
        selected: false,
        tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false},
        uuid: "8ded53ea-ad70-47bd-9830-e83ed999308f"   
    }
]

export default demoStudentData