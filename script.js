function toggleFlip(cardElement, event) {
    if (event && event.target.closest('a')) {
        return;
    }
    cardElement.classList.toggle('flipped');
}

const ayatConfig = [
    { 
        time: 0, 
        arab: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", 
        latin: "A'ūżu billāhi minasy-syaiṭānir-rajīm", 
        terjemahan: "Aku berlindung kepada Allah dari godaan syaitan yang terkutuk" 
    },
    { 
        time: 8.70, 
        arab: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ", 
        latin: "Bismillāhir-raḥmānir-raḥīm", 
        terjemahan: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang" 
    },
    { 
        time: 23.72, 
        arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوْا إِلَيْهَا", 
        latin: "Wa min āyātihī an khalaqa lakum min anfusikum azwājal litaskunū ilaihā", 
        terjemahan: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya..." 
    },
    { 
        time: 55.82, 
        arab: "وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً", 
        latin: "Wa ja'ala bainakum mawaddataw wa raḥmah", 
        terjemahan: "...dan Dia menjadikan di antaramu rasa kasih dan sayang." 
    },
    { 
        time: 68.62, 
        arab: "إِنَّ فِيْ ذٰلِكَ لَآيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ", 
        latin: "Inna fī żālika la'āyātil liqaumiy yatafakkarūn", 
        terjemahan: "Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir." 
    },
    { 
        time: 85.62, 
        arab: "صَدَقَ اللهُ الْعَظِيْم", 
        latin: "Ṣadaqallāhul-'aẓīm", 
        terjemahan: "Maha benar Allah Yang Maha Agung" 
    }
];

let murottalState = 'PLAYING';
let isMusicPlaying = false;
let subtitleInterval = null;
let simulatedTime = 0;

const murottalAudio = document.getElementById('murottalAudio');
const bgMusicAudio = document.getElementById('bgMusicAudio');

function openInvitation() {
    const doorLeft = document.getElementById('coverDoorLeft');
    const doorRight = document.getElementById('coverDoorRight');
    const coverContent = document.getElementById('coverContent');
    const coverOverlay = document.getElementById('coverOverlay');

    coverContent.classList.add('opacity-0', 'scale-95');

    doorLeft.classList.add('-translate-x-full');
    doorRight.classList.add('translate-x-full');

    setTimeout(() => {
        coverOverlay.classList.add('hidden');
    }, 1000);

    document.getElementById('musicControls').classList.remove('hidden');
    document.getElementById('musicControls').classList.add('flex');

    startMurottal();
}

function startMurottal() {
    murottalState = 'PLAYING';
    bgMusicAudio.pause();
    isMusicPlaying = false;

    murottalAudio.currentTime = 0;
    const playPromise = murottalAudio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            syncSubtitlesWithAudio();
        }).catch(() => {
            syncSubtitlesSimulated();
        });
    }

    murottalAudio.onended = function() {
        onMurottalEnded();
    };

    updateAudioUI();
}

function onMurottalEnded() {
    murottalState = 'ENDED';
    bgMusicAudio.play().then(() => {
        isMusicPlaying = true;
        updateAudioUI();
    }).catch(e => console.log('BgMusic error:', e));
}

function toggleMurottal() {
    if (murottalState === 'PLAYING') {
        murottalAudio.pause();
        murottalState = 'PAUSED';
        bgMusicAudio.play().then(() => {
            isMusicPlaying = true;
            updateAudioUI();
        }).catch(e => console.log(e));
    } else if (murottalState === 'PAUSED') {
        bgMusicAudio.pause();
        isMusicPlaying = false;
        murottalAudio.play().then(() => {
            syncSubtitlesWithAudio();
        }).catch(() => {
            syncSubtitlesSimulated();
        });
        murottalState = 'PLAYING';
    } else if (murottalState === 'ENDED') {
        bgMusicAudio.pause();
        isMusicPlaying = false;
        murottalAudio.currentTime = 0;
        simulatedTime = 0;
        const fullEl = document.getElementById('fullTranslation');
        fullEl.classList.add('hidden', 'opacity-0');
        murottalAudio.play().then(() => {
            syncSubtitlesWithAudio();
        }).catch(() => {
            syncSubtitlesSimulated();
        });
        murottalState = 'PLAYING';
    }
    updateAudioUI();
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusicAudio.pause();
        isMusicPlaying = false;
        updateAudioUI();
    } else {
        if (murottalState === 'PLAYING') {
            murottalAudio.pause();
            murottalState = 'PAUSED';
        }
        bgMusicAudio.play().then(() => {
            isMusicPlaying = true;
            updateAudioUI();
        }).catch(e => console.log(e));
    }
}

