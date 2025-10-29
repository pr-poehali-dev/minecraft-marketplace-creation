import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rarity: string;
}

interface CartItem extends Item {
  quantity: number;
}

function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const items: Item[] = [
    {
      id: 1,
      name: 'Алмазный меч',
      description: 'Легендарный меч с максимальным уроном',
      price: 1500,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/d6f42d08-c9f6-492c-8a19-bc8587bc2f04.jpg',
      category: 'Оружие',
      rarity: 'legendary'
    },
    {
      id: 2,
      name: 'Золотое яблоко',
      description: 'Восстанавливает здоровье и даёт эффекты',
      price: 500,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/08a7da16-1a21-44a1-98a9-e3fa13073b8a.jpg',
      category: 'Еда',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Зачарованная книга',
      description: 'Содержит редкое зачарование',
      price: 800,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/813af026-0049-45d6-bb17-dfcc09159b5d.jpg',
      category: 'Магия',
      rarity: 'epic'
    },
    {
      id: 4,
      name: 'Алмазная кирка',
      description: 'Быстро добывает любые блоки',
      price: 1200,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/d6f42d08-c9f6-492c-8a19-bc8587bc2f04.jpg',
      category: 'Инструменты',
      rarity: 'legendary'
    },
    {
      id: 5,
      name: 'Зелье силы',
      description: 'Увеличивает урон на 3 минуты',
      price: 300,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/813af026-0049-45d6-bb17-dfcc09159b5d.jpg',
      category: 'Зелья',
      rarity: 'common'
    },
    {
      id: 6,
      name: 'Элитры',
      description: 'Крылья для полёта',
      price: 2000,
      image: 'https://cdn.poehali.dev/projects/4fa8a625-2061-43ca-86bb-1a66c7d93cb2/files/813af026-0049-45d6-bb17-dfcc09159b5d.jpg',
      category: 'Броня',
      rarity: 'legendary'
    }
  ];

  const categories = ['all', 'Оружие', 'Инструменты', 'Броня', 'Еда', 'Зелья', 'Магия'];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500 text-white';
      case 'epic': return 'bg-purple-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const addToCart = (item: Item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <nav className="bg-primary border-b-4 border-secondary shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center text-2xl border-2 border-stone">
                ⛏️
              </div>
              <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                MC SHOP
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={activeTab === 'home' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="text-white hover:bg-secondary/80 border-2 border-transparent hover:border-stone"
              >
                <Icon name="Home" size={20} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeTab === 'catalog' ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab('catalog')}
                className="text-white hover:bg-secondary/80 border-2 border-transparent hover:border-stone"
              >
                <Icon name="Package" size={20} className="mr-2" />
                Каталог
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-secondary/80 border-2 border-transparent hover:border-stone">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-4 border-secondary max-w-md">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-lg">
                      Добавить предмет
                    </DialogTitle>
                    <DialogDescription>
                      Заполните информацию о новом предмете
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input className="border-2 border-secondary" placeholder="Алмазный меч" />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Input className="border-2 border-secondary" placeholder="Оружие" />
                    </div>
                    <div>
                      <Label>Цена</Label>
                      <Input type="number" className="border-2 border-secondary" placeholder="1500" />
                    </div>
                    <div>
                      <Label>Описание</Label>
                      <Textarea className="border-2 border-secondary" placeholder="Легендарное оружие..." />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 border-2 border-secondary">
                      <Icon name="Check" size={20} className="mr-2" />
                      Создать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-secondary/80 border-2 border-transparent hover:border-stone relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center border-2 border-white">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-l-4 border-secondary w-[400px]">
                  <SheetHeader>
                    <SheetTitle style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-lg">
                      Корзина
                    </SheetTitle>
                    <SheetDescription>
                      Ваши товары для покупки
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <Card key={item.id} className="border-2 border-secondary">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover border-2 border-stone" />
                                <div className="flex-1">
                                  <h4 className="font-bold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.price} 💰</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="h-6 w-6 p-0 border-2"
                                    >
                                      -
                                    </Button>
                                    <span className="text-sm font-bold">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="h-6 w-6 p-0 border-2"
                                    >
                                      +
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto border-2"
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t-2 border-secondary pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-lg">Итого:</span>
                            <span className="font-bold text-2xl text-primary">{getTotalPrice()} 💰</span>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90 border-2 border-secondary">
                            <Icon name="CreditCard" size={20} className="mr-2" />
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="bg-gradient-to-r from-primary to-accent p-12 border-4 border-secondary shadow-2xl">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  Маркетплейс предметов
                </h2>
                <p className="text-xl text-white/90 mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Покупай и продавай уникальные предметы для своего сервера Minecraft
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setActiveTab('catalog')}
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white border-4 border-stone text-lg px-8"
                  >
                    <Icon name="Package" size={24} className="mr-2" />
                    Смотреть каталог
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white hover:bg-white/90 border-4 border-stone text-lg px-8"
                      >
                        <Icon name="Plus" size={24} className="mr-2" />
                        Продать предмет
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-4 border-secondary max-w-md">
                      <DialogHeader>
                        <DialogTitle style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-lg">
                          Добавить предмет
                        </DialogTitle>
                        <DialogDescription>
                          Заполните информацию о новом предмете
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Название</Label>
                          <Input className="border-2 border-secondary" placeholder="Алмазный меч" />
                        </div>
                        <div>
                          <Label>Категория</Label>
                          <Input className="border-2 border-secondary" placeholder="Оружие" />
                        </div>
                        <div>
                          <Label>Цена</Label>
                          <Input type="number" className="border-2 border-secondary" placeholder="1500" />
                        </div>
                        <div>
                          <Label>Описание</Label>
                          <Textarea className="border-2 border-secondary" placeholder="Легендарное оружие..." />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 border-2 border-secondary">
                          <Icon name="Check" size={20} className="mr-2" />
                          Создать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6 text-primary" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                Популярные предметы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.slice(0, 3).map(item => (
                  <Card key={item.id} className="border-4 border-secondary shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover border-b-4 border-secondary" />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px' }}>
                        {item.name}
                      </CardTitle>
                      <CardDescription className="mb-3">{item.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <Badge className={getRarityColor(item.rarity)}>
                          {item.rarity === 'legendary' && '⭐ Легендарный'}
                          {item.rarity === 'epic' && '💜 Эпический'}
                          {item.rarity === 'rare' && '💎 Редкий'}
                          {item.rarity === 'common' && '⚪ Обычный'}
                        </Badge>
                        <span className="text-2xl font-bold text-primary">{item.price} 💰</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-primary hover:bg-primary/90 border-2 border-secondary"
                      >
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 border-4 border-secondary shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">⚡</div>
                  <h4 className="font-bold text-lg mb-2">Быстрая доставка</h4>
                  <p className="text-muted-foreground">Предметы приходят мгновенно после покупки</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">🛡️</div>
                  <h4 className="font-bold text-lg mb-2">Безопасность</h4>
                  <p className="text-muted-foreground">Все сделки защищены</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">💎</div>
                  <h4 className="font-bold text-lg mb-2">Уникальные предметы</h4>
                  <p className="text-muted-foreground">Редкие и легендарные вещи</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-6 border-4 border-secondary shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-primary" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                Каталог предметов
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Поиск</Label>
                  <Input
                    placeholder="Найти предмет..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 border-secondary"
                  />
                </div>
                <div>
                  <Label>Категория</Label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 border-2 border-secondary rounded bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'Все категории' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="border-4 border-secondary shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover border-b-4 border-secondary" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="mb-2 text-sm" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                      {item.name}
                    </CardTitle>
                    <CardDescription className="mb-3 text-xs">{item.description}</CardDescription>
                    <div className="space-y-2">
                      <Badge className={getRarityColor(item.rarity) + ' text-xs'}>
                        {item.category}
                      </Badge>
                      <div className="text-xl font-bold text-primary">{item.price} 💰</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => addToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 border-2 border-secondary"
                      size="sm"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 bg-white border-4 border-secondary">
                <p className="text-muted-foreground text-lg">Предметы не найдены</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-primary border-t-4 border-secondary mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
            MC SHOP © 2024
          </p>
          <p className="mt-2 text-sm">Маркетплейс предметов для Minecraft серверов</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
