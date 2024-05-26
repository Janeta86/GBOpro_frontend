<template>
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <a class="logo d-flex align-items-center">
        <h1>ГБОпро</h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="./" exact-active-class="active" class="nav-link">Главная</router-link></li>
          <li><router-link to="./about" class="nav-link">О нас</router-link></li>
          <li><router-link to="./faq" class="nav-link">F.A.Q.</router-link></li>
          <li><router-link to="./contact" class="nav-link">Контакты</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
  <section id="hero" class="hero">
    <div class="info d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <h2 data-aos="fade-down">Установка ГБО<span> в Нефтеюганске</span></h2>
            <p data-aos="fade-up">Запишитесь на установку газового обрудования прямо сейчас и начните экономить! Предоставляем гарантию на ГБО на 1 год!</p>
            <div id="app">
              <a @click="showModal = true" class="btn-get-started" data-aos="fade-up" data-aos-delay="200">Записаться</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-sm shadow-xl transform transition-all sm:max-w-4xl w-full">
        <div class="flex flex-col items-center p-3">
          <div class="mt-0.2 mb-1">
            <h3 class="text-lg leading-6 font-medium text-gray-900 py-1">Онлайн запись</h3>
          </div>
          <hr class="w-full border-gray-300">
        </div>
        <div class="flex justify-between p-4 space-x-4">

          <div class="w-1/2 space-y-4">
            <div>
              <label class="label-text">Имя</label>
              <input type="text" v-model="name" placeholder="Имя" class="input-style" required>
            </div>
            <div>
              <label class="label-text">Email</label>
              <input type="email" v-model="email" placeholder="Email" class="input-style" required>
            </div>
            <div>
              <label class="label-text">Телефон</label>
              <MaskInput mask="+7(###)###-####" v-model="phone" placeholder="Телефон" class="input-style" required>
                <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Телефон</label>
              </MaskInput>
            </div>
            <div>
              <label class="label-text">Модель машины</label>
              <input type="text" v-model="car" placeholder="Модель машины" class="input-style" required>
            </div>
            <div>
              <label class="label-text">Комментарий</label>
              <textarea v-model="comment" placeholder="Комментарий" class="input-style"></textarea>
            </div>
          </div>
          <!-- Правая колонка для выбора даты и времени -->
          <div class="w-1/2 space-y-4">
            <div>
              <label class="label-text">Выберите дату:</label>
              <input
                type="date"
                v-model="selectedDate"
                :min="today"
                @change="fetchAvailableTimes"
                class="input-style" required>
            </div>
            <div v-if="availableTimes.length > 0">
              <label class="block text-gray-700 text-sm font-bold mb-2">Выберите время:</label>
              <div class="space-y-2">
                <div v-for="time in availableTimes" :key="time.id" class="space-y-2">
                  <input type="radio" :id="time.id" v-model="selectedTime" :value="formatTime(time.label)" :disabled="!time.available" class="hidden">
                  <label :for="time.id"
                         :class="['time-button',
                  selectedTime === formatTime(time.label) ? 'active' : '',
                  !time.available ? 'disabled' : '']">
                    {{ formatTime(time.label) }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end p-6 pt-0 space-x-2">
          <button @click="submitForm" class="send-button" type="submit">Отправить</button>
          <button @click="showModal = false" class="send-button-e">Отмена</button>
        </div>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>

    <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div class="carousel-item active" style="background-image: url(src/assets/img/hero-carousel/hero-carousel-1.jpg)"></div>
      <div class="carousel-item" style="background-image: url(src/assets/img/hero-carousel/hero-carousel-2.jpg)"></div>
      <div class="carousel-item" style="background-image: url(src/assets/img/hero-carousel/hero-carousel-3.jpg)"></div>
      <div class="carousel-item" style="background-image: url(src/assets/img/hero-carousel/hero-carousel-4.jpg)"></div>
      <div class="carousel-item" style="background-image: url(src/assets/img/hero-carousel/hero-carousel-5.jpg)"></div>

      <a class="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
  </section>
  <main id="main">

    <!-- ======= Заявка ======= -->
    <section id="get-started" class="get-started section-bg">
      <div class="container">

        <div class="row justify-content-between gy-4">

          <div class="col-lg-6 d-flex align-items-center" data-aos="fade-up">
            <div class="content">
              <h3>Нужна помощь в выборе оборудования?</h3>
              <p>Оставьте заявку, и наш специалист свяжется с вами для предоставления подробной информации и помощи в выборе подходящего оборудования</p>
            </div>
          </div>

          <div class="col-lg-5" data-aos="fade">
            <form @submit.prevent="submitApplication" class="email-form">
              <h3 class="order-text">Оставить заявку</h3>
              <div class="row gy-3">
                <div class="col-md-12">
                  <label class="label-text">Имя</label>
                  <input type="text" v-model="applicationData.name" class="input-style" placeholder="Имя" required>
                </div>
                <div class="col-md-12">
                  <label class="label-text">Email</label>
                  <input type="email" v-model="applicationData.email" class="input-style" placeholder="Email" required>
                </div>
                <div class="col-md-12">
                  <label class="label-text">Телефон</label>
                  <MaskInput mask="+7(###)###-####" v-model="applicationData.phone" placeholder="Телефон" class="input-style" required>
                    <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Телефон</label>
                  </MaskInput>
                </div>
                <div class="col-md-12">
                  <label class="label-text">Сообщение</label>
                  <textarea v-model="applicationData.comment" class="input-style" rows="6" placeholder="Сообщение"></textarea>
                </div>
                <div class="col-md-12 text-center">
                  <div v-if="applicationData.isLoading">Загрузка...</div>
                  <div v-if="applicationData.errorMessage" class="error-message">{{ applicationData.errorMessage }}</div>
                  <div v-if="applicationData.successMessage" class="sent-message">{{ applicationData.successMessage }}</div>
                  <button type="submit" class="btn btn-primary">Отправить</button>
                </div>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section><!-- Заявка -->

    <!-- =======Наши преимущества ======= -->
    <section id="alt-services" class="alt-services">
      <div class="container" data-aos="fade-up">

        <div class="row justify-content-around gy-4">
          <div class="col-lg-6 img-bg" style="background-image: url(src/assets/img/alt-services.jpg);" data-aos="zoom-in" data-aos-delay="100"></div>

          <div class="col-lg-5 d-flex flex-column justify-content-center">
            <h3>Наши преимущества</h3>

            <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="100">
              <i class="bi bi-easel flex-shrink-0"></i>
              <div>
                <h4><a href="" class="stretched-link">Услуга в рассрочку</a></h4>
                <p>Мы предлагаем своим клиентам возможность оплатить услуги в рассрочку.</p>
              </div>
            </div>

            <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-patch-check flex-shrink-0"></i>
              <div>
                <h4><a href="" class="stretched-link">Гарантия на услугу 1 год</a></h4>
                <p>Мы предоставляем гарантию на установленное оборудование и предлагаем сервисное обслуживание.</p>
              </div>
            </div>

            <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="300">
              <i class="bi bi-person flex-shrink-0"></i>
              <div>
                <h4><a href="" class="stretched-link">Индивидуальный подход</a></h4>
                <p>Наши специалисты готовы выслушать требования и пожелания клиента, чтобы подобрать наиболее подходящее оборудование для его автомобиля и потребностей.</p>
              </div>
            </div>

            <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="400">
              <i class="bi bi-gear flex-shrink-0"></i>
              <div>
                <h4><a href="" class="stretched-link">Качество и надежность</a></h4>
                <p> Мы работаем только с качественным оборудованием, от проверенных производителей.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section><!-- Наши преимущества -->


    <!-- ======= Услуги ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Услуги</h2>
        </div>

        <div class="row gy-4">

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <router-link to="./readgboone">
            <div class="service-item  position-relative">
              <div class="icon">
                <i class="fa-solid fa-gas-pump"></i>
              </div>
              <h3>Установка газового оборудования</h3>
              <p>Установка различных видов газового оборудования, таких как газовые баллоны, регуляторы давления, клапаны.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <router-link to="./readgbotwo">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fa-solid fa-gear"></i>
              </div>
              <h3>Техническое обслуживание ГБО</h3>
              <p>Проверка и регулировка компонентов, замена фильтров и других расходных материалов, а также диагностика и устранение возможных неисправностей.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <router-link to="./readgbothree">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fa-solid fa-car"></i>
              </div>
              <h3>Ремонт и замена компонентов ГБО</h3>
              <p>При проблемах с системой ГБО, производим ремонт или замену неисправных компонентов.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <router-link to="./readgbofour">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fa-solid fa-gauge"></i>
              </div>
              <h3>Диагностика и настройка</h3>
              <p>Диагностика системы ГБО для выявления возможных проблем или неисправностей.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <router-link to="./readgbofive">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fa-solid fa-file"></i>
              </div>
              <h3>Регистрация ГБО</h3>
              <p>Поможем с оформлением необходимых документов и регистрацией системы ГБО в соответствии с правилами и требованиями.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fa-solid fa-book"></i>
              </div>
              <h3>Консультации и обучение</h3>
              <p>Предосталяем консультации по вопросам установки и эксплуатации системы ГБО.</p>
              <a class="readmore stretched-link">Читать дальше <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>

        </div>

      </div>
    </section><!-- Услуги -->
    <!-- ======= Testimonials Section ======= -->
    <section id="testimonials" class="testimonials section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>Отзывы</h2>

        </div>

        <div class="slides-2 swiper">
          <div class="swiper-wrapper">

            <div class="swiper-slide">
              <div class="testimonial-wrap">
                <div class="testimonial-item">
                  <img src="../assets/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">
                  <h3>Кирилл Рожков</h3>

                  <div class="stars">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    У меня уже несколько лет установлено ГБО и я не могу нарадоваться. Это не только экономия на топливе, но и чистый вклад в окружающую среду. Рекомендую!
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-wrap">
                <div class="testimonial-item">
                  <img src="../assets/img/testimonials/testimonials-2.jpg" class="testimonial-img" alt="">
                  <h3>Лариса Совельева</h3>

                  <div class="stars">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    Установка ГБО на мой автомобиль превзошла все мои ожидания. Не только экономия на топливе, но и плавная работа двигателя, меньший износ и даже увеличение мощности. Рекомендую всем!
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-wrap">
                <div class="testimonial-item">
                  <img src="../assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="">
                  <h3>Анастасия Галкина</h3>

                  <div class="stars">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    Установка ГБО сразу окупилась благодаря экономии на топливе. А еще у меня появилась возможность заправляться на любой АЗС, ведь ГБО совместимо с различными видами газа. Удобство и экономия в одном.
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-wrap">
                <div class="testimonial-item">
                  <img src="../assets/img/testimonials/testimonials-4.jpg" class="testimonial-img" alt="">
                  <h3>Валерий Горький</h3>

                  <div class="stars">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    Я недавно установил ГБО и уже заметил значительную экономию. Благодаря этому, я могу больше позволить себе путешествовать на своем автомобиле и не думать о высоких расходах на топливо. Очень доволен!
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div><!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-wrap">
                <div class="testimonial-item">
                  <img src="../assets/img/testimonials/testimonials-5.jpg" class="testimonial-img" alt="">
                  <h3>Лев Исько</h3>

                  <div class="stars">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    Я долго раздумывал о установке ГБО, но когда наконец решился, не пожалел. Экономия топлива сразу заметна, а стоимость установки окупается в короткие сроки. Рекомендую всем, кто хочет сэкономить и быть экологически осознанным.
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div><!-- End testimonial item -->

          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Testimonials Section -->

  </main>

  <!-- ======= Footer ======= -->
  <footer id="footer" class="footer">
    <div class="footer-content position-relative">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="footer-info">
              <h3>Контакты</h3>
              <p>
                г. Нефтеюганск <br>
                Усть-Балыкская ул., 21<br><br>
                <strong>Режим работы:</strong> <br>Пн-Пт c 09:00 до 20:00<br> Сб-Вс c 09:00 до 18:00<br><br>
                <strong>Телефон:</strong> +79123456789<br>
                <strong>Email:</strong> neftgbopro@mail.ru<br>
              </p>
            </div>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Навигация</h4>
            <ul>
              <li><a>Главная</a></li>
              <li><a>О нас</a></li>
              <li><a>F.A.Q.</a></li>
              <li><a>Контакты</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 footer-links">
            <h4>О компании</h4>
            <ul>
              <li><a href="#">Услуги</a></li>
              <li><a href="#">Гарантия</a></li>
              <li><a href="#">Оплата</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Популярные категории</h4>
            <ul>
              <li><a href="#">Курсы по установке ГБО</a></li>
              <li><a href="#">Регистрация в ГИБДД</a></li>
              <li><a href="#">Технический раздел</a></li>
              <li><a href="#">Примеры работ</a></li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Партнерам</h4>
            <ul>
              <li><a href="#">Предложение для таксопарков</a></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Наши реквизиты</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</template>

<script setup>
import { ref, reactive, toRefs, computed } from 'vue';
import axios from 'axios';

const showModal = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const appointmentData = reactive({
  name: '',
  email: '',
  phone: '',
  car: '',
  comment: '',
  selectedDate: '',
  selectedTime: '',
  availableTimes: []
});
const applicationData = reactive({
  name: '',
  email: '',
  phone: '',
  comment: '',
  isLoading: false,
  errorMessage: '',
  successMessage: ''
});

const { name, email, phone, car, comment, selectedDate, selectedTime, availableTimes } = toRefs(appointmentData);

const today = computed(() => {
  const now = new Date();
  return now.toISOString().split('T')[0];
});

const formatTime = (timeString) => {
  if (!timeString) return '';
  const parts = timeString.split(':');
  return parts.slice(0, 2).join(':');
};

const fetchAvailableTimes = async () => {
  if (selectedDate.value) {
    try {
      const response = await axios.get(`http://localhost:5000/api/available/${selectedDate.value}`);
      availableTimes.value = response.data.map(time => ({
        id: time.id,
        label: time.time,
        available: time.isAvailable
      }));
    } catch (error) {
      console.error('Ошибка при получении доступных времен:', error);
    }
  }
};


const validateForm = () => {
  if (!name.value || !email.value || !phone.value || !car.value || !selectedDate.value || !selectedTime.value) {
    errorMessage.value = 'Пожалуйста, заполните все поля.';
    return false;
  }
  errorMessage.value = '';
  return true;
};

const sendEmail = async () => {
  try {
    const emailData = {
      date: selectedDate.value,
      time: selectedTime.value,
      name: name.value,
      phone: phone.value,
      email: email.value
    };

    const response = await axios.post('http://localhost:5000/api/user/sendmail', emailData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status !== 200) throw new Error('Ошибка отправки');
    successMessage.value = 'Запись подтверждена, проверьте вашу почту!'
  } catch (error) {
    console.error('Ошибка:', error);
    errorMessage.value ='Произошла ошибка при отправке'
  }
};

const submitForm = async () => {
  if (validateForm()) {
    try {
      const appointment = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        car: car.value,
        comment: comment.value,
        date: selectedDate.value,
        time: selectedTime.value
      };
      const response = await axios.post('http://localhost:5000/api/order', appointment);
      console.log('Ответ сервера:', response.data);
      successMessage.value = '';
      errorMessage.value = '';

      await sendEmail();

      setTimeout(() => {
        showModal.value = false;
        successMessage.value = '';
      }, 3000);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      errorMessage.value = 'Ошибка при отправке данных: ' + error.message;
      successMessage.value = '';
    }
  }
};

