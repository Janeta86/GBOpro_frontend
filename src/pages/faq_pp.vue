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

        <h2>Частые вопросы</h2>
        <ol>
          <li><router-link to="./" class="nav-link">Главная</router-link></li>
          <li>F.A.Q.</li>
        </ol>

      </div>
    </div>
  </main>

  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <h1 class="text-xl font-semibold mb-4" style="text-align: center">Наш FAQ поможет разобраться в ключевых аспектах установки, эксплуатации и обслуживания системы ГБО.</h1>
    </div>
      <div class="accordion">
      <div v-for="item in paginatedItems" :key="item.id" class="accordion-item">
        <div class="accordion-item-header" @click="toggleActive(item.id)">
          {{ item.question }}
        </div>
        <div v-if="item.active" class="accordion-item-body">
          <div class="accordion-item-body-content">
            {{ item.answer }}
          </div>
        </div>
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
import { ref, computed, onMounted } from 'vue'

  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const items = ref([
  { id: 1,
    question: 'Если установить на автомобиль ГБО, будет ли он работать на бензине?',
    answer: 'Да, если вы устанавливаете газобаллонное оборудование (ГБО) на автомобиль, то он по-прежнему будет способен работать на бензине. Система ГБО обычно предусматривает переключение между газом и бензином в зависимости от ваших предпочтений или конкретных ситуаций. Это одно из преимуществ использования ГБО, так как оно обеспечивает большую гибкость и экономию на топливе для водителей.',
    active: false },
  { id: 2,
    question: 'Подходят ли все автомобили для установки газобаллонного оборудования (ГБО)?',
    answer: 'В целом, большинство автомобилей подходят для установки газобаллонного оборудования (ГБО), независимо от марки, модели и типа кузова. Однако, есть несколько важных аспектов, которые следует учесть: вид подачи топлива, техническое состояние автомобиля, региональные нормативы и сертификация, модификации и изменения. Для того чтобы убедиться, что ваш автомобиль подходит для установки ГБО, рекомендуется проконсультироваться с профессиональным автосервисом, специализирующимся на установке ГБО. Они смогут оценить ваш автомобиль и предоставить рекомендации по оптимальной системе ГБО для вашей машины.',
    active: false },
  { id: 3,
    question: 'Сколько времени требуется на установку системы ГБО (газобаллонного оборудования) на автомобиль?',
    answer: 'Время, необходимое для установки системы ГБО, может варьироваться в зависимости от различных факторов, включая марку и модель автомобиля, тип устанавливаемого оборудования, опыт мастера и условия работы. Основные аспекты времени установки включают: тип автомобиля, уровень опыта мастера, тип и объем устанавливаемого оборудования, состояние автомобиля. Для большинства стандартных установок на современных автомобилях установка ГБО обычно занимает около 4-8 часов времени. Важно сотрудничать с надежным автосервисом, чтобы обеспечить качественную и безопасную установку ГБО на вашем автомобиле',
    active: false },
  { id: 4,
    question: 'Правда ли, что после установки ГБО оборудования в салоне будет запах газа?',
    answer: 'Нет, после установки газобаллонного оборудования (ГБО) в салоне автомобиля обычно не будет запаха газа. Это связано с тем, что все компоненты системы ГБО, включая газовые баллоны, трубопроводы и уплотнительные элементы, проходят строгую проверку на герметичность и безопасность. Системы ГБО разработаны так, чтобы обеспечивать надежное и герметичное хранение и использование газа (пропана, сжатого природного газа и т. д.) в автомобиле. Если система ГБО установлена и настроена правильно в специализированном автосервисе, то она не должна вызывать запаха газа в салоне. Однако, если вы замечаете запах газа в салоне автомобиля после установки системы ГБО, это может указывать на потенциальную утечку или другую неисправность в системе. В таком случае необходимо немедленно обратиться в автосервис для проведения диагностики и устранения проблемы, так как безопасность является приоритетом при использовании газа в качестве топлива.',
    active: false },
  { id: 5,
    question: 'Какими бывают газовые баллоны для системы ГБО?',
    answer: 'Газовые баллоны для системы газобаллонного оборудования (ГБО) бывают разных типов, и их выбор зависит от требований автомобиля и предпочтений водителя. Вот два основных типа газовых баллонов: цилиндрические баллоны (имеют форму цилиндра и различаются по диаметру, длине и объему, они могут быть разных размеров, и водители могут выбрать баллон, который лучше всего подходит для их автомобиля и потребностей, могут быть установлены в различных местах под кузовом автомобиля), тороидальные баллоны (имеют форму тороида и обычно имеют ёмкость от 42 до 108 литров, предназначены для установки в нишу запаски автомобиля, могут быть удобными, так как они не занимают место в багажнике, и при этом обеспечивают больший объем газа. Выбор между цилиндрическими и тороидальными баллонами зависит от конкретных особенностей автомобиля, желаемого объема газа, доступного места для установки и других факторов. Важно учесть, что установка газовых баллонов и других компонентов системы ГБО должна выполняться квалифицированными специалистами в автосервисе, чтобы обеспечить безопасность и эффективность работы системы.',
    active: false },
  { id: 6,
    question: 'Можно ли установить сразу два газовых баллона?',
    answer: 'Технически установка двух газовых баллонов на автомобиль возможна. Однако на практике это весьма редко применяется. Такой подход может потребовать дополнительного места и веса под автомобилем, что может повлиять на его управляемость и эффективность. Перед принятием решения о двойной установке баллонов, рекомендуется консультация с профессионалами по ГБО.',
    active: false },
  { id: 7,
    question: 'Какое давление может выдержать газовый баллон?',
    answer: 'Давление, которое газовый баллон способен выдержать, зависит от его типа. Обычно газовые баллоны могут выдерживать давление до 250 атмосфер. Если вы используете пропан в качестве топлива, то давление этого газа на стенки баллона не превышает 16 атмосфер.',
    active: false },
  { id: 8,
    question: 'Как часто проводится проверка газового оборудования автомобиля?',
    answer: 'Техническое обслуживание газового оборудования автомобиля обычно рекомендуется проводить каждые 10.000 километров пробега. Это позволяет поддерживать надежную и безопасную работу системы ГБО. Однако, частота проверок может варьироваться в зависимости от конкретного оборудования и производителя, поэтому важно соблюдать рекомендации, указанные в руководстве по эксплуатации вашей системы ГБО. Кроме того, рекомендуется регулярно проверять работоспособность системы ГБО и визуально осматривать газовое оборудование, чтобы своевременно выявлять любые признаки износа или неисправности. Это помогает обеспечить долгий срок службы и надежность системы ГБО, а также обеспечить безопасность водителя и пассажиров.',
    active: false },
  { id: 9,
    question: 'Можно установить ГБО на турбированный двигатель?',
    answer: 'Да, можно установить газобаллонное оборудование (ГБО) на турбированный двигатель. Однако, важно выбрать правильное оборудование и подход к установке. В случае турбированных двигателей рекомендуется использовать инжекторное газобаллонное оборудование, которое способно эффективно регулировать подачу газа в соответствии с рабочей нагрузкой двигателя и уровнем наддува. При установке ГБО на турбированный двигатель важно проконсультироваться с опытными специалистами, чтобы выбрать подходящее оборудование и гарантировать правильную установку и настройку. Неправильная установка ГБО на турбированный двигатель может повлиять на его производительность и надежность, поэтому важно производить эту процедуру профессионально.',
    active: false }
  ]);

