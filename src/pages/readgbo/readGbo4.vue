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
          <li><router-link to="./" class="nav-link">Главная</router-link></li>
          <li><router-link to="./about" class="nav-link">О нас</router-link></li>
          <li><router-link to="./faq" exact-active-class="active"  class="nav-link">F.A.Q.</router-link></li>
          <li><router-link to="./contact" class="nav-link">Контакты</router-link></li>
        </ul>
      </nav>

    </div>
  </header>

  <main id="main">

    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('src/assets/img/breadcrumbs-bg.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">

        <h2>Услуги</h2>
        <ol>
          <li><router-link to="/" class="nav-link">Главная</router-link></li>
          <li>Услуги</li>
        </ol>

      </div>
    </div>
  </main>

  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <h1 class="text-xl font-semibold mb-4" style="text-align: center"> Диагностика и настройке газобаллонного оборудования</h1>
      <div class="px-6 py-4">
        <p class="mb-4">
          Диагностика и настройка газобаллонного оборудования (ГБО) на автомобиле — критически важные процедуры, которые обеспечивают безопасность, экономичность и эффективность работы системы. Эти процессы помогают идентифицировать и устранить возможные неисправности до того, как они приведут к серьезным поломкам или аварийным ситуациям.
        </p>

        <h3 class="text-lg font-semibold mb-2">Этапы диагностики</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><strong>1. Визуальный осмотр:</strong> проверка на наличие механических повреждений, коррозии, утечек газа, и состояния соединений. </p>
          <p class="mb-2"><strong>2. Компьютерная диагностика:</strong> считывание данных с электронного блока управления ГБО для анализа ошибок и корректировки параметров работы системы.</p>
          <p class="mb-2"><strong>3. Проверка форсунок и редуктора: </strong> тестирование на производительность и отклик, проверка давления газа и состояния фильтров.</p>
          <p class="mb-2"><strong>4. Тест на утечки газа: </strong> использование специальных детекторов утечек для обнаружения наименьших протечек в системе. </p>
          <p class="mb-2"><strong>5. Проверка газовых баллонов: </strong> осмотр на предмет повреждений и коррозии, проверка даты следующего технического осмотра баллона.</p>
        </div>

        <h3 class="text-lg font-semibold mb-2">Настройка ГБО</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><li><strong>Регулировка давления газа: </strong>  обеспечение оптимального давления для конкретного типа двигателя и условий эксплуатации.</li></p>
          <p class="mb-2"><li><strong>Калибровка газовых форсунок: </strong> настройка для обеспечения равномерного распределения газа по цилиндрам двигателя.  </li></p>
          <p class="mb-2"><li><strong>Настройка программного обеспечения ГБО:</strong> корректировка параметров блока управления для оптимизации работы двигателя на газу и бензине.</li></p>
        </div>
        <p>Регулярная профессиональная диагностика и тонкая настройка системы не только увеличивают безопасность и эффективность работы автомобиля, но и помогают избежать значительных затрат на ремонт в будущем.</p>
      </div>
    </div>
  </section>

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


</script>

<style>
@import '/src/assets/css/main.css';


@media (max-width: 767px) {
  html {
    font-size: 14px;
  }
}
</style>