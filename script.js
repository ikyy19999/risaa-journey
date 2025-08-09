// Gallery data with detailed information for each itinerary
const galleryData = {
    beach: [
        {
            src: 'assets/1.jpg',
        },
        {
            src: 'assets/2.jpg',
        },
        {
            src: 'assets/3.jpg',
        },
        {
            src: 'assets/4.jpg',
        },
        {
            src: 'assets/5.jpg',
        },
        {
            src: 'assets/6.jpg',
        },
        {
            src: 'assets/7.jpg',
        },
        {
            src: 'assets/8.jpg',
        },
        {
            src: 'assets/9.jpg',
        },
        {
            src: 'assets/10.jpg',
        },
        {
            src: 'assets/11.jpg',
        },
        {
            src: 'assets/12.jpg',
        },
    ],
    cafe: [
        {
            src: 'assets/13.jpg',
        },
        {
            src: 'assets/14.jpg',
        },
        {
            src: 'assets/15.jpg',
        },
        {
            src: 'assets/16.jpg',
        },
        {
            src: 'assets/17.jpg',
        },
        {
            src: 'assets/18.jpg',
        },
        {
            src: 'assets/19.jpg',
        },
        {
            src: 'assets/20.jpg',
        },
        {
            src: 'assets/21.jpg',
        },
        {
            src: 'assets/22.jpg',
        },
        {
            src: 'assets/23.jpg',
        },
        {
            src: 'assets/24.jpg',
        },
    ],
    mountain: [
        {
            src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
            title: 'Mountain Trek',
            description: 'Challenging hike to the mountain peak. Worth every step for the breathtaking view.'
        },
        {
            src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&auto=format&fit=crop&q=80',
            title: 'Mountain Top View',
            description: 'Reaching the summit together, celebrating our achievement with a group photo.'
        }
    ]
};

// Configuration for Telegram Bot (you can update these later)
const TELEGRAM_CONFIG = {
    BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE', // Ganti dengan bot token Anda
    CHAT_ID: 'YOUR_CHAT_ID_HERE'      // Ganti dengan chat ID Anda
};

// --- Logika untuk Running Text Notes ---
// Array sementara untuk menyimpan pesan (simulasi data lokal)
let notesMessages = [
    { name: "Friend 1", message: "Wishing you both the best!" },
    { name: "Friend 2", message: "Such a beautiful love story!" },
    { name: "Family", message: "So happy for you both!" }
];

// Fungsi untuk memperbarui tampilan running text
function updateNotesMarquee() {
    const marqueeElement = document.getElementById('notesMarquee');
    if (!marqueeElement) return;
    
    if (notesMessages.length === 0) {
        marqueeElement.innerHTML = "Be the first to send a message! 💕";
        return;
    }
    
    const messagesHTML = notesMessages.map(note => 
        `💕 <strong>${note.name}:</strong> ${note.message}`
    ).join(' &nbsp; 💕 &nbsp; ');
    
    marqueeElement.innerHTML = messagesHTML;
}

// Fungsi untuk menambahkan pesan baru ke array dan memperbarui tampilan
function addNoteToMarquee(name, message) {
    const displayName = name || 'Anonim';
    notesMessages.push({ name: displayName, message: message });
    
    if (notesMessages.length > 10) {
        notesMessages.shift();
    }
    
    updateNotesMarquee();
}

// Panggil updateNotesMarquee saat halaman dimuat
window.addEventListener('load', function() {
   updateNotesMarquee();
});

// --- Akhir Logika untuk Running Text Notes ---

let currentImageIndex = 0;
let currentItinerary = '';
let lastScrollY = window.scrollY;
let ticking = false;
let navTicking = false;

// Function to get dynamic welcome message
function getDynamicWelcome() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return "Good Morning! ☀️";
    } else if (hour >= 12 && hour < 15) {
        return "Good Afternoon! 🌤️";
    } else if (hour >= 15 && hour < 18) {
        return "Good Evening! 🌇";
    } else {
        return "Good Night! 🌙";
    }
}

