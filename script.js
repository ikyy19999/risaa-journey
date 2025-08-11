// // Mobile Menu Toggle
// const mobileMenu = document.getElementById('mobile-menu');
// const navMenu = document.querySelector('.nav-menu');
// const navbar = document.querySelector('.navbar');
// mobileMenu.addEventListener('click', () => {
//     mobileMenu.classList.toggle('active');
//     navMenu.classList.toggle('active');
// });
// document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
//     mobileMenu.classList.remove('active');
//     navMenu.classList.remove('active');
// }));
// // Navbar scroll effect
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });
// // Timeline Animation
// const timelineItems = document.querySelectorAll('.timeline-item');
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('in-view');
//         }
//     });
// }, { threshold: 0.1 });
// timelineItems.forEach(item => {
//     observer.observe(item);
// });
// // Story Typewriter Effect
// const storyText = "We met by chance, laughed until our sides hurt, and fell in love in the most ordinary, extraordinary way. Every moment with you feels like a page from a fairy tale, written just for us. Through every season, every challenge, and every joy, our love has only grown stronger. You are my today, my tomorrow, and my forever.";
// const typedTextElement = document.getElementById('typed-text');
// let i = 0;
// function typeWriter() {
//     if (i < storyText.length) {
//         typedTextElement.innerHTML += storyText.charAt(i);
//         i++;
//         setTimeout(typeWriter, 20);
//     }
// }
// const storySectionObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             typeWriter();
//             storySectionObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });
// storySectionObserver.observe(document.getElementById('story'));
// // Gallery Calendar
// const calendarContainer = document.getElementById('calendar-container');
// const lightbox = document.getElementById('lightbox');
// const mediaContainer = document.getElementById('media-container');
// const lightboxCaption = document.querySelector('.lightbox-caption');
// const lightboxClose = document.querySelector('.lightbox-close');
// const prevBtn = document.getElementById('prev-btn');
// const nextBtn = document.getElementById('next-btn');
// const yearSelector = document.getElementById('year-selector');
// const todayBtn = document.getElementById('today-btn');
// const photoData = [
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 1.mp4',
//         type: 'video',
//     },
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 2.mp4',
//         type: 'video',
//     },
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 3.mp4',
//         type: 'video',
//     },
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 4.mp4',
//         type: 'video',
//     },
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 5.mp4',
//         type: 'video',
//     },
//     { 
//         year: 2024, 
//         month: 'August', 
//         day: 3, 
//         url: 'assets/first date 6.mp4',
//         type: 'video',
//     },
// ];
// function groupPhotosByDate(photos) {
//     const grouped = {};
//     photos.forEach(photo => {
//         const key = `${photo.year}-${photo.month}-${photo.day}`;
//         if (!grouped[key]) {
//             grouped[key] = [];
//         }
//         grouped[key].push(photo);
//     });
//     return grouped;
// }
// const groupedPhotoData = groupPhotosByDate(photoData);
// const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
// ];
// const today = new Date();
// const currentYear = today.getFullYear();
// const currentMonth = today.getMonth();
// const currentDay = today.getDate();
// function populateYearSelector() {
//     const earliestYear = Math.min(...photoData.map(photo => photo.year));
//     yearSelector.innerHTML = '<option value="">Select Year</option>';
//     for (let year = earliestYear; year <= currentYear; year++) {
//         const option = document.createElement('option');
//         option.value = year;
//         option.textContent = year;
//         if (year === currentYear) {
//             option.selected = true;
//         }
//         yearSelector.appendChild(option);
//     }
// }
// function renderCalendarForYear(selectedYear) {
//     calendarContainer.innerHTML = '';
//     if (!selectedYear) {
//         calendarContainer.innerHTML = '<div class="empty-state">Please select a year to view photos.</div>';
//         return;
//     }
//     const yearTitle = document.createElement('h2');
//     yearTitle.className = 'year-title';
//     yearTitle.textContent = selectedYear;
//     calendarContainer.appendChild(yearTitle);
//     const photosForYear = photoData.filter(photo => photo.year == selectedYear);
//     months.forEach((monthName, monthIndex) => {
//         const monthContainer = document.createElement('div');
//         monthContainer.className = 'month-container';
//         calendarContainer.appendChild(monthContainer);
//         const monthTitle = document.createElement('h3');
//         monthTitle.className = 'month-title';
//         monthTitle.textContent = monthName;
//         monthContainer.appendChild(monthTitle);
//         const grid = document.createElement('div');
//         grid.className = 'calendar-grid';
//         monthContainer.appendChild(grid);
//         const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
//         const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
//         dayHeaders.forEach(day => {
//             const dayHeader = document.createElement('div');
//             dayHeader.className = 'calendar-day header';
//             dayHeader.textContent = day;
//             grid.appendChild(dayHeader);
//         });
//         const firstDay = new Date(selectedYear, monthIndex, 1).getDay();
//         for (let i = 0; i < firstDay; i++) {
//             const emptyDay = document.createElement('div');
//             emptyDay.className = 'calendar-day';
//             grid.appendChild(emptyDay);
//         }
//         for (let day = 1; day <= daysInMonth; day++) {
//             const dayDiv = document.createElement('div');
//             dayDiv.className = 'calendar-day';
//             dayDiv.textContent = day;
//             if (selectedYear === currentYear && monthIndex === currentMonth && day === currentDay) {
//                 dayDiv.classList.add('today');
//             }
//             const specialEvents = {
//                 '2020-January-1': 'New Year',
//                 '2021-February-14': 'Valentine\'s Day',
//                 '2022-May-1': 'May Day',
//                 '2023-December-25': 'Christmas'
//             };
//             const eventKey = `${selectedYear}-${monthName}-${day}`;
//             if (specialEvents[eventKey]) {
//                 dayDiv.classList.add('event');
//                 dayDiv.title = specialEvents[eventKey];
//             }
//             const photoKey = `${selectedYear}-${monthName}-${day}`;
//             const photosForDay = groupedPhotoData[photoKey];
//             if (photosForDay && photosForDay.length > 0) {
//                 const matchingPhotos = photosForDay.filter(photo => photo.year == selectedYear);
//                 if (matchingPhotos.length > 0) {
//                     const hasVideo = matchingPhotos.some(p => p.type === 'video');
//                     const hasImage = matchingPhotos.some(p => p.type === 'image');
//                     if (hasVideo && hasImage) {
//                         dayDiv.classList.add('has-mixed');
//                     } else if (hasVideo) {
//                         dayDiv.classList.add('has-video');
//                     } else {
//                         dayDiv.classList.add('has-photo');
//                     }
//                     dayDiv.dataset.photoData = JSON.stringify(matchingPhotos);
//                     dayDiv.innerHTML = `${day}<span class="photo-count">${matchingPhotos.length}</span>`;
//                 }
//             }
//             grid.appendChild(dayDiv);
//         }
//         const photosForMonth = photosForYear.filter(photo => 
//             months.indexOf(photo.month) === monthIndex
//         );
//         if (photosForMonth.length === 0) {
//             const noPhotos = document.createElement('div');
//             noPhotos.className = 'no-photos';
//             noPhotos.textContent = 'No media for this month';
//             monthContainer.appendChild(noPhotos);
//         }
//         // Add visible class for animation
//         setTimeout(() => {
//             monthContainer.classList.add('visible');
//         }, monthIndex * 100);
//     });
// }
// populateYearSelector();
// renderCalendarForYear(currentYear);
// yearSelector.addEventListener('change', function() {
//     const selectedYear = this.value;
//     renderCalendarForYear(selectedYear);
// });
// todayBtn.addEventListener('click', function() {
//     yearSelector.value = currentYear;
//     renderCalendarForYear(currentYear);
// });
// let currentPhotos = [];
// let currentPhotoIndex = 0;
// function showPhotoInLightbox(index) {
//     if (currentPhotos.length > 0 && index >= 0 && index < currentPhotos.length) {
//         mediaContainer.innerHTML = ''; // Clear previous media
//         const media = currentPhotos[index];
//         if (media.type === 'video') {
//             const video = document.createElement('video');
//             video.src = media.url;
//             video.controls = true;
//             video.autoplay = true;
//             video.className = 'lightbox-video';
//             mediaContainer.appendChild(video);
//         } else {
//             const img = document.createElement('img');
//             img.src = media.url;
//             img.alt = media.caption || 'Gallery photo';
//             img.className = 'lightbox-img';
//             mediaContainer.appendChild(img);
//         }
//         lightboxCaption.textContent = media.caption || '';
//     }
// }
// calendarContainer.addEventListener('click', (e) => {
//     if (e.target.classList.contains('has-photo') || 
//         e.target.classList.contains('has-video') || 
//         e.target.classList.contains('has-mixed')) {
//         const photoDataArray = JSON.parse(e.target.dataset.photoData);
//         currentPhotos = photoDataArray;
//         currentPhotoIndex = 0;
//         showPhotoInLightbox(currentPhotoIndex);
//         lightbox.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     }
// });
// prevBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
//     showPhotoInLightbox(currentPhotoIndex);
// });
// nextBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
//     showPhotoInLightbox(currentPhotoIndex);
// });
// lightboxClose.addEventListener('click', () => {
//     lightbox.style.display = 'none';
//     document.body.style.overflow = 'auto';
// });
// lightbox.addEventListener('click', (e) => {
//     if (e.target === lightbox) {
//         lightbox.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     }
// });
// // Notes Form Submission
// const form = document.getElementById('note-form');
// const notification = document.getElementById('notification');
// form.addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const message = document.getElementById('message').value;
//     if (!name || !message) {
//         alert('Please fill in all fields.');
//         return;
//     }
//     const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
//     const CHAT_ID = 'YOUR_CHAT_ID_HERE';
//     const text = `*New Note*
// *From:* ${name}
// *Message:* ${message}`;
//     const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 chat_id: CHAT_ID,
//                 text: text,
//                 parse_mode: 'Markdown'
//             })
//         });
//         if (response.ok) {
//             notification.classList.add('show');
//             setTimeout(() => {
//                 notification.classList.remove('show');
//             }, 3000);
//             form.reset();
//             document.querySelectorAll('.form-label').forEach(label => {
//                 label.style.top = '20px';
//                 label.style.fontSize = '1.2rem';
//             });
//         } else {
//             console.error('Error sending message:', response.statusText);
//             alert('Failed to send your note. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again.');
//     }
// });
// // Welcome Popup Functionality
// document.addEventListener('DOMContentLoaded', function() {
//     const popup = document.getElementById('welcome-popup');
//     const closeBtn = document.querySelector('.popup-close');
//     const acceptBtn = document.getElementById('popup-accept');
//     // Show popup immediately when page loads
//     setTimeout(() => {
//         popup.classList.add('show');
//         document.body.style.overflow = 'hidden';
//     }, 1000);
//     // Close popup functions
//     function closePopup() {
//         popup.classList.remove('show');
//         document.body.style.overflow = 'auto';
//     }
//     // Event listeners
//     closeBtn.addEventListener('click', closePopup);
//     acceptBtn.addEventListener('click', closePopup);
//     // Close popup when clicking outside
//     popup.addEventListener('click', function(e) {
//         if (e.target === popup) {
//             closePopup();
//         }
//     });
//     // Close popup with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && popup.classList.contains('show')) {
//             closePopup();
//         }
//     });
// });
// // Fix form label positioning on page load
// document.addEventListener('DOMContentLoaded', function() {
//     const inputs = document.querySelectorAll('.form-input');
//     inputs.forEach(input => {
//         if (input.value) {
//             const label = input.nextElementSibling;
//             if (label && label.classList.contains('form-label')) {
//                 label.style.top = '-35px';
//                 label.style.fontSize = '1rem';
//                 label.style.color = '#d46a8c';
//                 label.style.fontWeight = '600';
//             }
//         }
//     });
// });

