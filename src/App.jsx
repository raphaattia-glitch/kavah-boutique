import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, ChevronLeft, ArrowRight, RefreshCw, Info, ArrowLeft, LayoutGrid, Tablet, Trash2, Plus, Minus, CheckCircle2, Quote, BookOpen } from 'lucide-react';

const App = () => {
  // Navigation et États de vue
  const [currentPage, setCurrentPage] = useState('home'); 
  const [viewType, setViewType] = useState('immersive'); // 'immersive' (Slider) ou 'grid'
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [viewSide, setViewSide] = useState('back'); // 'back' (Unité) ou 'front' (Identité)
  const [selectedVariable, setSelectedVariable] = useState(0);
  
  // États UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManifestoFlipped, setIsManifestoFlipped] = useState(false);
  const [isConfigExpanded, setIsConfigExpanded] = useState(true);
  
  // États Commerce
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Source de l'image (À remplacer par ton lien Cloudinary plus tard)
  const userImageUrl = "image.png";

  const collections = [
    {
      id: 'hanoukavah',
      title: 'Hanoukavah',
      price: 55,
      description: 'Une Hanoukia déstructurée en rubans bandana bleus. Le symbole de la lumière qui persiste à travers les âges.',
      accentColor: '#005f73',
      views: {
        back: { objectPosition: '75% 15%', scale: '1.4' },
        front: { objectPosition: '25% 15%', scale: '1.8' }
      },
      variables: [
        { name: 'Flamme Or', color: '#FFD700' },
        { name: 'Flamme Rubis', color: '#E0115F' },
        { name: 'Flamme Ambre', color: '#FFBF00' },
      ]
    },
    {
      id: 'tou-bichvavah',
      title: 'Tou Bichvavah',
      price: 55,
      description: 'L\'Arbre de Vie dont les racines s\'entrelacent en motifs paisley. La croissance guidée par l\'intention.',
      accentColor: '#0a9396',
      views: {
        back: { objectPosition: '75% 85%', scale: '1.4' },
        front: { objectPosition: '25% 85%', scale: '1.8' }
      },
      variables: [
        { name: 'Grenade', color: '#9b2226' },
        { name: 'Figue', color: '#5e548e' },
        { name: 'Olive', color: '#588157' },
      ]
    }
  ];

  const currentProduct = collections[selectedProductIndex];

  // --- LOGIQUE PANIER ---
  const addToCart = () => {
    const item = {
      ...currentProduct,
      selectedVar: currentProduct.variables[selectedVariable],
      cartId: Date.now()
    };
    setCart([...cart, item]);
    setIsCartModalOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // --- LOGIQUE SLIDER ---
  const nextSlide = () => {
    setSelectedProductIndex((prev) => (prev + 1) % collections.length);
    setViewSide('back');
    setSelectedVariable(0);
  };

  const prevSlide = () => {
    setSelectedProductIndex((prev) => (prev - 1 + collections.length) % collections.length);
    setViewSide('back');
    setSelectedVariable(0);
  };

  // --- COMPOSANTS UI ---
  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center gap-8">
        <Menu className="w-6 h-6 cursor-pointer md:hidden" onClick={() => setIsMenuOpen(true)} />
        <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
          <button 
            onClick={() => { setCurrentPage('collections'); setViewType('immersive'); }} 
            className={`hover:text-[#0a9396] transition-colors ${currentPage === 'collections' ? 'text-[#0a9396]' : ''}`}
          >
            Collections
          </button>
          <button 
            onClick={() => setCurrentPage('histoire')} 
            className={`hover:text-[#0a9396] transition-colors ${currentPage === 'histoire' ? 'text-[#0a9396]' : ''}`}
          >
            Histoire
          </button>
        </div>
      </div>

      <div className="text-3xl md:text-4xl tracking-tighter cursor-pointer" style={{ fontFamily: 'serif', fontWeight: '900' }} onClick={() => setCurrentPage('home')}>
        KΛVΛH
      </div>

      <div className="flex items-center gap-6 text-right">
        <div className="hidden lg:block text-[9px] tracking-[0.4em] font-medium text-gray-300 uppercase">
          PORTE TON INTENTION
        </div>
        <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors" onClick={() => setCurrentPage('cart')}>
            <ShoppingBag className={`w-5 h-5 ${currentPage === 'cart' ? 'text-[#0a9396]' : ''}`} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#0a9396] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cart.length}
              </span>
            )}
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a] font-sans overflow-x-hidden">
      <Navigation />

      {/* NOTIFICATION PANIER */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in text-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-[#0a9396]/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#0a9396]" />
            </div>
            <h3 className="text-2xl font-light tracking-tight text-center">Ajouté avec intention.</h3>
            <div className="flex flex-col gap-3 pt-4 text-center">
              <button onClick={() => { setCurrentPage('cart'); setIsCartModalOpen(false); }} className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#0a9396] transition-all text-center">Aller au panier</button>
              <button onClick={() => setIsCartModalOpen(false)} className="w-full border border-gray-100 py-4 rounded-xl text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-[#1a1a1a] transition-all text-center">Continuer les achats</button>
            </div>
          </div>
        </div>
      )}

      {/* --- PAGE : ACCUEIL --- */}
      {currentPage === 'home' && (
        <main className="pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh] text-center">
            <div className="space-y-8 animate-fade-in max-w-5xl text-center">
              <h1 className="text-7xl md:text-[11rem] font-light tracking-tighter leading-[0.82] mb-4 text-center">
                L'Intention <br/> <span className="italic font-serif text-[#0a9396]">incarne</span> le Style.
              </h1>
              <p className="text-gray-400 text-sm md:text-lg tracking-[0.25em] uppercase font-light max-w-2xl mx-auto leading-relaxed text-center">
                Chaque pièce est un dialogue entre l'héritage et l'individu. 
                <br/><span className="font-bold text-[#1a1a1a]">L'Unité au dos, l'Identité au cœur.</span>
              </p>
              
              <div className="pt-12 text-center">
                <button 
                  onClick={() => { setCurrentPage('collections'); setViewType('immersive'); }}
                  className="group relative bg-[#1a1a1a] text-white px-16 py-8 rounded-sm text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#0a9396] transition-all shadow-2xl transform hover:-translate-y-2 flex items-center gap-6 mx-auto text-center"
                >
                  Entrer dans l'Expérience
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-32 w-full max-w-xs h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
            <div className="mt-8 text-4xl font-serif text-gray-100 select-none text-center">כַּוָּנָה</div>
        </main>
      )}

      {/* --- PAGE : COLLECTIONS --- */}
      {currentPage === 'collections' && (
        <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-light tracking-tight mb-2">Nos Collections</h2>
              <p className="text-gray-400 text-sm tracking-widest uppercase font-bold italic">Unité universelle, identité singulière</p>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg self-center md:self-auto">
              <button onClick={() => setViewType('grid')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all text-center ${viewType === 'grid' ? 'bg-white shadow-sm text-[#0a9396]' : 'text-gray-400 hover:text-gray-600'}`}><LayoutGrid className="w-4 h-4" /> Grille</button>
              <button onClick={() => { setViewType('immersive'); setViewSide('back'); }} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all text-center ${viewType === 'immersive' ? 'bg-white shadow-sm text-[#0a9396]' : 'text-gray-400 hover:text-gray-600'}`}><Tablet className="w-4 h-4" /> Expérience</button>
            </div>
          </div>

          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 animate-fade-in text-center">
              {collections.map((item, idx) => (
                <div key={item.id} className="group cursor-pointer text-center" onClick={() => { setSelectedProductIndex(idx); setCurrentPage('product'); setViewSide('back'); }}>
                  <div className="aspect-[4/5] bg-[#f7f7f7] rounded-2xl overflow-hidden relative mb-6 shadow-sm border border-gray-50 text-center"><img src={userImageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={item.views.back}/><div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase text-[#0a9396] text-center">Dos Universel</div></div>
                  <div className="flex justify-between items-end px-2 text-center"><div><h3 className="text-2xl font-light tracking-tight text-center">{item.title}</h3><p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mt-1 font-bold italic text-center">55€</p></div><ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-[#0a9396] group-hover:translate-x-1 transition-all" /></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative min-h-[70vh] flex items-center animate-fade-in">
              <button onClick={prevSlide} className="absolute left-0 z-40 p-4 bg-white rounded-full shadow-2xl border border-gray-100 hover:text-[#0a9396] transition-all -translate-x-4 md:-translate-x-8"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={nextSlide} className="absolute right-0 z-40 p-4 bg-white rounded-full shadow-2xl border border-gray-100 hover:text-[#0a9396] transition-all translate-x-4 md:translate-x-8"><ChevronRight className="w-6 h-6" /></button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
                {/* Visualiseur interactif */}
                <div className="relative group perspective-1000 mx-auto w-full max-w-md">
                  <div className={`relative w-full aspect-[4/5] transition-all duration-1000 transform-style-3d ${viewSide === 'front' ? 'rotate-y-180 shadow-2xl' : 'shadow-xl'} rounded-[2.5rem] overflow-hidden`}>
                    <div className="absolute inset-0 backface-hidden bg-white flex items-center justify-center"><img src={userImageUrl} alt={currentProduct.title} className="w-full h-full object-cover" style={currentProduct.views.back}/><div className="absolute top-8 left-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-100 text-[10px] font-black tracking-widest uppercase text-gray-400 text-center">DOS</div></div>
                    <div className="absolute inset-0 backface-hidden bg-white flex items-center justify-center transform rotate-y-180"><img src={userImageUrl} alt={currentProduct.title} className="w-full h-full object-cover" style={currentProduct.views.front}/><div className="absolute top-8 left-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-100 text-[10px] font-black tracking-widest uppercase text-[#0a9396] text-center">AVANT</div></div>
                  </div>
                  <button onClick={() => setViewSide(viewSide === 'back' ? 'front' : 'back')} className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-3 hover:bg-[#0a9396] transition-all shadow-2xl z-40 text-center whitespace-nowrap"><RefreshCw className={`w-4 h-4 transition-transform duration-700 ${viewSide === 'front' ? 'rotate-180' : ''}`} />{viewSide === 'back' ? 'Voir Identité' : 'Revenir Unité'}</button>
                </div>

                <div className="space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-none text-center lg:text-left">{currentProduct.title}</h2>
                    <p className="text-gray-400 text-sm font-light italic leading-relaxed max-w-sm mx-auto lg:mx-0 text-center lg:text-left">{currentProduct.description}</p>
                  </div>
                  
                  <div className="space-y-4 text-center lg:text-left">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 text-center lg:text-left">Variante d'Intention :</p>
                    <div className="flex gap-4 justify-center lg:justify-start">
                      {currentProduct.variables.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setSelectedVariable(idx); setViewSide('front'); }}
                          className={`relative w-10 h-10 rounded-full border-2 transition-all duration-500 hover:scale-110 active:scale-95 ${selectedVariable === idx ? 'border-[#1a1a1a] scale-110 shadow-lg' : 'border-transparent opacity-30 grayscale hover:opacity-100'}`}
                          style={{ backgroundColor: v.color }}
                        />
                      ))}
                    </div>
                  </div>

                  <button onClick={addToCart} className="w-full bg-[#1a1a1a] text-white py-6 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#0a9396] shadow-xl transition-all transform hover:-translate-y-1 text-center">Ajouter au panier — 55€</button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* --- PAGE : HISTOIRE --- */}
      {currentPage === 'histoire' && (
        <main className="pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="space-y-24 animate-fade-in text-center">
            <div className="text-center space-y-4">
              <h2 className="text-6xl md:text-[10rem] font-serif font-black tracking-tighter leading-none text-[#1a1a1a] text-center">Notre Histoire</h2>
              <div className="w-24 h-[2px] bg-[#0a9396] mx-auto mt-4"></div>
            </div>

            {/* Le Récit de la Soirée de Hanouka */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center">
              <div className="space-y-8 text-gray-600 leading-relaxed font-light text-lg text-center md:text-left">
                <div className="flex items-start gap-4 text-[#0a9396] justify-center md:justify-start text-center">
                   <Quote className="w-8 h-8 opacity-20 flex-shrink-0" />
                   <p className="italic text-center md:text-left">
                     "Tout a commencé lors d’un soir de Hanouka en famille."
                   </p>
                </div>
                <p className="text-center md:text-left">
                  Les bougies brûlaient, et autour de la table, une évidence s'est imposée : au-delà des rituels, la force de notre héritage réside dans le <span className="text-[#1a1a1a] font-bold">partage</span> et l'unité. 
                </p>
                <p className="text-center md:text-left">
                  Nous nous sommes demandé comment transmettre cette étincelle de manière moderne, comment porter fièrement ce qui nous lie sans sacrifier l'élégance urbaine. L'idée de KAVAH est née là : créer un vêtement qui soit un <span className="text-[#0a9396] font-medium italic">vecteur de transmission</span>.
                </p>
                <p className="text-center md:text-left">
                  C'est pour cette raison que chaque T-shirt KAVAH est accompagné d'une <span className="text-[#1a1a1a] font-bold">carte de sagesse</span> offrant une info-bulle sur la fête ou la valeur qu'il incarne. Apprendre, se rappeler, et porter son intention.
                </p>
              </div>
              <div className="relative aspect-[4/5] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl mx-auto w-full max-w-sm">
                 <img src={userImageUrl} className="w-full h-full object-cover grayscale opacity-60" style={{ objectPosition: 'center 20%' }} alt="Esprit KAVAH" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a9396]/40 to-transparent"></div>
              </div>
            </div>

            {/* FlashCard Kavanah : Cours Pédagogique */}
            <div className="space-y-12 text-center">
               <div className="text-center space-y-2">
                  <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-gray-300 text-center">Au-delà du vêtement</h3>
                  <p className="text-2xl font-light text-center">Comprendre le mot qui nous définit</p>
               </div>
               
               <div className="relative perspective-1000 w-full max-w-3xl mx-auto aspect-video md:aspect-[21/9] cursor-pointer group" onClick={() => setIsManifestoFlipped(!isManifestoFlipped)}>
                <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isManifestoFlipped ? 'rotate-y-180 shadow-2xl' : 'shadow-xl'} rounded-[2.5rem]`}>
                  
                  {/* Recto */}
                  <div className="absolute inset-0 backface-hidden bg-white rounded-[2.5rem] flex flex-col items-center justify-center p-12 border border-gray-100 text-center">
                    <div className="text-8xl md:text-9xl font-serif mb-6 opacity-80 transition-transform group-hover:scale-110 duration-700 text-center">כַּוָּנָה</div>
                    <p className="text-[10px] tracking-[0.6em] font-black text-[#0a9396] uppercase mb-4 text-center">KAVANAH : L'INTENTION</p>
                    <p className="text-gray-300 text-[8px] tracking-[0.3em] uppercase flex items-center gap-2 justify-center text-center">
                       <BookOpen className="w-3 h-3" /> Cliquez pour apprendre
                    </p>
                  </div>

                  {/* Verso : Cours Pédagogique */}
                  <div className="absolute inset-0 backface-hidden bg-[#1a1a1a] rounded-[2.5rem] flex flex-col items-center justify-center p-12 transform rotate-y-180 text-white overflow-hidden text-center">
                    <div className="absolute top-0 right-0 p-12 text-6xl font-serif opacity-5 select-none text-center">כ</div>
                    <h4 className="text-2xl font-bold tracking-[0.3em] mb-6 border-b border-white/10 pb-4 uppercase text-[#0a9396] text-center">Viser le Cœur</h4>
                    <div className="max-w-xl space-y-6 text-center leading-relaxed font-light text-sm md:text-base mx-auto">
                      <p className="text-center">
                        La <span className="font-bold italic text-center">Kavanah</span> vient de la racine hébraïque signifiant "diriger" ou "viser". C'est l'orientation de l'esprit et du cœur vers un but unique.
                      </p>
                      <p className="text-center">
                        Dans la tradition, on enseigne qu'une action sans Kavanah est comme "un corps sans âme". Ce n'est pas ce que vous faites qui compte le plus, mais la <span className="text-[#0a9396] font-medium text-center">conscience</span> que vous y mettez.
                      </p>
                      <p className="text-[10px] tracking-[0.2em] font-bold opacity-40 uppercase pt-4 border-t border-white/5 text-center">
                        Une valeur universelle pour quiconque cherche à habiter ses gestes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* --- PAGE : PANIER --- */}
      {currentPage === 'cart' && (
        <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto min-h-[70vh]">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl font-light tracking-tight mb-2 text-center md:text-left">Mon Panier</h2>
            <p className="text-gray-400 text-sm tracking-widest uppercase italic font-bold text-center md:text-left">Votre sélection d'intentions</p>
          </div>
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-8 animate-fade-in text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-center"><ShoppingBag className="w-10 h-10 text-gray-200" /></div>
              <p className="text-gray-400 italic text-center">Votre panier est encore vide d'intention.</p>
              <button onClick={() => setCurrentPage('collections')} className="bg-[#1a1a1a] text-white px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-xl text-center">Commencer mes achats</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in text-center lg:text-left">
              <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-50 group hover:shadow-lg transition-all text-center lg:text-left">
                    <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 text-center"><img src={userImageUrl} className="w-full h-full object-cover text-center" style={item.views.back} /></div>
                    <div className="flex-grow flex flex-col justify-between py-1 text-center lg:text-left">
                      <div className="text-center lg:text-left">
                        <div className="flex justify-between items-start text-center"><h3 className="text-xl font-light text-center">{item.title}</h3><button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-red-400 transition-colors text-center"><Trash2 className="w-4 h-4 text-center" /></button></div>
                        <div className="flex items-center gap-2 mt-1 justify-center lg:justify-start text-center"><div className="w-2 h-2 rounded-full text-center" style={{ backgroundColor: item.selectedVar.color }}></div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">{item.selectedVar.name}</span></div>
                      </div>
                      <div className="flex justify-between items-end text-center"><span className="text-sm font-medium text-[#0a9396] italic text-center">Coton Premium</span><span className="text-lg font-bold text-center">{item.price}€</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1 h-fit sticky top-32 text-center lg:text-left">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-8 text-center">
                  <h4 className="text-[10px] font-black tracking-widest uppercase text-gray-400 text-center">Résumé</h4>
                  <div className="space-y-4 text-center">
                    <div className="flex justify-between text-sm text-center"><span className="text-gray-400 text-center">Sous-total</span><span className="text-center">{cartTotal} €</span></div>
                    <div className="flex justify-between text-sm text-center"><span className="text-gray-400 text-center">Livraison</span><span className="text-[#0a9396] font-bold uppercase text-[10px] text-center">Offerte</span></div>
                    <div className="h-px bg-gray-50 pt-4 text-center"></div>
                    <div className="flex justify-between text-xl font-light text-center"><span className="text-center">Total</span><span className="text-center">{cartTotal} €</span></div>
                  </div>
                  <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#0a9396] transition-all shadow-xl text-center">Paiement Sécurisé</button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-24 px-6 border-t border-gray-100 bg-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center">
          <div className="text-center space-y-2">
            <div className="text-4xl font-serif font-black tracking-tighter text-center">KΛVΛH</div>
            <p className="text-[9px] text-gray-400 tracking-[0.5em] uppercase italic text-center">Porte ton Intention</p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold tracking-widest text-gray-400 uppercase text-center justify-center">
            <a href="#" className="hover:text-[#0a9396] text-center">Instagram</a>
            <a href="#" className="hover:text-[#0a9396] text-center">TikTok</a>
            <a href="#" className="hover:text-[#0a9396] text-center">Contact</a>
          </div>
          <div className="text-[9px] text-gray-300 tracking-[0.4em] uppercase font-bold italic text-center">© KAVAH Brand.</div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@200;300;400;500;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #FDFCF8; }
        .font-serif { font-family: 'Cinzel', serif; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default App;
