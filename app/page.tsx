"use client"

import { useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Instagram, MessageCircle, AlertTriangle } from "lucide-react"
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useSearchParams } from "next/navigation"
import SubmitModal from "@/components/submit-modal"
import WarningWindow from "@/components/warning-window"
import { decryptNumber } from "@/lib/utils"
import murabaha from '../public/assets/murabaha-logo.png'

export default function InstallmentCalculator() {
  const searchParams = useSearchParams();

  const calcRef = useRef<HTMLDivElement>(null);
  const k = searchParams.get('k')

  const [showWarning, setShowWarning] = useState(false);

  const [cost, setCost] = useState<number>(0);
  const [firstPayment, setFirstPayment] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onChangeCost = (newCost: number, currentFirstPayment: number) => {
    if (newCost <= 1000000 && !isNaN(newCost)) {
      setCost(parseInt(newCost.toString(), 10));
      if (currentFirstPayment > (newCost * 0.8)) {
        setFirstPayment(newCost * 0.8)
      }
    }
  }

  const onChangeFirstPayment = (newPayment: number, currentCost: number) => {
    if (newPayment <= currentCost * 0.8 && currentCost > 0 && !isNaN(newPayment)) {
      setFirstPayment(newPayment);
    }
  }

  const onChangePeriod = (newPeriod: number, currentFirstPayment: number) => {
    if (newPeriod <= 12 && !isNaN(newPeriod)) {
      setPeriod(newPeriod);
    }
    if (currentFirstPayment < (cost * 0.25)) {
      setFirstPayment(cost * 0.25)
    }
  }

  const result = useMemo(() => {
    if (period <= 0 || cost <= 0) {
      return {
        monthlyPayment: 0,
        summaryPayment: 0,
        monthlyAdditionalPayment: 0,
      }
    }

    const countedSum = firstPayment >= (cost / 2) ? cost / 2 : cost;
    const additionalPercent = firstPayment >= (cost * 0.25) ? 0 : 1;
    const percent = decryptNumber(k || '') + additionalPercent;

    return {
      monthlyPayment: ((cost + ((countedSum / 100 * percent) * period)) - firstPayment) / period,
      summaryPayment: cost + ((countedSum / 100 * percent) * period),
      monthlyAdditionalPayment: (countedSum / 100 * percent),
    }
  }, [cost, firstPayment, period])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const sliderToValue = (pos: number) => {
    if (pos <= 50) {
      // Левая половина: 10 000 → 150 000
      const raw = 10000 + (pos / 50) * 140000
      return Math.round(raw / 500) * 500
    } else {
      // Правая половина: 150 000 → 300 000
      const raw = 150000 + ((pos - 50) / 50) * 150000
      return Math.round(raw / 5000) * 5000
    }
  }

  // реальное значение → pos [0..100]
  const valueToSlider = (val: number) => {
    if (val <= 150000) {
      return ((val - 10000) / 140000) * 50
    } else {
      return 50 + ((val - 150000) / 150000) * 50
    }
  }

  return (
    <div className="min-h-screen">
      <SubmitModal open={openModal} onOpenChange={setOpenModal} data={{
        cost,
        firstPayment,
        period,
        resultSum: result.summaryPayment,
        monthlyPayment: result.monthlyPayment,
      }} />
      {/* Navigation */}
      <nav
        className="shadow-sm sticky top-0 z-50 border-gray-accent bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            {/* <div className="font-extrabold text-4xl text-white  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Finmarket
            </div> */}
            <div className="font-extrabold text-4xl text-white  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src={murabaha.src} alt="murabaha" className="h-12" />
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("calculator")}
                className="transition-colors text-gray-dark hover:text-gold cursor-pointer"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection("conditions")}
                className="transition-colors text-gray-dark hover:text-gold cursor-pointer"
              >
                Условия
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="transition-colors text-gray-dark hover:text-gold cursor-pointer"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Section */}
      <section id="calculator" ref={calcRef} className="py-4 px-4 sm:px-6 lg:px-8 bg-blue-light">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl bg-white-acrill">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-medium">
                Расчитай свою рассрочку
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Product Price */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-medium">
                  Стоимость товара
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    inputMode="numeric"
                    type="text"
                    value={cost}
                    onChange={(e) => onChangeCost(Number(e.target.value), firstPayment)}
                    className="w-48 text-xl h-12 text-gray-dark font-semibold border-gray-accent bg-white border-[2px]"
                  />
                  <span className="text-2xl text-gray-medium">
                    ₽
                  </span>
                </div>
                <div className="relative">
                  <Slider
                    value={[valueToSlider(cost)]}
                    onValueChange={(v) => {
                      setCost(sliderToValue(v[0]))
                    }}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                  <div
                    className={`absolute top-1/2 h-6 w-1 -translate-y-1/2 -translate-x-1/2 rounded-full ${cost >= 150000 ? 'bg-gold' : 'bg-gray-accent'} shadow`}
                    style={{ left: "50%" }}
                  />
                </div>
                <div className="flex justify-between text-md text-gray-medium">
                  <span>10 000 ₽</span>
                  <span className="relative translate-x-[12.5px]">150 000 ₽</span>
                  <span>300 000 ₽</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-medium">
                  Первоначальный взнос
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    inputMode="numeric"
                    type="text"
                    value={firstPayment || 0}
                    onChange={(e) => onChangeFirstPayment(Number(e.target.value), cost)}
                    className="w-48 text-xl h-12 text-gray-dark font-semibold border-gray-accent bg-white border-[2px]"
                  />
                  <span className="text-2xl text-gray-medium">
                    ₽
                  </span>
                  {cost > 0 && (
                    <span className="text-md text-gray-medium">
                      ({(((firstPayment || 0) / cost) * 100).toFixed(1)}%)
                    </span>
                  )}

                </div>
                <Slider
                  value={[firstPayment]}
                  onValueChange={(v) => onChangeFirstPayment(v[0], cost)}
                  max={Number((cost * 0.8).toFixed(1))}
                  min={0}
                  step={cost * 0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-md text-gray-medium">
                  <span>0 ₽</span>
                  <span>{(cost * 0.8).toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Installment Period */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-medium">
                  Срок рассрочки
                </Label>
                <div className="flex items-center space-x-4">
                  <Input
                    inputMode="numeric"
                    type="text"
                    value={period}
                    onChange={(e) => onChangePeriod(Number(e.target.value), firstPayment)}
                    className="w-48 text-xl h-12 text-gray-dark font-semibold border-gray-accent bg-white border-[2px]"
                  />
                  <span className="text-xl text-gray-medium">
                    месяцев
                  </span>
                </div>
                <Slider
                  value={[period]}
                  onValueChange={(v) => {
                    setPeriod(v[0])
                    if (firstPayment < (cost * 0.25)) {
                      setFirstPayment(cost * 0.25)
                    }
                  }}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-md text-gray-medium">
                  <span>1 месяца</span>
                  <span>12 месяцев</span>
                </div>
              </div>

              <div className="p-6 rounded-lg border-2 border-gold bg-[#01538F]">
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
                      <p className="text-2xl font-bold text-gold">
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
                      <p className="text-4xl font-bold text-gold">
                        {result?.monthlyPayment.toLocaleString("ru-RU", {
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
                      <p className="text-xl font-semibold text-gold">
                        {result?.monthlyAdditionalPayment} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-14 text-lg font-semibold flex items-center justify-center gap-3 bg-gold hover:bg-gold cursor-pointer"
                onClick={() => {
                  if (cost < 10000 || period < 1) {
                    setShowWarning(true);
                    setTimeout(() => setShowWarning(false), 5000)
                    calcRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  } else {
                    setOpenModal(true)
                  }
                }}
              >
                Оформить рассрочку
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              Условия рассрочки
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className="hover:shadow-lg transition-shadow bg-blue-light"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-medium">
                  Возраст от 21 года
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Для оформления рассрочки покупатель и поручитель должны быть старше 21 года
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow bg-blue-light"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-medium">
                  Прописка по ЧР
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Обязательная прописка в Чеченской Республике
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow bg-blue-light"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-medium">
                  от 0 ₽ до 100 000 ₽
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Если сумма до 100 000 ₽ требуется один поручитель
                </CardDescription>
              </CardContent>
            </Card>
            <Card
              className="hover:shadow-lg transition-shadow bg-blue-light"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-medium">
                  От 100 000 ₽ до 300 000 ₽
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-white-ease">
                  Если сумма от 100 000 ₽ до 300 000 ₽ требуется два поручителя
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-8 rounded-lg bg-blue-light">
            <h3 className="text-xl font-semibold mb-4 text-gray-medium">
              Дополнительные преимущества:
            </h3>
            <ul className="space-y-2 text-white-ease">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-white shrink-0"></span>
                Рассрочка без банка по нормам Ислама
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-white shrink-0"></span>
                Без штрафов, пеней и процентов
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-white shrink-0"></span>
                Гибкий график платежей (можно самому выбрать дату платежа)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-white shrink-0"></span>
                Есть наличный и безналичный расчет
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-10 px-4 sm:px-6 lg:px-8 bg-blue-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#f8f9fa" }}>
              Контакты
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-white-acrill">
                <CardContent className="p-6">
                  <div className="space-y-6 text-gray-medium">
                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Телефон
                        </p>
                        <a href="tel:+79284773444" className="hover:underline text-gold">
                          +7 (928) 895 80 95
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Адрес
                        </p>
                        <p className="text-gold">г. Грозный, ул. Ярославского, д. 12</p>
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <Instagram className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Instagram
                        </p>
                        <a
                          href="https://instagram.com/fin_market95"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-gold"
                        >
                          @fin_market95
                        </a>
                      </div>
                    </div> */}

                    <div className="flex items-center space-x-4">
                      <div className="p-3" >
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          WhatsApp
                        </p>
                        <a
                          href="https://wa.me/79284771197"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-gold"
                        >
                          Написать в WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-medium">
                    <p className="text-sm mb-4">
                      Режим работы:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>Пн-Сб: 10:00 - 20:00</p>
                      <p>Вс: Выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="space-y-4 rounded-2xl overflow-hidden">
              <YMaps>
                <Map defaultState={{ center: [43.294329, 45.717112], zoom: 15 }} className="w-full h-full">
                  <Placemark geometry={[43.294329, 45.717112]} />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </section>
      {/* Warning Message */}

      {showWarning && (
        <WarningWindow setShowWarning={setShowWarning} />
      )}

      {/* Footer
      <footer className="py-8" style={{ backgroundColor: "#2a2a2a", color: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Калькулятор рассрочки. Все права защищены.</p>
        </div>
      </footer> */}
    </div>
  )
}
