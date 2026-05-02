/* =========================================
   member.js  -  メンバー詳細ページ
   ========================================= */

document.addEventListener('DOMContentLoaded', async () => {
  // URLパラメータからidを取得
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  if (!id) {
    showNotFound();
    return;
  }

  // データ取得
  const members = await fetchMembers();
  const member = members.find(m => m.id === id);

  if (!member) {
    showNotFound();
    return;
  }

  // 描画
  renderMember(member);
});


/**
 * メンバー情報を画面に反映
 */
function renderMember(m) {
  // パンくず
  document.getElementById('bc-name').textContent = m['会社名'] || '';
  document.title = `${m['会社名']} ｜ チームIT`;

  // ヒーロー
  const cat = (m['カテゴリー'] || '').split(/[,、]/)[0].trim();
  document.getElementById('md-tag').textContent = cat;
  document.getElementById('md-name').textContent = m['会社名'] || '';
  document.getElementById('md-tagline').textContent = m['特徴強み'] || '';

  // 基本情報
  const info = document.getElementById('md-info');
  const rows = [];
  if (m['会社名']) rows.push(['会社名', m['会社名']]);
  if (m['所在地']) rows.push(['所在地', m['所在地']]);
  if (m['カテゴリー']) rows.push(['カテゴリー', formatCategories(m['カテゴリー'])]);
  if (m['URL']) rows.push(['Webサイト', `<a href="${escapeHtml(m['URL'])}" target="_blank" rel="noopener">${escapeHtml(m['URL'])}</a>`]);

  info.innerHTML = rows.map(([k, v]) => `
    <dt>${escapeHtml(k)}</dt>
    <dd>${v}</dd>
  `).join('');

  // 特徴・強みセクション
  showSectionIfPresent({
    sectionId: 'md-section-feature',
    textElId: 'md-feature-text',
    imgWrapId: 'md-feature-img-wrap',
    imgElId: 'md-feature-img',
    text: m['特徴強み'],
    imgUrl: m['特徴画像URL']
  });

  // 事業内容セクション
  showSectionIfPresent({
    sectionId: 'md-section-service',
    textElId: 'md-service-text',
    imgWrapId: 'md-service-img-wrap',
    imgElId: 'md-service-img',
    text: m['事業内容'],
    imgUrl: m['事業内容画像URL']
  });

  // アピールポイントセクション
  showSectionIfPresent({
    sectionId: 'md-section-appeal',
    textElId: 'md-appeal-text',
    imgWrapId: 'md-appeal-img-wrap',
    imgElId: 'md-appeal-img',
    text: m['アピール'],
    imgUrl: m['アピール画像URL']
  });
}


/**
 * セクションの表示制御 - 内容があれば表示、なければ非表示
 */
function showSectionIfPresent({ sectionId, textElId, imgWrapId, imgElId, text, imgUrl }) {
  if (!text && !imgUrl) return;

  document.getElementById(sectionId).style.display = '';

  if (text) {
    document.getElementById(textElId).textContent = text;
  }

  const driveUrl = convertDriveUrl(imgUrl);
  if (driveUrl) {
    document.getElementById(imgElId).src = driveUrl;
    document.getElementById(imgWrapId).style.display = '';
  }
}


/**
 * カテゴリーをカンマ区切りで整形
 */
function formatCategories(catStr) {
  return catStr.split(/[,、]/).map(c => escapeHtml(c.trim())).join('、');
}


/**
 * メンバーが見つからない場合
 */
function showNotFound() {
  document.querySelector('main .container').innerHTML = `
    <div class="page-header" style="text-align:center; padding: 80px 0;">
      <h1>メンバーが見つかりません</h1>
      <p class="page-desc">指定されたメンバーは存在しないか、現在公開されていません。</p>
      <p style="margin-top:32px;"><a href="list.html" class="btn btn-primary">メンバー一覧へ戻る</a></p>
    </div>
  `;
}


// ユーティリティ
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
