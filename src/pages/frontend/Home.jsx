import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Sparkles, Crown, MoveRight, Scissors, BookOpen } from 'lucide-react';
import { ClassicBow, WavyLine } from '@components/icons';
import ProductCard from '@components/ProductCard';
import ArticleCard from '@components/ArticleCard';
import SwiperNavButtons from '@components/SwiperNavButtons';
import articleImage1 from '@images/article-1.png';
import articleImage2 from '@images/article-2.png';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

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

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newMaterials, setNewMaterials] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        const _products = response.data.products?.filter(product => product.is_enabled);

        const _newProducts = _products.filter(product => product.is_new && product.parentCategory === '成品');
        setNewProducts(_newProducts);

        const _bestSellers = _products.filter(product => product.is_hot);
        setBestSellers(_bestSellers);

        const _newMaterials = _products.filter(product => product.is_new && product.parentCategory === '材料');
        setNewMaterials(_newMaterials);
      } catch (error) {
        console.error(error);
      }
    }
    
    getProducts();
  }, []);

  return (
    <div className="home">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 6000
        }}
        loop
      >
        <SwiperSlide className="swiper-slide-1">
          <div className="container">
            <h1 className="t-page-title mb-2 mb-lg-4">為日常，綁上一點可愛</h1>
            <p className="t-page-subtitle mb-6">手作蝴蝶結，讓每一天都多一點溫柔與亮點</p>
            <Link to="/product" className="btn btn-dora d-inline-flex align-items-center gap-2">
              逛逛手作商品<MoveRight strokeWidth={2.5} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-2">
          <div className="container">
            <h1 className="t-title mb-2 mb-lg-4">暖冬限定，為你準備的溫柔色系</h1>
            <p className="t-page-subtitle mb-6">季節限定蝴蝶結，專屬這個時刻的可愛</p>
            <Link to="/product" className="btn btn-dora d-inline-flex align-items-center gap-2">
              查看季節限定<MoveRight strokeWidth={2.5} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-3">
          <div className="container">
            <h1 className="t-title mb-2 mb-lg-4">嚴選材料，讓手作更安心</h1>
            <p className="t-page-subtitle mb-6">我們也販售創作者愛用的緞帶與材料</p>
            <Link to="/product" className="btn btn-dora d-inline-flex align-items-center gap-2">
              查看手作材料<MoveRight strokeWidth={2.5} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperNavButtons />
      </Swiper>
      
      <div className="container py-10 py-lg-15">
        <h2 className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-2 gap-lg-3 text-p-28-b text-primary-700 mb-6 mb-lg-12">
          <Sparkles style={{ marginTop: "2px" }} />
          <span className="t-section-title">新品上架</span>
        </h2>
        <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {newProducts.map((product) => (
            <li className="col list-unstyled" key={product.id || product.title}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Link to="/product" className="btn btn-underline">
            查看全部新品
          </Link>
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
              <li className="col list-unstyled" key={product.id || product.title}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Link to="/product" className="btn btn-underline">
              查看更多人氣商品
            </Link>
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
            <li className="col list-unstyled" key={product.id || product.title}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Link to="/product" className="btn btn-underline">
            查看全部新材料
          </Link>
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
            <li className="col-12 list-unstyled" key={article.id || article.title}>
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
            <Link to="/custom-form" className="btn btn-dora-outline d-inline-flex align-items-center gap-2">
              開始客製化<MoveRight strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;