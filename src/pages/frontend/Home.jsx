import React from 'react';
import { Sparkles, Crown, MoveRight, Scissors, BookOpen } from 'lucide-react';
import { ClassicBow, WavyLine } from '@components/icons';
import ProductCard from '@components/ProductCard';
import ArticleCard from '@components/ArticleCard';
import productImage1 from '@images/product-1.png';
import productImage2 from '@images/product-2.png';
import productImage3 from '@images/product-3.png';
import productImage4 from '@images/product-4.png';
import productImage5 from '@images/product-5.png';
import productImage6 from '@images/product-6.png';
import productImage7 from '@images/product-7.png';
import productImage8 from '@images/product-8.png';
import productImage9 from '@images/product-9.png';
import materialImage1 from '@images/material-1.png';
import materialImage2 from '@images/material-2.png';
import materialImage3 from '@images/material-3.png';
import articleImage1 from '@images/article-1.png';
import articleImage2 from '@images/article-2.png';

const productData = {
  '新品上架': [
    {
      name: '聖誕雪花點點蝴蝶結',
      price: 777,
      image: productImage1,
      bgClass: 'bg-gray-100'
    },
    {
      name: '聖誕紅緞帶雙層蝴蝶結',
      price: 777,
      image: productImage2,
      bgClass: 'bg-gray-100'
    },
    {
      name: '暖冬毛絨小鹿蝴蝶結',
      price: 777,
      image: productImage3,
      bgClass: 'bg-gray-100'
    },
    {
      name: '銀白冬夜亮片蝴蝶結',
      price: 777,
      image: productImage4,
      bgClass: 'bg-gray-100'
    },
    {
      name: '秋野麥色復古蝴蝶結',
      price: 777,
      image: productImage5,
      bgClass: 'bg-gray-100'
    },
    {
      name: '天鵝絨質感蝴蝶結',
      price: 777,
      image: productImage6,
      bgClass: 'bg-gray-100'
    },
  ],
  '熱銷 TOP': [
    {
      name: '晨光霧面緞帶蝴蝶結',
      price: 777,
      image: productImage7,
      bgClass: 'bg-secondary-100'
    },
    {
      name: '柔霧奶茶雙層蝴蝶結',
      price: 777,
      image: productImage8,
      bgClass: 'bg-gray-100'
    },
    {
      name: '夢幻粉雙層蕾絲蝴蝶結',
      price: 777,
      image: productImage9,
      bgClass: 'bg-gray-100'
    },
  ],
  '材料新上架': [
    {
      name: '霧面緞帶（奶霜白 25mm）',
      price: 777,
      image: materialImage1,
      bgClass: 'bg-secondary-100'
    },
    {
      name: '亮面緞帶（櫻花粉 38mm）',
      price: 777,
      image: materialImage2,
      bgClass: 'bg-gray-100'
    },
    {
      name: '金邊緞帶（焦糖棕 25mm）',
      price: 777,
      image: materialImage3,
      bgClass: 'bg-gray-100'
    },
  ]
};

const articleData = [
  {
    id: 1,
    title: '新手也能做！3 種超簡單蝴蝶結綁法教學',
    content: '剛開始接觸手作？這篇教你三種最容易上手的蝴蝶結綁法，\n從基本對折到立體雙層，五分鐘完成第一個作品！',
    image: articleImage1,
    likes: 2,
    createdAt: '2026-01-01'
  },
  {
    id: 2,
    title: '如何挑選緞帶？四種材質的手感與用途總整理',
    content: '緞帶材質百百種，霧面、亮面、雪紗、絨布到底差在哪？\n文章教你如何依作品風格挑選最適合的材料',
    image: articleImage2,
    likes: 2,
    createdAt: '2025-12-20'
  }
];

const newProducts = productData['新品上架'];
const bestSellers = productData['熱銷 TOP'];
const newMaterials = productData['材料新上架'];

function Home() {
  return (
    <div className="home">
      <div className="container py-10 py-lg-15">
        <h2 className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-2 gap-lg-3 text-p-28-b text-primary-700 mb-6 mb-lg-12">
          <Sparkles style={{ marginTop: "2px" }} />
          <span className="t-section-title">新品上架</span>
        </h2>
        <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {newProducts.map((product) => (
            <li className="col list-unstyled" key={product.id ?? product.name}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="text-center">
          <a href="#" className="btn btn-underline">
            查看全部新品
          </a>
        </div>
      </div>

      <div className="bg-primary-50">
        <div className="container py-10 py-lg-15">
          <h2 className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-2 gap-lg-3 text-p-28-b text-primary-700 mb-6 mb-lg-12">
            <Crown style={{ marginTop: "2px" }} />
            <span className="t-section-title">熱銷 TOP</span>
          </h2>
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
            {bestSellers.map((product) => (
              <li className="col list-unstyled" key={product.id ?? product.name}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="text-center">
            <a href="#" className="btn btn-underline">
              查看更多人氣商品
            </a>
          </div>
        </div>
      </div>
      
      <div className="container pt-10 pb-6 py-lg-15">
        <h2 className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-2 gap-lg-3 text-p-28-b text-primary-700 mb-6 mb-lg-12">
          <Scissors style={{ marginTop: "2px" }} />
          <span className="t-section-title">材料新上架</span>
        </h2>
        <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {newMaterials.map((product) => (
            <li className="col list-unstyled" key={product.id ?? product.name}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="text-center">
          <a href="#" className="btn btn-underline">
            查看全部新材料
          </a>
        </div>
      </div>
      
      <div className="position-relative">
        <WavyLine className="position-absolute d-none d-lg-inline-block" style={{ top: "-25px", left: "100px" }} />
        <WavyLine className="position-absolute d-none d-lg-inline-block" style={{ top: "75px", right: "100px" }} />
      </div>
      <div className="container pb-10 pb-lg-12">
        <div className="d-flex align-items-center justify-content-center gap-12 py-4 mb-6 mb-lg-12">
          <ClassicBow className="d-none d-lg-inline-flex" />
          <ClassicBow />
          <ClassicBow width={60} height={44} />
          <ClassicBow />
          <ClassicBow className="d-none d-lg-inline-flex" />
        </div>
        <h2 className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-2 gap-lg-3 text-p-28-b text-primary-700 mb-6 mb-lg-12">
          <BookOpen style={{ marginTop: "2px" }} />
          <span className="t-section-title">最新文章</span>
        </h2>
        <ul className="row row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {articleData.map((article) => (
            <li className="col-12 list-unstyled" key={article.id ?? article.title}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
        <div className="text-center">
          <a href="#" className="btn btn-underline">
            更多文章
          </a>
        </div>
      </div>

      <div className="start-customization">
        <div className="container">
          <div className="text-center text-lg-start">
            <h2 className="mb-2">每一個蝴蝶結，都只為你而生</h2>
            <h3 className="mb-6">Dream it, pick it, wear it-super cute guaranteed.</h3>
            <a href="#" className="btn btn-dora-outline d-inline-flex align-items-center gap-2">
              開始客製化<MoveRight strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;