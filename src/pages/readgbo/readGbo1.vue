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
          <li><router-link to="./" class="nav-link">Главная</router-link></li>
          <li>Услуги</li>
        </ol>

      </div>
    </div>
  </main>

  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <h1 class="text-xl font-semibold mb-4" style="text-align: center">Установка газобаллонного оборудования на автомобиль</h1>
    <div class="px-6 py-4">
      <p class="mb-4">
        Установка газобаллонного оборудования (ГБО) на автомобиль представляет собой популярный способ снижения расходов на топливо и уменьшения вредных выбросов в атмосферу. В процессе установки ГБО автомобиль получает возможность работать как на обычном бензине, так и на газе, что делает его использование более гибким и экономически выгодным.
      </p>

      <h3 class="text-lg font-semibold mb-2">Преимущества установки ГБО</h3>
      <div class="list-disc pl-6 mb-4">
        <p class="mb-2"><li><strong>Экономия стоимости топлива: </strong> газ значительно дешевле бензина и дизеля, что позволяет сократить расходы на топливо.</li></p>
        <p class="mb-2"><li><strong>Экологичность: </strong> газ сжигается более чисто, что снижает выбросы углекислого газа и других вредных веществ.</li></p>
        <p class="mb-2"><li><strong>Увеличение ресурса двигателя: </strong> газ сгорает мягче, что способствует меньшему износу двигателя.</li></p>
      </div>

      <h3 class="text-lg font-semibold mb-2">Этапы установки ГБО</h3>
      <div class="list-disc pl-6 mb-4">
        <p class="mb-2"><strong>1. Консультация и подбор оборудования:</strong> специалисты проводят диагностику автомобиля и подбирают подходящий тип ГБО.</p>
        <p class="mb-2"><strong>2. Монтаж:</strong> включает установку газового баллона, разводку топливных линий, редуктора-испарителя и форсунок. В среднем установка занимает от 4 до 6 часов.</p>
        <p class="mb-2"><strong>3. Настройка и калибровка системы:</strong> для обеспечения оптимальных условий работы на газу.</p>
        <p class="mb-2"><strong>4. Проверка и тестирование:</strong> для обеспечения всех функций и безопасности.</p>
        <p class="mb-2"><strong>5. Оформление документов:</strong> после окончания установки ГБО нужно обязательно зарегистрировать изменения в ГИБДД. Вы можете это сделать самостоятельно, или мы это можем сделать за вас и вы сэкономите время.</p>
      </div>
      <p>Установка ГБО — это выгодное инвестиционное решение для владельцев автомобилей, позволяющее экономить на топливе и вносить вклад в защиту окружающей среды.</p>
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
@media (max-width: 767px) {
  html {
    font-size: 14px;
  }
}
</style>