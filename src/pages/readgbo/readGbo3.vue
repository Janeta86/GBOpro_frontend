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
      <h1 class="text-xl font-semibold mb-4" style="text-align: center">Ремонт и замена компонентов газобаллонного оборудования</h1>
      <div class="px-6 py-4">
        <p class="mb-4">
          Ремонт и замена компонентов газобаллонного оборудования (ГБО) на автомобиле — важная часть обслуживания, которая обеспечивает безопасную и эффективную работу системы. Поскольку ГБО эксплуатируется в условиях постоянной вибрации, температурных перепадов и химического воздействия топливных газов, износ его компонентов неизбежен. Своевременная диагностика, ремонт и замена изношенных частей помогают предотвратить серьезные неисправности и гарантируют сохранность автомобиля и безопасность водителя и пассажиров.
        </p>

        <h3 class="text-lg font-semibold mb-2">Преимущества установки ГБО</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><strong>1. Газовые форсунки: </strong> отвечают за подачу газа в двигатель. Износ форсунок может привести к нарушению равномерности подачи топлива, что снижает эффективность работы двигателя и увеличивает расход топлива.</p>
          <p class="mb-2"><strong>2. Газовый редуктор: </strong> преобразует сжиженный газ в паровую фазу и поддерживает необходимое давление. Неисправности редуктора могут вызвать нестабильную работу двигателя или остановку автомобиля. </p>
          <p class="mb-2"><strong>3. Электронный блок управления ГБО:</strong> контролирует работу газового оборудования. Повреждения в блоке управления могут привести к неправильной работе системы и увеличению расхода топлива.</p>
          <p class="mb-2"><strong>4. Газовые баллоны:</strong> хранят топливо. Важно следить за состоянием баллонов, так как любые повреждения или утечки могут быть чрезвычайно опасны.</p>
        </div>

        <h3 class="text-lg font-semibold mb-2">Ремонт и замена компонентов</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><li><strong>Диагностика:</strong> первым шагом в ремонте ГБО является диагностика, которая помогает точно определить источник проблемы. Специалисты используют компьютерные системы для чтения данных с датчиков и анализа работы системы. </li></p>
          <p class="mb-2"><li><strong>Ремонт:</strong> некоторые проблемы, такие как утечки газа или засорения, могут быть устранены путем ремонта существующих компонентов. Это может включать в себя замену уплотнений, ремонт форсунок или восстановление редуктора. </li></p>
          <p class="mb-2"><li><strong>Замена:</strong> изношенные или поврежденные компоненты часто требуют замены. Важно использовать качественные запчасти, соответствующие модели вашего ГБО и автомобиля. </li></p>
          <p class="mb-2"><li><strong>Тестирование после ремонта:</strong> после любых работ по ремонту или замене проводится тестирование системы, чтобы убедиться, что все компоненты функционируют правильно и безопасно.</li></p>
        </div>
        <p>Регулярный уход и своевременный ремонт ГБО помогают обеспечить длительную и безопасную эксплуатацию автомобиля на газовом топливе, а также способствуют экономии на топливе и снижению вредных выбросов в атмосферу.</p>
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
                <strong>Email:</strong>neftgbopro@mail.ru<br>
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