function updateAudioUI() {
    const iconMurPause = document.getElementById('iconMurPause');
    const iconMurPlay = document.getElementById('iconMurPlay');
    const iconMurReplay = document.getElementById('iconMurReplay');
    const textMurStatus = document.getElementById('textMurStatus');

    iconMurPause.classList.add('hidden');
    iconMurPlay.classList.add('hidden');
    iconMurReplay.classList.add('hidden');

    if (murottalState === 'PLAYING') {
        iconMurPause.classList.remove('hidden');
        textMurStatus.innerText = 'Pause';
    } else if (murottalState === 'PAUSED') {
        iconMurPlay.classList.remove('hidden');
        textMurStatus.innerText = 'Putar';
    } else if (murottalState === 'ENDED') {
        iconMurReplay.classList.remove('hidden');
        textMurStatus.innerText = 'Ulangi';
    }

    const iconMusicOn = document.getElementById('iconMusicOn');
    const iconMusicOff = document.getElementById('iconMusicOff');
    const musicStatusText = document.getElementById('musicStatusText');

    if (isMusicPlaying) {
        iconMusicOn.classList.remove('hidden');
        iconMusicOff.classList.add('hidden');
        musicStatusText.innerText = 'Musik Latar';
    } else {
        iconMusicOn.classList.add('hidden');
        iconMusicOff.classList.remove('hidden');
        musicStatusText.innerText = 'Musik Di-pause';
    }
}

function renderInitialSubtitles() {
    const container = document.getElementById('subtitleContainer');
    container.innerHTML = ayatConfig.map((item, index) => `
        <div id="sub-item-${index}" class="transition-all duration-1000 opacity-0 transform translate-y-4 scale-95 space-y-2 pointer-events-none">
            ${item.arab ? `<p class="font-arabic text-2xl sm:text-3xl md:text-4xl text-slate-900 font-bold leading-relaxed tracking-wide [text-shadow:_0_2px_12px_rgba(255,255,255,0.9)]">${item.arab}</p>` : ''}
            <p class="font-serif italic text-sm sm:text-base text-gold-dark font-semibold [text-shadow:_0_1px_8px_rgba(255,255,255,0.8)]">${item.latin}</p>
            <p class="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto font-medium [text-shadow:_0_1px_6px_rgba(255,255,255,0.8)]">${item.terjemahan}</p>
        </div>
    `).join('');
}
renderInitialSubtitles();

function syncSubtitlesWithAudio() {
    if (subtitleInterval) clearInterval(subtitleInterval);
    subtitleInterval = setInterval(() => {
        const currentTime = murottalAudio.currentTime || simulatedTime;
        updateActiveSubtitle(currentTime);

        if (murottalAudio.paused && murottalState !== 'PLAYING') {
            clearInterval(subtitleInterval);
        }
    }, 250);
}

function syncSubtitlesSimulated() {
    if (subtitleInterval) clearInterval(subtitleInterval);
    simulatedTime = 0;
    subtitleInterval = setInterval(() => {
        simulatedTime += 0.5;
        updateActiveSubtitle(simulatedTime);
        if (simulatedTime > 90) {
            clearInterval(subtitleInterval);
            onMurottalEnded();
        }
    }, 500);
}

function updateActiveSubtitle(currentTime) {
    let activeIndex = -1;
    for (let i = 0; i < ayatConfig.length; i++) {
        if (currentTime >= ayatConfig[i].time) {
            activeIndex = i;
        }
    }

    ayatConfig.forEach((_, idx) => {
        const el = document.getElementById(`sub-item-${idx}`);
        if (!el) return;

        if (idx === activeIndex) {
            el.className = "transition-all duration-1000 opacity-100 transform translate-y-0 scale-100 space-y-2 py-2 border-l-2 border-gold pl-4 sm:pl-0 sm:border-l-0 pointer-events-auto";
        } else if (idx < activeIndex) {
            el.className = "transition-all duration-1000 opacity-40 transform translate-y-0 scale-95 space-y-1 pointer-events-auto";
        } else {
            el.className = "transition-all duration-1000 opacity-0 transform translate-y-4 scale-90 space-y-1 pointer-events-none";
        }
    });

    if (activeIndex === ayatConfig.length - 1) {
        const fullEl = document.getElementById('fullTranslation');
        fullEl.classList.remove('hidden');
        setTimeout(() => {
            fullEl.classList.add('opacity-100');
        }, 100);
    }
}

