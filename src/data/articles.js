import articleImage1_small from '@images/articles/article-1-small.png';
import articleImage1_regular from '@images/articles/article-1-regular.jpg';
import articleImage2_small from '@images/articles/article-2-small.png';
import articleImage2_regular from '@images/articles/article-2-regular.jpg';

export const articles = [
  {
    id: 1,
    title: '新手也能做！3 種超簡單蝴蝶結綁法教學',
    abstract: '剛開始接觸手作？這篇教你三種最容易上手的蝴蝶結綁法，\n從基本對折到立體雙層，五分鐘完成第一個作品！',
    thumbnail: articleImage1_small,
    image: articleImage1_regular,
    sections: [
      { type: 'paragraph', text: '剛開始接觸手作，總覺得蝴蝶結很難綁得對稱嗎？其實只要掌握幾個關鍵轉折，就能讓平淡的緞帶瞬間升級。這篇教你三種最容易上手的蝴蝶結綁法，從基本對折到立體雙層，五分鐘完成第一個作品！' },
      { type: 'list-title', text: '準備材料：' },
      { type: 'unordered-list', items: ['2.5cm 寬緞帶', '手作專用剪刀', '雙面膠或熱熔槍'] },
      { type: 'list-title', text: '教學步驟：' },
      { type: 'ordered-list', items: [
        '基礎單層蝴蝶結：將左耳壓在右耳上方，穿過下方的孔洞後拉緊。',
        '立體雙層蝴蝶結：先製作一個較大的基礎環，疊加一段中心裝飾帶。',
        '無縫叉子綁法：利用家中的餐叉，適合製作 2cm 以下的小巧蝴蝶結。'
      ]},
      { type: 'highlight', text: '💡 專業小撇步：剪斷緞帶後，記得用打火機稍微「燒邊」，防止脫線！' }
    ],
    likes: 2,
    createdAt: '2026-01-01'
  },
  {
    id: 2,
    title: '如何挑選緞帶？四種材質的手感與用途總整理',
    abstract: '緞帶材質百百種，霧面、亮面、雪紗、絨布到底差在哪？\n文章教你如何依作品風格挑選最適合的材料',
    thumbnail: articleImage2_small,
    image: articleImage2_regular,
    sections: [
      { type: 'paragraph', text: '緞帶材質百百種，霧面、亮面、雪紗、絨布到底差在哪？本篇文章將教你如何依據作品風格，精準挑選最適合的材料。' },
      { type: 'table', 
        headers: ['材質', '特性描述', '適合用途'],
        rows: [
          ['亮面緞帶', '光澤感強、觸感滑順', '禮物包裝、髮飾主體'],
          ['羅紋帶', '表面有橫向條紋，質地較硬', '髮夾包邊、立體花朵'],
          ['雪紗帶', '半透明輕盈感', '婚禮裝飾、衣飾點綴'],
          ['絨布帶', '厚實溫暖，具復古質感', '秋冬飾品、精緻胸針']
        ] 
      },
      { type: 'paragraph', text: '挑選建議：髮飾建議選 2.5cm - 4cm；如果要綁出立體的蝴蝶結，羅紋帶會比亮面緞帶更容易維持造型。' }
    ],
    likes: 2,
    createdAt: '2025-12-20'
  }
];