// Set dynamic welcome message
document.getElementById('dynamicWelcome').textContent = getDynamicWelcome();

// Function to update digital clock
function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('digitalClock').textContent = timeString;
}

// Initialize and update clock every second
updateDigitalClock();
setInterval(updateDigitalClock, 1000);

// Optimized Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Optimized Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
function nextSlide() {
    showSlide(currentSlide + 1);
}
setInterval(nextSlide, 8000);

// Lightbox functionality
function openLightbox(itinerary, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    currentItinerary = itinerary;
    currentImageIndex = index;
    
    lightboxImage.src = galleryData[itinerary][index].src;
    lightboxTitle.textContent = galleryData[itinerary][index].title;
    lightboxDescription.textContent = galleryData[itinerary][index].description;
    lightboxCounter.textContent = `${index + 1} / ${galleryData[itinerary].length}`;
    
    createThumbnails(itinerary);
    updateActiveThumbnail();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % galleryData[currentItinerary].length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + galleryData[currentItinerary].length) % galleryData[currentItinerary].length;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = galleryData[currentItinerary][currentImageIndex].src;
    lightboxTitle.textContent = galleryData[currentItinerary][currentImageIndex].title;
    lightboxDescription.textContent = galleryData[currentItinerary][currentImageIndex].description;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryData[currentItinerary].length}`;
    
    updateActiveThumbnail();
}

function createThumbnails(itinerary) {
    const thumbnailsContainer = document.getElementById('lightboxThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    galleryData[itinerary].forEach((item, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = item.src;
        thumbnail.className = 'thumbnail';
        thumbnail.onclick = () => {
            currentImageIndex = index;
            navigateLightbox();
        };
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Event listeners for lightbox
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox('prev'));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox('next'));

// Close lightbox when clicking outside the content
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                navigateLightbox('next');
                break;
        }
    }
});

// Gallery item click events
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const itinerary = item.dataset.itinerary;
        const index = parseInt(item.dataset.index);
        openLightbox(itinerary, index);
    });
});

// Optimized smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to update active navigation link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Function to update scroll indicator based on scroll direction
function updateScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const icon = scrollIndicator.querySelector('i');
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        icon.className = 'fas fa-chevron-up';
        scrollIndicator.title = "Scroll to Top";
        scrollIndicator.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.scrollY < lastScrollY) {
        // Scrolling up or at the top
        icon.className = 'fas fa-chevron-down';
        scrollIndicator.title = "Scroll Down";
        scrollIndicator.onclick = () => {
            const storySection = document.getElementById('story');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }
    lastScrollY = window.scrollY;
}

// Combined scroll handler for performance
function handleScroll() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animate');
        }
    });
    
    // Update active link
    updateActiveLink();
    
    // Update scroll indicator
    updateScrollIndicator();
    
    ticking = false;
}

// Optimized navbar background update
function updateNavbarBackground() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
    navTicking = false;
}

// Unified scroll event listener with requestAnimationFrame
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
    if (!navTicking) {
        requestAnimationFrame(updateNavbarBackground);
        navTicking = true;
    }
});

// Initial checks on load
window.addEventListener('load', function() {
    handleScroll(); // Trigger initial animations and link state
    updateNavbarBackground(); // Set initial navbar state
});

// Function to get user's public IP address
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Cannot fetch IP';
    }
}

// Function to get basic device information
function getDeviceInfo() {
    return navigator.userAgent;
}

// Form submission with IP, device info, and anonymous option
async function submitNotesForm(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const isAnonymousCheckbox = document.getElementById('anonymous');
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const isAnonymous = isAnonymousCheckbox.checked;
    
    if (!name || !message) {
        swal("Oops!", "Please fill in all fields! 😊", "warning");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    if (TELEGRAM_CONFIG.BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || 
        TELEGRAM_CONFIG.CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        swal({
            title: "Ooops! 🤖",
            text: "Hang tight, guys, setting up the bot, it'll be ready soon so your messages can get through!.",
            icon: "warning",
            button: "Got it!",
        });
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Get IP and device info
    const userIP = await getUserIP();
    const deviceInfo = getDeviceInfo();
    
    // Tentukan nama yang dikirim ke Telegram (selalu nama asli)
    const telegramName = name; 
    
    // Tentukan nama untuk ditampilkan di running text (anonim jika dicentang)
    const displayNoteName = isAnonymous ? 'Anonim' : name;
    
    // Construct the message for Telegram
    let telegramMessage = `🌟 NEW MESSAGE FROM OUR JOURNEY WEBSITE! 🌟
