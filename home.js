const cardsContainer = document.getElementById("cardsContainer");
const issuesCountElement = document.getElementById("issuesCount");

// function calculateCount () {
//     total.innerText = 
// }


// const priorityStyles = {
//     HIGH: "bg-[#FEECEC] text-[#EF4444]", 
//     MEDIUM: "bg-[#FFF8DB] text-[#D97706]",
//     LOW: "bg-[#DCFCE7] text-[#16A34A]"
// };

// const statusImages = {
//     open: "./assets/Open-Status.png",
//     closed: "./assets/Closed-Status.png",
// }
// async function loadOpen() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const data = await res.json();
//     const openIssues = data.data.filter(issue => issue.status === "open");

//     displayIssues(openIssues);
//     console.log(openIssues);
// }

async function loadCards() {
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
                    <div class="p-4 space-y-3 ">
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
                    <div class="p-4">
                        <p class="text-[#64748B] text-3"># ${card.id} by ${card.author}</p>
                        <p class="text-[#64748B] text-3">${card.createdAt}</p>
                    </div>
    `
    cardsContainer.appendChild(cardElement);

    });
}

loadCards();