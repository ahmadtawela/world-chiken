import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Star, Clock, Truck, Phone, MapPin, Flame, ChevronLeft, MessageSquare, Plus, Minus, Trash2, CheckCircle, Map, Navigation } from 'lucide-react';

const CATEGORIES = ['الكل', 'برجر', 'وجبات', 'إضافات', 'سلطات', 'مشروبات'];

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const INITIAL_REVIEWS = [
  { id: 1, name: 'أحمد محمد', rating: 5, comment: 'أفضل برجر ذقته في حياتي! التوصيل كان سريع جداً.', date: 'قبل يومين' },
  { id: 2, name: 'سارة خالد', rating: 4, comment: 'الدجاج مقرمش ولذيذ، لكن البطاطس كانت باردة قليلاً.', date: 'قبل أسبوع' },
  { id: 3, name: 'فهد العتيبي', rating: 5, comment: 'خدمة ممتازة وطعم رائع. سأطلب مرة أخرى بالتأكيد.', date: 'قبل شهر' },
  { id: 4, name: 'نورة السالم', rating: 5, comment: 'الموهيتو منعش جداً والوجبات حجمها مشبع.', date: 'قبل شهرين' }
];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'برجر وورلد تشيكن الكلاسيكي',
    description: 'قطعة دجاج مقرمشة مع الخس الطازج، المخلل، وصوص وورلد تشيكن الخاص.',
    price: 30000,
    rating: 4.8,
    reviewsCount: 124,
    category: 'برجر',
    rs: '30000',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'وجبة 4 قطع بروستد',
    description: '4 قطع دجاج مقرمش تقدم مع البطاطس المقلية، الكولسلو، ومشروب غازي.',
    price: 450,
    rating: 4.9,
    reviewsCount: 89,
    category: 'وجبات',
    rs: '45000',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'برجر دبل سبايسي',
    description: 'قطعتين دجاج حار مع الجبنة الذائبة، هالبينو، وصوص حار.',
    price: 420 ,
    rating: 4.7,
    reviewsCount: 56,
    category: 'برجر',
    rs: '42000',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'بطاطس مقلية بالجبنة',
    description: 'بطاطس مقرمشة مغطاة بصلصة الجبنة الشيدر الذائبة وقطع الهالبينو.',
    price: 180,
    rating: 4.5,
    reviewsCount: 210,
    category: 'إضافات',
    rs: '18000',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'أجنحة دجاج بافلو',
    description: '6 قطع من أجنحة الدجاج المغطاة بصوص البافلو الحار مع صوص الرانش.',
    price: 280,
    rating: 4.6,
    reviewsCount: 78,
    category: 'إضافات',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'موهيتو فراولة',
    description: 'مشروب منعش بنكهة الفراولة والنعناع الطازج.',
    price: 150,
    rating: 4.4,
    reviewsCount: 45,
    category: 'مشروبات',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'سلطة سيزر بالدجاج',
    description: 'خس روماني طازج مع قطع الدجاج المشوي، جبنة البارميزان، وخبز محمص مع صوص السيزر.',
    price: 250,
    rating: 4.7,
    reviewsCount: 65,
    category: 'سلطات',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 8,
    name: 'سلطة كولسلو',
    description: 'ملفوف مبشور وجزر مع صوص المايونيز الكريمي الخاص بنا.',
    price: 120,
    rating: 4.5,
    reviewsCount: 120,
    category: 'سلطات',
    
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 9,
    name: 'سلطة خضراء',
    description: 'تشكيلة من الخضروات الطازجة مع طماطم كرزية وخيار بصلصة الليمون وزيت الزيتون.',
    price: 150,
    rating: 4.6,
    reviewsCount: 42,
    category: 'سلطات',
    
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'
  }
  
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2; // 2% every 200ms = 10 seconds to complete
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'الآن'
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const filteredItems = activeCategory === 'الكل' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const addToCart = (item: any) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }];
    });
    
    setToastMessage(`تم إضافة ${item.name} إلى السلة`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-rose-600 text-white p-2 rounded-xl">
                <Flame size={28} strokeWidth={2.5} />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">
                World <span className="text-rose-600">Chicken</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="font-bold text-rose-600">الرئيسية</a>
              <a href="#menu" className="font-semibold text-slate-600 hover:text-rose-600 transition-colors">القائمة</a>
              <a href="#reviews" className="font-semibold text-slate-600 hover:text-rose-600 transition-colors">التقييمات</a>
              <a href="#delivery" className="font-semibold text-slate-600 hover:text-rose-600 transition-colors">التوصيل</a>
              <a href="#contact" className="font-semibold text-slate-600 hover:text-rose-600 transition-colors">اتصل بنا</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-rose-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button className="hidden md:flex bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-rose-600/30 items-center gap-2">
                اطلب الآن
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-slate-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 flex flex-col gap-4 shadow-xl absolute w-full">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-rose-600 p-2 bg-rose-50 rounded-lg">الرئيسية</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">القائمة</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">التقييمات</a>
            <a href="#delivery" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">التوصيل</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-slate-700 p-2 hover:bg-slate-50 rounded-lg">اتصل بنا</a>
            <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold mt-2 w-full">
              اطلب الآن
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-right z-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Star size={16} className="fill-amber-500 text-amber-500" />
            <span>المطعم رقم 1 للوجبات الغربية</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-slate-900">
            طعم العالم في <br/>
            <span className="text-rose-600 relative">
              لقمة واحدة
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            أشهى الوجبات الغربية، برجر مقرمش، دجاج محمر، والمزيد.. نحضرها بشغف ونوصلها لك ساخنة أينما كنت.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a href="#menu" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2">
              تصفح المنيو
              <ChevronLeft size={20} />
            </a>
            <a href="#delivery" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              <Truck size={20} className="text-rose-600" />
              خدمة التوصيل
            </a>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-rose-400 rounded-full blur-3xl opacity-20 transform translate-x-10 translate-y-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" 
            alt="Delicious Burger" 
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl object-cover aspect-square"
          />
          
          {/* Floating Badge */}
          <div className="absolute top-10 -right-4 md:-right-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">توصيل سريع</p>
              <p className="text-sm font-black text-slate-900">خلال 30 دقيقة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
              <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">توصيل مجاني وسريع</h3>
              <p className="text-slate-500">نوصل طلبك ساخناً لباب بيتك في أسرع وقت ممكن.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
              <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">جودة لا يعلى عليها</h3>
              <p className="text-slate-500">نستخدم أفضل المكونات الطازجة لنضمن لك طعماً لا ينسى.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">فروعنا في كل مكان</h3>
              <p className="text-slate-500" >أكثر من 3 فرعاً لخدمتك أينما كنت في دمشق .</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">قائمة <span className="text-rose-600">الطعام</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">اختر من بين تشكيلة واسعة من أشهى الوجبات الغربية المحضرة خصيصاً لك.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm shadow-sm">
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  <span>{item.rating}</span>
                  <span className="text-slate-400 text-xs font-normal mr-1">({item.reviewsCount})</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <span className="text-xl font-black text-rose-600 shrink-0 mr-4">{item.price.toLocaleString()} ل.س</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-slate-900 hover:bg-rose-600 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  إضافة للطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">آراء <span className="text-rose-600">العملاء</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">شاركنا رأيك وتجربتك مع أطباقنا.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                <MessageSquare className="text-rose-600" />
                أضف تقييمك
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="الاسم الكريم"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">التقييم</label>
                  <div className="flex gap-2" dir="ltr">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star size={28} className={star <= newReview.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">تعليقك</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none h-32"
                    placeholder="شاركنا رأيك في الوجبة والخدمة..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  إرسال التقييم
                </button>
              </form>
            </div>

            {/* Reviews List */} 
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 font-bold text-xl">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                        <span className="text-xs text-slate-500">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-1" dir="ltr">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery CTA Section */}
      <section id="delivery" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!isTracking ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-right">
                <h2 className="text-4xl md:text-5xl font-black mb-6">جوعان؟ نوصلك وين ما كنت!</h2>
                <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto md:mx-0">
                      حمل تطبيقنا الآن أو اتصل بنا مباشرة واستمتع بأسرع خدمة توصيل للوجبات الساخنة في دمشق.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <button className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3">
                    <Phone size={24} />
                    <span dir="ltr">9200 12345</span>
                  </button>
                  <button 
                    onClick={() => setIsTracking(true)}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
                  >
                    تتبع طلبك
                  </button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-rose-600 w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl shadow-rose-600/50 relative">
                  <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                  <Truck size={120} className="text-white transform -scale-x-100" />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-slate-900 max-w-4xl mx-auto w-full animate-fade-in-up">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-black flex items-center gap-2">
                    <Map className="text-rose-600" />
                    تتبع الطلب #WC-8472
                  </h3>
                  <p className="text-slate-500 mt-1 font-bold">الوقت المتوقع للوصول: <span className="text-rose-600">{progress < 100 ? '15 دقيقة' : 'تم التوصيل'}</span></p>
                </div>
                <button 
                  onClick={() => setIsTracking(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Status Timeline */}
              <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 h-1 bg-rose-600 -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${progress >= 0 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                  <span className="text-xs font-bold text-slate-600">تم الاستلام</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${progress >= 10 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                  <span className="text-xs font-bold text-slate-600">قيد التحضير</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${progress >= 50 ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
                  <span className="text-xs font-bold text-slate-600">في الطريق</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${progress >= 100 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">تم التوصيل</span>
                </div>
              </div>

              {/* Map Simulation */}
              <div className="relative h-64 bg-slate-100 rounded-2xl overflow-hidden mb-8 border border-slate-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale"></div>
                
                {/* Route Line */}
                <div className="absolute top-1/2 left-12 right-12 h-2 bg-slate-200 rounded-full transform -translate-y-1/2 shadow-inner">
                  <div 
                    className="absolute top-0 right-0 h-full bg-rose-600 rounded-full transition-all duration-200 shadow-md"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Markers */}
                <div className="absolute top-1/2 right-12 transform translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 border-2 border-rose-100">
                  <Flame className="text-rose-600" size={24} />
                </div>
                <div className="absolute top-1/2 left-12 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 border-2 border-slate-100">
                  <MapPin className="text-slate-600" size={24} />
                </div>

                {/* Moving Truck */}
                <div 
                  className="absolute top-1/2 transform translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200"
                  style={{ right: `calc(3rem + (100% - 6rem) * ${progress / 100})` }}
                >
                  <div className="bg-rose-600 text-white p-3 rounded-full shadow-2xl animate-bounce border-2 border-white">
                    <Truck size={24} className="transform -scale-x-100" />
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Driver" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">محمد عبدالله</h4>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Star size={16} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">4.9</span>
                      <span>(128 توصيلة)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-slate-200 hover:text-rose-600 hover:border-rose-200 transition-all">
                    <MessageSquare size={20} />
                  </button>
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-green-600 hover:shadow-lg transition-all">
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-rose-600 text-white p-2 rounded-xl">
             <Flame size={24} strokeWidth={2.5} />
                </div>
                <span className="font-black text-2xl tracking-tight text-slate-900">
                  World <span className="text-rose-600">Chicken</span>
                </span>
              </div>
              <p className="text-slate-500 mb-6 max-w-md leading-relaxed">
                وجهتك الأولى لألذ الوجبات الغربية. نقدم لكم تجربة طعام استثنائية تجمع بين الجودة العالية والمذاق الرائع.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-900">روابط سريعة</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#home" className="hover:text-rose-600 transition-colors">الرئيسية</a></li>
                <li><a href="#menu" className="hover:text-rose-600 transition-colors">قائمة الطعام</a></li>
                <li><a href="#delivery" className="hover:text-rose-600 transition-colors">خدمة التوصيل</a></li>
                <li><a href="#" className="hover:text-rose-600 transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-900">تواصل معنا</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-rose-600" />
                  <span>سوريا ,دمشق</span>
                </li>
                     <li className="flex items-center gap-3">
                     <Phone size={18} className="text-rose-600" />
                    <span dir="ltr">9200 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={18} className="text-rose-600" />
                  <span>يومياً: 10 صباحاً - 2 فجراً</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} World Chicken. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-fade-in-up">
          <CheckCircle className="text-green-400" size={24} />
          <span className="font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <ShoppingCart className="text-rose-600" />
                سلة الطلبات
                 </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                   className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <ShoppingCart size={64} className="opacity-20" />
                  <p className="text-lg font-bold">السلة فارغة</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    تصفح المنيو
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                         {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{item.name}</h4>
                        <p className="text-rose-600 font-black mb-2">{item.price.toLocaleString()} ل.س</p>
                        <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-rose-600"
                            >
                              <Plus size={14} />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-rose-600"
                            >
                              <Minus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                           </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-bold">المجموع:</span>
                  <span className="text-2xl font-black text-slate-900">{cartTotal.toLocaleString()} ل.س</span>
                </div>
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-rose-600/30">
                  إتمام الطلب
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
