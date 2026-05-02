/* =========================================
   list.js  -  メンバー一覧ページ
   ========================================= */

let allMembers = [];
let currentCategory = 'すべて';
let currentKeyword = '';

document.addEventListener('DOMContentLoaded', async () => {
  // データ取得
  allMembers = await fetchMembers();

  // URLパラメータからカテゴリーを取得
  const params = new URLSearchParams(location.search);
  const cat = params.get('category');
  if (cat) {
    currentCategory = cat;
    // 該当のフィルターボタンをアクティブに
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });
  }

  // フィルター適用＆描画
  applyFilters();

  // イベントリスナー
  setupFilterButtons();
  setupSearch();
});


/**
 * フィルター・検索条件を適用してメンバーを絞り込み
 */
function applyFilters() {
  let filtered = allMembers;

  // カテゴリーで絞り込み
  if (currentCategory !== 'すべて') {
    filtered = filtered.filter(m => {
      const cats = (m['カテゴリー'] || '').split(/[,、]/).map(c => c.trim());
      return cats.some(c => c === currentCategory);
    });
  }

  // キーワード検索
  if (currentKeyword) {
    const kw = currentKeyword.toLowerCase();
    filtered = filtered.filter(m => {
      const haystack = [
        m['会社名'], m['特徴強み'], m['事業内容'],
        m['アピール'], m['所在地'], m['カテゴリー']
      ].join(' ').toLowerCase();
      return haystack.includes(kw);
    });
  }

  renderList(filtered);
  updateCount(filtered.length);
}


/**
 * メンバーカードのHTMLを生成して描画
 */
function renderList(members) {
  const grid = document.getElementById('members-grid');

  if (members.length === 0) {
    grid.innerHTML = '<p class="loading">該当するメンバーがいません。条件を変えてお試しください。</p>';
    return;
  }

  grid.innerHTML = members.map(m => {
    const logoUrl = convertDriveUrl(m['ロゴ画像URL']);
    const thumb = logoUrl
      ? `<div class="member-thumb"><img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(m['会社名'])}"></div>`
      : `<div class="member-thumb no-img">${escapeHtml(initials(m['会社名']))}</div>`;

    const cat = (m['カテゴリー'] || '').split(/[,、]/)[0].trim();

    return `
      <article class="member-card" onclick="location.href='member.html?id=${encodeURIComponent(m.id)}'">
        ${thumb}
        <div class="member-body">
          <span class="member-tag">${escapeHtml(cat)}</span>
          <h3>${escapeHtml(m['会社名'] || '')}</h3>
          <p class="desc">${escapeHtml(truncate(m['特徴強み'] || '', 80))}</p>
          <div class="member-meta">
            <span class="area">${escapeHtml(m['所在地'] || '')}</span>
            <span class="more">詳しく見る  →</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}


/**
 * 件数表示の更新
 */
function updateCount(n) {
  const el = document.getElementById('result-count');
  el.textContent = `${n} 件のメンバーが見つかりました`;
}


/**
 * フィルターボタンのイベント設定
 */
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // active切り替え
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // カテゴリー更新＆再描画
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });
}


/**
 * 検索ボックスのイベント設定
 */
function setupSearch() {
  const input = document.getElementById('search-input');
  let timer;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentKeyword = e.target.value.trim();
      applyFilters();
    }, 200); // 200ms待ってから検索（連続入力対策）
  });
}


// ====== ユーティリティ ======

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

function initials(name) {
  if (!name) return '?';
  // 日本語の場合は最初の1文字、英語の場合は頭文字
  return name.charAt(0);
}
