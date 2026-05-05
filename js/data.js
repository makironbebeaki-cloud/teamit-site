/* =========================================
   data.js  -  メンバーデータの取得
   ========================================= */

/**
 * 設定: 動作モード
 * 'sample'  ... サンプルデータで動かす（最初はこちら）
 * 'sheet'   ... Googleスプレッドシートから取得
 */
const DATA_MODE = 'sheet';

/**
 * Googleスプレッドシートの公開URL
 * 'sheet' モードに切り替える前に、ここに自分のURLを貼り付けてください
 *
 * 取得方法:
 * 1) スプレッドシートを開く
 * 2) ファイル > 共有 > ウェブに公開
 * 3) 公開対象のシートを選び、形式を「カンマ区切り形式 (.csv)」にする
 * 4) 公開ボタンを押し、発行されたURLをここに貼り付け
 */
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbt_OkC6qzlwZ0kV8i0wNF8eNH1CU0wc5nGyD5qd-AXxGTMQQXsnt9aBXxV9Yn1pud176ZPiQJJtqz/pub?gid=0&single=true&output=csv';


/**
 * サンプルデータ
 * Googleフォームの項目と完全に揃えてあります
 */
const SAMPLE_DATA = [
  {
    id: '001',
    会社名: 'サクラデザイン合同会社',
    URL: 'https://sakura-design.example.jp',
    ロゴ画像URL: '',
    カテゴリー: 'ホームページ制作／LP制作',
    所在地: '大阪府',
    特徴強み: '製造業・BtoB企業のサイト制作実績が80件以上。現場取材を重視した、リアルな魅力の言語化が得意です。',
    特徴画像URL: '',
    事業内容: '中小製造業を中心に、コーポレートサイト・採用サイト・ランディングページの制作を行っています。要件定義からデザイン、実装、公開後のサポートまでワンストップで対応可能です。',
    事業内容画像URL: '',
    アピール: '製造業の現場経験を持つメンバーが在籍しているため、業界用語や工程の理解がスムーズです。「他社では何度説明しても伝わらなかった」というお声をよくいただきます。',
    アピール画像URL: ''
  },
  {
    id: '002',
    会社名: '株式会社みらいクリエイト',
    URL: 'https://mirai-create.example.jp',
    ロゴ画像URL: '',
    カテゴリー: '動画制作／映像コンテンツ制作',
    所在地: '京都府',
    特徴強み: '短納期・低価格で、伝わる動画を作ります。1分のショート動画なら最短3営業日で納品可能。',
    特徴画像URL: '',
    事業内容: '採用動画、商品PR、SNS用ショート動画の制作。撮影・編集・ナレーション収録まで内製化しているため、コストを抑えて高品質を実現します。',
    事業内容画像URL: '',
    アピール: 'テンプレート活用と内製化により、業界平均の半額〜70%程度の価格で提供可能。それでいて品質は受賞歴のあるディレクターが担保します。',
    アピール画像URL: ''
  },
  {
    id: '003',
    会社名: 'コトノハ・スタジオ',
    URL: 'https://kotonoha.example.jp',
    ロゴ画像URL: '',
    カテゴリー: 'ホームページ制作／LP制作',
    所在地: '兵庫県',
    特徴強み: 'ランディングページ制作の経験が豊富な少数精鋭チーム。コピーライティングからデザインまで一貫対応。',
    特徴画像URL: '',
    事業内容: 'EC・サブスクリプション・教育サービス向けのLP制作。CV率改善のためのABテスト運用までサポートします。',
    事業内容画像URL: '',
    アピール: 'Shopify、STUDIO、WordPressのいずれにも対応可能。ご要望の予算と運用しやすさに応じて、最適な技術選定からご提案します。',
    アピール画像URL: ''
  },
  {
    id: '004',
    会社名: 'ノードワークス',
    URL: 'https://node-works.example.jp',
    ロゴ画像URL: '',
    カテゴリー: 'Webシステム開発',
    所在地: '大阪府',
    特徴強み: '属人化したExcel業務を、Webシステムへ置き換えます。業務ヒアリングからの要件定義に強み。',
    特徴画像URL: '',
    事業内容: '在庫管理、受発注、請求管理、顧客管理などの業務システム開発。ノーコード/ローコードを活用した低予算開発から、フルスクラッチ開発まで規模に応じて対応します。',
    事業内容画像URL: '',
    アピール: 'リプレイス案件の実績が多数あり、既存システムから新システムへの移行で発生しやすいデータ移行・ユーザー教育まで含めた支援が可能です。',
    アピール画像URL: ''
  },
  {
    id: '005',
    会社名: 'FieldOps',
    URL: 'https://fieldops.example.jp',
    ロゴ画像URL: '',
    カテゴリー: 'アプリ開発',
    所在地: '奈良県',
    特徴強み: '現場業務を、紙からアプリへ。建設・設備点検現場の専門家。導入実績40社以上。',
    特徴画像URL: '',
    事業内容: '建設、設備点検、店舗巡回、日報業務向けのスマートフォンアプリ開発。iOS/Android両対応、写真・位置情報連携、オフライン環境を想定した堅牢な設計が特徴です。',
    事業内容画像URL: '',
    アピール: '電波の悪い建設現場でも動作するオフライン対応設計が強み。同業他社にはない技術的な信頼性で、大手ゼネコン様にもご利用いただいています。',
    アピール画像URL: ''
  },
  {
    id: '006',
    会社名: 'DX相談室 おむすび',
    URL: 'https://omusubi.example.jp',
    ロゴ画像URL: '',
    カテゴリー: 'IT・DX相談',
    所在地: '和歌山県',
    特徴強み: 'ひとり情シスや、業者撤退後の駆け込み寺。IT全般を中立的な立場でアドバイス。',
    特徴画像URL: '',
    事業内容: '従業員30名以下の中小企業を中心に、現状調査と簡易ロードマップを月額で提供しています。ベンダー選定の同席・交渉支援も可能です。',
    事業内容画像URL: '',
    アピール: '特定のベンダーに紐づかない中立的なポジション。お客様の事情を最優先に、必要なものだけをシンプルに提案します。',
    アピール画像URL: ''
  }
];


/**
 * メンバーデータを取得する（DATA_MODEで切り替え）
 * @returns {Promise<Array>} メンバーデータの配列
 */
async function fetchMembers() {
  if (DATA_MODE === 'sample') {
    // サンプルモード: 即座にサンプルデータを返す
    return Promise.resolve(SAMPLE_DATA);
  }

  // 本番モード: スプレッドシートから取得
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error('スプレッドシートの取得に失敗');

    const csvText = await response.text();
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim()
    });

    // 「公開フラグ」列が TRUE のものだけ返す
    const members = result.data.filter(row => {
      const flag = (row['公開フラグ'] || '').toString().trim().toUpperCase();
      return flag === 'TRUE' || flag === '1' || flag === '公開';
    });

    return members;
  } catch (error) {
    console.error('データ取得に失敗しました:', error);
    return [];
  }
}


/**
 * Googleドライブの共有URLを直リンク形式に変換
 * 例) https://drive.google.com/file/d/XXX/view  →  https://drive.google.com/uc?export=view&id=XXX
 */
function convertDriveUrl(url) {
  if (!url) return '';
  const match = url.match(/\/file\/d\/([^\/]+)/);
  if (!match) return url;
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
}
