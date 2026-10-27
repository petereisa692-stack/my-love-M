/* ==============================
   حكاية بيتر وحموكشتي ❤️
   Romantic Love Story Website
   JavaScript
   ============================== */

// ===== Configuration =====
// يمكنك تعديل الأسماء والتواريخ والرسائل بسهولة من هنا
const CONFIG = {
    names: {
        him: 'بيتر عيسى',
        himShort: 'بيتر',
        her: 'حموكشتي'
    },
    startDate: new Date(2022, 8, 29), // 29 September 2022 (months are 0-indexed)
    images: {
        // يمكنك تغيير أسماء الصور هنا
        photo1: 'images/photo1.jpg',
        photo2: 'images/photo2.jpg',
        photo3: 'images/photo3.jpg',
        photo4: 'images/photo4.jpg'
    },
    // يمكنك تغيير التعليقات على الصور هنا
    photoCaptions: [
        'ذكرى حلوة من أيامنا ❤️',
        'ضحكتك أحلى حاجة في الدنيا 😍',
        'لحظة مميزة مع بعض 💕',
        'من أجمل أوقاتنا سوا 🥰'
    ],
    // الخط الزمني - ذكريات وكلمات من القلب
    timeline: [
        {
            date: '',
            title: 'أول لقى وبداية الحكاية ❤️',
            text: 'اليوم اللي نظرة عينينا اتقابلت فيه، وحسيت من أول لحظة إنك مش شخص عادي وهتكوني كل حياتي.'
        },
        {
            date: '',
            title: 'أحلى ضحكة من القلب ✨',
            text: 'ضحكتك اللي بتنسيني الدنيا كلها وتخلي أي يوم صعب يمر ويبقى في قمة الجمال والأمان.'
        },
        {
            date: '',
            title: 'سند وأمان لبعض 💕',
            text: 'كل موقف وتفصيلة عدينا بيها بتثبتلي إننا بنقوى ببعض، وإن وجودك جنبي هو أكبر نعمة في عمري.'
        },
        {
            date: '',
            title: 'سنين حبنا ومكملين سوا 💍',
            text: 'كل خطوة وكل لحظة عشناها هي حجر أساس لبيتنا ومستقبلنا اللي بنبنيه سوا بحب وتفاهم.'
        }
    ],
    // بطاقات الحب - يمكنك إضافة أو تعديل البطاقات
    loveCards: [
        {
            emoji: '😊',
            front: 'ضحكتك وسحرك',
            back: 'ضحكتك بتنور دنيتي كلها، أول ما بتبتسمي بحس إن أي تعب بيهون وكل هم بيختفي في ثانية.'
        },
        {
            emoji: '💖',
            front: 'حنيتك واحتوائك',
            back: 'حنيتك وطيبة قلبك بتخليني أحس بالأمان، وإن الدنيا كلها ممكن تغيب ويفضل حضنك هو ملجأي الوحيد.'
        },
        {
            emoji: '✨',
            front: 'جمال روحك',
            back: 'روحك الصافية والجميلة اللي بتخلي أي مكان تدخليه مليان بهجة وفرح وحياة تدفي القلب.'
        },
        {
            emoji: '👑',
            front: 'قوتك وصبرك',
            back: 'فخور بيكي وبقوتك وبإصرارك، وبحب فيكي إنك دايمًا بتعافري وتفضلي واقفة زي الملكة.'
        },
        {
            emoji: '🧠',
            front: 'تفكيرك وعقلك',
            back: 'عقلك وتفهمك وطريقتك في الكلام بتخليني أعشق النقاش معاكي وأحبك كل يوم أكتر من اللي قبله.'
        },
        {
            emoji: '💍',
            front: 'إنك حبيبتي ونصي التاني',
            back: 'بحب إنك اختياري الأول والأخير، وإن ربنا رزقني بيكي عشان تكوني أجمل وأغلى حب في عمري.'
        }
    ]
};

// ===== State =====
let currentSection = 0;
let typingInterval = null;
let isTyping = false;
let slideshowInterval = null;
let currentSlide = 0;

// ===== Sections Order =====
const sections = [
    'welcome',
    'story-beginning',
    'gallery',
    'love-cards',
    'future',
    'love-letter',
    'surprises',
    'ending'
];

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createNavDots();
    buildGallery();
    buildLoveCards();
    setupEndingSlideshow();
    updateLoveCounter();
    setInterval(updateLoveCounter, 60000);
    showSection(0);

    // محاولة التشغيل التلقائي فور فتح الصفحة
    playMusic();

    // تشغيل الصوت فور أول لمسة أو نقرة في أي مكان على الشاشة إذا منع المتصفح التشغيل بدون لمس
    const enableAudioOnFirstTouch = () => {
        playMusic();
        document.removeEventListener('click', enableAudioOnFirstTouch);
        document.removeEventListener('touchstart', enableAudioOnFirstTouch);
        document.removeEventListener('keydown', enableAudioOnFirstTouch);
    };

    document.addEventListener('click', enableAudioOnFirstTouch, { once: true });
    document.addEventListener('touchstart', enableAudioOnFirstTouch, { once: true });
    document.addEventListener('keydown', enableAudioOnFirstTouch, { once: true });
});

