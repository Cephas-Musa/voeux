// Variables globales
let currentSection = 0;
const sections = ['intro', 'cake', 'message'];
let candleBlownOut = false;
let musicPlaying = false;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
    setupCandleBlowing();
    setupMusicControl();
    animateIntroText();
});

// Création des particules flottantes
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles');
    const starsContainer = document.querySelector('.stars');
    
    // Créer des cœurs flottants
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animation = `floatHeart ${Math.random() * 10 + 8}s ease-in-out infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        particlesContainer.appendChild(heart);
    }
    
    // Créer des étoiles scintillantes
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'absolute';
        star.style.fontSize = Math.random() * 15 + 8 + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
    
    // Ajouter les animations CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
            25% { transform: translate(20px, -30px) rotate(90deg); opacity: 0.7; }
            50% { transform: translate(-10px, -60px) rotate(180deg); opacity: 1; }
            75% { transform: translate(-30px, -30px) rotate(270deg); opacity: 0.5; }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
}

// Animation du texte d'introduction
function animateIntroText() {
    const lines = document.querySelectorAll('.intro-title .line');
    lines.forEach((line, index) => {
        const text = line.textContent;
        line.innerHTML = '';
        
        [...text].forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.3s ease';
            span.style.transitionDelay = (index * 1.5 + charIndex * 0.05) + 's';
            line.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, (index * 1500 + charIndex * 50) + 500);
        });
    });
}

// Transition vers la section du gâteau
function showCakeSection() {
    document.getElementById('intro').style.transform = 'translateY(-100vh)';
    document.getElementById('intro').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('cake').classList.add('active');
        document.getElementById('cake').style.display = 'flex';
        
        // Animation d'entrée du gâteau
        setTimeout(() => {
            startCakeAnimation();
        }, 500);
    }, 1000);
}

// Animation de construction du gâteau
function startCakeAnimation() {
    const cakeTitle = document.querySelector('.cake-title');
    cakeTitle.style.animation = 'slideInUp 1s ease forwards';
    
    // Ajouter des confettis
    createConfetti();
}

// Création de confettis
function createConfetti() {
    const colors = ['#f8d7da', '#e6e6fa', '#f4e4bc', '#ffd700', '#d63384'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 3 + 2;
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

// Configuration du souffle de la bougie
function setupCandleBlowing() {
    const breathDetector = document.getElementById('breathDetector');
    const candle = document.getElementById('mainCandle');
    
    breathDetector.addEventListener('click', function() {
        if (!candleBlownOut) {
            blowCandle();
        }
    });
    
    // Détection du clic/tap sur mobile comme souffle
    breathDetector.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (!candleBlownOut) {
            blowCandle();
        }
    });
    
    // Animation du détecteur de souffle
    const breathAnimation = setInterval(() => {
        if (!candleBlownOut) {
            breathDetector.style.transform = 'scale(1.1)';
            setTimeout(() => {
                breathDetector.style.transform = 'scale(1)';
            }, 200);
        } else {
            clearInterval(breathAnimation);
        }
    }, 3000);
}

// Fonction pour souffler la bougie
function blowCandle() {
    const candle = document.getElementById('mainCandle');
    
    if (!candleBlownOut) {
        candle.classList.add('blown-out');
        candleBlownOut = true;
        
        // Effet de souffle
        createBreathEffect();
        
        // Son de souffle (simulation)
        playBlowSound();
        
        // Cacher le détecteur de souffle
        document.getElementById('breathDetector').style.opacity = '0';
        document.querySelector('.blow-instruction').textContent = 'Magnifique ! Ton vœu va se réaliser... ✨';
        
        setTimeout(() => {
            showMessageSection();
        }, 3000);
    }
}

// Effet visuel du souffle
function createBreathEffect() {
    const breathEffect = document.createElement('div');
    breathEffect.innerHTML = '💨';
    breathEffect.style.position = 'absolute';
    breathEffect.style.fontSize = '3rem';
    breathEffect.style.left = '50%';
    breathEffect.style.top = '50%';
    breathEffect.style.transform = 'translate(-50%, -50%)';
    breathEffect.style.zIndex = '1000';
    breathEffect.style.pointerEvents = 'none';
    
    document.querySelector('.cake-container').appendChild(breathEffect);
    
    breathEffect.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
        { transform: 'translate(-50%, -80%) scale(2)', opacity: 1 },
        { transform: 'translate(-50%, -120%) scale(3)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => breathEffect.remove();
}

// Simulation du son de souffle
function playBlowSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio context not available');
    }
}

// Transition vers la section du message
function showMessageSection() {
    // Créer un effet magique
    createMagicalTransition();
    
    setTimeout(() => {
        document.getElementById('cake').style.transform = 'translateY(-100vh)';
        document.getElementById('cake').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('cake').style.display = 'none';
            document.getElementById('message').classList.add('active');
            document.getElementById('message').style.display = 'flex';
            
            // Démarrer l'animation du message
            animateMessage();
        }, 1000);
    }, 1000);
}

// Effet de transition magique
function createMagicalTransition() {
    const sparkles = ['✨', '🌟', '💫', '⭐', '🌠'];
    
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = Math.random() * 30 + 15 + 'px';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.zIndex = '1000';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { 
                transform: 'scale(0) rotate(0deg)', 
                opacity: 0 
            },
            { 
                transform: 'scale(1.5) rotate(180deg)', 
                opacity: 1,
                offset: 0.5
            },
            { 
                transform: 'scale(0) rotate(360deg)', 
                opacity: 0 
            }
        ], {
            duration: 2000,
            easing: 'ease-in-out'
        }).onfinish = () => sparkle.remove();
    }
}

// Animation du message d'amour
function animateMessage() {
    const messageLines = document.querySelectorAll('.message-line');
    
    messageLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            // Effet de brillance sur certains mots
            highlightSpecialWords(line);
        }, index * 800);
    });
}

// Mettre en évidence des mots spéciaux
function highlightSpecialWords(element) {
    const specialWords = ['Eulali', 'amour', 'cœur', 'magique', 'étoile', 'précieuse'];
    let html = element.innerHTML;
    
    specialWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        html = html.replace(regex, `<span style="color: var(--rose-fonce); font-weight: bold; text-shadow: 0 0 10px var(--rose-fonce);">${word}</span>`);
    });
    
    element.innerHTML = html;
}

// Configuration du contrôle musical
function setupMusicControl() {
    const musicBtn = document.getElementById('musicBtn');
    
    musicBtn.addEventListener('click', function() {
        if (!musicPlaying) {
            // Créer une mélodie synthétique douce
            playRomanticMelody();
            musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Musique en cours...</span>';
            musicPlaying = true;
        } else {
            stopMusic();
            musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Écouter notre chanson</span>';
            musicPlaying = false;
        }
    });
}

// Créer une mélodie romantique synthétique
function playRomanticMelody() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // Do, Ré, Mi, Fa, Sol, La, Si
        const melody = [0, 2, 4, 2, 0, 4, 2, 0]; // Mélodie simple
        
        let noteIndex = 0;
        
        const playNote = () => {
            if (!musicPlaying) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = notes[melody[noteIndex % melody.length]];
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            
            noteIndex++;
            
            if (musicPlaying) {
                setTimeout(playNote, 1000);
            }
        };
        
        playNote();
    } catch (error) {
        console.log('Audio context not available');
    }
}

// Arrêter la musique
function stopMusic() {
    musicPlaying = false;
}

// Gestion du scroll pour les animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('active');
        }
    });
});

// Animation continue du fond
function animateBackground() {
    const body = document.body;
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        body.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
}

// Démarrer l'animation du fond après un délai
setTimeout(animateBackground, 5000);