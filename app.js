/* ELISH-SPEAK – Core Application Logic */

(function () {
  'use strict';

  // ---------- State ----------
  const state = {
    lang: null,          // 'hausa' | 'igbo' | 'yoruba'
    view: 'home',
    category: 'greetings',
    cardIndex: 0,
    flipped: false,
    known: {},           // { lang: { 'en|native': true } }
    quiz: { items: [], index: 0, score: 0, answered: false },
    match: { selected: [], matched: 0 },
    memory: { flipped: [], matched: [], moves: 0, lock: false },
    scramble: { item: null, answer: '' },
    exercise: { item: null, mode: 'translate' },
    deferredPrompt: null
  };

  // ---------- Persistence ----------
  const STORE_KEY = 'elish-speak-v1';

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        state.known = data.known || {};
        return data;
      }
    } catch (e) {}
    return { known: {}, stats: { words: 0, quizzes: 0, games: 0, streak: 0, score: 0, bestQuiz: 0, lastDay: null } };
  }

  function saveProgress(extra = {}) {
    const prev = loadProgress();
    const stats = { ...prev.stats, ...extra.stats };
    // Streak logic
    const today = new Date().toDateString();
    if (stats.lastDay !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (stats.lastDay === yesterday.toDateString()) {
        stats.streak = (stats.streak || 0) + 1;
      } else if (stats.lastDay !== today) {
        stats.streak = 1;
      }
      stats.lastDay = today;
    }
    const payload = {
      known: state.known,
      stats,
      ...extra
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(payload));
    updateHomeStats();
  }

  function getStats() {
    return loadProgress().stats || {};
  }

  function markKnown(en, native) {
    if (!state.lang) return;
    if (!state.known[state.lang]) state.known[state.lang] = {};
    const key = en + '|' + native;
    if (!state.known[state.lang][key]) {
      state.known[state.lang][key] = true;
      const s = getStats();
      saveProgress({ stats: { words: (s.words || 0) + 1, score: (s.score || 0) + 5 } });
    } else {
      saveProgress();
    }
  }

  // ---------- DOM helpers ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function showView(id) {
    $$('.view').forEach(v => v.classList.remove('active'));
    const el = $('#view-' + id);
    if (el) el.classList.add('active');
    state.view = id;

    // Header
    const titles = {
      home: ['ELISH-SPEAK', 'Choose a language'],
      hub: [VOCAB[state.lang]?.name || 'Learn', 'Pick an activity'],
      lessons: ['Lessons', VOCAB[state.lang]?.name || ''],
      quiz: ['Quiz Time', VOCAB[state.lang]?.name || ''],
      match: ['Match Game', 'Find the pairs'],
      memory: ['Memory Cards', 'Find matching pairs'],
      scramble: ['Word Puzzle', 'Unscramble the word'],
      exercise: ['Exercises', 'Practice writing']
    };
    const t = titles[id] || ['ELISH-SPEAK', ''];
    $('#header-title').textContent = t[0];
    $('#header-sub').textContent = t[1];

    const back = $('#btn-back');
    if (id === 'home') {
      back.classList.add('hidden');
    } else {
      back.classList.remove('hidden');
    }

    // Bottom nav highlight
    $$('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.nav === (id === 'hub' ? 'hub' : id === 'home' ? 'home' : ''));
    });
  }

  function updateHomeStats() {
    const s = getStats();
    $('#stat-words').textContent = s.words || 0;
    $('#stat-streak').textContent = s.streak || 0;
    $('#stat-score').textContent = s.score || 0;
  }

  function updateProgressBar() {
    if (!state.lang) return;
    const all = getAllItems(state.lang);
    const knownMap = state.known[state.lang] || {};
    const count = Object.keys(knownMap).length;
    const pct = all.length ? Math.round((count / all.length) * 100) : 0;
    $('#progress-fill').style.width = pct + '%';
    $('#progress-text').textContent = pct + '% mastered (' + count + '/' + all.length + ' words)';
  }

  // ---------- Navigation ----------
  function goHome() {
    state.lang = null;
    showView('home');
  }

  function goHub() {
    if (!state.lang) return goHome();
    showView('hub');
    updateProgressBar();
  }

  function goBack() {
    if (['lessons', 'quiz', 'match', 'memory', 'scramble', 'exercise'].includes(state.view)) {
      goHub();
    } else if (state.view === 'hub') {
      goHome();
    } else {
      goHome();
    }
  }

  // ---------- Lessons / Flashcards ----------
  function startLessons() {
    state.category = 'greetings';
    state.cardIndex = 0;
    state.flipped = false;
    renderCategoryTabs();
    renderCard();
    showView('lessons');
  }

  function renderCategoryTabs() {
    const cats = getCategories(state.lang);
    const tabs = $('#category-tabs');
    tabs.innerHTML = cats.map(c => {
      const label = VOCAB[state.lang].categories[c].label;
      return `<button class="cat-btn ${c === state.category ? 'active' : ''}" data-cat="${c}">${label}</button>`;
    }).join('');
    tabs.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        state.cardIndex = 0;
        state.flipped = false;
        renderCategoryTabs();
        renderCard();
      });
    });
  }

  function currentItems() {
    return VOCAB[state.lang].categories[state.category].items;
  }

  function renderCard() {
    const items = currentItems();
    if (!items.length) return;
    if (state.cardIndex >= items.length) state.cardIndex = 0;
    if (state.cardIndex < 0) state.cardIndex = items.length - 1;
    const item = items[state.cardIndex];
    $('#card-en').textContent = item.en;
    $('#card-native').textContent = item.native;
    $('#card-pron').textContent = item.pron || '';
    $('#card-lang-label').textContent = VOCAB[state.lang].name;
    $('#card-counter').textContent = `${state.cardIndex + 1} / ${items.length}`;
    const card = $('#flashcard');
    card.classList.toggle('flipped', state.flipped);
  }

  function flipCard() {
    state.flipped = !state.flipped;
    $('#flashcard').classList.toggle('flipped', state.flipped);
  }

  // ---------- Quiz ----------
  function startQuiz() {
    const all = getAllItems(state.lang);
    // Shuffle & take 10
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, Math.min(10, all.length));
    state.quiz = { items: shuffled, index: 0, score: 0, answered: false };
    showView('quiz');
    $('#quiz-result').classList.add('hidden');
    $('#btn-quiz-next').classList.add('hidden');
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = state.quiz;
    if (q.index >= q.items.length) {
      finishQuiz();
      return;
    }
    const item = q.items[q.index];
    // 50% chance English→Native or reverse
    const askNative = Math.random() > 0.5;
    q.currentAskNative = askNative;
    q.currentItem = item;

    $('#quiz-progress').textContent = `Question ${q.index + 1}/${q.items.length}`;
    $('#quiz-score').textContent = `Score: ${q.score}`;
    $('#quiz-question').textContent = askNative
      ? `What is the English meaning of “${item.native}”?`
      : `What is the ${VOCAB[state.lang].name} word for “${item.en}”?`;

    // Options: correct + 3 distractors
    const pool = getAllItems(state.lang).filter(x => x.en !== item.en);
    const distractors = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = askNative
      ? [item.en, ...distractors.map(d => d.en)]
      : [item.native, ...distractors.map(d => d.native)];
    const shuffledOpts = options.sort(() => Math.random() - 0.5);

    const container = $('#quiz-options');
    container.innerHTML = shuffledOpts.map(opt =>
      `<button class="quiz-opt" data-val="${opt.replace(/"/g, '&quot;')}">${opt}</button>`
    ).join('');

    container.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => selectQuizAnswer(btn));
    });

    $('#quiz-feedback').classList.add('hidden');
    $('#btn-quiz-next').classList.add('hidden');
    q.answered = false;
  }

  function selectQuizAnswer(btn) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;
    const q = state.quiz;
    const correct = q.currentAskNative ? q.currentItem.en : q.currentItem.native;
    const chosen = btn.dataset.val;
    const allBtns = $$('.quiz-opt');
    allBtns.forEach(b => {
      b.disabled = true;
      if (b.dataset.val === correct) b.classList.add('correct');
      else if (b === btn && chosen !== correct) b.classList.add('wrong');
    });

    const feedback = $('#quiz-feedback');
    feedback.classList.remove('hidden', 'good', 'bad');
    if (chosen === correct) {
      q.score++;
      feedback.textContent = '✓ Correct!';
      feedback.classList.add('good');
      markKnown(q.currentItem.en, q.currentItem.native);
    } else {
      feedback.textContent = `✗ Correct answer: ${correct}`;
      feedback.classList.add('bad');
    }
    $('#quiz-score').textContent = `Score: ${q.score}`;
    $('#btn-quiz-next').classList.remove('hidden');
  }

  function finishQuiz() {
    const q = state.quiz;
    const s = getStats();
    const newBest = Math.max(s.bestQuiz || 0, q.score);
    saveProgress({
      stats: {
        quizzes: (s.quizzes || 0) + 1,
        score: (s.score || 0) + q.score * 10,
        bestQuiz: newBest
      }
    });
    $('#quiz-options').innerHTML = '';
    $('#quiz-question').textContent = '';
    $('#quiz-feedback').classList.add('hidden');
    $('#btn-quiz-next').classList.add('hidden');
    const result = $('#quiz-result');
    result.classList.remove('hidden');
    const pct = Math.round((q.score / q.items.length) * 100);
    $('#result-title').textContent = pct >= 80 ? 'Excellent! 🎉' : pct >= 50 ? 'Good job! 👍' : 'Keep practicing! 💪';
    $('#result-score').textContent = `You scored ${q.score}/${q.items.length} (${pct}%)`;
  }

  // ---------- Match Game ----------
  function startMatch() {
    const all = getAllItems(state.lang).sort(() => Math.random() - 0.5).slice(0, 6);
    state.match = { pairs: all, selected: [], matched: 0, cards: [] };
    // Build 12 cards (6 en + 6 native)
    const cards = [];
    all.forEach((item, i) => {
      cards.push({ id: i, type: 'en', text: item.en, pair: i });
      cards.push({ id: i + 100, type: 'native', text: item.native, pair: i });
    });
    state.match.cards = cards.sort(() => Math.random() - 0.5);
    renderMatchBoard();
    showView('match');
  }

  function renderMatchBoard() {
    const board = $('#match-board');
    board.innerHTML = state.match.cards.map((c, idx) =>
      `<div class="match-card" data-idx="${idx}" data-pair="${c.pair}">${c.text}</div>`
    ).join('');
    board.querySelectorAll('.match-card').forEach(el => {
      el.addEventListener('click', () => onMatchClick(el));
    });
    $('#match-pairs').textContent = `Pairs: ${state.match.matched}/6`;
  }

  function onMatchClick(el) {
    if (el.classList.contains('matched') || el.classList.contains('selected')) return;
    if (state.match.selected.length >= 2) return;

    el.classList.add('selected');
    state.match.selected.push(el);

    if (state.match.selected.length === 2) {
      const [a, b] = state.match.selected;
      if (a.dataset.pair === b.dataset.pair && a !== b) {
        // Match!
        setTimeout(() => {
          a.classList.add('matched');
          b.classList.add('matched');
          a.classList.remove('selected');
          b.classList.remove('selected');
          state.match.matched++;
          state.match.selected = [];
          $('#match-pairs').textContent = `Pairs: ${state.match.matched}/6`;
          if (state.match.matched === 6) {
            const s = getStats();
            saveProgress({ stats: { games: (s.games || 0) + 1, score: (s.score || 0) + 30 } });
            setTimeout(() => alert('🎉 All pairs matched! Great work!'), 300);
          }
        }, 300);
      } else {
        setTimeout(() => {
          a.classList.remove('selected');
          b.classList.remove('selected');
          state.match.selected = [];
        }, 700);
      }
    }
  }

  // ---------- Memory Game ----------
  function startMemory() {
    const all = getAllItems(state.lang).sort(() => Math.random() - 0.5).slice(0, 6);
    const cards = [];
    all.forEach((item, i) => {
      cards.push({ pair: i, text: item.en, face: '🇬🇧' });
      cards.push({ pair: i, text: item.native, face: '🇳🇬' });
    });
    state.memory = {
      cards: cards.sort(() => Math.random() - 0.5),
      flipped: [],
      matched: [],
      moves: 0,
      lock: false
    };
    renderMemoryBoard();
    showView('memory');
  }

  function renderMemoryBoard() {
    const board = $('#memory-board');
    board.innerHTML = state.memory.cards.map((c, idx) =>
      `<div class="mem-card" data-idx="${idx}">❓</div>`
    ).join('');
    board.querySelectorAll('.mem-card').forEach(el => {
      el.addEventListener('click', () => onMemoryClick(el));
    });
    $('#memory-moves').textContent = `Moves: ${state.memory.moves}`;
  }

  function onMemoryClick(el) {
    const m = state.memory;
    if (m.lock) return;
    const idx = +el.dataset.idx;
    if (m.flipped.includes(idx) || m.matched.includes(idx)) return;
    if (m.flipped.length >= 2) return;

    // Reveal
    el.textContent = m.cards[idx].text;
    el.classList.add('flipped');
    m.flipped.push(idx);

    if (m.flipped.length === 2) {
      m.moves++;
      $('#memory-moves').textContent = `Moves: ${m.moves}`;
      const [i1, i2] = m.flipped;
      if (m.cards[i1].pair === m.cards[i2].pair) {
        m.matched.push(i1, i2);
        el.classList.add('matched');
        boardCard(i1).classList.add('matched');
        m.flipped = [];
        if (m.matched.length === 12) {
          const s = getStats();
          saveProgress({ stats: { games: (s.games || 0) + 1, score: (s.score || 0) + 40 } });
          setTimeout(() => alert('🧠 Memory mastered! Moves: ' + m.moves), 400);
        }
      } else {
        m.lock = true;
        setTimeout(() => {
          boardCard(i1).textContent = '❓';
          boardCard(i1).classList.remove('flipped');
          boardCard(i2).textContent = '❓';
          boardCard(i2).classList.remove('flipped');
          m.flipped = [];
          m.lock = false;
        }, 800);
      }
    }
  }

  function boardCard(idx) {
    return $(`.mem-card[data-idx="${idx}"]`);
  }

  // ---------- Scramble ----------
  function startScramble() {
    nextScramble();
    showView('scramble');
  }

  function nextScramble() {
    const all = getAllItems(state.lang);
    const item = all[Math.floor(Math.random() * all.length)];
    state.scramble.item = item;
    // Scramble letters of native word (remove spaces for simplicity)
    const clean = item.native.replace(/\s+/g, '').replace(/[.?…]/g, '');
    const letters = clean.split('').sort(() => Math.random() - 0.5);
    // Ensure not already correct
    if (letters.join('') === clean) letters.reverse();

    $('#scramble-hint').textContent = `English: ${item.en}`;
    $('#scramble-letters').innerHTML = letters.map(l =>
      `<span class="letter-tile">${l}</span>`
    ).join('');
    $('#scramble-input').value = '';
    $('#scramble-feedback').textContent = '';
    $('#scramble-feedback').className = 'feedback';
  }

  function checkScramble() {
    const input = $('#scramble-input').value.trim().toLowerCase();
    const target = state.scramble.item.native.replace(/\s+/g, '').toLowerCase();
    const fb = $('#scramble-feedback');
    if (input === target || input === state.scramble.item.native.toLowerCase()) {
      fb.textContent = '✓ Correct! Well done!';
      fb.className = 'feedback good';
      markKnown(state.scramble.item.en, state.scramble.item.native);
      const s = getStats();
      saveProgress({ stats: { score: (s.score || 0) + 15 } });
      setTimeout(nextScramble, 1200);
    } else {
      fb.textContent = '✗ Not quite. Try again!';
      fb.className = 'feedback bad';
    }
  }

  // ---------- Exercises ----------
  function startExercise() {
    state.exercise.mode = 'translate';
    $$('.ex-tab').forEach(t => t.classList.toggle('active', t.dataset.ex === 'translate'));
    $$('.exercise-panel').forEach(p => p.classList.remove('active'));
    $('#ex-translate').classList.add('active');
    nextTranslate();
    showView('exercise');
  }

  function nextTranslate() {
    const all = getAllItems(state.lang);
    state.exercise.item = all[Math.floor(Math.random() * all.length)];
    $('#ex-en').textContent = state.exercise.item.en;
    $('#ex-answer').value = '';
    $('#ex-feedback').textContent = '';
    $('#btn-ex-next').classList.add('hidden');
  }

  function checkTranslate() {
    const ans = $('#ex-answer').value.trim().toLowerCase();
    const correct = state.exercise.item.native.toLowerCase();
    const fb = $('#ex-feedback');
    // Allow partial match ignoring diacritics roughly
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (norm(ans) === norm(correct) || ans === correct) {
      fb.textContent = '✓ Perfect!';
      fb.className = 'feedback good';
      markKnown(state.exercise.item.en, state.exercise.item.native);
      $('#btn-ex-next').classList.remove('hidden');
    } else {
      fb.textContent = `✗ Answer: ${state.exercise.item.native}`;
      fb.className = 'feedback bad';
      $('#btn-ex-next').classList.remove('hidden');
    }
  }

  function nextFill() {
    const all = getAllItems(state.lang);
    const item = all[Math.floor(Math.random() * all.length)];
    state.exercise.item = item;
    $('#fill-sentence').textContent = `“${item.native}” means “___” in English`;
    $('#fill-answer').value = '';
    $('#fill-feedback').textContent = '';
    $('#btn-fill-next').classList.add('hidden');
  }

  function checkFill() {
    const ans = $('#fill-answer').value.trim().toLowerCase();
    const correct = state.exercise.item.en.toLowerCase();
    const fb = $('#fill-feedback');
    if (ans === correct) {
      fb.textContent = '✓ Correct!';
      fb.className = 'feedback good';
      markKnown(state.exercise.item.en, state.exercise.item.native);
      $('#btn-fill-next').classList.remove('hidden');
    } else {
      fb.textContent = `✗ Answer: ${state.exercise.item.en}`;
      fb.className = 'feedback bad';
      $('#btn-fill-next').classList.remove('hidden');
    }
  }

  // ---------- TTS ----------
  function speak(text, langCode) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    // Best-effort language codes
    const map = { hausa: 'ha', igbo: 'ig', yoruba: 'yo' };
    u.lang = map[state.lang] || 'en';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }

  // ---------- Progress Modal ----------
  function showProgress() {
    const s = getStats();
    $('#p-words').textContent = s.words || 0;
    $('#p-quizzes').textContent = s.quizzes || 0;
    $('#p-games').textContent = s.games || 0;
    $('#p-streak').textContent = s.streak || 0;
    $('#p-score').textContent = s.score || 0;
    $('#p-best').textContent = s.bestQuiz || 0;

    const list = $('#lang-progress-list');
    list.innerHTML = ['hausa', 'igbo', 'yoruba'].map(l => {
      const known = Object.keys(state.known[l] || {}).length;
      const total = getAllItems(l).length;
      return `<div class="lang-prog-item"><span>${VOCAB[l].name}</span><span>${known}/${total}</span></div>`;
    }).join('');

    showView('progress');
  }

  // ---------- Menu & Install ----------
  function openMenu() {
    $('#side-menu').classList.add('open');
    $('#menu-overlay').classList.remove('hidden');
  }
  function closeMenu() {
    $('#side-menu').classList.remove('open');
    $('#menu-overlay').classList.add('hidden');
  }

  // ---------- Init & Events ----------
  function init() {
    // Splash
    setTimeout(() => {
      $('#splash').classList.add('hide');
      $('#app').classList.remove('hidden');
      updateHomeStats();
    }, 1400);

    // Language selection
    $$('.lang-card').forEach(card => {
      card.addEventListener('click', () => {
        state.lang = card.dataset.lang;
        goHub();
      });
    });

    // Hub modes
    $$('.hub-card').forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.dataset.mode;
        if (mode === 'lessons') startLessons();
        else if (mode === 'quiz') startQuiz();
        else if (mode === 'match') startMatch();
        else if (mode === 'memory') startMemory();
        else if (mode === 'scramble') startScramble();
        else if (mode === 'exercise') startExercise();
      });
    });

    // Header
    $('#btn-back').addEventListener('click', goBack);
    $('#btn-menu').addEventListener('click', openMenu);
    $('#btn-close-menu').addEventListener('click', closeMenu);
    $('#menu-overlay').addEventListener('click', closeMenu);

    // Side menu nav
    $$('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeMenu();
        const nav = btn.dataset.nav;
        if (nav === 'home') goHome();
        else if (nav === 'hub') { if (state.lang) goHub(); else goHome(); }
        else if (nav === 'progress') showProgress();
        else if (nav === 'about') showView('about');
      });
    });

    // Bottom nav
    $$('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.dataset.nav;
        if (nav === 'home') goHome();
        else if (nav === 'hub') { if (state.lang) goHub(); else goHome(); }
        else if (nav === 'progress') showProgress();
        else if (nav === 'about') showView('about');
      });
    });

    // Lessons
    $('#flashcard').addEventListener('click', flipCard);
    $('#btn-flip').addEventListener('click', flipCard);
    $('#btn-prev').addEventListener('click', () => {
      state.cardIndex--;
      state.flipped = false;
      renderCard();
    });
    $('#btn-next').addEventListener('click', () => {
      state.cardIndex++;
      state.flipped = false;
      renderCard();
    });
    $('#btn-know').addEventListener('click', () => {
      const item = currentItems()[state.cardIndex];
      markKnown(item.en, item.native);
      state.cardIndex++;
      state.flipped = false;
      renderCard();
      updateProgressBar();
    });
    $('#btn-speak').addEventListener('click', () => {
      const item = currentItems()[state.cardIndex];
      const text = state.flipped ? item.native : item.en;
      speak(text);
    });

    // Quiz
    $('#btn-quiz-next').addEventListener('click', () => {
      state.quiz.index++;
      renderQuizQuestion();
    });
    $('#btn-quiz-retry').addEventListener('click', startQuiz);
    $('#btn-quiz-home').addEventListener('click', goHub);

    // Match / Memory reset
    $('#btn-match-reset').addEventListener('click', startMatch);
    $('#btn-memory-reset').addEventListener('click', startMemory);

    // Scramble
    $('#btn-scramble-check').addEventListener('click', checkScramble);
    $('#btn-scramble-skip').addEventListener('click', nextScramble);
    $('#btn-scramble-hint').addEventListener('click', () => {
      const item = state.scramble.item;
      $('#scramble-feedback').textContent = `Hint: starts with “${item.native[0]}” · ${item.pron || ''}`;
      $('#scramble-feedback').className = 'feedback';
    });
    $('#scramble-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') checkScramble();
    });

    // Exercises
    $$('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.ex-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mode = tab.dataset.ex;
        state.exercise.mode = mode;
        $$('.exercise-panel').forEach(p => p.classList.remove('active'));
        if (mode === 'translate') {
          $('#ex-translate').classList.add('active');
          nextTranslate();
        } else {
          $('#ex-fill').classList.add('active');
          nextFill();
        }
      });
    });
    $('#btn-ex-check').addEventListener('click', checkTranslate);
    $('#btn-ex-next').addEventListener('click', nextTranslate);
    $('#btn-fill-check').addEventListener('click', checkFill);
    $('#btn-fill-next').addEventListener('click', nextFill);

    // Reset data
    $('#btn-reset-data').addEventListener('click', () => {
      if (confirm('Reset all progress? This cannot be undone.')) {
        localStorage.removeItem(STORE_KEY);
        state.known = {};
        updateHomeStats();
        closeMenu();
        alert('Progress cleared.');
      }
    });

    // PWA Install
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.deferredPrompt = e;
      $('#btn-install').classList.remove('hidden');
    });
    $('#btn-install').addEventListener('click', async () => {
      if (!state.deferredPrompt) return;
      state.deferredPrompt.prompt();
      await state.deferredPrompt.userChoice;
      state.deferredPrompt = null;
      $('#btn-install').classList.add('hidden');
      closeMenu();
    });

    // Service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  // Boot
  document.addEventListener('DOMContentLoaded', init);
})();