👤 From: ${telegramName}
💌 Message:
"${message}"
🌐 Public IP: ${userIP}
📱 Device: ${deviceInfo}
⏰ Sent at: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Jakarta',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}`;
    
    // Add note if the user chose to be anonymous
    if (isAnonymous) {
        telegramMessage += `
📝 Admin Note: Sender chose to appear anonymous to the recipient.`;
    }
    
    telegramMessage += `
💕 Sent with love from Our Beautiful Journey website`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: telegramMessage
            })
        });
        
        if (response.ok) {
            // Tambahkan ke Running Text
            addNoteToMarquee(displayNoteName, message);
            
            swal({
                title: "Thank You So Much! 💕",
                text: `Hi ${name}! Your sweet message has been successfully sent to us. Every kind word means so much! ✨`,
                icon: "success",
                button: "Sweet! 💖",
            });
            
            e.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        swal({
            title: "Oops! There's an Issue 😅",
            text: "There seems to be a technical problem sending the message. Please try again in a few moments!",
            icon: "error",
            button: "OK, Try Again",
        });
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Attach form submission handler
document.getElementById('notesForm').addEventListener('submit', submitNotesForm);

// Mobile menu functionality
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenu = document.getElementById('closeMobileMenu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenuOverlay .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Simple lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Prevent excessive animations on scroll
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.body.style.animation = 'none';
}

// Console message
console.log('💕 Our Beautiful Journey - Enhanced version loaded successfully! 💕');

// ==========================================
// Disable Inspect Element and Right Click with SweetAlert
// ==========================================
// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    swal("Access Denied!", "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊", "error");
    return false;
});

// Disable common keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
    // F12 key
    if (e.keyCode == 123) {
        e.preventDefault();
        swal("Access Denied!", "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊", "error");
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        e.preventDefault();
        swal("Access Denied!", "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊", "error");
        return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        e.preventDefault();
        swal("Access Denied!", "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊", "error");
        return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
        swal("Access Denied!", "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊", "error");
        return false;
    }
    // Ctrl+S (Save Page)
     if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        swal("Access Denied!", "Sorry, page saving function has been disabled. 😊", "error");
        return false;
    }
});

// Disable text selection (added in CSS as well)
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Attempt to disable dragging of elements (images, etc.)
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Note: These methods are not foolproof. A determined user can still access the source code
// through browser menus, other developer tools, or by disabling JavaScript.

// --- Language Switching Functionality ---
const languageButtons = document.querySelectorAll('.lang-btn');
let currentLanguage = 'en'; // Default language

