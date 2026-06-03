/**
 * Worship Community Songpool - Core Application Logic
 * Implements: Search, Filters, Setlist Builder, localStorage persistence,
 * and a robust real-time chord transposition engine.
 */

// --- Shared Authentication Settings ---
const SHARED_PASSWORD = 'vibe2026';

// --- Global State ---
let activeSetlist = [];
let currentModalSong = null;
let currentModalKey = null; // Currently transposed key
let metronomeInterval = null;
let activeLayout = '1col';
let activeNotation = 'chords';
const DEFAULT_TITLE = document.title;

// --- Scale Constants for Transposition ---
const SCALE_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SCALE_FLATS  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const NOTE_TO_SEMITONE = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

// Flat keys preference indicator
const FLAT_KEYS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm'];

// --- DOM Elements ---
const songsGrid = document.getElementById('songsGrid');
const searchInput = document.getElementById('searchInput');
const keyFilter = document.getElementById('keyFilter');
const tempoFilter = document.getElementById('tempoFilter');
const sortBy = document.getElementById('sortBy');
const songsCount = document.getElementById('songsCount');

const setlistSidebar = document.getElementById('setlistSidebar');
const setlistToggle = document.getElementById('setlistToggle');
const setlistCountBadge = document.getElementById('setlistCountBadge');
const btnSidebarClose = document.getElementById('btnSidebarClose');
const setlistEmptyState = document.getElementById('setlistEmptyState');
const setlistSongsList = document.getElementById('setlistSongsList');
const setlistStatCount = document.getElementById('setlistStatCount');
const setlistStatBpm = document.getElementById('setlistStatBpm');
const btnExportSetlist = document.getElementById('btnExportSetlist');

const chordModal = document.getElementById('chordModal');
const btnModalClose = document.getElementById('btnModalClose');
const modalTitle = document.getElementById('modalTitle');
const modalAuthor = document.getElementById('modalAuthor');
const modalOriginalKey = document.getElementById('modalOriginalKey');
const chordSheetPre = document.getElementById('chordSheetPre');
const currentTransposedKeyEl = document.getElementById('currentTransposedKey');
const transposerOffsetVal = document.getElementById('transposerOffsetVal');
const btnTransReset = document.getElementById('btnTransReset');
const modalMetronomeBpm = document.getElementById('modalMetronomeBpm');
const modalTimeSig = document.getElementById('modalTimeSig');
const modalCcliHash = document.getElementById('modalCcliHash');
const modalAuthorDetail = document.getElementById('modalAuthorDetail');
const linkYoutube = document.getElementById('linkYoutube');
const linkSpotify = document.getElementById('linkSpotify');
const btnDownloadPDF = document.getElementById('btnDownloadPDF');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // 0. Check Authentication State
  checkAuthenticationState();

  // 1. Load Setlist from localStorage
  loadSetlistFromStorage();
  
  // 2. Render Songs Grid
  renderSongs();
  
  // 3. Populate Unique Keys in Filter Dropdown
  populateKeyFilter();
  
  // 4. Setup Event Listeners
  setupEventListeners();
  
  // 5. Update Setlist UI
  updateSetlistUI();
});

// --- Search, Filter & Render ---

function populateKeyFilter() {
  const keys = [...new Set(SONGS.map(s => s.key))].sort();
  keys.forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = `Key: ${k}`;
    keyFilter.appendChild(opt);
  });
}

