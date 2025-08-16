"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { decodeValue } from "@/lib/utils"

export default function InstallmentCalculator() {
  const [productPrice, setProductPrice] = useState([100000]) // Начальная цена товара
  const [downPayment, setDownPayment] = useState([20000]) // Начальный взнос
  const [installmentPeriod, setInstallmentPeriod] = useState([12]) // Срок рассрочки в месяцах

  const interestRate = 0.05; // 5% годовых
  const monthlyRate = interestRate; 

  const principal = productPrice[0] - downPayment[0];
  const n = installmentPeriod[0];

  const monthlyPayment = principal > 0 && n > 0
    ? Math.round(
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1)
    )
    : 0;

  const totalAmount = monthlyPayment * n;
  const overpaymentPerMonth = monthlyPayment - Math.round(principal / n);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const sp = useSearchParams();
  const kParam = sp.get('k'); // например ?k=eyJ2Ijo1fQ.d6ab1234

  const value = kParam ? decodeValue(kParam) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1a1a" }}>
      {/* Navigation */}
      <nav
        className="shadow-sm sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#272727", borderColor: "#747474" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-3xl font-playfair-display-sc text-white">
              Finmarket
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("calculator")}
                className="transition-colors text-white cursor-pointer"
                onMouseEnter={(e) => (e.target.style.color = "#FF652F")}
                onMouseLeave={(e) => (e.target.style.color = "#f8f9fa")}
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("conditions")}
                className="transition-colors text-white cursor-pointer"
                onMouseEnter={(e) => (e.target.style.color = "#FF652F")}
                onMouseLeave={(e) => (e.target.style.color = "#f8f9fa")}
              >
                Условия
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="transition-colors text-white cursor-pointer"
                onMouseEnter={(e) => (e.target.style.color = "#FF652F")}
                onMouseLeave={(e) => (e.target.style.color = "#f8f9fa")}
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Section */}
      <section id="calculator" className="py-4 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl" style={{ backgroundColor: "#2d2d2d", border: "1px solid #747474" }}>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Удобный калькулятор для расчета ежемесячного платежа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Product Price */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                  Стоимость товара
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={productPrice[0]}
                    onChange={(e) => setProductPrice([Number(e.target.value)])}
                    className="w-48 text-2xl h-12 font-semibold appearance-none [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{
                      borderColor: "#14A76C",
                      backgroundColor: "#1a1a1a",
                      color: "#f8f9fa",
                      fontSize: "1.5rem",
                    }}
                  />
                  <span className="text-2xl" style={{ color: "#C4C4C4" }}>
                    ₽
                  </span>
                </div>
                <Slider
                  value={productPrice}
                  onValueChange={setProductPrice}
                  max={1000000}
                  min={10000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-lg" style={{ color: "#C4C4C4" }}>
                  <span>10 000 ₽</span>
                  <span>1 000 000 ₽</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                  Первоначальный взнос
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={downPayment[0]}
                    onChange={(e) => setDownPayment([Number(e.target.value)])}
                    className="w-48 text-2xl h-12 font-semibold appearance-none [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{
                      borderColor: "#14A76C",
                      backgroundColor: "#1a1a1a",
                      color: "#f8f9fa",
                      fontSize: "1.5rem",
                    }}
                  />
                  <span className="text-2xl" style={{ color: "#C4C4C4" }}>
                    ₽
                  </span>
                  <span className="text-lg" style={{ color: "#C4C4C4" }}>
                    ({((downPayment[0] / productPrice[0]) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Slider
                  value={downPayment}
                  onValueChange={setDownPayment}
                  max={productPrice[0] * 0.8}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-lg" style={{ color: "#C4C4C4" }}>
                  <span className="text-2xl">0 ₽</span>
                  <span>{(productPrice[0] * 0.8).toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Installment Period */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                  Срок рассрочки
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={installmentPeriod[0]}
                    onChange={(e) => setInstallmentPeriod([Number(e.target.value)])}
                    className="w-48 text-2xl h-12 font-semibold appearance-none [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{
                      borderColor: "#14A76C",
                      backgroundColor: "#1a1a1a",
                      color: "#f8f9fa",
                      fontSize: "1.5rem",
                    }}
                  />
                  <span className="text-2xl" style={{ color: "#C4C4C4" }}>
                    месяцев
                  </span>
                </div>
                <Slider
                  value={installmentPeriod}
                  onValueChange={setInstallmentPeriod}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-lg" style={{ color: "#C4C4C4" }}>
                  <span>1 месяца</span>
                  <span>12 месяцев</span>
                </div>
              </div>

              <div className="p-6 rounded-lg border-2" style={{ backgroundColor: "#3a3a3a", borderColor: "#14A76C" }}>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Левая часть - параметры и итоговая сумма */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                      Ваш выбор:
                    </h3>
                    <div className="space-y-2 text-sm" style={{ color: "#C4C4C4" }}>
                      <p>Стоимость товара: {productPrice[0].toLocaleString()} ₽</p>
                      <p>Первоначальный взнос: {downPayment[0].toLocaleString()} ₽</p>
                      <p>Срок рассрочки: {installmentPeriod[0]} мес.</p>
                    </div>
                    <div className="pt-4 border-t" style={{ borderColor: "#C4C4C4" }}>
                      <p className="text-sm" style={{ color: "#C4C4C4" }}>
                        Итоговая сумма к доплате:
                      </p>
                      <p className="text-2xl font-bold" style={{ color: "#14A76C" }}>
                        {totalAmount.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>

                  {/* Правая часть - ежемесячный платеж и переплата */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-lg" style={{ color: "#C4C4C4" }}>
                        Ежемесячный платеж:
                      </p>
                      <p className="text-4xl font-bold" style={{ color: "#14A76C" }}>
                        {monthlyPayment.toLocaleString("ru-RU", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <div className="text-center pt-4">
                      <p className="text-sm" style={{ color: "#C4C4C4" }}>
                        Переплата в месяц:
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {overpaymentPerMonth} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-14 text-lg font-semibold flex items-center justify-center gap-3"
                style={{ backgroundColor: "#14A76C" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f8a5a")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#14A76C")}
                onClick={() => window.open("https://wa.me/79001234567?text=Хочу оформить рассрочку", "_blank")}
              >
                <MessageCircle className="h-6 w-6" />
                Оформить рассрочку
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#2d2d2d" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#f8f9fa" }}>
              Условия рассрочки
            </h2>
            <p className="text-lg" style={{ color: "#C4C4C4" }}>
              Выгодные условия для каждого клиента
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className="hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#3a3a3a", border: "1px solid #C4C4C4" }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: "#FF652F" }}>
                  Без переплат
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base" style={{ color: "#b0b0b0" }}>
                  Рассрочка без процентов и скрытых комиссий. Вы платите только стоимость товара, разделенную на удобные
                  ежемесячные платежи.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#3a3a3a", border: "1px solid #C4C4C4" }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: "#FF652F" }}>
                  Гибкие сроки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base" style={{ color: "#b0b0b0" }}>
                  Выберите удобный срок рассрочки от 3 до 36 месяцев. Возможность досрочного погашения без штрафов и
                  комиссий.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#3a3a3a", border: "1px solid #C4C4C4" }}
            >
              <CardHeader>
                <CardTitle className="text-xl" style={{ color: "#FF652F" }}>
                  Быстрое оформление
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base" style={{ color: "#b0b0b0" }}>
                  Минимум документов и быстрое решение. Оформление рассрочки занимает не более 15 минут прямо в
                  магазине.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-8 rounded-lg border-2" style={{ backgroundColor: "#3a3a3a", borderColor: "#FFE400" }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#f8f9fa" }}>
              Дополнительные преимущества:
            </h3>
            <ul className="space-y-2" style={{ color: "#b0b0b0" }}>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#FF652F" }}></span>
                Первоначальный взнос от 0%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#FF652F" }}></span>
                Возможность изменения графика платежей
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#FF652F" }}></span>
                Страхование покупки (опционально)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#FF652F" }}></span>
                Персональный менеджер для каждого клиента
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#f8f9fa" }}>
              Контакты
            </h2>
            <p className="text-lg" style={{ color: "#C4C4C4" }}>
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card style={{ backgroundColor: "#2d2d2d", border: "1px solid #747474" }}>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#FFE400" }}>
                        <Phone className="h-6 w-6" style={{ color: "#272727" }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          Телефон
                        </p>
                        <a href="tel:+79001234567" className="hover:underline" style={{ color: "#FF652F" }}>
                          +7 (900) 123-45-67
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#FFE400" }}>
                        <MapPin className="h-6 w-6" style={{ color: "#272727" }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          Адрес
                        </p>
                        <p style={{ color: "#b0b0b0" }}>г. Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#FFE400" }}>
                        <Instagram className="h-6 w-6" style={{ color: "#272727" }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          Instagram
                        </p>
                        <a
                          href="https://instagram.com/your_account"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: "#FF652F" }}
                        >
                          @your_account
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#14A76C" }}>
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          WhatsApp
                        </p>
                        <a
                          href="https://wa.me/79001234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: "#14A76C" }}
                        >
                          Написать в WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t" style={{ borderColor: "#747474" }}>
                    <p className="text-sm mb-4" style={{ color: "#b0b0b0" }}>
                      Режим работы:
                    </p>
                    <div className="space-y-1 text-sm" style={{ color: "#b0b0b0" }}>
                      <p>Пн-Пт: 9:00 - 20:00</p>
                      <p>Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <Card style={{ backgroundColor: "#2d2d2d", border: "1px solid #747474" }}>
                <CardContent className="p-0">
                  <div
                    className="h-96 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#3a3a3a" }}
                  >
                    <div className="text-center" style={{ color: "#b0b0b0" }}>
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Интерактивная карта</p>
                      <p className="text-sm">г. Москва, ул. Примерная, д. 123</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={() => window.open("https://maps.google.com/?q=Москва,+ул.+Примерная,+123", "_blank")}
                  className="hover:opacity-90"
                  style={{ backgroundColor: "#FF652F" }}
                >
                  Открыть в Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#272727", color: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Калькулятор рассрочки. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