// // ========== PROTECTION SCRIPT ==========
// // Menonaktifkan klik kanan
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     // Opsional: Tampilkan pesan peringatan
//     // alert('Klik kanan dinonaktifkan di situs ini.');
// });

// // Menonaktifkan shortcut keyboard umum untuk inspeksi dan penyimpanan
// document.addEventListener('keydown', function(e) {
//     // Mencegah Ctrl+S (atau Cmd+S di Mac)
//     if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
//         e.preventDefault();
//         // Opsional: Tampilkan pesan
//         // alert('Penyimpanan halaman dinonaktifkan.');
//         return false;
//     }

//     // Mencegah F12 (DevTools)
//     if (e.key === 'F12') {
//         e.preventDefault();
//         // alert('Developer Tools dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+Shift+I (atau Cmd+Option+I di Mac)
//     if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
//         e.preventDefault();
//         // alert('Developer Tools dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+Shift+J (atau Cmd+Option+J di Mac) - Console
//     if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
//         e.preventDefault();
//         // alert('Console dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+U (atau Cmd+U di Mac) - Lihat sumber halaman
//      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
//         e.preventDefault();
//         // alert('Melihat sumber halaman dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+P (atau Cmd+P di Mac) - Print
//      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
//         e.preventDefault();
//         // alert('Fungsi print dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+A (atau Cmd+A di Mac) - Select All (bisa opsional)
//     if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
//         e.preventDefault();
//         return false;
//     }

//     // Mencegah Ctrl+Shift+C (atau Cmd+Option+C di Mac) - Element Picker
//     if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
//         e.preventDefault();
//         // alert('Element picker dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Ctrl+K (atau Cmd+K di Mac) - Search Console (di beberapa browser)
//     if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
//         e.preventDefault();
//         // alert('Search console dinonaktifkan.');
//         return false;
//     }

//     // Mencegah Escape untuk keluar dari fullscreen atau popup tertentu (opsional)
//     // if (e.key === 'Escape') {
//     //     e.preventDefault();
//     //     return false;
//     // }

// });

// // Mencoba menonaktifkan drag dan drop gambar (sebagian besar browser mengabaikannya)
// document.addEventListener('dragstart', function(e) {
//   if (e.target.nodeName === 'IMG') {
//       e.preventDefault();
//   }
// });