// ===== Floating Hearts =====
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['❤️', '💕', '💗', '💖', '💓', '🤍', '💘'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 15 + 15) + 's';
        heart.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(heart);
    }
}

// ===== Navigation =====
function createNavDots() {
    const nav = document.querySelector('.nav-dots');
    sections.forEach((sectionId, index) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.setAttribute('aria-label', `القسم ${index + 1}`);
        dot.addEventListener('click', () => {
            if (index <= currentSection) {
                showSection(index);
            }
        });
        nav.appendChild(dot);
    });
}

function updateNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

function updateProgressBar() {
    const progress = ((currentSection) / (sections.length - 1)) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}

// ===== Section Management =====
function showSection(index) {
    if (index < 0 || index >= sections.length) return;

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active', 'fade-in');
    });

    // Show target section
    const target = document.getElementById(sections[index]);
    if (target) {
        target.classList.add('active');
        // Trigger reflow for animation
        void target.offsetWidth;
        target.classList.add('fade-in');
        currentSection = index;
        updateNavDots();
        updateProgressBar();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger timeline animations
        if (sections[index] === 'timeline') {
            setTimeout(animateTimeline, 300);
        }
    }
}

function nextSection() {
    showSection(currentSection + 1);
}

// ===== Start Journey =====
function startJourney() {
    // تشغيل الأغنية فوراً عند الضغط على أول زر للتفاعل
    playMusic();

    // Add sparkle effect on button click
    if (typeof event !== 'undefined') {
        createSparkles(event);
    }
    setTimeout(() => {
        nextSection();
    }, 300);
}

