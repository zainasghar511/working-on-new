document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Auto Slider Logic ---
    const sliderWrap = document.getElementById('dealsilder');
    let scrollAmount = 0;
    const slideWidth = 320; // Card width + gap

    setInterval(() => {
        if (scrollAmount >= sliderWrap.scrollWidth - sliderWrap.clientWidth) {
            scrollAmount = 0;
        } else {
            scrollAmount += slideWidth;
        }
        sliderWrap.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 3000);

    // --- 2. Filter Logic (Category) ---
    const filterButtons = document.querySelectorAll('.filternav button');
    const allItems = document.querySelectorAll('.menu-grid > div');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.id.toLowerCase();
            
            allItems.forEach(item => {
                const itemClasses = Array.from(item.classList).map(c => c.toLowerCase());
                // 'allmenu' check ya class match
                if (category === 'allmenu' || itemClasses.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Search Logic ---
    const searchInput = document.getElementById('menusearch');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        allItems.forEach(item => {
            const itemName = item.querySelector('h3').innerText.toLowerCase();
            if (itemName.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- 4. Price Update Function ---
function updatePrice(id) {
    const sizeSelect = document.getElementById(`size-${id}`);
    const priceSpan = document.getElementById(`price-${id}`);
    if(sizeSelect && priceSpan) {
        priceSpan.innerText = sizeSelect.value;
    }
}

// --- 5. WhatsApp Order Function ---
function sendOrder(id) {
    const name = document.getElementById(`name-${id}`) ? document.getElementById(`name-${id}`).innerText : document.getElementById(`name${id}`).innerText;
    const price = document.getElementById(`price-${id}`) ? document.getElementById(`price-${id}`).innerText : "330"; // Default for burgers
    const qty = document.getElementById(`qty-${id}`).value;
    const sizeSelect = document.getElementById(`size-${id}`);
    const sizeText = sizeSelect ? sizeSelect.options[sizeSelect.selectedIndex].text : "Standard";

    const phoneNumber = "923027622323"; 
    const message = `*New Order*%0A*Item:* ${name}%0A*Size/Type:* ${sizeText}%0A*Quantity:* ${qty}%0A*Total Price:* Rs. ${price * qty};`
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}, '_blank'`);
}