// Translation data
const translations = {
    id: {
        "Welcome to": "Selamat Datang di",
        "Welcome!": "Selamat Datang!",
        "Our Beautiful Journey": "Perjalanan Cinta Kita",
        "A love story that began with a first glance, growing into an unshakeable bond 💕": "Sebuah kisah cinta yang dimulai dari tatapan pertama, berkembang menjadi ikatan yang tak tergoyahkan 💕",
        "Start Story": "Mulai Cerita",
        "View Memories": "Lihat Kenangan",
        "Chapter 01": "Bab 01",
        "Our Love Story": "Kisah Cinta Kita",
        "A love journey that started by chance, evolving into a beautiful destiny": "Perjalanan cinta yang dimulai dari ketidaksengajaan, berkembang menjadi takdir yang indah",
        "Our love journey began on a day we never expected would change our lives forever. When our eyes first met, time seemed to stop, and the world became more colorful.": "Perjalanan cinta kami dimulai pada hari yang tak pernah kami duga akan mengubah hidup kami selamanya. Saat mata kami pertama kali bertemu, waktu seakan berhenti berputar, dan dunia menjadi lebih berwarna.",
        "From our first awkward yet sweet conversation to uncontrollable laughter at every meeting, we learned that true love isn't just about feelings, but about choosing to support each other every day.": "Dari percakapan pertama yang canggung namun manis, hingga tawa yang tak terbendung di setiap pertemuan, kami belajar bahwa cinta sejati bukan hanya tentang perasaan, tapi tentang memilih untuk saling mendukung setiap hari.",
        "Every moment together is a small miracle we cherish. From our nervous first date to the courage to dream about our future together, each step in this journey feels special and meaningful.": "Setiap momen bersama adalah keajaiban kecil yang kami hargai. Dari date pertama yang nervous hingga keberanian untuk bermimpi tentang masa depan bersama, setiap langkah dalam perjalanan ini terasa istimewa dan penuh makna.",
        "Happy Days": "Hari Bahagia",
        "Growing Love": "Cinta Yang Tumbuh",
        "United Hearts": "Hati Yang Bersatu",
        "Chapter 02": "Bab 02",
        "Our Timeline": "Garis Waktu Kita",
        "Beautiful milestones in our love journey": "Milestone-milestone indah dalam perjalanan cinta kami",
        "First Meeting": "Pertemuan Pertama",
        "The day that changed everything. When our eyes first met, I knew there was something special. Nervous but excited, awkward yet magical.": "Hari yang mengubah segalanya. Saat pertama kali mata kita bertemu, aku tahu ada sesuatu yang istimewa. Nervous tapi excited, awkward tapi magical.",
        "First Date": "Kencan Pertama",
        "An unforgettable first date. From nervously choosing an outfit to laughing hard at silly jokes. The moment we knew \"this is the one\".": "Kencan pertama yang tak terlupakan. Dari gugup memilih outfit sampai tertawa lepas karena joke receh. Moment dimana kita tahu \"ini dia orangnya\".",
        "Officially Together": "Resmi Bersama",
        "Under a star-filled sky, we promised to go through this journey together. \"Will you be my girlfriend?\" - a moment that will always be engraved in my heart.": "Di bawah langit penuh bintang, kita berjanji untuk menjalani perjalanan ini berdua. \"Will you be my girlfriend?\" - moment yang akan selalu terukir di hati.",
        "Chapter 03": "Bab 03",
        "Our Memories": "Kenangan Kita",
        "Collection of the best moments we've experienced together": "Kumpulan moment-moment terbaik yang telah kita lalui bersama",
        "🏖️ Beach Adventure": "🏖️ Petualangan di Pantai",
        "Our unforgettable trip to the beautiful coastline": "Perjalanan tak terlupakan ke pantai yang indah",
        "☕ Coffee Shop Dates": "☕ Kencan di Kedai Kopi",
        "Cozy moments at our favorite cafes": "Momen hangat di kedai kopi favorit kita",
        "🏞️ Mountain Hike": "🏞️ Mendaki Gunung",
        "Adventurous trekking in the mountains": "Petualangan mendaki di pegunungan",
        "Beach Sunset": "Matahari Terbenam di Pantai",
        "Our first sunset at the beach together. The golden light made everything magical.": "Matahari terbenam pertama kita di pantai. Cahaya keemasan membuat semuanya terasa magis.",
        "Ocean Waves": "Ombak Laut",
        "Walking hand in hand along the shoreline, listening to the soothing sound of waves.": "Berjalan bergandengan tangan di sepanjang pantai, mendengarkan suara ombak yang menenangkan.",
        "Beach Picnic": "Piknik di Pantai",
        "A romantic picnic on the sand with delicious food and endless laughter.": "Piknik romantis di pasir dengan makanan lezat dan tawa tak berkesudahan.",
        "First Coffee Date": "Kencan Kopi Pertama",
        "Our very first coffee date at this cozy little cafe. Nervous but excited!": "Kencan kopi pertama kita di kedai kecil yang nyaman ini. Nervous tapi excited!",
        "Rainy Day Cafe": "Kedai Kopi saat Hujan",
        "Spending a rainy afternoon inside, sharing stories and sipping hot chocolate.": "Menghabiskan sore hujan di dalam ruangan, berbagi cerita dan menyeruput coklat panas.",
        "Evening Coffee": "Kopi Malam",
        "Late evening coffee dates, talking about our dreams and future plans.": "Kencan kopi malam, membicarakan impian dan rencana masa depan.",
        "Mountain Trek": "Perjalanan Mendaki",
        "Challenging hike to the mountain peak. Worth every step for the breathtaking view.": "Mendaki penuh tantangan ke puncak gunung. Setiap langkahnya berharga demi pemandangan yang menakjubkan.",
        "Mountain Top View": "Pemandangan dari Puncak",
        "Reaching the summit together, celebrating our achievement with a group photo.": "Mencapai puncak bersama, merayakan pencapaian dengan foto bersama.",
        "Chapter 04": "Bab 04",
        "Leave us a Note": "Tinggalkan Pesan untuk Kami",
        "Share happiness and best wishes for our love journey": "Bagikan kebahagiaan dan doa terbaik untuk perjalanan cinta kami",
        "Send Sweet Messages! 💕": "Kirimkan Ucapan Manis! 💕",
        "Every kind word from you means so much to us. Let's share happiness!": "Setiap kata-kata baik dari kalian sangat berarti untuk kami. Mari berbagi kebahagiaan!",
        "Your Name:": "Nama Kamu:",
        "Enter your full name...": "Masukkan nama lengkap...",
        "Message for Us:": "Pesan untuk Kami:",
        "Write sweet messages, prayers, or greetings for us...": "Tulis pesan manis, doa, atau ucapan selamat untuk kami...",
        "Send as Anonymous": "Kirim sebagai Anonim",
        "Send Love Message": "Kirim Pesan Cinta",
        "Loading our love story...": "Memuat cerita cinta...",
        "Memuat cerita cinta...": "Memuat cerita cinta...",
        "Good Morning! ☀️": "Selamat Pagi! ☀️",
        "Good Afternoon! 🌤️": "Selamat Siang! 🌤️",
        "Good Evening! 🌇": "Selamat Sore! 🌇",
        "Good Night! 🌙": "Selamat Malam! 🌙",
        "Sending...": "Mengirim...",
        "Please fill in all fields! 😊": "Mohon isi semua field ya! 😊",
        "Oops!": "Oops!",
        "Bot Configuration Incomplete! 🤖": "Konfigurasi Bot Belum Lengkap! 🤖",
        "Telegram bot is not configured. Please set up BOT_TOKEN and CHAT_ID first.": "Bot Telegram belum dikonfigurasi. Silakan atur BOT_TOKEN dan CHAT_ID terlebih dahulu.",
        "Got it!": "Oke, Mengerti!",
        "Thank You So Much! 💕": "Terima Kasih Banyak! 💕",
        "Hi": "Hai",
        "Your sweet message has been successfully sent to us. Every kind word means so much! ✨": "Pesan manis kamu sudah berhasil dikirim ke kami. Setiap kata-kata baik sangat berarti! ✨",
        "Sweet! 💖": "Sweet! 💖",
        "Oops! There's an Issue 😅": "Oops! Ada Kendala 😅",
        "There seems to be a technical problem sending the message. Please try again in a few moments!": "Sepertinya ada masalah teknis saat mengirim pesan. Coba lagi dalam beberapa saat ya!",
        "OK, Try Again": "Oke, Coba Lagi",
        "Cannot fetch IP": "Tidak dapat mengambil IP",
        "Access Denied!": "Akses Ditolak!",
        "Sorry, Inspect Element and right-click functions have been disabled on this website to ensure security and user comfort. 😊": "Maaf, fungsi Inspect Element dan klik kanan telah dinonaktifkan di website ini untuk menjaga keamanan dan kenyamanan pengguna. 😊",
        "Sorry, page saving function has been disabled. 😊": "Maaf, fungsi menyimpan halaman telah dinonaktifkan. 😊",
        "💕 Our Beautiful Journey - Enhanced version loaded successfully! 💕": "💕 Our Beautiful Journey - Enhanced version loaded successfully! 💕",
        "Be the first to send a message! 💕": "Jadilah yang pertama mengirim ucapan! 💕"
    }
};