function renderSongs() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedKey = keyFilter.value;
  const selectedTempo = tempoFilter.value;
  const sortOption = sortBy.value;

  // Filter songs
  let filtered = SONGS.filter(song => {
    // Search query matches title, author, or theme
    const matchesQuery = song.title.toLowerCase().includes(query) || 
                         song.author.toLowerCase().includes(query) ||
                         song.theme.toLowerCase().includes(query);
    
    // Key match
    const matchesKey = selectedKey === 'all' || song.key === selectedKey;
    
    // Tempo speed match
    let matchesTempo = true;
    if (selectedTempo === 'slow') matchesTempo = song.bpm < 75;
    else if (selectedTempo === 'medium') matchesTempo = song.bpm >= 75 && song.bpm <= 100;
    else if (selectedTempo === 'fast') matchesTempo = song.bpm > 100;

    return matchesQuery && matchesKey && matchesTempo;
  });

  // Sort songs
  filtered.sort((a, b) => {
    if (sortOption === 'alpha') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'bpm') {
      return a.bpm - b.bpm;
    } else if (sortOption === 'key') {
      return a.key.localeCompare(b.key);
    } else if (sortOption === 'language') {
      // Order: English (en) first, Swiss German (de-ch) second, German (de) third
      const langOrder = { 'en': 1, 'de-ch': 2, 'de': 3 };
      const orderA = langOrder[a.language] || 99;
      const orderB = langOrder[b.language] || 99;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Update count indicator
  songsCount.textContent = `${filtered.length} Song${filtered.length === 1 ? '' : 's'} angezeigt`;

  // Render Grid
  songsGrid.innerHTML = '';
  if (filtered.length === 0) {
    songsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 3.5rem; height: 3.5rem; margin: 0 auto 1rem; opacity: 0.3;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.25rem;">No songs match your selection</p>
        <p style="font-size: 0.9rem;">Try loosening your filters or search keywords.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(song => {
    const isMinor = song.key.endsWith('m') || song.key === 'Am';
    const isAdded = activeSetlist.some(item => item.id === song.id);

    const row = document.createElement('div');
    row.className = 'song-row';
    row.innerHTML = `
      <div class="td-col col-title-block">
        <span class="row-play-icon" onclick="openChordModal('${song.id}')" title="Play Metronome & View Chords">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 0.9rem; height: 0.9rem;">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
          </svg>
        </span>
        <span class="row-song-title" onclick="openChordModal('${song.id}')" title="${song.title}">${song.title}</span>
      </div>
      <div class="td-col col-author">${song.author}</div>
      <div class="td-col col-key">
        <span class="key-pill ${isMinor ? 'minor' : ''}">${song.key}</span>
      </div>
      <div class="td-col col-bpm">
        ${song.bpm}
      </div>
      <div class="td-col col-theme">${song.theme}</div>
      <div class="td-col col-actions">
        <button class="btn-row-action btn-row-add ${isAdded ? 'active' : ''}" onclick="toggleSetlistSong('${song.id}')" title="${isAdded ? 'Aus Setlist entfernen' : 'In Setlist aufnehmen'}">
          ${isAdded ? `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" style="width: 0.85rem; height: 0.85rem;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ` : `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" style="width: 0.85rem; height: 0.85rem;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          `}
        </button>
      </div>
    `;
    songsGrid.appendChild(row);
  });
}

function setupEventListeners() {
  // Filtering and searching inputs
  searchInput.addEventListener('input', renderSongs);
  keyFilter.addEventListener('change', renderSongs);
  tempoFilter.addEventListener('change', renderSongs);
  sortBy.addEventListener('change', renderSongs);

  // Sidebar Toggles
  setlistToggle.addEventListener('click', () => {
    document.querySelector('.app-container').classList.toggle('sidebar-open');
  });

  btnSidebarClose.addEventListener('click', () => {
    document.querySelector('.app-container').classList.remove('sidebar-open');
  });

  // Modal Closures
  btnModalClose.addEventListener('click', closeChordModal);
  chordModal.addEventListener('click', (e) => {
    if (e.target === chordModal) closeChordModal();
  });

  // Key Event for escaping Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeChordModal();
      document.querySelector('.app-container').classList.remove('sidebar-open');
    }
  });

  // Export clipboard action
  btnExportSetlist.addEventListener('click', exportSetlistToClipboard);

  // Download PDF action
  if (btnDownloadPDF) {
    btnDownloadPDF.addEventListener('click', downloadPDF);
  }

  // Handle print lifecycle to dynamically set document title (affects PDF filename)
  window.addEventListener('beforeprint', () => {
    if (currentModalSong) {
      document.title = `${currentModalSong.title} - Chords & Lyrics`;
    }
  });

  window.addEventListener('afterprint', () => {
    document.title = DEFAULT_TITLE;
  });
}

// --- Setlist State & UI ---

function toggleSetlistSong(songId) {
  const song = SONGS.find(s => s.id === songId);
  if (!song) return;

  const index = activeSetlist.findIndex(item => item.id === songId);
  if (index >= 0) {
    // Remove
    activeSetlist.splice(index, 1);
  } else {
    // Add
    activeSetlist.push(song);
  }

  saveSetlistToStorage();
  updateSetlistUI();
  renderSongs(); // Update "Add/Remove" buttons in main grid
}

function saveSetlistToStorage() {
  localStorage.setItem('worship_setlist', JSON.stringify(activeSetlist.map(s => s.id)));
}

function loadSetlistFromStorage() {
  try {
    const stored = localStorage.getItem('worship_setlist');
    if (stored) {
      const ids = JSON.parse(stored);
      activeSetlist = ids.map(id => SONGS.find(s => s.id === id)).filter(Boolean);
    }
  } catch (err) {
    console.error("Failed to load setlist", err);
    activeSetlist = [];
  }
}