// ===== Gallery =====
function buildGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    const photos = [
        { src: CONFIG.images.photo1, caption: CONFIG.photoCaptions[0] },
        { src: CONFIG.images.photo2, caption: CONFIG.photoCaptions[1] },
        { src: CONFIG.images.photo3, caption: CONFIG.photoCaptions[2] },
        { src: CONFIG.images.photo4, caption: CONFIG.photoCaptions[3] }
    ];

    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.src}" alt="صورة ${index + 1}" loading="lazy">
            <div class="caption">${photo.caption}</div>
        `;
        item.addEventListener('click', () => openLightbox(photo.src, photo.caption));
        grid.appendChild(item);
    });
}

// ===== Lightbox =====
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-content');
    const cap = lightbox.querySelector('.lightbox-caption');

    img.src = src;
    cap.textContent = caption;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox') && e.target.classList.contains('show')) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== Timeline =====
function buildTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    CONFIG.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        const dateHtml = item.date ? `<span class="timeline-date">${item.date}</span>` : '';
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                ${dateHtml}
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-text">${item.text}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);
    });
}

// ===== Love Cards =====
function buildLoveCards() {
    const grid = document.querySelector('.cards-grid');
    if (!grid) return;

    CONFIG.loveCards.forEach((card) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'love-card';
        cardEl.innerHTML = `
            <span class="card-emoji">${card.emoji}</span>
            <div class="card-front">${card.front}</div>
            <div class="card-back">${card.back}</div>
        `;
        cardEl.addEventListener('click', () => {
            cardEl.classList.toggle('flipped');
        });
        grid.appendChild(cardEl);
    });
}

// ===== Love Letter Typing Effect =====
function startTypingLetter() {
    const letterTextEl = document.getElementById('letter-text');
    const cursor = document.querySelector('.letter-cursor');
    const skipBtn = document.getElementById('btn-skip-letter');

    if (isTyping || letterTextEl.dataset.completed === 'true') return;

    const fullText = letterTextEl.getAttribute('data-full-text');
    if (!fullText) return;

    isTyping = true;
    letterTextEl.textContent = '';
    if (cursor) cursor.style.display = 'inline-block';
    if (skipBtn) skipBtn.style.display = 'block';

    let charIndex = 0;
    const speed = 30; // milliseconds per character

    typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            letterTextEl.textContent += fullText.charAt(charIndex);
            charIndex++;
            // Auto scroll to bottom of letter
            letterTextEl.scrollTop = letterTextEl.scrollHeight;
        } else {
            clearInterval(typingInterval);
            isTyping = false;
            letterTextEl.dataset.completed = 'true';
            if (cursor) cursor.style.display = 'none';
            if (skipBtn) skipBtn.style.display = 'none';
        }
    }, speed);
}

function skipTyping() {
    const letterTextEl = document.getElementById('letter-text');
    const cursor = document.querySelector('.letter-cursor');
    const skipBtn = document.getElementById('btn-skip-letter');

    if (typingInterval) {
        clearInterval(typingInterval);
    }

    const fullText = letterTextEl.getAttribute('data-full-text');
    letterTextEl.textContent = fullText;
    letterTextEl.dataset.completed = 'true';
    isTyping = false;
    if (cursor) cursor.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
}

// ===== Surprises =====
function revealSurprise() {
    const hidden = document.querySelector('.surprise-hidden:not(.revealed)');
    if (hidden) {
        hidden.classList.add('revealed');
    }
}

function handleChoice(choiceNum) {
    const responseEl = document.getElementById('choice-response');
    const choicesContainer = document.querySelector('.choice-buttons');

    let responseText = '';
    if (choiceNum === 1) {
        responseText = `يا حموكشتي ❤️ كلمتك دي خلتني أسعد إنسان في الدنيا! أنا كمان كنت هختارك تاني وتالت ومليون مرة. حكايتنا دي أحلى حاجة حصلتلي في حياتي 💕`;
    } else {
        responseText = `يا حموكشتي 🥹 مستني أسمعها منك بنفسك! بس أنا عارف إن قلبك اللي اختارني من الأول هو نفسه اللي هيختارني تاني. بحبك يا أجمل حاجة في حياتي ❤️`;
    }

    if (responseEl) {
        responseEl.textContent = responseText;
        responseEl.style.display = 'block';
    }

    if (choicesContainer) {
        choicesContainer.style.display = 'none';
    }

    // Show final surprise after a moment
    setTimeout(() => {
        const finalSurprise = document.querySelector('.final-surprise');
        if (finalSurprise) {
            finalSurprise.style.display = 'block';
        }
    }, 2000);
}

// ===== Ending Slideshow =====
function setupEndingSlideshow() {
    const slides = document.querySelectorAll('.ending-slideshow img');
    if (slides.length === 0) return;

    slides[0].classList.add('slide-active');

    slideshowInterval = setInterval(() => {
        slides[currentSlide].classList.remove('slide-active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('slide-active');
    }, 3000);
}

// ===== Music Control =====
function playMusic() {
    const audio = document.getElementById('bg-music');
    const floatBtn = document.getElementById('floating-music-toggle');
    const endBtn = document.querySelector('.btn-music');
    if (!audio) return;

    audio.play().then(() => {
        if (floatBtn) {
            floatBtn.classList.add('playing');
            floatBtn.innerHTML = '🔊';
        }
        if (endBtn) {
            endBtn.textContent = '🎵 إيقاف الموسيقى';
            endBtn.classList.add('playing');
        }
    }).catch(err => {
        console.log('Autoplay restriction or audio play error:', err);
    });
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const floatBtn = document.getElementById('floating-music-toggle');
    const endBtn = document.querySelector('.btn-music');

    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            if (floatBtn) {
                floatBtn.classList.add('playing');
                floatBtn.innerHTML = '🔊';
            }
            if (endBtn) {
                endBtn.textContent = '🎵 إيقاف الموسيقى';
                endBtn.classList.add('playing');
            }
        }).catch(err => {
            console.log('Music play failed:', err);
        });
    } else {
        audio.pause();
        if (floatBtn) {
            floatBtn.classList.remove('playing');
            floatBtn.innerHTML = '🔇';
        }
        if (endBtn) {
            endBtn.textContent = '🎵 تشغيل الموسيقى';
            endBtn.classList.remove('playing');
        }
    }
}

// ===== Love Counter =====
function updateLoveCounter() {
    const now = new Date();
    const diff = now - CONFIG.startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    // Update counter elements if they exist
    const elements = {
        years: document.getElementById('counter-years'),
        months: document.getElementById('counter-months'),
        days: document.getElementById('counter-days'),
        hours: document.getElementById('counter-hours'),
        minutes: document.getElementById('counter-minutes')
    };

    if (elements.years) elements.years.textContent = years;
    if (elements.months) elements.months.textContent = months;
    if (elements.days) elements.days.textContent = remainingDays;
    if (elements.hours) elements.hours.textContent = hours;
    if (elements.minutes) elements.minutes.textContent = minutes;
}

// ===== Sparkle Effect =====
function createSparkles(event) {
    if (!event) return;
    const x = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
    const y = event.clientY || (event.touches && event.touches[0] ? event.touches[0].clientY : 0);

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
        sparkle.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
        sparkle.style.background = ['#ff6b9d', '#e84393', '#fd79a8', '#d4a574', '#fff'][Math.floor(Math.random() * 5)];
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ===== Ending Hearts =====
function createEndingHearts() {
    const container = document.querySelector('.ending-hearts');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💕', '💗', '🤍'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(heart);
    }
}

// Create ending hearts when page loads
document.addEventListener('DOMContentLoaded', createEndingHearts);

// ===== Show Letter Section with Typing =====
function goToLetter() {
    showSection(sections.indexOf('love-letter'));
    setTimeout(startTypingLetter, 500);
}

// ===== Helper: Go to specific section by name =====
function goTo(sectionName) {
    const index = sections.indexOf(sectionName);
    if (index !== -1) {
        showSection(index);
        if (sectionName === 'love-letter') {
            setTimeout(startTypingLetter, 500);
        }
    }
}