const activeItemsIndices = ref([]);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return items.value.slice(start, end);
});

function toggleActive(itemId) {
  const index = items.value.findIndex(item => item.id === itemId);
  if (index !== -1) {
    items.value[index].active = !items.value[index].active;
    if (items.value[index].active) {
      activeItemsIndices.value.push(index);
    } else {
      const itemIndexIndex = activeItemsIndices.value.indexOf(index);
      if (itemIndexIndex !== -1) {
        activeItemsIndices.value.splice(itemIndexIndex, 1);
      }
    }
  }
}

function setActiveItems() {
  paginatedItems.value.forEach(item => {
    item.active = false;
  });
  activeItemsIndices.value.forEach(index => {
    if (index >= (currentPage.value - 1) * itemsPerPage.value && index < currentPage.value * itemsPerPage.value) {
      items.value[index].active = true;
    }
  });
}

onMounted(() => {
  setActiveItems();
});
</script>

<style>
@import '../assets/css/main.css';
.accordion {
  width: 90%;
  max-width: 1000px;
  margin: 2rem auto;
}
.accordion-item {
  background-color: #fff;
  color: #111;
  margin: 1rem 0;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
}
.accordion-item-header {
  padding: 0.5rem 3rem 0.5rem 1rem;
  min-height: 3.5rem;
  line-height: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.accordion-item-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.accordion-item-header::after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(-45deg);
  position: absolute;
  right: 2rem;
  top: 50%;
  margin-top: -5px;
}
.accordion-item-header.active::after {
  transform: rotate(135deg);
}
.accordion-item-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.accordion-item-body-content {
  padding: 1rem;
  line-height: 1.5rem;
  position: relative;
}

.accordion-item-body-content::after {
  content: '';
  display: block;
  height: 1px;
  background-color: #d2d0d0;
  width: calc(100% - 40px);
  position: absolute;
  left: 20px;
  top: 0;
}

@media (max-width: 767px) {
  html {
    font-size: 14px;
  }
}
</style>