function updateSetlistUI() {
  // Update badges
  setlistCountBadge.textContent = activeSetlist.length;
  setlistStatCount.textContent = activeSetlist.length;

  // Toggle empty states
  if (activeSetlist.length === 0) {
    setlistEmptyState.style.display = 'flex';
    setlistSongsList.style.display = 'none';
    setlistStatBpm.textContent = '--';
    btnExportSetlist.style.display = 'none';
    return;
  }

  setlistEmptyState.style.display = 'none';
  setlistSongsList.style.display = 'flex';
  btnExportSetlist.style.display = 'flex';

  // Render sidebar items
  setlistSongsList.innerHTML = '';
  let totalBpm = 0;

  activeSetlist.forEach((song, idx) => {
    totalBpm += song.bpm;
    const isMinor = song.key.endsWith('m') || song.key === 'Am';

    const item = document.createElement('div');
    item.className = 'setlist-item';
    item.innerHTML = `
      <div class="setlist-item-index">${idx + 1}</div>
      <div class="setlist-item-details">
        <div class="setlist-item-title">${song.title}</div>
        <div class="setlist-item-subtitle">
          <span style="color: ${isMinor ? '#fda4af' : '#818cf8'}">${song.key}</span> • 
          <span>${song.bpm} BPM</span> • 
          <span>${song.author}</span>
        </div>
      </div>
      <div class="setlist-item-controls">
        <button class="btn-item-order" onclick="moveSetlistItem(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" style="width: 0.75rem; height: 0.75rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <button class="btn-item-order" onclick="moveSetlistItem(${idx}, 1)" ${idx === activeSetlist.length - 1 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" style="width: 0.75rem; height: 0.75rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
      <button class="btn-item-remove" onclick="toggleSetlistSong('${song.id}')" title="Song entfernen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 0.95rem; height: 0.95rem;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    `;
    setlistSongsList.appendChild(item);
  });

  // Calculate Average BPM
  const avgBpm = Math.round(totalBpm / activeSetlist.length);
  setlistStatBpm.textContent = avgBpm;
}

function moveSetlistItem(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= activeSetlist.length) return;

  // Swap
  const temp = activeSetlist[index];
  activeSetlist[index] = activeSetlist[targetIndex];
  activeSetlist[targetIndex] = temp;

  saveSetlistToStorage();
  updateSetlistUI();
  renderSongs();
}



