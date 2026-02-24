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

    const allCards = document.querySelectorAll('.job-card');
    totalDisplay.innerText = allCards.length;

    if (currentStatus === 'all-filter-btn') {
        tabLabel.innerText = `${allCards.length} jobs`;
    } else {
        const visibleCards = document.querySelectorAll('.job-card:not(.hidden)').length;
        tabLabel.innerText = `${visibleCards} of ${allCards.length} jobs`;
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

    const allCards = document.querySelectorAll('.job-card');
    const emptyState = document.getElementById('empty-state');
    let hasVisibleCard = false;

    for (const card of allCards) {
        const companyName = card.querySelector('.company-name').innerText;

        if (id === 'all-filter-btn') {
            card.classList.remove('hidden');
            hasVisibleCard = true;
        } else if (id === 'interview-filter-btn') {
            let isInterview = false;
            for (const item of interviewList) {
                if (item.companyName === companyName) {
                    isInterview = true;
                    break;
                }
            }
            card.classList.toggle('hidden', !isInterview);
            if (isInterview) hasVisibleCard = true;
        } else if (id === 'rejected-filter-btn') {
            let isRejected = false;
            for (const item of rejectedList) {
                if (item.companyName === companyName) {
                    isRejected = true;
                    break;
                }
            }
            card.classList.toggle('hidden', !isRejected);
            if (isRejected) hasVisibleCard = true;
        }
    }

   
    if (hasVisibleCard) {
        if (emptyState) emptyState.classList.add('hidden');
    } else {
        if (emptyState) emptyState.classList.remove('hidden');
    }
    
    calculateCount();
}


document.getElementById('main-container').addEventListener('click', function (event) {
    const card = event.target.closest('.job-card');
    if (!card) return;

    const companyName = card.querySelector('.company-name').innerText;
    const cardInfo = { companyName: companyName }; 
    const statusButton = card.querySelector('.status-btn');

    if (event.target.classList.contains('interview-btn')) {
        statusButton.innerText = 'INTERVIEW';
        statusButton.style.color = '#10B981';
        statusButton.style.borderColor = '#10B981';
        statusButton.style.borderWidth = '1px';
        statusButton.style.borderStyle = 'solid';

        let exists = false;
        for (const item of interviewList) {
            if (item.companyName === companyName) { exists = true; break; }
        }
        if (!exists) interviewList.push(cardInfo);
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
            if (item.companyName === companyName) { exists = true; break; }
        }
        if (!exists) rejectedList.push(cardInfo);
        interviewList = interviewList.filter(item => item.companyName !== companyName);
    }
    else if (event.target.closest('.delete-btn')) {
        card.remove();
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        
       
        toggleStyle(currentStatus); 
        return; 
    }

    if (currentStatus !== 'all-filter-btn') {
        toggleStyle(currentStatus);
    } else {
        calculateCount();
    }
});

toggleStyle('all-filter-btn');