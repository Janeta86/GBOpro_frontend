<template>
  <header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <router-link to="./">
      <a class="logo d-flex align-items-center">
        <h1>ГБОпро</h1>
      </a>
      </router-link>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="./" class="nav-link">Главная</router-link></li>
          <li><router-link to="./about" class="nav-link">О нас</router-link></li>
          <li><router-link to="./faq" class="nav-link">F.A.Q.</router-link></li>
          <li><router-link to="./contact" class="nav-link" exact-active-class="active">Контакты</router-link></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">

    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('src/assets/img/breadcrumbs-bg.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">
        <h2>Контакты</h2>
        <ol>
          <li><router-link to="./" class="nav-link">Главная</router-link></li>
          <li>Контакты</li>
        </ol>
      </div>
    </div>

    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-map"></i>
              <h3>Адрес</h3>
              <p>г. Нефтеюганск, Усть-Балыкская ул., 21</p><br>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-clock"></i>
              <h3>Время работы</h3>
              <p>Пн-Пт c 09:00 до 20:00<br> Сб-Вс c 09:00 до 18:00</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-envelope"></i>
              <h3>Email</h3>
              <p>neftgbopro@mail.ru</p><br>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-item  d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-telephone"></i>
              <h3>Телефон</h3>
              <p>+79123456789</p><br>
            </div>
          </div>

        </div>

        <div class="row gy-4 mt-1">

          <div class="col-lg-6 ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1051.4487152978732!2d72.64340459888544!3d61.09743220231149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43747be3c13a90f3%3A0xf66e91d94ea6f34c!2z0JPQkdCe0J_QoNCeLtCg0KQtINGD0YHRgtCw0L3QvtCy0LrQsCDQuCDRgNC10LzQvtC90YIg0LPQsdC-Lg!5e0!3m2!1sru!2sru!4v1715883072015!5m2!1sru!2sru" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div class="col-lg-6">
            <div class="contact-form">
              <form @submit.prevent="submitApplication" class="email-form">
                <div class="row gy-4">
                  <div class="col-lg-6 form-group">
                    <label class="label-text">Имя</label>
                    <input type="text" v-model="name" class="form-control" placeholder="Имя" required>
                  </div>
                  <div class="col-lg-6 form-group">
                    <label class="label-text">Email</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Email" required>
                  </div>
                  <div class="form-group">
                    <label class="label-text">Телефон</label>
                    <MaskInput mask="+7(###)###-####" v-model="phone" placeholder="Телефон" class="input-style" required>
                      <label class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Телефон</label>
                    </MaskInput>
                  </div>
                  <div class="form-group">
                    <label class="label-text">Сообщение</label>
                    <textarea v-model="comment" class="form-control" rows="5" placeholder="Сообщение"></textarea>
                  </div>
                  <div class="text-center">
                    <button type="submit">Отправить</button>
                  </div>
                  <div v-if="isLoading">Загрузка...</div>
                  <p v-if="successMessage" class="p-3 bg-green-200 text-green-800 rounded">{{ successMessage }}</p>
                  <p v-if="errorMessage" class="p-3 bg-red-200 text-red-800 rounded">{{ errorMessage }}</p>
                </div>
              </form>
              <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>

  </main>

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

<script>
import { reactive, ref, toRefs } from 'vue';
import axios from 'axios';

export default {
  name: 'ContactForm',
  setup() {
    const contactData = reactive({
      name: '',
      email: '',
      phone: '',
      comment: '',
      isLoading: false
    });
    const errorMessage = ref('');
    const successMessage = ref('');

    const submitApplication = async () => {
      contactData.isLoading = true;
      errorMessage.value = '';
      successMessage.value = '';

      if (!contactData.name || !contactData.email || !contactData.phone || !contactData.comment) {
        errorMessage.value = "Пожалуйста, заполните все поля.";
        console.log('Name:', contactData.name);
        console.log('Email:', contactData.email);
        console.log('Phone:', contactData.phone);
        console.log('Comment:', contactData.comment);
        setTimeout(() => {
          errorMessage.value = '';
          successMessage.value = '';
        }, 5000);
        contactData.isLoading = false;
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/user/c', {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          comment: contactData.comment
        });
        successMessage.value = 'Ваша заявка успешно отправлена. Спасибо!';
        contactData.name = '';
        contactData.email = '';
        contactData.phone = '';
        contactData.comment = '';

        setTimeout(() => {
          errorMessage.value = '';
          successMessage.value = '';
        }, 5000);
      } catch (error) {
        errorMessage.value = 'Ошибка при отправке данных: ' + (error.response ? error.response.data.message : error.message);
        setTimeout(() => {
          errorMessage.value = '';
          successMessage.value = '';
        }, 5000);
      } finally {
        contactData.isLoading = false;
      }
    };

    return {
      ...toRefs(contactData),
      errorMessage,
      successMessage,
      submitApplication
    };
  }
};
</script>

<style scoped>

</style>