function exportSetlistToClipboard() {
  if (activeSetlist.length === 0) return;

  let text = `--- SETLIST FÜR SONNTAG ---\n`;
  activeSetlist.forEach((song, idx) => {
    text += `${idx + 1}. ${song.title} (${song.key} | ${song.bpm} BPM) - ${song.author}\n`;
  });
  text += `---------------------------\n`;
  text += `Erstellt mit dem Worship-Songpool der Vineyard Bern\n`;

  navigator.clipboard.writeText(text).then(() => {
    btnExportSetlist.classList.add('success');
    const originalContent = btnExportSetlist.innerHTML;
    btnExportSetlist.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1rem; height: 1rem;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      Setlist kopiert!
    `;

    setTimeout(() => {
      btnExportSetlist.classList.remove('success');
      btnExportSetlist.innerHTML = originalContent;
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy setlist", err);
    alert("Setlist konnte nicht kopiert werden. Bitte manuell auswählen und kopieren.");
  });
}

// --- Chord Sheet Modal & Dynamic Transposer ---

function openChordModal(songId) {
  const song = SONGS.find(s => s.id === songId);
  if (!song) return;

  currentModalSong = song;
  currentModalKey = song.key; // Initialize with original key

  // Update document title dynamically so print/PDF default filename is the song title
  document.title = `${song.title} - Chords & Lyrics`;

  modalTitle.textContent = song.title;
  modalAuthor.textContent = song.author;
  modalOriginalKey.textContent = `Original: ${song.key}`;
  modalMetronomeBpm.textContent = `${song.bpm} BPM`;
  modalAuthorDetail.textContent = song.author;
  
  // Use custom timeSig or estimate based on BPM
  const timeSig = song.timeSig || (song.bpm > 90 ? "4/4" : (song.bpm > 75 ? "6/8" : "3/4"));
  modalTimeSig.textContent = `Taktart: ${timeSig}`;

  // Use custom CCLI or generate dynamic CCLI song number hash
  const songHash = song.ccli || song.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1047190);
  modalCcliHash.textContent = `CCLI: ${songHash}`;

  // Set Recording Links
  linkYoutube.href = song.youtube;
  linkSpotify.href = `https://open.spotify.com/search/${encodeURIComponent(song.title + " " + song.author)}`;

  // Update transposer display
  updateTransposerDisplay();

  // Parse and display chords in original key
  displayChordSheet();

  // Open modal
  chordModal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock main page scroll
}

function closeChordModal() {
  chordModal.classList.remove('open');
  document.body.style.overflow = ''; // Unlock main page scroll
  currentModalSong = null;
  currentModalKey = null;
  
  // Restore original website title
  document.title = DEFAULT_TITLE;
}

function updateTransposerDisplay() {
  if (!currentModalSong || !currentModalKey) return;
  currentTransposedKeyEl.textContent = currentModalKey;
  
  // Calculate semitone offset
  const originalBase = currentModalSong.key.replace('m', '');
  const currentBase = currentModalKey.replace('m', '');
  const origSemi = NOTE_TO_SEMITONE[originalBase];
  const currSemi = NOTE_TO_SEMITONE[currentBase];
  
  let diff = 0;
  if (origSemi !== undefined && currSemi !== undefined) {
    diff = currSemi - origSemi;
    if (diff > 6) diff -= 12;
    if (diff < -5) diff += 12;
    
    const sign = diff >= 0 ? `+${diff}` : `${diff}`;
    transposerOffsetVal.textContent = diff === 0 ? "(0)" : `(${sign})`;
  } else {
    transposerOffsetVal.textContent = "(0)";
  }
  
  if (btnTransReset) {
    btnTransReset.style.display = (diff === 0) ? 'none' : 'inline-flex';
  }
}

function shiftKeyOffset(offset) {
  if (!currentModalKey) return;
  const isMinor = currentModalKey.endsWith('m');
  const baseKey = currentModalKey.replace('m', '');
  
  const scale = FLAT_KEYS.includes(baseKey) ? SCALE_FLATS : SCALE_SHARPS;
  let idx = scale.indexOf(baseKey);
  if (idx < 0) idx = SCALE_SHARPS.indexOf(baseKey); // Fallback

  const newIdx = (idx + offset + 12) % 12;
  const targetKey = scale[newIdx] + (isMinor ? 'm' : '');
  
  transposeToKey(targetKey);
}

function transposeToKey(targetKey) {
  currentModalKey = targetKey;
  updateTransposerDisplay();
  displayChordSheet();
}

function resetToOriginalKey() {
  if (!currentModalSong) return;
  transposeToKey(currentModalSong.key);
}

/**
 * Estimates the total rendered lines of the song sheet. If the total lines
 * exceed 32, it will spill onto a second A4 page. In that case, we automatically
 * select a 2-column layout; otherwise, we stick to 1 column.
 */
function determineLayoutAutomatically() {
  if (!currentModalSong) return '1col';
  
  const cleanChords = currentModalSong.chords.trim();
  const rawLines = cleanChords.split('\n');
  
  // Base line count estimation: CCLI header takes about 7 lines
  let estimatedLines = 7;
  
  rawLines.forEach(line => {
    const isSectionHeader = line.match(/^\[(Verse \d+|Chorus|Pre-Chorus|Bridge|Intro|Outro)\]\s*$/i);
    const hasChords = line.match(/\[([^\]]+)\]/);
    
    if (isSectionHeader) {
      estimatedLines += 2; // Section header name + spacing
    } else if (hasChords) {
      estimatedLines += 2; // Chords line + lyrics line
    } else if (line.trim().length > 0) {
      estimatedLines += 1; // Lyrics only
    } else {
      estimatedLines += 1; // Spacing line
    }
  });
  
  return estimatedLines > 32 ? '2col' : '1col';
}

/**
 * Parses bracketed chords, transposes them, and outputs them exactly aligned
 * above the lyrics. Supports CCLI-style headers, Nashville scale degree numbers,
 * and double-column sheet layouts.
 */
function displayChordSheet() {
  if (!currentModalSong || !currentModalKey) return;

  const originalBase = currentModalSong.key.replace('m', '');
  const targetBase = currentModalKey.replace('m', '');

  const fromSemi = NOTE_TO_SEMITONE[originalBase];
  const toSemi = NOTE_TO_SEMITONE[targetBase];

  if (fromSemi === undefined || toSemi === undefined) {
    chordSheetPre.innerHTML = currentModalSong.chords;
    return;
  }

  const shift = (toSemi - fromSemi + 12) % 12;
  const useFlats = FLAT_KEYS.includes(targetBase);

  // Automatically determine 1-column vs 2-column layout based on sheet length
  activeLayout = determineLayoutAutomatically();

  // Apply Layout Class to the pre tag (two columns ONLY for print)
  if (activeLayout === '2col') {
    chordSheetPre.className = 'chord-sheet-pre print-two-columns';
  } else {
    chordSheetPre.className = 'chord-sheet-pre';
  }

  // Trim leading/trailing blank lines to remove empty spacing gaps
  const cleanChords = currentModalSong.chords.trim();
  const rawLines = cleanChords.split('\n');
  let renderedLines = [];

  // 1. Generate Authentic SongSelect Header Block
  const songHash = currentModalSong.ccli || currentModalSong.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1047190);
  const timeSig = currentModalSong.timeSig || (currentModalSong.bpm > 90 ? "4/4" : (currentModalSong.bpm > 75 ? "6/8" : "3/4"));
  
  const headerHtml = `
<div class="ccli-header-block">
  <div class="ccli-header-left">
    <div class="ccli-song-title">${currentModalSong.title}</div>
    <div class="ccli-song-meta">Von ${currentModalSong.author}</div>
    <div class="ccli-song-details-row">
      <span>Tonart: <strong>${currentModalKey}</strong> | BPM: <strong>${currentModalSong.bpm}</strong> | Takt: <strong>${timeSig}</strong></span>
    </div>
  </div>
</div>
<hr class="ccli-divider">
`;
  
  const headerPrintEl = document.getElementById('chordSheetHeaderPrint');
  if (headerPrintEl) {
    headerPrintEl.innerHTML = headerHtml;
  }

  // Group each verse/chorus block in a .song-section div to prevent splitting across columns
  let activeSectionLines = [];
  let inSection = false;

  rawLines.forEach(line => {
    // Check if line is a section header (e.g. [Verse 1], [Chorus (2x)], [Channel 1])
    const sectionHeaderMatch = line.match(/^\[(Verse \d+|Chorus|Pre-Chorus|Bridge|Intro|Outro|Channel \d+|Interlude)([^\]]*)\]\s*$/i);
    
    if (sectionHeaderMatch) {
      // Close previous section if exists
      if (inSection && activeSectionLines.length > 0) {
        // Trim leading and trailing empty lines to prevent vertical gaps
        while (activeSectionLines.length > 0 && activeSectionLines[0].trim() === '') {
          activeSectionLines.shift();
        }
        while (activeSectionLines.length > 0 && activeSectionLines[activeSectionLines.length - 1].trim() === '') {
          activeSectionLines.pop();
        }
        if (activeSectionLines.length > 0) {
          renderedLines.push(`<div class="song-section">${activeSectionLines.join('\n')}</div>`);
        }
        activeSectionLines = [];
      }
      const headerText = sectionHeaderMatch[1].toUpperCase() + (sectionHeaderMatch[2] ? sectionHeaderMatch[2].toUpperCase() : '');
      activeSectionLines.push(`<section-header>${headerText}</section-header>`);
      inSection = true;
      return;
    }

    // Check if the line actually has any bracketed chords
    const chordRegex = /\[([^\]]+)\]/g;
    const hasChords = line.match(chordRegex);

    if (!hasChords) {
      if (inSection) {
        activeSectionLines.push(line);
      } else {
        renderedLines.push(line);
      }
      return;
    }

    // Check if it is a rhythm-only line (no lyrics, just slashes, bars, spaces, etc.)
    const textWithoutChords = line.replace(/\[[^\]]+\]/g, '');
    const isRhythmLine = /^[ /|\\\-\d().,x]*$/i.test(textWithoutChords);

    if (isRhythmLine) {
      let renderedLine = line.replace(/\[([^\]]+)\]/g, (match, chordVal) => {
        let transposedChord = transposeChord(chordVal, shift, useFlats);
        if (activeNotation === 'numbers') {
          transposedChord = chordToNumber(transposedChord, currentModalKey);
        }
        return `<span class="chord-token">${transposedChord}</span>`;
      });
      if (inSection) {
        activeSectionLines.push(renderedLine);
      } else {
        renderedLines.push(renderedLine);
      }
      return;
    }

    // Construct chordsLine and lyricsLine
    let chordsLineHtml = "";
    let visibleChordsLength = 0;
    let lyricsLine = "";

    let index = 0;
    while (index < line.length) {
      if (line[index] === '[') {
        const endIdx = line.indexOf(']', index);
        if (endIdx > -1) {
          const chordVal = line.substring(index + 1, endIdx);
          
          // Step 1: Transpose Chord Symbol
          let finalChordSymbol = transposeChord(chordVal, shift, useFlats);
          
          // Step 2: Convert to Scale Degree Number if selected
          if (activeNotation === 'numbers') {
            finalChordSymbol = chordToNumber(finalChordSymbol, currentModalKey);
          }
          
          const targetPos = lyricsLine.length;
          
          while (visibleChordsLength < targetPos) {
            chordsLineHtml += " ";
            visibleChordsLength++;
          }

          if (visibleChordsLength > targetPos && chordsLineHtml.length > 0) {
            chordsLineHtml += " ";
            visibleChordsLength++;
          }

          chordsLineHtml += `<span class="chord-token">${finalChordSymbol}</span>`;
          visibleChordsLength += finalChordSymbol.length;

          index = endIdx + 1;
          continue;
        }
      }

      lyricsLine += line[index];
      index++;
    }

    if (inSection) {
      activeSectionLines.push(chordsLineHtml);
      activeSectionLines.push(lyricsLine);
    } else {
      renderedLines.push(chordsLineHtml);
      renderedLines.push(lyricsLine);
    }
  });

  // Close final section
  if (inSection && activeSectionLines.length > 0) {
    renderedLines.push(`<div class="song-section">${activeSectionLines.join('\n')}</div>`);
  }

  chordSheetPre.innerHTML = renderedLines.join('');
  
  // Sync the root-level print-only container to bypass WebKit columns page-break bugs
  populatePrintArea();
}

