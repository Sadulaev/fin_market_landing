"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react"
import { YMaps, Map } from '@pbe/react-yandex-maps';

export default function InstallmentCalculator() {
  const [cost, setCost] = useState<number>(0);
  const [firstPayment, setFirstPayment] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);

  const onChangeCost = (newCost: number, currentFirstPayment: number) => {
    if (newCost <= 1000000 && !isNaN(newCost)) {
      setCost(parseInt(newCost.toString(), 10));
      if (currentFirstPayment > (newCost * 0.8)) {
        setFirstPayment(newCost * 0.8)
      }
    }
  }

  const onChangeFirstPayment = (newPayment: number, currentCost: number) => {
    if (newPayment <= currentCost * 0.8 && !isNaN(newPayment)) {
      setFirstPayment(newPayment);
    }
  }

  const onChangePeriod = (newPeriod: number) => {
    if (newPeriod <= 12 && !isNaN(newPeriod)) {
      setPeriod(newPeriod)
    }
  }

  const result = useMemo(() => {
    if(period <= 0 || cost <= 0) {
      return {
        montlyPayment: 0,
        summaryPayment: 0,
        monthlyAdditionalPayment: 0,
      }
    }
    const countedSum = firstPayment >= (cost / 2) ? cost / 2 : cost;
    const additionalPercent = firstPayment > 0 ? 0 : 5;
    if (period <= 3) {
      return {
        montlyPayment: (cost + ((countedSum / 100 * (15 + additionalPercent)) * period)) / period,
        summaryPayment: cost + ((countedSum / 100 * (15 + additionalPercent)) * period),
        monthlyAdditionalPayment: (countedSum / 100 * (15 + additionalPercent)),
      }
    } else if (period <= 6) {
      return {
        montlyPayment: (cost + ((countedSum / 100 * (25 + additionalPercent)) * period)) / period,
        summaryPayment: cost + ((countedSum / 100 * (25 + additionalPercent)) * period),
        monthlyAdditionalPayment: (countedSum / 100 * (25 + additionalPercent)),
      }
    } else if (period <= 8) {
      return {
        montlyPayment: (cost + ((countedSum / 100 * (35 + additionalPercent)) * period)) / period,
        summaryPayment: cost + ((countedSum / 100 * (35 + additionalPercent)) * period),
        monthlyAdditionalPayment: (countedSum / 100 * (35 + additionalPercent)),
      }
    } else if (period === 12) {
      return {
        montlyPayment: (cost + ((countedSum / 100 * (45 + additionalPercent)) * period)) / period,
        summaryPayment: cost + ((countedSum / 100 * (45 + additionalPercent)) * period),
        monthlyAdditionalPayment: (countedSum / 100 * (45 + additionalPercent)),
      }
    }
  }, [cost, firstPayment, period])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        className="shadow-sm sticky top-0 z-50 border-gray-accent bg-gray-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-extrabold text-4xl text-white">
              Finmarket
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("calculator")}
                className="transition-colors text-gray-accent hover:text-gold cursor-pointer"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("conditions")}
                className="transition-colors text-gray-accent hover:text-gold cursor-pointer"
              >
                Условия
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="transition-colors text-gray-accent hover:text-gold cursor-pointer"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Section */}
      <section id="calculator" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-medium">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl bg-gray-dark border-1 border-solid border-gray-accent">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Расчитай свою рассрочку
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Product Price */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-white-ease">
                  Стоимость товара
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    inputMode="numeric"
                    type="text"
                    value={cost}
                    onChange={(e) => onChangeCost(Number(e.target.value), firstPayment)}
                    className="w-48 text-xl h-12 text-white font-semibold border-gray-accent bg-gray-medium"
                  />
                  <span className="text-2xl text-gray-accent">
                    ₽
                  </span>
                </div>
                <Slider
                  value={[cost]}
                  onValueChange={(v) => onChangeCost(v[0], firstPayment)}
                  max={1000000}
                  min={10000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-md text-gray-accent">
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
                    inputMode="numeric"
                    type="text"
                    value={firstPayment}
                    onChange={(e) => onChangeFirstPayment(Number(e.target.value), cost)}
                    className="w-48 text-xl h-12 text-white font-semibold border-gray-accent bg-gray-medium"
                  />
                  <span className="text-2xl text-gray-accent">
                    ₽
                  </span>
                  {cost > 0 && (
                    <span className="text-md text-gray-accent">
                      ({((firstPayment / cost) * 100).toFixed(1)}%)
                    </span>
                  )}

                </div>
                <Slider
                  value={[firstPayment]}
                  onValueChange={(v) => setFirstPayment(v[0])}
                  max={(cost * 0.8).toFixed(1)}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-md text-gray-accent">
                  <span>0 ₽</span>
                  <span>{(cost * 0.8).toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Installment Period */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                  Срок рассрочки
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    inputMode="numeric"
                    type="text"
                    value={period}
                    onChange={(e) => onChangePeriod(Number(e.target.value))}
                    className="w-48 text-xl h-12 text-white font-semibold border-gray-accent bg-gray-medium"
                  />
                  <span className="text-xl text-gray-accent">
                    месяцев
                  </span>
                </div>
                <Slider
                  value={[period]}
                  onValueChange={(v) => setPeriod(v[0])}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-md text-gray-accent">
                  <span>1 месяца</span>
                  <span>12 месяцев</span>
                </div>
              </div>

              <div className="p-6 rounded-lg border-2 border-gold-light bg-gray-medium">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Левая часть - параметры и итоговая сумма */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold" style={{ color: "#f8f9fa" }}>
                      Ваш выбор:
                    </h3>
                    <div className="space-y-2 text-sm text-gray-accent">
                      <p>Стоимость товара: {cost.toLocaleString()} ₽</p>
                      <p>Первоначальный взнос: {firstPayment.toLocaleString()} ₽</p>
                      <p>Срок рассрочки: {period} мес.</p>
                    </div>
                    <div className="pt-4 border-t" style={{ borderColor: "#808080" }}>
                      <p className="text-sm text-gray-accent">
                        Итоговая сумма:
                      </p>
                      <p className="text-2xl font-bold text-gold-light">
                        {result?.summaryPayment.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>

                  {/* Правая часть - ежемесячный платеж и переплата */}
                  <div className="space-y-4 flex flex-col justify-around">
                    <div className="text-center pt-4">
                      <p className="text-lg text-gray-accent">
                        Ежемесячный платеж:
                      </p>
                      <p className="text-4xl font-bold text-gold-light">
                        {result?.montlyPayment.toLocaleString("ru-RU", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-accent">
                        Переплата в месяц:
                      </p>
                      <p className="text-xl font-semibold text-gold-light">
                        {result?.monthlyAdditionalPayment} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-14 text-lg font-semibold flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark cursor-pointer"
                onClick={() => window.open("https://wa.me/79001234567?text=Хочу оформить рассрочку", "_blank")}
              >
                Оформить рассрочку
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              Условия рассрочки
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className="hover:shadow-lg transition-shadow bg-gray-medium border-gray-accent"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gold-light">
                  Возраст
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Покупатель и поручитель — от 21 года
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow bg-gray-medium border-gray-accent"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gold-light">
                  Прописка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Обязательна прописка в Чеченской Республике
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow bg-gray-medium border-gray-accent"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gold-light">
                  От 20 000 ₽
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Если сумма от 20 000 ₽ — требуется 1 поручитель
                </CardDescription>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-lg transition-shadow bg-gray-medium border-gray-accent"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gold-light">
                  От 100 000 ₽
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Если сумма от 100 000 ₽ — требуется 2 поручителя
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-8 rounded-lg border-2 border-gold-light bg-gray-medium">
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#f8f9fa" }}>
              Дополнительные преимущества:
            </h3>
            <ul className="space-y-2 text-white-ease">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-gold-light"></span>
                Рассрочка без банка по нормам Ислама
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-gold-light"></span>
                Без штрафов, пеней и процентов
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-gold-light"></span>
                Гибкий график платежей (можно выбрать самому дату платежа)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-gold-light"></span>
                Принимаем наличными и переводом
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-medium">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#f8f9fa" }}>
              Контакты
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gray-dark border-gray-accent">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          Телефон
                        </p>
                        <a href="tel:+79001234567" className="hover:underline" style={{ color: "#10B981" }}>
                          +7 (900) 123-45-67
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: "#f8f9fa" }}>
                          Адрес
                        </p>
                        <p style={{ color: "#b0b0b0" }}>г. Москва, ул. Примерная, д. 123</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <Instagram className="h-6 w-6 text-white" />
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
                          style={{ color: "#10B981" }}
                        >
                          @your_account
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
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
                          style={{ color: "#10B981" }}
                        >
                          Написать в WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t" style={{ borderColor: "#808080" }}>
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
            <div className="space-y-4 rounded-2xl overflow-hidden">
              <YMaps>
                <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className="w-full h-full" />
              </YMaps>
            </div>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="py-8" style={{ backgroundColor: "#2a2a2a", color: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Калькулятор рассрочки. Все права защищены.</p>
        </div>
      </footer> */}
    </div>
  )
}