const submitApplication = async () => {
  if (!applicationData.name || !applicationData.email || !applicationData.phone || !applicationData.message) {
    applicationData.errorMessage = 'Пожалуйста, заполните все поля.';
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/user/c', applicationData);
    console.log('Ответ сервера:', response.data);
    applicationData.successMessage = '';
    applicationData.errorMessage = '';
    applicationData.name = '';
    applicationData.email = '';
    applicationData.phone = '';
    applicationData.message = '';
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    applicationData.errorMessage = 'Ошибка при отправке данных: ' + error.message;
    applicationData.successMessage = '';
  }
};

</script>

<style scoped>
@import '../assets/css/main.css';
.input-style {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d5d7da;
  box-sizing: border-box;
  transition: border-color 0.3s;
  box-shadow: none;
  font-size: 14px;

}

.input-style:focus {
  border-color: #ff8c01;
  outline: none;
}

.send-button-e {
  background: #223038;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}
.send-button-e:hover {
  background-color: #2f353b;
}

.send-button {
  background: #ff8c01;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}
.send-button:hover {
  background-color: #ffc732;
}

.time-button {
  display: block;
  cursor: pointer;
  padding: 8px 16px;
  text-align: center;
  border: 1px solid #ffa500;
  transition: background-color 0.3s;
  background-color: #fff;
  color: #333;
}

.time-button:hover {
  background-color: #ffa500;
}
.time-button.active, .time-button:active {
  background-color: #ffa500;
  color: #fff;
}

.time-button.disabled {
  cursor: not-allowed;
  color: #ccc;
}

.success-message {
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  font-size: 16px;
  text-align: center;
}

.error-message {
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  font-size: 16px;
  text-align: center;
}
.label-text {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
  font-weight: 500;
}

.order-text {
  padding-bottom: 10px;
}
p {
  color: #52565e;
}

</style>