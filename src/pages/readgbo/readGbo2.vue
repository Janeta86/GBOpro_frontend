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
      <h1 class="text-xl font-semibold mb-4" style="text-align: center">Техническое обслуживание газобаллонного оборудования</h1>
      <div class="px-6 py-4">
        <p class="mb-4">
          Техническое обслуживание газобаллонного оборудования (ГБО) на автомобиле — это критически важный аспект эксплуатации, который не только гарантирует безопасное использование автомобиля, но и помогает поддерживать его в отличном рабочем состоянии. Регулярное и качественное обслуживание ГБО способствует увеличению срока службы автомобильных компонентов и снижает риски аварийных ситуаций, связанных с газовой системой.
        </p>

        <h3 class="text-lg font-semibold mb-2">Основные этапы технического обслуживания ГБО:</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><strong>1. Замена фильтров: </strong> фильтры ГБО играют ключевую роль в очистке газа от примесей. Их регулярная замена предотвращает засорение элементов системы и снижает износ компонентов.</p>
          <p class="mb-2"><strong>2. Проверка газовых магистралей и соединений: </strong> во избежание утечек газа, что может привести к возгоранию, все соединения и магистрали должны регулярно проверяться на герметичность.</p>
          <p class="mb-2"><strong>3. Слив конденсата из газового редуктора: </strong> эта процедура особенно важна для ГБО первых поколений, где конденсат может накапливаться, вызывая коррозию и снижение эффективности системы.</p>
          <p class="mb-2"><strong>4. Настройка и регулировка системы::</strong> настройка системы управления газовым оборудованием обеспечивает оптимальное сгорание топлива и стабильную работу двигателя. </p>
          <p class="mb-2"><strong>5. Тестирование системы:</strong> регулярные проверки и диагностика всех компонентов ГБО помогают обнаружить и устранить возможные неисправности до того, как они приведут к серьезным проблемам.</p>
          <p class="mb-2"><strong>6. Диагностика с использованием специализированного оборудования:</strong> современное диагностическое оборудование позволяет точно определить состояние компонентов системы и эффективность их работы.</p>

        </div>

        <h3 class="text-lg font-semibold mb-2">Где и как проводить ТО ГБО?</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2"><li><strong>Специализированные сервисные центры:</strong> рекомендуется обращаться в сервисы, которые специализируются на установке и обслуживании газобаллонного оборудования. Квалифицированные специалисты имеют необходимые знания и оборудование для проведения всех видов работ.</li></p>
          <p class="mb-2"><li><strong>Самостоятельное обслуживание:</strong> некоторые элементы ТО, такие как замена фильтров, можно выполнить самостоятельно, однако большинство процедур требует профессионального подхода и специализированных инструментов.</li></p>
        </div>

        <h3 class="text-lg font-semibold mb-2">Периодичность обслуживания</h3>
        <div class="list-disc pl-6 mb-4">
          <p class="mb-2">Периодичность технического обслуживания зависит от множества факторов, включая модель ГБО, условия эксплуатации автомобиля и пробег. Обычно рекомендуется проводить ТО каждые 10-15 тысяч километров пробега.</p>

        </div>
        <p>Техническое обслуживание газобаллонного оборудования — это залог безопасности, экономии и долговечности вашего автомобиля. Не пренебрегайте регулярными проверками и обслуживанием, чтобы избежать серьезных проблем в будущем.</p>
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