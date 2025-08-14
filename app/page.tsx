"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react"

export default function InstallmentCalculator() {
  const [productPrice, setProductPrice] = useState([100000])
  const [downPayment, setDownPayment] = useState([20000])
  const [installmentPeriod, setInstallmentPeriod] = useState([12])

  const monthlyPayment = (productPrice[0] - downPayment[0]) / installmentPeriod[0]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-900">Калькулятор рассрочки</div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("calculator")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("conditions")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Условия
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Рассчитайте свою рассрочку</h1>
            <p className="text-xl text-gray-600">Удобный калькулятор для расчета ежемесячного платежа</p>
          </div>

          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Параметры рассрочки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Product Price */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Стоимость товара</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={productPrice[0]}
                    onChange={(e) => setProductPrice([Number(e.target.value)])}
                    className="w-32 text-lg"
                  />
                  <span className="text-gray-600">₽</span>
                </div>
                <Slider
                  value={productPrice}
                  onValueChange={setProductPrice}
                  max={1000000}
                  min={10000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>10 000 ₽</span>
                  <span>1 000 000 ₽</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Первоначальный взнос</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={downPayment[0]}
                    onChange={(e) => setDownPayment([Number(e.target.value)])}
                    className="w-32 text-lg"
                  />
                  <span className="text-gray-600">₽</span>
                  <span className="text-sm text-gray-500">
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
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 ₽</span>
                  <span>{(productPrice[0] * 0.8).toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Installment Period */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Срок рассрочки</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={installmentPeriod[0]}
                    onChange={(e) => setInstallmentPeriod([Number(e.target.value)])}
                    className="w-32 text-lg"
                  />
                  <span className="text-gray-600">месяцев</span>
                </div>
                <Slider
                  value={installmentPeriod}
                  onValueChange={setInstallmentPeriod}
                  max={36}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>3 месяца</span>
                  <span>36 месяцев</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-2">Ежемесячный платеж:</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {monthlyPayment.toLocaleString("ru-RU", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    ₽
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Общая сумма к доплате: {(productPrice[0] - downPayment[0]).toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Условия рассрочки</h2>
            <p className="text-lg text-gray-600">Выгодные условия для каждого клиента</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Без переплат</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Рассрочка без процентов и скрытых комиссий. Вы платите только стоимость товара, разделенную на удобные
                  ежемесячные платежи.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Гибкие сроки</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Выберите удобный срок рассрочки от 3 до 36 месяцев. Возможность досрочного погашения без штрафов и
                  комиссий.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Быстрое оформление</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Минимум документов и быстрое решение. Оформление рассрочки занимает не более 15 минут прямо в
                  магазине.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Дополнительные преимущества:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Первоначальный взнос от 0%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Возможность изменения графика платежей
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Страхование покупки (опционально)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Персональный менеджер для каждого клиента
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Контакты</h2>
            <p className="text-lg text-gray-600">Свяжитесь с нами удобным способом</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Телефон</p>
                        <a href="tel:+79001234567" className="text-blue-600 hover:underline">
                          +7 (900) 123-45-67
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Адрес</p>
                        <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-pink-100 p-3 rounded-full">
                        <Instagram className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Instagram</p>
                        <a
                          href="https://instagram.com/your_account"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:underline"
                        >
                          @your_account
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MessageCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <a
                          href="https://wa.me/79001234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          Написать в WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-4">Режим работы:</p>
                    <div className="space-y-1 text-sm">
                      <p>Пн-Пт: 9:00 - 20:00</p>
                      <p>Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
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
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Открыть в Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Калькулятор рассрочки. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
