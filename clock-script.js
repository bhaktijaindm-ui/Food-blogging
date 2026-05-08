// ==================== TIMEZONE DATA ==================== //
const timezones = [
    { name: 'UTC', region: 'Coordinated Universal Time', offset: 0 },
    { name: 'EST', region: 'Eastern Standard Time', offset: -5 },
    { name: 'CST', region: 'Central Standard Time', offset: -6 },
    { name: 'MST', region: 'Mountain Standard Time', offset: -7 },
    { name: 'PST', region: 'Pacific Standard Time', offset: -8 },
    { name: 'GMT', region: 'Greenwich Mean Time', offset: 0 },
    { name: 'CET', region: 'Central European Time', offset: 1 },
    { name: 'IST', region: 'Indian Standard Time', offset: 5.5 },
    { name: 'JST', region: 'Japan Standard Time', offset: 9 },
    { name: 'AEST', region: 'Australian Eastern Standard Time', offset: 10 },
    { name: 'NZST', region: 'New Zealand Standard Time', offset: 12 },
    { name: 'HST', region: 'Hawaii Standard Time', offset: -10 },
    { name: 'AKST', region: 'Alaska Standard Time', offset: -9 },
    { name: 'GST', region: 'Gulf Standard Time', offset: 4 },
    { name: 'SGT', region: 'Singapore Standard Time', offset: 8 },
    { name: 'HKT', region: 'Hong Kong Time', offset: 8 },
    { name: 'BRT', region: 'Brasília Time', offset: -3 },
    { name: 'SAST', region: 'South Africa Standard Time', offset: 2 },
    { name: 'EEST', region: 'Eastern European Summer Time', offset: 3 },
    { name: 'MSK', region: 'Moscow Standard Time', offset: 3 },
];

// ==================== DOM ELEMENTS ==================== //
const clocksContainer = document.getElementById('clocksContainer');
const searchInput = document.getElementById('searchInput');
const timezoneCount = document.getElementById('timezoneCount');
const lastUpdated = document.getElementById('lastUpdated');
const toggleBtns = document.querySelectorAll('.toggle-btn');

let clockInstances = [];
let currentView = 'grid';

// ==================== INITIALIZATION ==================== //
function initializeClock() {
    createClocks();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    setupEventListeners();
}

// ==================== CREATE CLOCK CARDS ==================== //
function createClocks() {
    clocksContainer.innerHTML = '';
    timezones.forEach((tz, index) => {
        const clockCard = createClockCard(tz, index);
        clocksContainer.appendChild(clockCard);
    });
    updateTimezoneCount();
}