function populatePrintArea() {
  const printArea = document.getElementById('printArea');
  const headerPrintEl = document.getElementById('chordSheetHeaderPrint');
  if (!printArea || !headerPrintEl || !chordSheetPre) return;
  
  const headerHtml = headerPrintEl.innerHTML;
  const chordsHtml = chordSheetPre.innerHTML;
  const isTwoCol = chordSheetPre.classList.contains('print-two-columns');
  
  printArea.innerHTML = `
    ${headerHtml}
    <div class="chord-sheet-pre ${isTwoCol ? 'print-two-columns' : ''}">${chordsHtml}</div>
  `;
}

function setChordNotation(notation) {
  activeNotation = notation;
  
  document.getElementById('btnNotationChords').classList.toggle('active', notation === 'chords');
  document.getElementById('btnNotationNumbers').classList.toggle('active', notation === 'numbers');
  
  displayChordSheet();
}

// --- CCLI Nashville Numbers Conversion Helpers ---
const INTERVAL_TO_DEGREE = {
  0: '1', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4', 6: '#4', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7'
};

function chordToNumber(chordStr, key) {
  const keyBase = key.replace('m', '');
  const keySemi = NOTE_TO_SEMITONE[keyBase];

  if (keySemi === undefined) return chordStr;

  const parts = chordStr.split('/');
  const baseNum = convertSingleChordToNumber(parts[0], keySemi);

  if (parts.length > 1) {
    const bassNum = convertNoteToNumber(parts[1], keySemi);
    return `${baseNum}/${bassNum}`;
  }

  return baseNum;
}

