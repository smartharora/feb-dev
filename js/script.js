        // ===================================
        // CHAPTER NAVIGATION
        // ===================================
        let currentChapter = 0;

        function goToChapter(chapterNum) {
            const currentEl = document.getElementById(`chapter-${currentChapter}`);
            const nextEl = document.getElementById(`chapter-${chapterNum}`);

            if (currentEl) {
                currentEl.classList.add('exiting');
                setTimeout(() => {
                    currentEl.classList.remove('active', 'exiting');
                }, 400);
            }

            setTimeout(() => {
                if (nextEl) {
                    nextEl.classList.add('active');
                    currentChapter = chapterNum;
                }
            }, 200);
        }

        // ===================================
        // GATE & VALENTINE COUNTDOWN
        // ===================================
        let countdownInterval = null;

        function showGate() {
            const opening = document.getElementById('opening-content');
            const gate = document.getElementById('gate-content');
            opening.style.display = 'none';
            gate.classList.add('active');

            // Check if Valentine's Day has arrived
            const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
            if (Date.now() >= valentinesDay) {
                unlockGate();
            } else {
                startCountdown();
            }
        }

        function unlockGate() {
            const btn = document.getElementById('gate-continue');
            if (btn) btn.classList.add('unlocked');
            const countdown = document.getElementById('countdown');
            if (countdown) countdown.style.display = 'none';
            const gateContent = document.getElementById('gate-content');
            const h2 = gateContent.querySelector('h2');
            const p = gateContent.querySelector('p');
            if (h2) h2.textContent = "It's time.";
            if (p) p.textContent = "Are you ready?";
            stopCountdown();
        }

        function startCountdown() {
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }

        function updateCountdown() {
            const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();
            const now = new Date().getTime();
            const diff = valentinesDay - now;

            if (diff <= 0) {
                unlockGate();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = hours;
            document.getElementById('countdown-minutes').textContent = minutes;
            document.getElementById('countdown-seconds').textContent = seconds;
        }

        function stopCountdown() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }

        // Secret bypass: press "s" three times to unlock
        let bypassKeys = [];
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 's') {
                bypassKeys.push(Date.now());
                // Keep only presses within last 2 seconds
                bypassKeys = bypassKeys.filter(t => Date.now() - t < 2000);
                if (bypassKeys.length >= 3) {
                    bypassKeys = [];
                    unlockGate();
                }
            }
        });

        // ===================================
        // CHAPTER 1: QUIZ LOGIC
        // ===================================

        /* PERSONALIZE: Replace these with your own personal questions
           Each question should have:
           - question: The question text
           - options: Array of 3-4 answer options
           - correctIndex: Index of the correct answer (0-based)
        */
        const quizQuestions = [
            {
                question: "What's my favorite thing about spending time with you?",
                options: [
                    "When we laugh together",
                    "When we argue",
                    "When we're silent",
                    "When we're apart"
                ],
                correctIndex: 0  // PERSONALIZE: Set the correct answer index
            },
            {
                question: "What was the first thing I noticed about you?",
                options: [
                    "Your shoes",
                    "Your smile",
                    "Your hair",
                    "Your phone"
                ],
                correctIndex: 1  // PERSONALIZE: Set the correct answer index
            },
            {
                question: "What's our special place?",
                options: [
                    "The park",
                    "The coffee shop",
                    "The library",
                    "The mall"
                ],
                correctIndex: 1  // PERSONALIZE: Set the correct answer index
            }
        ];

        let currentQuizIndex = 0;
        let quizLocked = false;

        function renderQuiz() {
            const question = quizQuestions[currentQuizIndex];
            document.getElementById('quiz-question').textContent = question.question;
            document.getElementById('quiz-current').textContent = currentQuizIndex + 1;
            document.getElementById('quiz-total').textContent = quizQuestions.length;

            const optionsContainer = document.getElementById('quiz-options');
            optionsContainer.innerHTML = '';

            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'quiz-option';
                button.textContent = option;
                button.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(button);
            });

            quizLocked = false;
        }

        function selectAnswer(selectedIndex) {
            if (quizLocked) return;
            quizLocked = true;

            const question = quizQuestions[currentQuizIndex];
            const options = document.querySelectorAll('.quiz-option');
            const selectedOption = options[selectedIndex];

            if (selectedIndex === question.correctIndex) {
                // Correct answer
                selectedOption.classList.add('correct');

                setTimeout(() => {
                    if (currentQuizIndex < quizQuestions.length - 1) {
                        // Next question
                        currentQuizIndex++;
                        renderQuiz();
                    } else {
                        // Quiz complete! Move to next chapter
                        setTimeout(() => {
                            goToChapter(2);
                        }, 500);
                    }
                }, 1000);
            } else {
                // Wrong answer - show "bye bye" screen
                selectedOption.classList.add('wrong');

                setTimeout(() => {
                    document.getElementById('quiz-container').style.display = 'none';
                    document.getElementById('wrong-screen').classList.add('active');
                }, 800);
            }
        }

        function initQuiz() {
            renderQuiz();
        }

        // ===================================
        // CHAPTER 2: TEXT INPUT QUESTION LOGIC
        // ===================================

        /* PERSONALIZE: Set the correct answer here */
        const TEXT_ANSWER = "pizza"; // The correct answer (case-insensitive)

        function checkTextAnswer() {
            const input = document.getElementById('text-answer-input');
            const feedback = document.getElementById('text-feedback');
            const submitBtn = document.getElementById('text-submit-btn');
            const userAnswer = input.value.trim().toLowerCase();

            if (!userAnswer) {
                feedback.textContent = "Please type an answer!";
                feedback.className = 'text-feedback wrong';
                return;
            }

            if (userAnswer === TEXT_ANSWER.toLowerCase()) {
                // Correct!
                feedback.textContent = "That's right! 🎉";
                feedback.className = 'text-feedback correct';
                input.disabled = true;
                submitBtn.disabled = true;

                setTimeout(() => {
                    goToChapter(3);
                }, 1500);
            } else {
                // Wrong answer
                feedback.textContent = "Hmm, not quite... Try again! 💭";
                feedback.className = 'text-feedback wrong';
                input.value = '';
                input.focus();
            }
        }

        // Allow Enter key to submit
        document.addEventListener('DOMContentLoaded', () => {
            const input = document.getElementById('text-answer-input');
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        checkTextAnswer();
                    }
                });
            }
        });

        // ===================================
        // CHAPTER 3: TIMELINE DATA & LOGIC
        // ===================================

        /* PERSONALIZE: Replace this array with your actual memories
           Each moment should have:
           - title: Short moment name (e.g., "First Coffee")
           - memory: One-sentence description of what happened
           - reflection: One-sentence emotional note about that moment
        */
        const timelineMoments = [
            {
                title: "The Pink Dress",
                memory: "I saw you on the stairs of your home in Texas, and believe me, I was already in love with the pink dress that you wore and you.",
                reflection: "It felt like it was made to be."
            },
            {
                title: "Pizza & Everywhere",
                memory: "We spent time in pizza shops and in clubs and on mountaintops.",
                reflection: "Everywhere that I was with you, I had the best time."
            },
            {
                title: "The Flights",
                memory: "I flew to Mississippi and you flew to California.",
                reflection: "And then we flew into each other's hearts."
            },
            {
                title: "What Defines Us",
                memory: "We had our ups and downs, but I guess that is what defines us.",
                reflection: "I love you more than anything that I've ever loved."
            },
            {
                title: "Forever",
                memory: "I miss you even if I just saw you. I can't think of anything until I think if Janvi would like it.",
                reflection: "I can't wait to make you my forever."
            }
        ];

        let currentMoment = 0;

        function renderMoment() {
            const moment = timelineMoments[currentMoment];
            document.getElementById('timeline-title').textContent = moment.title;
            document.getElementById('timeline-memory').textContent = moment.memory;
            document.getElementById('timeline-reflection').textContent = moment.reflection;
            document.getElementById('timeline-current').textContent = currentMoment + 1;
            document.getElementById('timeline-total').textContent = timelineMoments.length;

            // Update navigation buttons
            document.getElementById('btn-prev').disabled = currentMoment === 0;
            document.getElementById('btn-next').textContent =
                currentMoment === timelineMoments.length - 1 ? 'Continue' : 'Next';

            // Update dots
            const dots = document.querySelectorAll('.timeline-dots .dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentMoment);
            });
        }

        function nextMoment() {
            if (currentMoment < timelineMoments.length - 1) {
                currentMoment++;
                renderMoment();
            } else {
                goToChapter(4);
            }
        }

        function previousMoment() {
            if (currentMoment > 0) {
                currentMoment--;
                renderMoment();
            }
        }

        function initTimeline() {
            // Create dots
            const dotsContainer = document.getElementById('timeline-dots');
            timelineMoments.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });

            renderMoment();
        }

        // ===================================
        // CHAPTER 4: MEMORY MATCH GAME
        // ===================================

        /* PERSONALIZE: Replace these emoji pairs with your own memories */
        const matchPairs = [
            { emoji: '🍕', label: 'Pizza' },
            { emoji: '✈️', label: 'Flights' },
            { emoji: '💃', label: 'Dancing' },
            { emoji: '☕', label: 'Coffee' }
        ];

        let matchCards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let matchLocked = false;

        function initMatchGame() {
            const grid = document.getElementById('match-grid');
            if (!grid) return;

            matchCards = [...matchPairs, ...matchPairs]
                .map((item, index) => ({ ...item, id: index }))
                .sort(() => Math.random() - 0.5);

            grid.innerHTML = '';
            flippedCards = [];
            matchedPairs = 0;
            matchLocked = false;

            matchCards.forEach((card, index) => {
                const el = document.createElement('div');
                el.className = 'match-card';
                el.dataset.index = index;
                el.innerHTML = `
                    <div class="match-card-inner">
                        <div class="match-card-front">?</div>
                        <div class="match-card-back">${card.emoji}</div>
                    </div>
                `;
                el.onclick = () => flipMatchCard(index);
                grid.appendChild(el);
            });

            document.getElementById('match-status').textContent = '';
        }

        function flipMatchCard(index) {
            if (matchLocked) return;

            const cardEl = document.querySelectorAll('.match-card')[index];
            if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

            cardEl.classList.add('flipped');
            flippedCards.push(index);

            if (flippedCards.length === 2) {
                matchLocked = true;
                const [first, second] = flippedCards;

                if (matchCards[first].emoji === matchCards[second].emoji) {
                    const cards = document.querySelectorAll('.match-card');
                    cards[first].classList.add('matched');
                    cards[second].classList.add('matched');
                    matchedPairs++;
                    flippedCards = [];
                    matchLocked = false;

                    if (matchedPairs === matchPairs.length) {
                        document.getElementById('match-status').textContent = 'You matched them all!';
                        setTimeout(() => goToChapter(5), 1500);
                    }
                } else {
                    setTimeout(() => {
                        const cards = document.querySelectorAll('.match-card');
                        cards[first].classList.remove('flipped');
                        cards[second].classList.remove('flipped');
                        flippedCards = [];
                        matchLocked = false;
                    }, 1000);
                }
            }
        }

        // ===================================
        // CHAPTER 5: REASONS DATA & LOGIC
        // ===================================

        /* PERSONALIZE: Replace this array with your actual reasons
           Keep it to 7-10 reasons maximum
           Write these in YOUR voice, not poetic language
           Optional: Add image URL for each reason (or leave as null)
        */
        const reasons = [
            {
                text: "You love taking care of other people.",
                image: null  // PERSONALIZE: Add image URL here if desired, e.g., "path/to/photo.jpg"
            },
            {
                text: "I love you more than anything that I've ever loved.",
                image: null
            },
            {
                text: "I miss you even if I just saw you.",
                image: null
            },
            {
                text: "I can't think of anything until I think if Janvi would like it or not.",
                image: null
            },
            {
                text: "First thing in the morning I wake up and I think of texting my baby.",
                image: null
            },
            {
                text: "We had our ups and downs, but that's what defines us.",
                image: null
            },
            {
                text: "Everywhere that I was with you, I had the best time.",
                image: null
            }
        ];

        let currentReason = 0;
        const viewedReasons = new Set();

        function initReasons() {
            const track = document.getElementById('reasons-track');
            const dotsContainer = document.getElementById('reasons-dots');
            track.innerHTML = '';
            dotsContainer.innerHTML = '';

            reasons.forEach((reason, index) => {
                // Create card
                const card = document.createElement('div');
                card.className = 'reason-card';
                card.innerHTML = `
                    <div class="reason-card-inner">
                        <div class="reason-card-front">
                            <div class="reason-number">Reason ${index + 1}</div>
                            <div class="reason-placeholder">Tap to reveal</div>
                        </div>
                        <div class="reason-card-back">
                            ${reason.image ? `<img src="${reason.image}" class="reason-image" alt="Memory ${index + 1}">` : ''}
                            <div class="reason-text">${reason.text}</div>
                        </div>
                    </div>
                `;
                card.onclick = () => revealReason(index);
                track.appendChild(card);

                // Create dot
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });

            document.getElementById('reasons-total').textContent = reasons.length;
            updateReasonsNavigation();
        }

        function updateReasonsNavigation() {
            const track = document.getElementById('reasons-track');
            track.style.transform = `translateX(-${currentReason * 100}%)`;

            document.getElementById('reasons-current').textContent = currentReason + 1;
            document.getElementById('btn-reason-prev').disabled = currentReason === 0;
            document.getElementById('btn-reason-next').disabled = currentReason === reasons.length - 1;

            // Update dots
            const dots = document.querySelectorAll('.reasons-dots .dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentReason);
                dot.classList.toggle('viewed', viewedReasons.has(index));
            });

            // Check if all reasons have been viewed
            if (viewedReasons.size === reasons.length) {
                document.getElementById('reasons-continue').classList.add('enabled');
            }
        }

        function nextReason() {
            if (currentReason < reasons.length - 1) {
                currentReason++;
                updateReasonsNavigation();
            }
        }

        function previousReason() {
            if (currentReason > 0) {
                currentReason--;
                updateReasonsNavigation();
            }
        }

        function revealReason(index) {
            const cards = document.querySelectorAll('.reason-card');
            const card = cards[index];

            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                viewedReasons.add(index);
                updateReasonsNavigation();
            }
        }

        // ===================================
        // CHAPTER 6: LOVE LETTER
        // ===================================
        let envelopeOpened = false;

        function openEnvelope() {
            if (envelopeOpened) return;
            envelopeOpened = true;

            const envelope = document.getElementById('envelope');
            const letter = document.getElementById('letter');

            envelope.classList.add('opened');

            setTimeout(() => {
                letter.classList.add('visible');
            }, 600);

            setTimeout(() => {
                const btn = document.getElementById('letter-continue-btn');
                if (btn) btn.classList.add('visible');
            }, 2600);
        }

        // ===================================
        // CHAPTER 7: YES/NO LOGIC
        // ===================================
        let yesScale = 1;
        let noButtonInitialized = false;
        const DETECTION_THRESHOLD = 150; // pixels
        const ESCAPE_DISTANCE = 200; // pixels
        const EDGE_MARGIN = 20; // margin from viewport edges

        function initNoButton() {
            if (noButtonInitialized) return;

            const yesBtn = document.getElementById('btn-yes');
            const noBtn = document.getElementById('btn-no');

            // Wait for layout
            requestAnimationFrame(() => {
                // Position No button to the right of center in viewport
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const initialLeft = (viewportWidth / 2) + 120;
                const initialTop = (viewportHeight / 2) - 28; // Half button height

                noBtn.style.left = initialLeft + 'px';
                noBtn.style.top = initialTop + 'px';
                noBtn.style.transform = 'none';

                noButtonInitialized = true;
            });

            // Add pointer event listeners to document for full coverage
            const handlePointerMove = (e) => {
                const noBtn = document.getElementById('btn-no');
                const yesBtn = document.getElementById('btn-yes');
                if (!noBtn || !yesBtn) return;

                const noRect = noBtn.getBoundingClientRect();

                // Get pointer position
                const pointerX = e.clientX || (e.touches && e.touches[0].clientX);
                const pointerY = e.clientY || (e.touches && e.touches[0].clientY);

                if (!pointerX || !pointerY) return;

                // Calculate No button center
                const noCenterX = noRect.left + noRect.width / 2;
                const noCenterY = noRect.top + noRect.height / 2;

                // Calculate distance from pointer to No button center
                const deltaX = noCenterX - pointerX;
                const deltaY = noCenterY - pointerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // If pointer is too close, move No button away
                if (distance < DETECTION_THRESHOLD) {
                    // Normalize direction vector
                    const dirX = deltaX / distance;
                    const dirY = deltaY / distance;

                    // Calculate new position (move away from pointer)
                    const currentLeft = parseFloat(noBtn.style.left) || 0;
                    const currentTop = parseFloat(noBtn.style.top) || 0;

                    let newLeft = currentLeft + (dirX * ESCAPE_DISTANCE);
                    let newTop = currentTop + (dirY * ESCAPE_DISTANCE);

                    // Clamp within viewport bounds with margin
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const maxLeft = viewportWidth - noRect.width - EDGE_MARGIN;
                    const maxTop = viewportHeight - noRect.height - EDGE_MARGIN;

                    newLeft = Math.max(EDGE_MARGIN, Math.min(newLeft, maxLeft));
                    newTop = Math.max(EDGE_MARGIN, Math.min(newTop, maxTop));

                    // Apply new position
                    noBtn.style.left = newLeft + 'px';
                    noBtn.style.top = newTop + 'px';

                    // Grow Yes button
                    yesScale = Math.min(yesScale + 0.08, 2.0);
                    yesBtn.style.transform = `scale(${yesScale})`;
                }
            };

            // Mouse events on document
            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('mousemove', handlePointerMove);

            // Touch events (fallback)
            document.addEventListener('touchmove', handlePointerMove, { passive: true });

            // Prevent No button click
            noBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        function handleYes() {
            // Hide hint
            const hint = document.getElementById('ask-hint');
            if (hint) hint.classList.add('hidden');

            // Trigger confetti
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FFB6C1', '#FFC8DD', '#FF85A2']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FFB6C1', '#FFC8DD', '#FF85A2']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            setTimeout(() => {
                goToChapter(8);
            }, 1500);
        }

        // Initialize No button when Chapter 7 becomes active
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'chapter-7' && mutation.target.classList.contains('active')) {
                    setTimeout(initNoButton, 100);
                }
            });
        });

        window.addEventListener('DOMContentLoaded', () => {
            const chapter7 = document.getElementById('chapter-7');
            if (chapter7) {
                observer.observe(chapter7, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        });

        // ===================================
        // CHAPTER 8: SPIN THE WHEEL
        // ===================================

        /* PERSONALIZE: Replace these with your own date night ideas */
        const wheelSegments = [
            { label: 'Movie Night', color: '#FFB6C1' },
            { label: 'Cook Together', color: '#FFC8DD' },
            { label: 'Stargazing', color: '#FF85A2' },
            { label: 'Picnic', color: '#FFE5EC' },
            { label: 'Dance Night', color: '#FFB6C1' },
            { label: 'Road Trip', color: '#FFC8DD' }
        ];

        let wheelSpinning = false;
        let currentWheelAngle = 0;

        function drawWheel() {
            const canvas = document.getElementById('wheel-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.width / 2 - 5;
            const segmentAngle = (2 * Math.PI) / wheelSegments.length;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(currentWheelAngle);

            wheelSegments.forEach((seg, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = startAngle + segmentAngle;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = seg.color;
                ctx.fill();
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.save();
                ctx.rotate(startAngle + segmentAngle / 2);
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#4A4A4A';
                ctx.font = '600 13px -apple-system, BlinkMacSystemFont, sans-serif';
                ctx.fillText(seg.label, radius - 15, 0);
                ctx.restore();
            });

            ctx.restore();

            // Center circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = '#FF85A2';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        function spinWheel() {
            if (wheelSpinning) return;
            wheelSpinning = true;

            const spinBtn = document.getElementById('wheel-spin-btn');
            spinBtn.disabled = true;
            document.getElementById('wheel-result').textContent = '';

            const totalRotation = (3 + Math.random() * 3) * 2 * Math.PI;
            const targetAngle = currentWheelAngle + totalRotation;
            const duration = 4000;
            const startTime = performance.now();
            const startAngle = currentWheelAngle;

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function animateSpin(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);

                currentWheelAngle = startAngle + totalRotation * easedProgress;
                drawWheel();

                if (progress < 1) {
                    requestAnimationFrame(animateSpin);
                } else {
                    wheelSpinning = false;
                    spinBtn.disabled = false;
                    spinBtn.textContent = 'Spin Again';

                    // Determine which segment is under the pointer (top)
                    const segmentAngle = (2 * Math.PI) / wheelSegments.length;
                    let normalizedAngle = currentWheelAngle % (2 * Math.PI);
                    if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
                    let pointerAngle = (2 * Math.PI - normalizedAngle + 3 * Math.PI / 2) % (2 * Math.PI);
                    let segmentIndex = Math.floor(pointerAngle / segmentAngle) % wheelSegments.length;

                    const result = wheelSegments[segmentIndex].label;
                    document.getElementById('wheel-result').textContent = result + '!';
                    document.getElementById('wheel-continue-btn').classList.add('visible');
                }
            }

            requestAnimationFrame(animateSpin);
        }

        function initWheel() {
            drawWheel();
        }

        // ===================================
        // SPARKLE TRAIL
        // ===================================

        function initSparkleTrail() {
            const canvas = document.getElementById('sparkle-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            let particles = [];
            const MAX_PARTICLES = 30;
            const sparkleChars = ['*', '+', '.', '~'];
            const colors = ['#FFB6C1', '#FFC8DD', '#FF85A2', '#FFE5EC'];
            let lastTime = 0;
            const THROTTLE = 50;

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            function addParticle(x, y) {
                if (particles.length >= MAX_PARTICLES) return;
                particles.push({
                    x: x,
                    y: y,
                    char: sparkleChars[Math.floor(Math.random() * sparkleChars.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 8 + Math.random() * 10,
                    life: 1,
                    decay: 0.02 + Math.random() * 0.02,
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1
                });
            }

            function handleInput(e) {
                const now = Date.now();
                if (now - lastTime < THROTTLE) return;
                lastTime = now;

                let x, y;
                if (e.touches) {
                    x = e.touches[0].clientX;
                    y = e.touches[0].clientY;
                } else {
                    x = e.clientX;
                    y = e.clientY;
                }

                addParticle(x, y);
            }

            document.addEventListener('mousemove', handleInput);
            document.addEventListener('touchmove', handleInput, { passive: true });

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles = particles.filter(p => p.life > 0);

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= p.decay;

                    ctx.save();
                    ctx.globalAlpha = p.life;
                    ctx.font = `${p.size}px sans-serif`;
                    ctx.fillStyle = p.color;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(p.char, p.x, p.y);
                    ctx.restore();
                });

                requestAnimationFrame(animate);
            }

            animate();
        }

        // ===================================
        // LOADING SCREEN
        // ===================================
        function hideLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 2000);
        }

        // ===================================
        // TYPEWRITER EFFECT
        // ===================================
        function typewriterEffect(elementId, text, speed = 50) {
            const element = document.getElementById(elementId);
            if (!element) return;

            element.textContent = '';
            element.style.display = 'inline-block';
            let i = 0;

            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }

            element.style.borderRight = '2px solid var(--color-accent)';
            element.style.paddingRight = '5px';
            type();
        }

        // ===================================
        // MUSIC TOGGLE
        // ===================================
        let musicPlaying = false;

        function initMusicToggle() {
            const musicToggle = document.getElementById('music-toggle');
            const backgroundMusic = document.getElementById('background-music');

            if (musicToggle && backgroundMusic) {
                musicToggle.addEventListener('click', () => {
                    if (musicPlaying) {
                        backgroundMusic.pause();
                        musicToggle.textContent = '🔇';
                        musicToggle.classList.add('muted');
                        musicPlaying = false;
                    } else {
                        backgroundMusic.play().catch(e => {
                            console.log('Music playback failed:', e);
                        });
                        musicToggle.textContent = '🎵';
                        musicToggle.classList.remove('muted');
                        musicPlaying = true;
                    }
                });
            }
        }

        // ===================================
        // ANIMATED SIGNATURE
        // ===================================
        function revealSignature() {
            const signature = document.getElementById('signature');
            if (signature) {
                setTimeout(() => {
                    signature.classList.add('animated');
                }, 1000);
            }
        }

        // Store original goToChapter function
        let originalGoToChapter = goToChapter;

        // Override goToChapter with enhanced version
        goToChapter = function(chapterNum) {
            if (currentChapter === 0) stopCountdown();

            setTimeout(() => {
                if (chapterNum === 7) {
                    const questionElement = document.getElementById('valentine-question');
                    if (questionElement) {
                        const text = questionElement.textContent;
                        typewriterEffect('valentine-question', text, 80);
                    }
                } else if (chapterNum === 9) {
                    revealSignature();
                }
            }, 400);

            originalGoToChapter(chapterNum);
        };
        // ===================================
        // INITIALIZATION
        // ===================================
        window.addEventListener('DOMContentLoaded', () => {
            // Hide loading screen
            hideLoadingScreen();

            // Initialize music toggle
            initMusicToggle();

            // Initialize chapters
            initQuiz();
            initTimeline();
            initMatchGame();
            initReasons();
            initWheel();
            initSparkleTrail();

            // Typewriter effect on opening
            setTimeout(() => {
                const openingText = document.getElementById('opening-text');
                if (openingText) {
                    const text = openingText.textContent;
                    typewriterEffect('opening-text', text, 60);
                }
            }, 2200); // After loading screen fades
        });
