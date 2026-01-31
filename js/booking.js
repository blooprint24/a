const bookingState = {
    step: 1,
    data: {
        category: null,
        package: null,
        date: null,
        time: null,
        details: {}
    }
};

const services = {
    auto: {
        title: 'Auto Detailing',
        packages: [
            { id: 'express', name: 'Express Clean', price: '75' },
            { id: 'full', name: 'Full Detail', price: '150' },
            { id: 'premium', name: 'Premium Shine', price: '250' }
        ]
    },
    pressure: {
        title: 'Pressure Washing',
        packages: [
            { id: 'driveway', name: 'Driveway + Walkway', price: '125' },
            { id: 'house', name: 'House Wash', price: '250' },
            { id: 'commercial', name: 'Commercial Storefront', price: 'Custom' }
        ]
    }
};

function renderStep() {
    const container = document.getElementById('booking-form-container');
    const step = bookingState.step;

    // Update step indicators
    document.querySelectorAll('.step').forEach(s => {
        const sNum = parseInt(s.dataset.step);
        s.classList.remove('active', 'completed');
        if (sNum === step) s.classList.add('active');
        if (sNum < step) s.classList.add('completed');
    });

    let html = '';

    switch (step) {
        case 1:
            html = `
                <div class="step-content">
                    <h3>Choose Service Category</h3>
                    <div class="category-grid grid">
                        <div class="option-card" onclick="selectCategory('auto')">
                            <div class="icon">🚗</div>
                            <h4>Auto Detailing</h4>
                            <p>Express, Full, or Premium mobile packages.</p>
                        </div>
                        <div class="option-card" onclick="selectCategory('pressure')">
                            <div class="icon">🏠</div>
                            <h4>Pressure Washing</h4>
                            <p>Residential & Commercial building cleaning.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 2:
            const cat = bookingState.data.category;
            html = `
                <div class="step-content">
                    <h3>Select Package</h3>
                    <div class="package-grid grid">
                        ${services[cat].packages.map(pkg => `
                            <div class="option-card" onclick="selectPackage('${pkg.id}')">
                                <h4>${pkg.name}</h4>
                                <div class="price">Starting at $${pkg.price}</div>
                                <button class="btn btn-outline">Select</button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-text" onclick="prevStep()">← Back</button>
                </div>
            `;
            break;
        case 3:
            html = `
                <div class="step-content">
                    <h3>Pick Date & Time</h3>
                    <input type="date" id="booking-date" class="form-input" min="${new Date().toISOString().split('T')[0]}">
                    <div class="time-slots grid">
                        <button class="btn slot" onclick="selectTime('09:00 AM')">09:00 AM</button>
                        <button class="btn slot" onclick="selectTime('01:00 PM')">01:00 PM</button>
                        <button class="btn slot" onclick="selectTime('04:00 PM')">04:00 PM</button>
                    </div>
                    <button class="btn btn-text" onclick="prevStep()">← Back</button>
                </div>
            `;
            break;
        case 4:
            html = `
                <div class="step-content">
                    <h3>Final Details</h3>
                    <form onsubmit="finishBooking(event)">
                        <input type="text" placeholder="Full Name" required class="form-input">
                        <input type="email" placeholder="Email Address" required class="form-input">
                        <input type="tel" placeholder="Phone Number" required class="form-input">
                        <textarea placeholder="Vehicle/Address details" required class="form-input"></textarea>
                        <button type="submit" class="btn btn-primary btn-block">Confirm Booking</button>
                    </form>
                    <button class="btn btn-text" onclick="prevStep()">← Back</button>
                </div>
            `;
            break;
        case 5:
            html = `
                <div class="step-content text-center">
                    <div class="success-icon">✨</div>
                    <h3>Booking Confirmed!</h3>
                    <p>We've received your request for <strong>${bookingState.data.package}</strong> on <strong>${bookingState.data.date}</strong>.</p>
                    <p>We will contact you shortly to finalize details.</p>
                    <button class="btn btn-primary" onclick="resetBooking()">Book Another</button>
                </div>
            `;
            break;
    }

    container.innerHTML = html;
}

window.selectCategory = (cat) => {
    bookingState.data.category = cat;
    bookingState.step = 2;
    renderStep();
};

window.selectPackage = (pkg) => {
    bookingState.data.package = pkg;
    bookingState.step = 3;
    renderStep();
};

window.selectTime = (time) => {
    const dateInput = document.getElementById('booking-date');
    if (!dateInput.value) return alert('Please select a date first');
    bookingState.data.date = dateInput.value;
    bookingState.data.time = time;
    bookingState.step = 4;
    renderStep();
};

window.finishBooking = (e) => {
    e.preventDefault();
    // TODO: Connect to real backend (Calendly, Square, etc.)
    console.log('Booking Data:', bookingState.data);
    localStorage.setItem('lastBooking', JSON.stringify(bookingState.data));
    bookingState.step = 5;
    renderStep();
};

window.prevStep = () => {
    bookingState.step--;
    renderStep();
};

window.resetBooking = () => {
    bookingState.step = 1;
    renderStep();
};

document.addEventListener('DOMContentLoaded', renderStep);