function convertSingleChordToNumber(chordPart, keySemi) {
  const match = chordPart.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return chordPart;

  const note = match[1];
  const suffix = match[2];

  const noteSemi = NOTE_TO_SEMITONE[note];
  if (noteSemi === undefined) return chordPart;

  const interval = (noteSemi - keySemi + 12) % 12;
  const degree = INTERVAL_TO_DEGREE[interval] || '1';

  return degree + suffix;
}

function convertNoteToNumber(note, keySemi) {
  const noteSemi = NOTE_TO_SEMITONE[note];
  if (noteSemi === undefined) return note;

  const interval = (noteSemi - keySemi + 12) % 12;
  return INTERVAL_TO_DEGREE[interval] || '1';
}

// --- Chord Transposition Core Helpers ---
function transposeChord(chordStr, shift, useFlats) {
  if (shift === 0) return chordStr;

  const parts = chordStr.split('/');
  const rootChordTransposed = transposeSingleRootChord(parts[0], shift, useFlats);
  
  if (parts.length > 1) {
    const bassTransposed = shiftNote(parts[1], shift, useFlats);
    return `${rootChordTransposed}/${bassTransposed}`;
  }

  return rootChordTransposed;
}

function transposeSingleRootChord(chordPart, shift, useFlats) {
  const match = chordPart.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return chordPart;

  const rootNote = match[1];
  const suffix = match[2];

  const transposedRoot = shiftNote(rootNote, shift, useFlats);
  return transposedRoot + suffix;
}

function shiftNote(note, shift, useFlats) {
  const semi = NOTE_TO_SEMITONE[note];
  if (semi === undefined) return note;

  const newSemi = (semi + shift) % 12;
  const scale = useFlats ? SCALE_FLATS : SCALE_SHARPS;
  return scale[newSemi];
}

