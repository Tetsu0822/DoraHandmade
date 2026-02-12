import React from 'react';
import { Sparkles, ShoppingCart, Heart, Crown, User, MoveRight, Scissors, Spool, BookOpen, Copyright, Menu, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, X, Plus, Minus, Ellipsis, WandSparkles } from 'lucide-react';
import { HeartFill, Facebook, Line, Instagram } from '@components/icons';
import ProductCard from '@components/ProductCard';
import productImage1 from '@images/12140_0 1.png';
import productImage2 from '@images/12140_0 2.png';
import productImage3 from '@images/12140_0 1-1.png';
import productImage4 from '@images/12140_0 1-2.png';
import productImage5 from '@images/12140_0 1-3.png';
import productImage6 from '@images/12140_0 2-1.png';

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
  ]
};

const productNew = productData['新品上架'];

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-6 row-gap-md-8">
          {productNew.map((product) => (
            <div className="col">
              <ProductCard key={product.name} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;