// ==================== CREATE INDIVIDUAL CLOCK CARD ==================== //
function createClockCard(tz, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${index}`;
    card.dataset.timezone = tz.name.toLowerCase();
    card.dataset.region = tz.region.toLowerCase();

    card.innerHTML = `
        <div class="timezone-name">${tz.name}</div>
        <div class="timezone-region">${tz.region}</div>
        
        <div class="digital-display">
            <div class="digital-time">
                <span class="hours">00</span>
                <span class="time-separator">:</span>
                <span class="minutes">00</span>
                <span class="time-separator">:</span>
                <span class="seconds">00</span>
                <span class="digital-period">AM</span>
            </div>
            <div class="digital-date">--/--/--</div>
        </div>

        <div class="analog-clock">
            <div class="hand hour"></div>
            <div class="hand minute"></div>
            <div class="hand second"></div>
            <div class="clock-center"></div>
        </div>

        <div class="timezone-offset">
            <span class="offset-label">UTC</span>
            <span class="offset-value">${formatOffset(tz.offset)}</span>
        </div>
    `;

    clockInstances.push({
        element: card,
        timezone: tz,
        index: index
    });

    return card;
}

// ==================== FORMAT UTC OFFSET ==================== //
function formatOffset(offset) {
    const sign = offset >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offset));
    const minutes = (Math.abs(offset) % 1) * 60;
    return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
}

// ==================== UPDATE ALL CLOCKS ==================== //
function updateAllClocks() {
    const now = new Date();
    
    clockInstances.forEach(clock => {
        updateClock(clock, now);
    });

    // Update last updated time
    updateLastUpdatedTime(now);
}

// ==================== UPDATE INDIVIDUAL CLOCK ==================== //
function updateClock(clockInstance, baseTime) {
    const tz = clockInstance.timezone;
    const card = clockInstance.element;

    // Calculate time in timezone
    const utcTime = baseTime.getTime() + baseTime.getTimezoneOffset() * 60000;
    const tzTime = new Date(utcTime + tz.offset * 3600000);

    // Get time components
    const hours = tzTime.getHours();
    const minutes = tzTime.getMinutes();
    const seconds = tzTime.getSeconds();

    // Update digital display
    updateDigitalDisplay(card, hours, minutes, seconds, tzTime);

    // Update analog clock
    updateAnalogClock(card, hours, minutes, seconds);
}

// ==================== UPDATE DIGITAL DISPLAY ==================== //
function updateDigitalDisplay(card, hours, minutes, seconds, tzTime) {
    const hoursEl = card.querySelector('.hours');
    const minutesEl = card.querySelector('.minutes');
    const secondsEl = card.querySelector('.seconds');
    const periodEl = card.querySelector('.digital-period');
    const dateEl = card.querySelector('.digital-date');

    // 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    hoursEl.textContent = displayHours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    periodEl.textContent = period;

    // Update date
    const year = tzTime.getFullYear();
    const month = (tzTime.getMonth() + 1).toString().padStart(2, '0');
    const date = tzTime.getDate().toString().padStart(2, '0');
    dateEl.textContent = `${month}/${date}/${year}`;
}

// ==================== UPDATE ANALOG CLOCK ==================== //
function updateAnalogClock(card, hours, minutes, seconds) {
    const hourHand = card.querySelector('.hand.hour');
    const minuteHand = card.querySelector('.hand.minute');
    const secondHand = card.querySelector('.hand.second');

    // Calculate rotation angles
    const secondRotation = seconds * 6; // 360 / 60
    const minuteRotation = minutes * 6 + seconds * 0.1; // 360 / 60 + smooth transition
    const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 360 / 12 + smooth transition

    // Apply rotations
    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

// ==================== UPDATE LAST UPDATED TIME ==================== //
function updateLastUpdatedTime(time) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    lastUpdated.textContent = `${hours}:${minutes}:${seconds}`;
}

// ==================== SETUP EVENT LISTENERS ==================== //
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterClocks);

    // View toggle
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            e.target.closest('.toggle-btn').classList.add('active');
            
            const view = e.target.closest('.toggle-btn').dataset.view;
            changeView(view);
        });
    });
}

// ==================== FILTER CLOCKS BY SEARCH ==================== //
function filterClocks() {
    const searchTerm = searchInput.value.toLowerCase();

    clockInstances.forEach(clock => {
        const timezone = clock.timezone.name.toLowerCase();
        const region = clock.timezone.region.toLowerCase();

        if (timezone.includes(searchTerm) || region.includes(searchTerm)) {
            clock.element.classList.remove('hidden');
        } else {
            clock.element.classList.add('hidden');
        }
    });

    updateTimezoneCount();
}

// ==================== CHANGE VIEW MODE ==================== //
function changeView(view) {
    currentView = view;
    if (view === 'list') {
        clocksContainer.classList.add('list-view');
    } else {
        clocksContainer.classList.remove('list-view');
    }
}

// ==================== UPDATE TIMEZONE COUNT ==================== //
function updateTimezoneCount() {
    const visibleClocks = clockInstances.filter(clock => {
        return !clock.element.classList.contains('hidden');
    }).length;

    timezoneCount.textContent = visibleClocks;
}

// ==================== START APPLICATION ==================== //
window.addEventListener('DOMContentLoaded', initializeClock);

// ==================== CONSOLE LOGS ==================== //
console.log('🕐 Multi-Timezone Digital Clock Initialized');
console.log(`📍 Loaded ${timezones.length} timezones`);