// --- Helper to fetch, base64 encode and register custom TTF fonts in jsPDF VFS ---
async function addCustomFontFromUrl(doc, url, family, style) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch font from ${url}`);
  const arrayBuffer = await response.arrayBuffer();
  
  // Convert ArrayBuffer to binary string safely
  let binaryString = "";
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binaryString);
  
  const filename = `${family}-${style}.ttf`;
  doc.addFileToVFS(filename, base64);
  doc.addFont(filename, family, style);
}

// --- Structured transposition parser for PDF drawing alignment ---
function getTransposedSongLines() {
  if (!currentModalSong || !currentModalKey) return [];

  const originalBase = currentModalSong.key.replace('m', '');
  const targetBase = currentModalKey.replace('m', '');

  const fromSemi = NOTE_TO_SEMITONE[originalBase];
  const toSemi = NOTE_TO_SEMITONE[targetBase];

  if (fromSemi === undefined || toSemi === undefined) {
    return currentModalSong.chords.trim().split('\n').map(line => ({ type: 'lyrics', text: line }));
  }

  const shift = (toSemi - fromSemi + 12) % 12;
  const useFlats = FLAT_KEYS.includes(targetBase);

  const cleanChords = currentModalSong.chords.trim();
  const rawLines = cleanChords.split('\n');
  
  let lines = [];

  rawLines.forEach(line => {
    // Check if section header
    const sectionHeaderMatch = line.match(/^\[(Verse \d+|Chorus|Pre-Chorus|Bridge|Intro|Outro|Channel \d+|Interlude)([^\]]*)\]\s*$/i);
    if (sectionHeaderMatch) {
      const headerText = sectionHeaderMatch[1].toUpperCase() + (sectionHeaderMatch[2] ? sectionHeaderMatch[2].toUpperCase() : '');
      lines.push({ type: 'section-header', text: headerText });
      return;
    }

    const chordRegex = /\[([^\]]+)\]/g;
    const hasChords = line.match(chordRegex);

    if (!hasChords) {
      lines.push({ type: 'lyrics', text: line });
      return;
    }

    // Check if it is a rhythm-only line (no lyrics, just slashes, bars, spaces, etc.)
    const textWithoutChords = line.replace(/\[[^\]]+\]/g, '');
    const isRhythmLine = /^[ /|\\\-\d().,x]*$/i.test(textWithoutChords);

    if (isRhythmLine) {
      let renderedLine = line.replace(/\[([^\]]+)\]/g, (match, chordVal) => {
        let transposedChord = transposeChord(chordVal, shift, useFlats);
        if (activeNotation === 'numbers') {
          transposedChord = chordToNumber(transposedChord, currentModalKey);
        }
        return transposedChord;
      });
      lines.push({ type: 'chords', text: renderedLine });
      return;
    }

    let chordsLine = "";
    let visibleChordsLength = 0;
    let lyricsLine = "";

    let index = 0;
    while (index < line.length) {
      if (line[index] === '[') {
        const endIdx = line.indexOf(']', index);
        if (endIdx > -1) {
          const chordVal = line.substring(index + 1, endIdx);
          
          let transposedChord = transposeChord(chordVal, shift, useFlats);
          if (activeNotation === 'numbers') {
            transposedChord = chordToNumber(transposedChord, currentModalKey);
          }
          
          const targetPos = lyricsLine.length;
          
          while (visibleChordsLength < targetPos) {
            chordsLine += " ";
            visibleChordsLength++;
          }

          if (visibleChordsLength > targetPos && chordsLine.length > 0) {
            chordsLine += " ";
            visibleChordsLength++;
          }

          chordsLine += transposedChord;
          visibleChordsLength += transposedChord.length;

          index = endIdx + 1;
          continue;
        }
      }

      lyricsLine += line[index];
      index++;
    }

    lines.push({ type: 'chords', text: chordsLine });
    lines.push({ type: 'lyrics', text: lyricsLine });
  });

  return lines;
}

// --- Draw a single line with precise styling ---
function drawPDFLine(doc, line, x, y, fontRegular, fontBold) {
  if (line.type === 'section-header') {
    doc.setFont(fontBold, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 110, 110);
    doc.text(line.text, x, y);
    return y + 4.5;
  } else if (line.type === 'chords') {
    doc.setFont(fontBold, 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(63, 56, 202); // Deep Indigo
    doc.text(line.text, x, y);
    return y + 3.4; // chords closer to lyrics below
  } else {
    // Lyrics line or empty space
    doc.setFont(fontRegular, 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 30, 30);
    doc.text(line.text, x, y);
    return y + 4.8; // larger gap to next line/block
  }
}

// --- Custom Client-side Vector PDF Generation using jsPDF ---
async function downloadPDF() {
  if (!currentModalSong) return;

  const btn = document.getElementById('btnDownloadPDF');
  const originalContent = btn.innerHTML;
  
  // Show loading indicator
  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.innerHTML = `
    <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 1.1rem; height: 1.1rem; animation: spin 1s linear infinite; margin-right: 0.5rem; display: inline-block; vertical-align: middle;">
      <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path style="opacity: 0.75;" fill="currentColor" d="M 4 12 a 8 8 0 0 1 8 -8 V 0 C 5.373 0 0 5.373 0 12 h 4 z"></path>
    </svg>
    Erstelle PDF...
  `;

  // Inject spin keyframes if not existing
  if (!document.getElementById('pdf-spin-style')) {
    const style = document.createElement('style');
    style.id = 'pdf-spin-style';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let fontRegular = 'JetBrainsMono';
    let fontBold = 'JetBrainsMono';

    // Attempt to load JetBrains Mono from CDN for full Unicode/umlauts support
    try {
      await addCustomFontFromUrl(doc, 'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Regular.ttf', 'JetBrainsMono', 'normal');
      await addCustomFontFromUrl(doc, 'https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Bold.ttf', 'JetBrainsMono', 'bold');
    } catch (err) {
      console.warn("Could not load JetBrains Mono, falling back to Courier:", err);
      fontRegular = 'courier';
      fontBold = 'courier';
    }

    // 1. Draw SongSelect-Style Clean Header
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(26, 26, 26);
    doc.text(currentModalSong.title, 15, 20);

    // Author
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text(`Von ${currentModalSong.author}`, 15, 25);

    // Divider Line 1
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.3);
    doc.line(15, 27, 195, 27);

    // Metadata Row
    const timeSig = currentModalSong.timeSig || (currentModalSong.bpm > 90 ? "4/4" : (currentModalSong.bpm > 75 ? "6/8" : "3/4"));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    doc.text(`Tonart: ${currentModalKey}   |   BPM: ${currentModalSong.bpm}   |   Takt: ${timeSig}`, 15, 32);

    // Divider Line 2
    doc.line(15, 34, 195, 34);

    // Get parsed/transposed structured lines
    const lines = getTransposedSongLines();

    // 2. Layout Positioning and Columns Distribution
    const colMaxLines = 52;
    const totalLines = lines.length;
    const yStart = 42;

    if (totalLines <= colMaxLines) {
      // Single Column Layout
      let y = yStart;
      lines.forEach(line => {
        y = drawPDFLine(doc, line, 15, y, fontRegular, fontBold);
      });
    } else {
      // Balanced Two-Column Layout (without breaking sections)
      let sections = [];
      let currentSec = [];
      lines.forEach(line => {
        if (line.type === 'section-header' && currentSec.length > 0) {
          sections.push(currentSec);
          currentSec = [];
        }
        currentSec.push(line);
      });
      if (currentSec.length > 0) {
        sections.push(currentSec);
      }

      let col1Sections = [];
      let col2Sections = [];
      let col1LinesCount = 0;
      const halfLines = totalLines / 2;

      sections.forEach(sec => {
        if (col1LinesCount < halfLines) {
          col1Sections.push(sec);
          col1LinesCount += sec.length;
        } else {
          col2Sections.push(sec);
        }
      });

      // Render Column 1
      let y = yStart;
      col1Sections.forEach(sec => {
        sec.forEach(line => {
          y = drawPDFLine(doc, line, 15, y, fontRegular, fontBold);
        });
        y += 2.0; // small section gap
      });

      // Render Column 2
      y = yStart;
      col2Sections.forEach(sec => {
        sec.forEach(line => {
          y = drawPDFLine(doc, line, 110, y, fontRegular, fontBold);
        });
        y += 2.0; // small section gap
      });
    }

    // 3. Draw Footer Note at the bottom of A4 page (CCLI + Vineyard usage warning)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);

    const vineyardNotice = "Nur für den Gebrauch in den Gottesdiensten der Vineyard Bern. Jegliche andere oder externe Nutzung ist untersagt.";

    if (currentModalSong.ccli) {
      // Draw divider line slightly higher to accommodate two footer lines
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.2);
      doc.line(15, 279, 195, 279);

      doc.text(`CCLI-Songnummer: ${currentModalSong.ccli}`, 105, 283, { align: 'center' });
      doc.text(vineyardNotice, 105, 287, { align: 'center' });
    } else {
      // Draw divider line
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.2);
      doc.line(15, 282, 195, 282);

      doc.text(vineyardNotice, 105, 287, { align: 'center' });
    }

    // Save/Download PDF
    const filename = `${currentModalSong.title} - Chords & Lyrics.pdf`;
    doc.save(filename);

  } catch (err) {
    console.error("PDF generation failed:", err);
    alert("PDF konnte nicht erstellt werden. Bitte versuche es erneut.");
  } finally {
    // Reset button state
    btn.disabled = false;
    btn.style.opacity = '';
    btn.innerHTML = originalContent;
  }
}

// Bind to window for backup inline triggers
window.downloadPDF = downloadPDF;

// --- Shared Password Lockscreen Authentication Logic ---
function checkAuthenticationState() {
  const isAuth = localStorage.getItem('songpool_authenticated') === 'true';
  const overlay = document.getElementById('loginOverlay');
  const appContainer = document.querySelector('.app-container');
  if (overlay) {
    if (isAuth) {
      overlay.classList.add('hidden');
      if (appContainer) {
        appContainer.style.display = '';
      }
    } else {
      overlay.classList.remove('hidden');
      if (appContainer) {
        appContainer.style.display = 'none';
      }
      const pwdInput = document.getElementById('passwordInput');
      if (pwdInput) {
        pwdInput.focus();
      }
    }
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('passwordInput');
  const errorMsg = document.getElementById('loginError');
  const overlay = document.getElementById('loginOverlay');
  const appContainer = document.querySelector('.app-container');

  if (passwordInput && passwordInput.value === SHARED_PASSWORD) {
    localStorage.setItem('songpool_authenticated', 'true');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    if (appContainer) {
      appContainer.style.display = '';
    }
    if (errorMsg) {
      errorMsg.style.display = 'none';
    }
    passwordInput.value = '';
  } else {
    if (errorMsg) {
      errorMsg.style.display = 'block';
    }
    if (passwordInput) {
      passwordInput.value = '';
      passwordInput.focus();
    }
  }
}

function logout() {
  localStorage.removeItem('songpool_authenticated');
  checkAuthenticationState();
}

// Bind to window for HTML event handlers
window.checkAuthenticationState = checkAuthenticationState;
window.handleLoginSubmit = handleLoginSubmit;
window.logout = logout;