// Function to switch language
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    currentLanguage = lang;
    
    // Update active button
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update text content based on selected language
    if (lang === 'id') {
        // Update static text elements
        document.querySelector('.hero-subtitle').textContent = translations.id['Welcome to'];
        document.querySelector('.dynamic-welcome').textContent = getTranslatedDynamicWelcome();
        document.querySelector('.hero-description').textContent = translations.id['A love story that began with a first glance, growing into an unshakeable bond 💕'];
        document.querySelector('.cta-primary').innerHTML = '<i class="fas fa-heart"></i> ' + translations.id['Start Story'];
        document.querySelector('.cta-secondary').innerHTML = '<i class="fas fa-images"></i> ' + translations.id['View Memories'];
        
        // Update section headers
        document.querySelectorAll('.section-header .section-subtitle')[0].textContent = translations.id['Chapter 01'];
        document.querySelectorAll('.section-header .section-title')[0].textContent = translations.id['Our Love Story'];
        document.querySelectorAll('.section-header .section-description')[0].textContent = translations.id['A love journey that started by chance, evolving into a beautiful destiny'];
        
        document.querySelectorAll('.section-header .section-subtitle')[1].textContent = translations.id['Chapter 02'];
        document.querySelectorAll('.section-header .section-title')[1].textContent = translations.id['Our Timeline'];
        document.querySelectorAll('.section-header .section-description')[1].textContent = translations.id['Beautiful milestones in our love journey'];
        
        document.querySelectorAll('.section-header .section-subtitle')[2].textContent = translations.id['Chapter 03'];
        document.querySelectorAll('.section-header .section-title')[2].textContent = translations.id['Our Memories'];
        document.querySelectorAll('.section-header .section-description')[2].textContent = translations.id['Collection of the best moments we\'ve experienced together'];
        
        document.querySelectorAll('.section-header .section-subtitle')[3].textContent = translations.id['Chapter 04'];
        document.querySelectorAll('.section-header .section-title')[3].textContent = translations.id['Leave us a Note'];
        document.querySelectorAll('.section-header .section-description')[3].textContent = translations.id['Share happiness and best wishes for our love journey'];
        
        // Update itinerary headers
        const itineraryHeaders = document.querySelectorAll('.itinerary-header');
        itineraryHeaders[0].querySelector('.itinerary-title').textContent = translations.id['🏖️ Beach Adventure'];
        itineraryHeaders[0].querySelector('.itinerary-description').textContent = translations.id['Our unforgettable trip to the beautiful coastline'];
        
        itineraryHeaders[1].querySelector('.itinerary-title').textContent = translations.id['☕ Coffee Shop Dates'];
        itineraryHeaders[1].querySelector('.itinerary-description').textContent = translations.id['Cozy moments at our favorite cafes'];
        
        itineraryHeaders[2].querySelector('.itinerary-title').textContent = translations.id['🏞️ Mountain Hike'];
        itineraryHeaders[2].querySelector('.itinerary-description').textContent = translations.id['Adventurous trekking in the mountains'];
        
        // Update notes section
        document.querySelector('.notes-header h3').textContent = translations.id['Send Sweet Messages! 💕'];
        document.querySelector('.notes-header p').textContent = translations.id['Every kind word from you means so much to us. Let\'s share happiness!'];
        document.querySelector('label[for="name"]').innerHTML = '<i class="fas fa-user"></i> ' + translations.id['Your Name:'];
        document.getElementById('name').placeholder = translations.id['Enter your full name...'];
        document.querySelector('label[for="message"]').innerHTML = '<i class="fas fa-heart"></i> ' + translations.id['Message for Us:'];
        document.getElementById('message').placeholder = translations.id['Write sweet messages, prayers, or greetings for us...'];
        document.querySelector('label[for="anonymous"]').textContent = translations.id['Send as Anonymous'];
        document.querySelector('.submit-btn').innerHTML = '<i class="fas fa-paper-plane"></i> ' + translations.id['Send Love Message'];
        
        // Update loader text
        document.querySelector('.loader-text').textContent = translations.id['Memuat cerita cinta...'];
        
        // Update timeline content
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems[0].querySelector('h3').textContent = translations.id['First Meeting'];
        timelineItems[0].querySelector('p').textContent = translations.id['The day that changed everything. When our eyes first met, I knew there was something special. Nervous but excited, awkward yet magical.'];
        timelineItems[1].querySelector('h3').textContent = translations.id['First Date'];
        timelineItems[1].querySelector('p').textContent = translations.id['An unforgettable first date. From nervously choosing an outfit to laughing hard at silly jokes. The moment we knew "this is the one".'];
        timelineItems[2].querySelector('h3').textContent = translations.id['Officially Together'];
        timelineItems[2].querySelector('p').textContent = translations.id['Under a star-filled sky, we promised to go through this journey together. "Will you be my girlfriend?" - a moment that will always be engraved in my heart.'];
        
        // Update story stats
        const statLabels = document.querySelectorAll('.stat-label');
        statLabels[0].textContent = translations.id['Happy Days'];
        statLabels[1].textContent = translations.id['Growing Love'];
        statLabels[2].textContent = translations.id['United Hearts'];
        
        // Update gallery data titles and descriptions
        galleryData.beach[0].title = translations.id['Beach Sunset'];
        galleryData.beach[0].description = translations.id['Our first sunset at the beach together. The golden light made everything magical.'];
        galleryData.beach[1].title = translations.id['Ocean Waves'];
        galleryData.beach[1].description = translations.id['Walking hand in hand along the shoreline, listening to the soothing sound of waves.'];
        galleryData.beach[2].title = translations.id['Beach Picnic'];
        galleryData.beach[2].description = translations.id['A romantic picnic on the sand with delicious food and endless laughter.'];
        
        galleryData.cafe[0].title = translations.id['First Coffee Date'];
        galleryData.cafe[0].description = translations.id['Our very first coffee date at this cozy little cafe. Nervous but excited!'];
        galleryData.cafe[1].title = translations.id['Rainy Day Cafe'];
        galleryData.cafe[1].description = translations.id['Spending a rainy afternoon inside, sharing stories and sipping hot chocolate.'];
        galleryData.cafe[2].title = translations.id['Evening Coffee'];
        galleryData.cafe[2].description = translations.id['Late evening coffee dates, talking about our dreams and future plans.'];
        
        galleryData.mountain[0].title = translations.id['Mountain Trek'];
        galleryData.mountain[0].description = translations.id['Challenging hike to the mountain peak. Worth every step for the breathtaking view.'];
        galleryData.mountain[1].title = translations.id['Mountain Top View'];
        galleryData.mountain[1].description = translations.id['Reaching the summit together, celebrating our achievement with a group photo.'];
    } else {
        // English is default, reload page to ensure all text is in English
        location.reload();
    }
}

// Helper function for translated dynamic welcome
function getTranslatedDynamicWelcome() {
    if (currentLanguage === 'id') {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return translations.id["Good Morning! ☀️"];
        } else if (hour >= 12 && hour < 15) {
            return translations.id["Good Afternoon! 🌤️"];
        } else if (hour >= 15 && hour < 18) {
            return translations.id["Good Evening! 🌇"];
        } else {
            return translations.id["Good Night! 🌙"];
        }
    } else {
        return getDynamicWelcome(); // English version
    }
}

// Add event listeners to language buttons
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.dataset.lang;
        switchLanguage(selectedLang);
    });
});

// Update dynamic welcome when language changes
setInterval(() => {
    if (currentLanguage === 'id') {
        document.querySelector('.dynamic-welcome').textContent = getTranslatedDynamicWelcome();
    } else {
        document.querySelector('.dynamic-welcome').textContent = getDynamicWelcome();
    }
}, 60000); // Update every minute