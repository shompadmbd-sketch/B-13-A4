let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';


function calculateCount() {
    const totalDisplay = document.getElementById('total-count');
    const interviewDisplay = document.getElementById('interview-count');
    const rejectedDisplay = document.getElementById('rejected-count');
    const tabLabel = document.getElementById('tab-jobs-count');

    interviewDisplay.innerText = interviewList.length;
    rejectedDisplay.innerText = rejectedList.length;

    if (currentStatus === 'all-filter-btn') {
        const totalInSystem = document.querySelectorAll('.job-card').length;
        totalDisplay.innerText = totalInSystem;
        tabLabel.innerText = `${totalInSystem} jobs`;
    } else {
        const totalNow = totalDisplay.innerText; 
        const visibleCards = document.getElementById('all-cards').children.length;
        tabLabel.innerText = `${visibleCards} of ${totalNow} jobs`;
    }
}


function toggleStyle(id) {
    currentStatus = id;
    const buttons = ['all-filter-btn', 'interview-filter-btn', 'rejected-filter-btn'];
    
    for (const btnId of buttons) {
        const btn = document.getElementById(btnId);
        if (btnId === id) {
            btn.classList.add('bg-[#3B82F6]', 'text-white');
            btn.classList.remove('bg-[#f1f2f4FF]', 'text-[#64748B]');
        } else {
            btn.classList.remove('bg-[#3B82F6]', 'text-white');
            btn.classList.add('bg-[#f1f2f4FF]', 'text-[#64748B]');
        }
    }

    if (id === 'all-filter-btn') {
        location.reload(); 
    } else if (id === 'interview-filter-btn') {
        renderFilteredCards(interviewList, '#10B981', 'INTERVIEW');
    } else if (id === 'rejected-filter-btn') {
        renderFilteredCards(rejectedList, '#EF4444', 'REJECTED');
    }
    
    calculateCount();
}


document.getElementById('main-container').addEventListener('click', function (event) {
    const card = event.target.closest('.job-card');
    if (!card) return;

    const companyName = card.querySelector('.company-name').innerText;
    const cardInfo = {
        companyName: companyName,
        position: card.querySelector('.job-position').innerText,
        details: card.querySelector('.job-details').innerText,
        description: card.querySelector('.job-desc').innerText
    };

    const statusButton = card.querySelector('.status-btn');

    
    if (event.target.classList.contains('interview-btn')) {
        statusButton.innerText = 'INTERVIEW';
        statusButton.style.color = '#10B981';
        statusButton.style.borderColor = '#10B981';
        statusButton.style.borderWidth = '1px';
        statusButton.style.borderStyle = 'solid';

       
        let exists = false;
        for (const item of interviewList) {
            if (item.companyName === companyName) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            interviewList.push(cardInfo);
        }
        

        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    } 
    
   
    else if (event.target.classList.contains('rejected-btn')) {
        statusButton.innerText = 'REJECTED';
        statusButton.style.color = '#EF4444';
        statusButton.style.borderColor = '#EF4444';
        statusButton.style.borderWidth = '1px';
        statusButton.style.borderStyle = 'solid';

        
        let exists = false;
        for (const item of rejectedList) {
            if (item.companyName === companyName) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            rejectedList.push(cardInfo);
        }
        // ------------------------------------

        interviewList = interviewList.filter(item => item.companyName !== companyName);
    }
    
  
    else if (event.target.closest('.delete-btn')) {
        card.remove();
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        const allCardSection = document.getElementById('all-cards');
        const emptyState = document.getElementById('empty-state');
        if (allCardSection && allCardSection.children.length === 0) {
            allCardSection.classList.add('hidden');
            emptyState.classList.remove('hidden');
        }
    }

    if (currentStatus === 'interview-filter-btn') {
        renderFilteredCards(interviewList, '#10B981', 'INTERVIEW');
    } else if (currentStatus === 'rejected-filter-btn') {
        renderFilteredCards(rejectedList, '#EF4444', 'REJECTED');
    }

    calculateCount();
});


function renderFilteredCards(list, color, statusText) {
    const allCardSection = document.getElementById('all-cards');
    const emptyState = document.getElementById('empty-state');
    
    allCardSection.innerHTML = ''; 
    
    if (list.length === 0) {
        allCardSection.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    allCardSection.classList.remove('hidden');
    emptyState.classList.add('hidden');

    for (const job of list) {
        let div = document.createElement('div');
        div.className = 'job-card flex justify-between bg-white border border-gray-200 rounded-xl py-6 px-6 mb-5';
        
        const interviewHover = "hover:bg-[#10b981FF] hover:text-white transition-all";
        const rejectedHover = "hover:bg-[#ef4444] hover:text-white transition-all";

        div.innerHTML = `
            <div>
                <h3 class="company-name text-[18px] text-[#002C5C] font-semibold mb-1">${job.companyName}</h3>
                <p class="job-position text-[#64748B] text-[16px] font-normal">${job.position}</p>
                <p class="job-details text-[#64748B] text-[14px] font-normal mt-5">${job.details}</p>
                
                <button class="status-btn text-[14px] font-medium mt-7 py-2 px-3 bg-[#eef4ff] rounded-sm uppercase border" 
                        style="color: ${color}; border-color: ${color};">
                    ${statusText}
                </button>
                
                <p class="job-desc text-[#323B49] text-[14px] font-normal mb-5 mt-2">${job.description}</p>
                <div class="flex gap-2">
                    <button class="interview-btn py-2 px-3 border border-[#10b981FF] rounded-sm text-[14px] font-medium cursor-pointer uppercase text-[#10b981FF] ${interviewHover}">Interview</button>
                    <button class="rejected-btn py-2 px-3 border border-[#EF4444] rounded-sm text-[14px] font-medium cursor-pointer uppercase text-[#EF4444] ${rejectedHover}">Rejected</button>
                </div>
            </div>
            <div><button class="delete-btn cursor-pointer"><i class="fa-regular fa-trash-can text-[#64748B]"></i></button></div>
        `;
        allCardSection.appendChild(div);
    }
}

calculateCount();