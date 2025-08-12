// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });
timelineItems.forEach(item => {
    observer.observe(item);
});
// Story Typewriter Effect
const storyText = "We met by chance, laughed until our sides hurt, and fell in love in the most ordinary, extraordinary way. Every moment with you feels like a page from a fairy tale, written just for us. Through every season, every challenge, and every joy, our love has only grown stronger. You are my today, my tomorrow, and my forever.";
const typedTextElement = document.getElementById('typed-text');
let i = 0;
function typeWriter() {
    if (i < storyText.length) {
        typedTextElement.innerHTML += storyText.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
    }
}
const storySectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            storySectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
storySectionObserver.observe(document.getElementById('story'));
// Gallery Calendar
const calendarContainer = document.getElementById('calendar-container');
const lightbox = document.getElementById('lightbox');
const mediaContainer = document.getElementById('media-container');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const yearSelector = document.getElementById('year-selector');
const todayBtn = document.getElementById('today-btn');
const photoData = [
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 1.mp4',
        type: 'video',
        caption: 'First date video 1'
    },
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 2.mp4',
        type: 'video',
        caption: 'First date video 2'
    },
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 3.mp4',
        type: 'video',
        caption: 'First date video 3'
    },
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 4.mp4',
        type: 'video',
        caption: 'First date video 4'
    },
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 5.mp4',
        type: 'video',
        caption: 'First date video 5'
    },
    { 
        year: 2024, 
        month: 'August', 
        day: 3, 
        url: 'assets/first date 6.mp4',
        type: 'video',
        caption: 'First date video 6'
    },
];
function groupPhotosByDate(photos) {
    const grouped = {};
    photos.forEach(photo => {
        const key = `${photo.year}-${photo.month}-${photo.day}`;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(photo);
    });
    return grouped;
}
const groupedPhotoData = groupPhotosByDate(photoData);
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDay = today.getDate();
function populateYearSelector() {
    const earliestYear = Math.min(...photoData.map(photo => photo.year));
    yearSelector.innerHTML = '<option value="">Select Year</option>';
    for (let year = earliestYear; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) {
            option.selected = true;
        }
        yearSelector.appendChild(option);
    }
}
function renderCalendarForYear(selectedYear) {
    calendarContainer.innerHTML = '';
    if (!selectedYear) {
        calendarContainer.innerHTML = '<div class="empty-state">Please select a year to view photos.</div>';
        return;
    }
    const yearTitle = document.createElement('h2');
    yearTitle.className = 'year-title';
    yearTitle.textContent = selectedYear;
    calendarContainer.appendChild(yearTitle);
    const photosForYear = photoData.filter(photo => photo.year == selectedYear);
    months.forEach((monthName, monthIndex) => {
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        calendarContainer.appendChild(monthContainer);
        const monthTitle = document.createElement('h3');
        monthTitle.className = 'month-title';
        monthTitle.textContent = monthName;
        monthContainer.appendChild(monthTitle);
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        monthContainer.appendChild(grid);
        const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });
        const firstDay = new Date(selectedYear, monthIndex, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            grid.appendChild(emptyDay);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = day;
            if (selectedYear === currentYear && monthIndex === currentMonth && day === currentDay) {
                dayDiv.classList.add('today');
            }
            const specialEvents = {
                '2020-January-1': 'New Year',
                '2021-February-14': 'Valentine\'s Day',
                '2022-May-1': 'May Day',
                '2023-December-25': 'Christmas'
            };
            const eventKey = `${selectedYear}-${monthName}-${day}`;
            if (specialEvents[eventKey]) {
                dayDiv.classList.add('event');
                dayDiv.title = specialEvents[eventKey];
            }
            const photoKey = `${selectedYear}-${monthName}-${day}`;
            const photosForDay = groupedPhotoData[photoKey];
            if (photosForDay && photosForDay.length > 0) {
                const matchingPhotos = photosForDay.filter(photo => photo.year == selectedYear);
                if (matchingPhotos.length > 0) {
                    const hasVideo = matchingPhotos.some(p => p.type === 'video');
                    const hasImage = matchingPhotos.some(p => p.type === 'image');
                    if (hasVideo && hasImage) {
                        dayDiv.classList.add('has-mixed');
                    } else if (hasVideo) {
                        dayDiv.classList.add('has-video');
                    } else {
                        dayDiv.classList.add('has-photo');
                    }
                    dayDiv.dataset.photoData = JSON.stringify(matchingPhotos);
                    dayDiv.innerHTML = `${day}<span class="photo-count">${matchingPhotos.length}</span>`;
                }
            }
            grid.appendChild(dayDiv);
        }
        const photosForMonth = photosForYear.filter(photo => 
            months.indexOf(photo.month) === monthIndex
        );
        if (photosForMonth.length === 0) {
            const noPhotos = document.createElement('div');
            noPhotos.className = 'no-photos';
            noPhotos.textContent = 'No media for this month';
            monthContainer.appendChild(noPhotos);
        }
        // Add visible class for animation
        setTimeout(() => {
            monthContainer.classList.add('visible');
        }, monthIndex * 100);
    });
}
populateYearSelector();
renderCalendarForYear(currentYear);
yearSelector.addEventListener('change', function() {
    const selectedYear = this.value;
    renderCalendarForYear(selectedYear);
});
todayBtn.addEventListener('click', function() {
    yearSelector.value = currentYear;
    renderCalendarForYear(currentYear);
});
let currentPhotos = [];
let currentPhotoIndex = 0;
function showPhotoInLightbox(index) {
    if (currentPhotos.length > 0 && index >= 0 && index < currentPhotos.length) {
        mediaContainer.innerHTML = ''; // Clear previous media
        const media = currentPhotos[index];
        if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.url;
            video.controls = true;
            video.autoplay = true;
            video.className = 'lightbox-video';
            mediaContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.caption || 'Gallery photo';
            img.className = 'lightbox-img';
            mediaContainer.appendChild(img);
        }
        lightboxCaption.textContent = media.caption || '';
    }
}
calendarContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('has-photo') || 
        e.target.classList.contains('has-video') || 
        e.target.classList.contains('has-mixed')) {
        const photoDataArray = JSON.parse(e.target.dataset.photoData);
        currentPhotos = photoDataArray;
        currentPhotoIndex = 0;
        showPhotoInLightbox(currentPhotoIndex);
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
});
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    showPhotoInLightbox(currentPhotoIndex);
});
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    showPhotoInLightbox(currentPhotoIndex);
});
lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
// ========== TAB NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Check if tab elements exist (they are not in the provided HTML, so this is for future compatibility)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                // Show corresponding content
                const tab = btn.getAttribute('data-tab');
                document.querySelector(`.tab-content[data-tab-content="${tab}"]`).classList.add('active');
            });
        });
    }
});
// ========== VOICE NOTE FUNCTIONALITY ==========
let mediaRecorder;
let audioChunks = [];
let audioBlob;
document.addEventListener('DOMContentLoaded', function() {
    // These elements are not in the provided HTML, so this functionality is prepared for when they are added
    const recordBtn = document.getElementById('record-btn');
    const stopBtn = document.getElementById('stop-btn');
    const playBtn = document.getElementById('play-btn');
    const sendVoiceBtn = document.getElementById('send-voice-btn');
    const recordedAudio = document.getElementById('recorded-audio');
    const audioPlayer = document.getElementById('audio-player');
    const recordingIndicator = document.getElementById('recording-indicator');
    const audioBase64Input = document.getElementById('audio-base64');
    // Only initialize if record button exists
    if (recordBtn) {
        // Check if browser supports MediaRecorder
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            console.error('MediaRecorder not supported in this browser');
            recordBtn.disabled = true;
            recordBtn.textContent = 'Recording not supported';
            return;
        }
        recordBtn.addEventListener('click', startRecording);
        stopBtn.addEventListener('click', stopRecording);
        playBtn.addEventListener('click', playRecording);
        sendVoiceBtn.addEventListener('click', sendVoiceNote);
        function startRecording() {
            // Reset previous recording
            audioChunks = [];
            audioBlob = null;
            if (audioBase64Input) audioBase64Input.value = '';
            // Hide player, show recording indicator
            if (audioPlayer) audioPlayer.style.display = 'none';
            if (recordingIndicator) recordingIndicator.classList.add('show');
            // Disable/enable buttons
            recordBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            if (playBtn) playBtn.disabled = true;
            if (sendVoiceBtn) sendVoiceBtn.disabled = true;
            // Start recording
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = event => {
                        audioChunks.push(event.data);
                    };
                    mediaRecorder.onstop = () => {
                        // Stop all tracks
                        stream.getTracks().forEach(track => track.stop());
                        // Create audio blob
                        audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        // Create object URL for audio player
                        if (recordedAudio) {
                            const audioUrl = URL.createObjectURL(audioBlob);
                            recordedAudio.src = audioUrl;
                            // Show player
                            if (audioPlayer) audioPlayer.style.display = 'block';
                        }
                        if (recordingIndicator) recordingIndicator.classList.remove('show');
                        // Enable buttons
                        if (stopBtn) stopBtn.disabled = true;
                        if (playBtn) playBtn.disabled = false;
                        if (sendVoiceBtn) sendVoiceBtn.disabled = false;
                        // Convert to base64 for sending (if needed)
                        if (audioBase64Input) {
                            const reader = new FileReader();
                            reader.onload = function() {
                                audioBase64Input.value = reader.result.split(',')[1]; // Remove data URL prefix
                            };
                            reader.readAsDataURL(audioBlob);
                        }
                    };
                    mediaRecorder.start();
                })
                .catch(err => {
                    console.error('Error accessing microphone:', err);
                    alert('Could not access microphone. Please check permissions.');
                    if (recordingIndicator) recordingIndicator.classList.remove('show');
                    recordBtn.disabled = false;
                    if (stopBtn) stopBtn.disabled = true;
                });
        }
        function stopRecording() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
        }
        function playRecording() {
            if (recordedAudio && recordedAudio.src) {
                recordedAudio.play();
            }
        }
        function sendVoiceNote() {
            const nameInput = document.getElementById('voice-name');
            const name = nameInput ? nameInput.value : '';
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            if (!audioBlob) {
                alert('No voice note recorded.');
                return;
            }
            // Send to Telegram
            sendVoiceToTelegram(name, audioBlob);
        }
        async function sendVoiceToTelegram(name, audioBlob) {
            const BOT_TOKEN = 'YOUR_TOKEN_HERE'; // << GANTI DENGAN TOKEN BOT ANDA >>
            const CHAT_ID = 'YOUR_CHAT_ID_HERE'; // << GANTI DENGAN CHAT ID TUJUAN >>
            // Get current time
            const now = new Date();
            const submitTime = now.toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });
            // Create FormData
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('voice', audioBlob, 'voice_note.ogg');
            formData.append('caption', `*🎙️ NEW VOICE NOTE FROM RISAA JOURNEY WEBSITE!*
*👤 From:* ${name}
*🕒 Submitted at:* ${submitTime}`);
            formData.append('parse_mode', 'Markdown');
            try {
                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendVoice`, {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    // Show notification
                    const notification = document.getElementById('notification');
                    if (notification) {
                        notification.classList.add('show');
                        setTimeout(() => {
                            notification.classList.remove('show');
                        }, 3000);
                    }
                    // Reset form
                    const nameInput = document.getElementById('voice-name');
                    if (nameInput) nameInput.value = '';
                    audioChunks = [];
                    audioBlob = null;
                    if (audioBase64Input) audioBase64Input.value = '';
                    if (audioPlayer) audioPlayer.style.display = 'none';
                    recordBtn.disabled = false;
                    if (stopBtn) stopBtn.disabled = true;
                    if (playBtn) playBtn.disabled = true;
                    if (sendVoiceBtn) sendVoiceBtn.disabled = true;
                    // Reset label positions (if applicable)
                    document.querySelectorAll('.form-label').forEach(label => {
                        label.style.top = '20px';
                        label.style.fontSize = '1.2rem';
                    });
                } else {
                    console.error('Error sending voice note:', response.statusText);
                    alert('Failed to send your voice note. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    }
});
// ========== TEXT NOTE FORM SUBMISSION ==========
const form = document.getElementById('note-form');
const notification = document.getElementById('notification');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        // Validasi input
        if (!name || !message) {
            alert('Please fill in all fields.');
            return;
        }
        // Dapatkan waktu submit saat ini
        const now = new Date();
        // Format waktu: DD/MM/YYYY, HH:mm:ss (bisa disesuaikan)
        const submitTime = now.toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short' // Menambahkan zona waktu (misal: WIB)
        });
        // Token dan Chat ID Bot Telegram Anda
        const BOT_TOKEN = 'YOUR_TOKEN_HERE'; // << GANTI DENGAN TOKEN BOT ANDA >>
        const CHAT_ID = 'YOUR_CHAT_ID_HERE'; // << GANTI DENGAN CHAT ID TUJUAN >>
        // Format pesan yang akan dikirim ke Telegram, termasuk waktu submit
        const text = `*🌟 NEW MESSAGE FROM RISAA JOURNEY WEBSITE! 🌟*
*👤 From:* ${name}
*💌 Message:* ${message}
*🕒 Submitted at:* ${submitTime}`;
        // URL API Telegram
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        try {
            // Kirim pesan ke Telegram
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown' // Gunakan Markdown untuk format teks
                })
            });
            // Cek status respons
            if (response.ok) {
                // Tampilkan notifikasi sukses
                if (notification) {
                    notification.classList.add('show');
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 3000); // Notifikasi hilang setelah 3 detik
                }
                // Reset form setelah pengiriman berhasil
                form.reset();
                // Reset posisi label form (jika menggunakan floating labels)
                document.querySelectorAll('.form-label').forEach(label => {
                    label.style.top = '20px';
                    label.style.fontSize = '1.2rem';
                    // Reset warna dan style lain jika diperlukan
                });
            } else {
                // Tangani error dari API Telegram
                console.error('Error sending message:', response.statusText);
                alert('Failed to send your note. Please try again.'); // Tampilkan pesan error ke user
            }
        } catch (error) {
            // Tangani error jaringan atau error lainnya
            console.error('Error:', error);
            alert('An error occurred. Please check your connection and try again.'); // Tampilkan pesan error ke user
        }
    });
}
// Welcome Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('welcome-popup');
    const closeBtn = document.querySelector('.popup-close');
    const acceptBtn = document.getElementById('popup-accept');
    if (popup) {
        // Show popup immediately when page loads
        setTimeout(() => {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 1000);
        // Close popup functions
        function closePopup() {
            popup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        // Event listeners
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        if (acceptBtn) acceptBtn.addEventListener('click', closePopup);
        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('show')) {
                closePopup();
            }
        });
    }
});
// Fix form label positioning on page load
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        if (input && input.value) {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.style.top = '-35px';
                label.style.fontSize = '1rem';
                label.style.color = '#d46a8c';
                label.style.fontWeight = '600';
            }
        }
    });
});
// ========== PROTECTION SCRIPT ==========
// Menonaktifkan klik kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // Opsional: Tampilkan pesan peringatan
    // alert('Klik kanan dinonaktifkan di situs ini.');
});
// Menonaktifkan shortcut keyboard umum untuk inspeksi dan penyimpanan
document.addEventListener('keydown', function(e) {
    // Mencegah Ctrl+S (atau Cmd+S di Mac)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        // Opsional: Tampilkan pesan
        // alert('Penyimpanan halaman dinonaktifkan.');
        return false;
    }
    // Mencegah F12 (DevTools)
    if (e.key === 'F12') {
        e.preventDefault();
        // alert('Developer Tools dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+Shift+I (atau Cmd+Option+I di Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        // alert('Developer Tools dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+Shift+J (atau Cmd+Option+J di Mac) - Console
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        // alert('Console dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+U (atau Cmd+U di Mac) - Lihat sumber halaman
     if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        // alert('Melihat sumber halaman dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+P (atau Cmd+P di Mac) - Print
     if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        // alert('Fungsi print dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+A (atau Cmd+A di Mac) - Select All (bisa opsional)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        return false;
    }
    // Mencegah Ctrl+Shift+C (atau Cmd+Option+C di Mac) - Element Picker
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        // alert('Element picker dinonaktifkan.');
        return false;
    }
    // Mencegah Ctrl+K (atau Cmd+K di Mac) - Search Console (di beberapa browser)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        // alert('Search console dinonaktifkan.');
        return false;
    }
    // Mencegah Escape untuk keluar dari fullscreen atau popup tertentu (opsional)
    // if (e.key === 'Escape') {
    //     e.preventDefault();
    //     return false;
    // }
});
// Mencoba menonaktifkan drag dan drop gambar (sebagian besar browser mengabaikannya)
document.addEventListener('dragstart', function(e) {
  if (e.target && e.target.nodeName === 'IMG') {
      e.preventDefault();
  }
});

// ========== SECRET MAILBOX ==========
document.addEventListener('DOMContentLoaded', function() {
    const secretMailboxBtn = document.querySelector('a[href="#secret-mailbox"]'); // Tambahkan link di navbar jika diinginkan
    const secretMailboxPopup = document.getElementById('secret-mailbox-popup');
    const secretMailboxCloseBtns = document.querySelectorAll('.secret-mailbox-close');

    // Fungsi untuk membuka popup
    function openSecretMailbox() {
        if (secretMailboxPopup) {
            secretMailboxPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Fungsi untuk menutup popup
    function closeSecretMailbox() {
        if (secretMailboxPopup) {
            secretMailboxPopup.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Event listeners
    if (secretMailboxBtn) {
        secretMailboxBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSecretMailbox();
        });
    }

    secretMailboxCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeSecretMailbox);
    });

    if (secretMailboxPopup) {
        secretMailboxPopup.addEventListener('click', function(e) {
            if (e.target === secretMailboxPopup) {
                closeSecretMailbox();
            }
        });
    }
});

// ========== TIMELINE INTERAKTIF DINAMIS ==========
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const content = this.querySelector('.timeline-content p');
            if (content) {
                // Anda bisa menambahkan logika untuk menampilkan detail tambahan di sini
                // Misalnya, tambahkan atribut data-detail ke HTML dan tampilkan saat diklik
            }
        });
    });
});

// ========== SLIDESHOW MODE ==========
document.addEventListener('DOMContentLoaded', function() {
    const startSlideshowBtn = document.getElementById('start-slideshow');
    const slideshowModal = document.getElementById('slideshow-modal');
    const slideshowClose = document.querySelector('.slideshow-close');
    const slideshowMediaContainer = document.getElementById('slideshow-media-container');
    const slideshowCaption = document.querySelector('.slideshow-caption');
    const slideshowPrevBtn = document.getElementById('slideshow-prev');
    const slideshowNextBtn = document.getElementById('slideshow-next');
    const slideshowPlayPauseBtn = document.getElementById('slideshow-play-pause');
    const progressBar = document.querySelector('.slideshow-progress-bar');

    let slideshowInterval;
    let isPlaying = true;
    let currentIndex = 0;
    const SLIDESHOW_DURATION = 5000; // 5 detik per slide

    // Filter hanya foto/video tahun 2024 untuk slideshow
    const slideshowMedia = photoData.filter(item => item.year === 2024);

    function updateProgressBar(percentage) {
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }

    function showSlideshowMedia(index) {
        if (slideshowMedia.length === 0 || !slideshowMedia[index]) return;

        slideshowMediaContainer.innerHTML = '';
        const media = slideshowMedia[index];
        
        if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.url;
            video.controls = false; // Kontrol disembunyikan untuk slideshow
            video.autoplay = true;
            video.loop = true; // Loop video untuk slideshow
            video.className = 'slideshow-media';
            slideshowMediaContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = `Gallery photo from ${media.day} ${media.month} ${media.year}`;
            img.className = 'slideshow-media';
            slideshowMediaContainer.appendChild(img);
        }
        
        slideshowCaption.textContent = `Memory from ${media.day} ${media.month} ${media.year}`;
        currentIndex = index;
        updateProgressBar(0);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideshowMedia.length;
        showSlideshowMedia(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideshowMedia.length) % slideshowMedia.length;
        showSlideshowMedia(currentIndex);
    }

    function startSlideshow() {
        if (slideshowMedia.length === 0) {
            alert('No media available for slideshow.');
            return;
        }
        slideshowModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        showSlideshowMedia(currentIndex);
        
        if (isPlaying) {
            slideshowInterval = setInterval(() => {
                nextSlide();
                updateProgressBar(100);
            }, SLIDESHOW_DURATION);
            
            // Animate progress bar
            let start = null;
            const animateProgress = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min((progress / SLIDESHOW_DURATION) * 100, 100);
                updateProgressBar(percentage);
                if (percentage < 100 && isPlaying) {
                    requestAnimationFrame(animateProgress);
                }
            };
            requestAnimationFrame(animateProgress);
        }
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        updateProgressBar(0);
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        const icon = slideshowPlayPauseBtn.querySelector('i');
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            startSlideshow(); // Restart interval
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            stopSlideshow();
        }
    }

    if (startSlideshowBtn) startSlideshowBtn.addEventListener('click', startSlideshow);
    if (slideshowClose) slideshowClose.addEventListener('click', function() {
        slideshowModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        stopSlideshow();
    });
    if (slideshowModal) slideshowModal.addEventListener('click', function(e) {
        if (e.target === slideshowModal) {
            slideshowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            stopSlideshow();
        }
    });
    if (slideshowPrevBtn) slideshowPrevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        stopSlideshow();
        prevSlide();
        if (isPlaying) startSlideshow();
    });
    if (slideshowNextBtn) slideshowNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        stopSlideshow();
        nextSlide();
        if (isPlaying) startSlideshow();
    });
    if (slideshowPlayPauseBtn) slideshowPlayPauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlayPause();
    });
});

// Tambahkan link "Secret Mailbox" ke Navbar
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const newNavItem = document.createElement('li');
        newNavItem.className = 'nav-item';
        newNavItem.innerHTML = '<a href="#secret-mailbox" class="nav-link">Secret Mailbox</a>';
        // Masukkan sebelum "Notes"
        const notesItem = navMenu.querySelector('a[href="#notes"]').parentElement;
        navMenu.insertBefore(newNavItem, notesItem);
        
        // Tambahkan event listener untuk link baru
        newNavItem.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll ke section jika ada, atau buka popup
            // Karena ini popup, kita panggil fungsi openSecretMailbox
            const secretMailboxPopup = document.getElementById('secret-mailbox-popup');
            if (secretMailboxPopup) {
                secretMailboxPopup.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            // Tutup mobile menu jika aktif
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.querySelector('.nav-menu');
            if (mobileMenu && navMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});