const weddingDate = new Date('2026-12-22T08:00:00+07:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('countdownContainer').classList.add('hidden');
        document.getElementById('passedMessage').classList.remove('hidden');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('cdDays').innerText = String(days).padStart(2, '0');
    document.getElementById('cdHours').innerText = String(hours).padStart(2, '0');
    document.getElementById('cdMins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('cdSecs').innerText = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function downloadICS(title, startISO, endISO, location, eventType) {
    const formatDate = (isoStr) => {
        const date = new Date(isoStr);
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SenjaNaila Wedding//ID
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:Pernikahan Senja & Naila - ${title}
DTSTART:${formatDate(startISO)}
DTEND:${formatDate(endISO)}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Jadwal berhasil diunduh ke kalender Anda!');
}

const BAD_WORDS = ['anjing', 'babi', 'kontol', 'memek', 'bangsat', 'bodoh', 'goblok', 'asu', 'bajingan'];

const INITIAL_DOA = [
    { nama: "Bpk. Ahmad Subagyo", doa: "Selamat untuk Senja & Naila. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Aamiin.", waktu: "2 jam lalu", color: "bg-blue-500" },
    { nama: "Dewi Lestari & Keluarga", doa: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat menempuh hidup baru!", waktu: "4 jam lalu", color: "bg-amber-500" },
    { nama: "Rizky & Friends", doa: "Selamat ya Senja! Akhirnya melabuhkan hati ke Naila. Semoga langgeng sampai kakek nenek!", waktu: "1 hari lalu", color: "bg-emerald-500" }
];

let doaItems = [];
let visibleCount = 5;

document.getElementById('namaInput').addEventListener('input', (e) => {
    document.getElementById('namaCharCount').innerText = e.target.value.length;
});
document.getElementById('doaInput').addEventListener('input', (e) => {
    document.getElementById('doaCharCount').innerText = e.target.value.length;
});

function loadDoa() {
    doaItems = [...INITIAL_DOA];
    renderDoaList();
}

function renderDoaList() {
    const listEl = document.getElementById('doaList');
    const totalBadge = document.getElementById('totalDoaBadge');
    const btnMore = document.getElementById('btnLihatLainnya');

    totalBadge.innerText = `${doaItems.length} Doa`;
    const itemsToRender = doaItems.slice(0, visibleCount);

    listEl.innerHTML = itemsToRender.map(item => `
        <div class="bg-white p-5 rounded-2xl border border-gold/15 shadow-sm space-y-2 transform hover:-translate-y-0.5 transition-all">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full ${item.color || 'bg-gold'} text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    ${escapeHTML(item.nama).charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 class="font-bold text-sm text-slate-800">${escapeHTML(item.nama)}</h4>
                    <p class="text-[10px] text-slate-400">${item.waktu}</p>
                </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12 font-serif italic">
                "${escapeHTML(item.doa)}"
            </p>
        </div>
    `).join('');

    if (doaItems.length > visibleCount) {
        btnMore.classList.remove('hidden');
    } else {
        btnMore.classList.add('hidden');
    }
}

function loadMoreDoa() {
    visibleCount += 5;
    renderDoaList();
}

function handleDoaSubmit(e) {
    e.preventDefault();

    const nama = document.getElementById('namaInput').value.trim();
    const doa = document.getElementById('doaInput').value.trim();

    if (!nama || !doa) {
        showToast('Mohon isi nama dan doa Anda.');
        return;
    }

    const combinedText = (nama + ' ' + doa).toLowerCase();
    const containsBadWord = BAD_WORDS.some(word => combinedText.includes(word));
    if (containsBadWord) {
        showToast('Mohon gunakan kata-kata yang santun dan baik.');
        return;
    }

    const colors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-gold'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newEntry = {
        nama: nama,
        doa: doa,
        waktu: "Baru saja",
        color: randomColor
    };

    doaItems.unshift(newEntry);

    document.getElementById('namaInput').value = '';
    document.getElementById('doaInput').value = '';
    document.getElementById('namaCharCount').innerText = '0';
    document.getElementById('doaCharCount').innerText = '0';

    renderDoaList();
    showToast('Terima kasih! Doa Anda berhasil terkirim 🤍');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    msgEl.innerText = msg;
    toast.classList.remove('-translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-20', 'opacity-0');
    }, 3500);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (murottalState === 'PLAYING') murottalAudio.pause();
        if (isMusicPlaying) bgMusicAudio.pause();
    } else {
        if (murottalState === 'PLAYING') murottalAudio.play().catch(() => {});
        if (isMusicPlaying) bgMusicAudio.play().catch(() => {});
    }
});

window.onload = function() {
    loadDoa();
};