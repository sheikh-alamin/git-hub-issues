const cardsContainer = document.getElementById("cardsContainer");
const issuesCountElement = document.getElementById("issuesCount");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn")

// searchBtn.addEventListener("click" , async () => {
//     const query = searchInput.value.trim();
//     if (!query) return;

//     const url =  `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}`
// })

// function calculateCount () {
//     total.innerText = 
// }


const loadCardDetail = async (id) => {
    const url= `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    
    const res = await fetch(url);
    const details = await res.json();
    displayCardDetails(details.data);
}

// "id": 50,
// "title": "Create automated testing pipeline",
// "description": "Set up CI/CD pipeline with automated tests running on every commit and pull request.",
// "status": "open",
// "labels": [
// "enhancement",
// "help wanted"
// ],
// "priority": "high",
// "author": "ci_cd_cindy",
// "assignee": "test_tina",
// "createdAt": "2024-02-10T08:00:00Z",
// "updatedAt": "2024-02-10T08:00:00Z" 
const displayCardDetails = (card) => {
    // console.log(card);
    const detailsBox = document.getElementById("details-container");    

    const labelStyles = {
            BUG: "border-[#FECACA] bg-[#FEECEC] text-[#EF4444] ",
            "HELP WANTED": "border-[#FDE68A] bg-[#FFF8DB] text-[#D97706]",
            ENHANCEMENT: "border-[#A7F3D0] bg-[#ECFDF5] text-[#059669]",
            "GOOD FIRST ISSUE": "border-blue-300 bg-blue-100 text-blue-700",
        };

    const labelIcons = {
        BUG:"fa-solid fa-bug",
        "HELP WANTED":"fa-solid fa-life-ring",
        ENHANCEMENT:"fa-solid fa-wand-magic-sparkles",
        "GOOD FIRST ISSUE": "fa-solid fa-tag",
    };

    const tagsHTML = (card.labels || [])
        .map(label => {
                const style = labelStyles[label.toUpperCase()] || "border-grey-300 bg-grey-200 text-grey-700";
                const icon = labelIcons[label.toUpperCase()] || "fa-solid fa-tag" ;
                return `<button class="py-1 px-4 border-1 uppercase rounded-2xl ${style}"><i class="${icon}"></i> ${label}</button>`;
            })
        .join("");

    detailsBox.innerHTML  =  `
                <h1 class="text-2xl font-bold">${card.title}</h1>
                <div class="flex gap-1">
                    <div class="badge badge-success">${card.status}</div>
                    <p>.</p>
                    <p>Opened by ${card.author}</p>
                    <p>.</p>
                    <p>${card.createdAt}</p>
                </div>
                <div class="flex gap-2">
                    ${tagsHTML}
                </div>
                <p>${card.description}</p>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <p>Assignee:</p>
                        <h3 class="font-bold">${card.assignee}</h3>
                    </div>
                    <div>
                        <p>Priority:</p>
                        <div class="badge badge-error">${card.priority}</div>
                    </div>
                </div>       

    `;
    document.getElementById("detail_modal").showModal();
};

const manageSpinner = (status) => {
    if ( status == true ) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("cardsContainer").classList.add("hidden");
    }
    else {
        document.getElementById("cardsContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");

    }
}

async function loadCards() {
    manageSpinner(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayCards(data.data);
    
    if (issuesCountElement) {
    issuesCountElement.textContent = data.data.length;
}
}
function displayCards(cards) {
    cardsContainer.innerHTML = "" ;
    cards.forEach((card) => {

    const cardElement = document.createElement("div");
    cardElement.className = "cards bg-slate-100 rounded-md shadow-lg" ;

    const labelStyles = {
            BUG: "border-[#FECACA] bg-[#FEECEC] text-[#EF4444] ",
            "HELP WANTED": "border-[#FDE68A] bg-[#FFF8DB] text-[#D97706]",
            ENHANCEMENT: "border-[#A7F3D0] bg-[#ECFDF5] text-[#059669]",
            "GOOD FIRST ISSUE": "border-blue-300 bg-blue-100 text-blue-700",
        };

    const labelIcons = {
        BUG:"fa-solid fa-bug",
        "HELP WANTED":"fa-solid fa-life-ring",
        ENHANCEMENT:"fa-solid fa-wand-magic-sparkles",
    };

    const borderColors = {
        open:"#16A34A" ,
        closed:"#9333EA" ,
    }
            
    const borderColor = borderColors[card.status?.toLowerCase()] || "#64748B";

    cardElement.style.borderTop = `4px solid ${borderColor}` ;
        
    const tagsHTML = (card.labels || [])
        .map(label => {
                const style = labelStyles[label.toUpperCase()] || "border-grey-300 bg-grey-200 text-grey-700";
                const icon = labelIcons[label.toUpperCase()] || "fa-solid fa-tag" ;
                return `<button class="py-1 px-4 border-1 uppercase rounded-2xl ${style}"><i class="${icon}"></i> ${label}</button>`;
            })
        .join("");

    cardElement.innerHTML = `
                    <div  onclick="loadCardDetail(${card.id})" class="p-4 space-y-3">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="">
                            <button class="py-1 px-4 bg-[#FEECEC] uppercase rounded-2xl text-[#EF4444]">${card.priority}</button>
                        </div>
                        <h4 class="font-semibold">${card.title}</h4>
                        <p class="text-[#64748B] text-3">${card.description}</p>
                        <div class="flex gap-2">
                            ${tagsHTML}
                        </div>
                    </div>
                    <hr style="border: 1px solid lightgrey;">
                    <div onclick="loadCardDetail(${card.id})" class="p-4">
                        <p class="text-[#64748B] text-3"># ${card.id} by ${card.author}</p>
                        <p class="text-[#64748B] text-3">${card.createdAt}</p>
                    </div>
    `
    cardsContainer.appendChild(cardElement);

    });

    manageSpinner(false);
}

loadCards();