// Typing Animation for Bio
const bioText = "Sebagai siswa di SMKS Teknologi Informatika Bulukumba, saya memiliki minat mendalam dalam bidang teknologi informasi, terutama networking, sistem operasi Linux, dan pemrograman. Dengan pengalaman praktis dalam konfigurasi jaringan wireless point-to-point dan setup server Linux, saya terus berusaha meningkatkan keterampilan saya melalui proyek-proyek inovatif. Saya percaya bahwa pembelajaran berkelanjutan adalah kunci untuk berkembang di dunia teknologi yang dinamis.";
const bioElement = document.getElementById('bio-text');
let index = 0;

function typeWriter() {
    if (index < bioText.length) {
        bioElement.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.skill-card, .hobby-card, .project-card, .music-players-section, .hero');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('reveal', 'active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00d4ff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d4ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Footer is now always visible at bottom

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Embed Error Handling
function handleEmbedError(iframe) {
    const placeholder = document.createElement('div');
    placeholder.className = 'spotify-placeholder';

    // Extract Spotify track URL from embed src
    const embedSrc = iframe.src;
    const trackUrl = embedSrc.replace('/embed/', '/');

    placeholder.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-music"></i>
            <p>Preview not available</p>
            <a href="${trackUrl}" target="_blank" class="spotify-btn">Open in Spotify</a>
        </div>
    `;

    iframe.parentNode.replaceChild(placeholder, iframe);
}

document.querySelectorAll('.spotify-playlist iframe').forEach(iframe => {
    iframe.addEventListener('error', () => handleEmbedError(iframe));
    iframe.addEventListener('load', () => {
        // Check if embed loaded successfully
        setTimeout(() => {
            if (iframe.contentWindow.length === 0) {
                handleEmbedError(iframe);
            }
        }, 3000);
    });
});

// Music Player Functionality
document.querySelectorAll('.music-player-card').forEach((card, index) => {
    const audio = card.querySelector('audio');
    const playPauseBtn = card.querySelector('.play-pause-btn');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    const progressBar = card.querySelector('.progress-bar');
    const progressFill = card.querySelector('.progress-fill');
    const currentTimeEl = card.querySelector('.current-time');
    const totalTimeEl = card.querySelector('.total-time');
    const albumDisc = card.querySelector('.album-disc');
    const songTitleEl = card.querySelector('.song-title');
    const albumCover = card.querySelector('.album-cover');

    // Set song title from alt attribute
    if (songTitleEl && albumCover) {
        songTitleEl.textContent = albumCover.alt;
    }

    let isPlaying = false;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                console.log(`Playing: ${songTitleEl.textContent}`);
            }).catch(error => {
                console.error(`Error playing ${songTitleEl.textContent}:`, error);
                alert(`Unable to play ${songTitleEl.textContent}. Check console for details.`);
            });
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            albumDisc.classList.add('playing');
            card.classList.add('playing');
        } else {
            audio.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            albumDisc.classList.remove('playing');
            card.classList.remove('playing');
        }
    });

    // Update progress bar and time
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // Set total time when metadata loads
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
        console.log(`Loaded metadata for ${songTitleEl.textContent}: duration ${audio.duration}`);
    });

    // Handle audio loading errors
    audio.addEventListener('error', (e) => {
        console.error(`Error loading audio for ${songTitleEl.textContent}:`, e);
        alert(`Failed to load ${songTitleEl.textContent}. Check console for details.`);
    });

    // Seek functionality
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        audio.currentTime = percentage * audio.duration;
    });

    // Volume controls
    const muteBtn = card.querySelector('.mute-btn');
    const volumeSlider = card.querySelector('.volume-slider');

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (audio.volume > 0) {
                audio.volume = 0;
                if (volumeSlider) volumeSlider.value = 0;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audio.volume = 1;
                if (volumeSlider) volumeSlider.value = 1;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
            if (muteBtn) {
                if (audio.volume == 0) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }
        });
    }

    // Stop when audio ends
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumDisc.classList.remove('playing');
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
});

// Format time helper function
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Initialize Functions
document.addEventListener('DOMContentLoaded', function() {
    if (bioElement) {
        typeWriter();
    }
    reveal();
    animateProgressBars();
    toggleFooter(); // Check footer visibility on load
});

window.addEventListener('scroll', function() {
    reveal();
    toggleFooter();
});
